#!/usr/bin/env node
/**
 * media-sync: publish web encodes, preview clips and posters to the R2 bucket.
 *
 *   node --env-file=.env.local scripts/media-sync.mjs <encodedDir> [--dry-run]
 *
 * <encodedDir> must contain:
 *   videos/<category>/<name>.mp4     1080p H.264 deliverables
 *   previews/<category>/<name>.mp4   short muted loops
 *   posters/<category>/<name>.jpg    still frames
 *
 * Two transports, picked from the environment:
 *   1. Direct R2  : R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 *   2. Site API   : ADMIN_USERNAME, ADMIN_PASSWORD (+ optional SITE_URL, default production)
 *      Logs in, asks /api/upload for presigned PUTs, and asks /api/videos/<key> to
 *      archive the raw master server-side before the encode replaces it.
 *
 * Masters: when a deliverable key already exists remotely with a different size,
 * the remote object is assumed to be the original upload and is copied to
 * masters/<category>/<name>.mp4 before being replaced. Nothing is ever deleted
 * without that copy succeeding first.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const encodedDir = args.find(a => !a.startsWith("--"));
if (!encodedDir) {
    console.error("usage: node --env-file=.env.local scripts/media-sync.mjs <encodedDir> [--dry-run]");
    process.exit(1);
}

const KINDS = [
    { kind: "video", dir: "videos", ext: ".mp4", type: "video/mp4" },
    { kind: "preview", dir: "previews", ext: ".mp4", type: "video/mp4" },
    { kind: "poster", dir: "posters", ext: ".jpg", type: "image/jpeg" },
];

async function collect() {
    const files = [];
    for (const k of KINDS) {
        const base = path.join(encodedDir, k.dir);
        let categories = [];
        try { categories = await readdir(base); } catch { continue; }
        for (const category of categories) {
            const catDir = path.join(base, category);
            if (!(await stat(catDir)).isDirectory()) continue;
            for (const name of await readdir(catDir)) {
                if (!name.endsWith(k.ext)) continue;
                const file = path.join(catDir, name);
                files.push({ ...k, category, name, file, key: `${k.dir}/${category}/${name}`, size: (await stat(file)).size });
            }
        }
    }
    return files;
}

// ---------- transport 1: direct R2 ----------
async function directTransport() {
    const { S3Client, HeadObjectCommand, CopyObjectCommand, PutObjectCommand } = await import("@aws-sdk/client-s3");
    const bucket = process.env.R2_BUCKET_NAME;
    const client = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
        requestChecksumCalculation: "WHEN_REQUIRED",
        responseChecksumValidation: "WHEN_REQUIRED",
    });
    return {
        name: "direct R2",
        async remoteSize(key) {
            try { return (await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))).ContentLength ?? null; }
            catch { return null; }
        },
        async archiveMaster(key) {
            const target = `masters/${key.slice("videos/".length)}`;
            await client.send(new CopyObjectCommand({ Bucket: bucket, CopySource: `${bucket}/${key}`, Key: target }));
            return target;
        },
        async upload(item) {
            await client.send(new PutObjectCommand({ Bucket: bucket, Key: item.key, Body: await readFile(item.file), ContentType: item.type }));
        },
    };
}

// ---------- transport 2: production API with the admin session ----------
async function apiTransport() {
    const site = (process.env.SITE_URL ?? "https://www.mcprimedigital.com").replace(/\/$/, "");
    const login = await fetch(`${site}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }),
    });
    if (!login.ok) throw new Error(`login failed: HTTP ${login.status} ${await login.text()}`);
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0];
    if (!cookie) throw new Error("login succeeded but no session cookie was returned");
    const headers = { "Content-Type": "application/json", Cookie: cookie };

    const listing = await fetch(`${site}/api/videos?fresh=1`, { headers: { Cookie: cookie } });
    if (!listing.ok) throw new Error(`listing failed: HTTP ${listing.status}`);
    const remote = new Map((await listing.json()).videos.map(v => [v.key, v.size]));

    return {
        name: `site API (${site})`,
        async remoteSize(key) { return remote.get(key) ?? null; },
        async archiveMaster(key) {
            const res = await fetch(`${site}/api/videos/${encodeURIComponent(key)}`, { method: "POST", headers, body: JSON.stringify({ action: "archive-master" }) });
            if (!res.ok) throw new Error(`archive failed for ${key}: HTTP ${res.status} ${await res.text()}`);
            return (await res.json()).archivedTo;
        },
        async upload(item) {
            const presign = await fetch(`${site}/api/upload`, {
                method: "POST", headers,
                body: JSON.stringify({ fileName: item.name, fileType: item.type, fileSize: item.size, kind: item.kind, targetKey: item.key }),
            });
            if (!presign.ok) throw new Error(`presign failed for ${item.key}: HTTP ${presign.status} ${await presign.text()}`);
            const { uploadUrl } = await presign.json();
            const put = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": item.type }, body: await readFile(item.file) });
            if (!put.ok) throw new Error(`PUT failed for ${item.key}: HTTP ${put.status} ${await put.text()}`);
        },
    };
}

const hasR2 = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME"].every(k => process.env[k]);
const hasAdmin = process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD;
if (!hasR2 && !hasAdmin) {
    console.error("Set either the R2_* variables or ADMIN_USERNAME/ADMIN_PASSWORD in .env.local (run with --env-file=.env.local).");
    process.exit(1);
}

const transport = hasR2 ? await directTransport() : await apiTransport();
const items = await collect();
console.log(`${items.length} files in ${encodedDir}; transport: ${transport.name}${dryRun ? " (dry run)" : ""}`);

const mb = n => `${(n / 1e6).toFixed(1)} MB`;
for (const item of items) {
    if (item.kind === "video") {
        const remoteSize = await transport.remoteSize(item.key);
        if (remoteSize !== null && remoteSize !== item.size) {
            console.log(`archive  ${item.key}  (remote ${mb(remoteSize)} -> masters/)`);
            if (!dryRun) await transport.archiveMaster(item.key);
        }
    }
    console.log(`upload   ${item.key}  ${mb(item.size)}`);
    if (!dryRun) await transport.upload(item);
}
console.log(dryRun ? "dry run complete" : "sync complete");
