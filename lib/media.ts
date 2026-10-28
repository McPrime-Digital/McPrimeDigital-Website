import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, r2Bucket } from "@/lib/r2";

/**
 * Media key layout in the R2 bucket:
 *   videos/{category}/{name}.mp4    web deliverable (1080p H.264, what the theater plays)
 *   previews/{category}/{name}.mp4  short muted loop for card thumbnails (~1-2 MB)
 *   posters/{category}/{name}.jpg   still frame shown before any video bytes load
 *   masters/{category}/{name}.mp4   original upload, never served to the site
 */
export const VIDEO_PREFIX = "videos/";
export const PREVIEW_PREFIX = "previews/";
export const POSTER_PREFIX = "posters/";
export const MASTER_PREFIX = "masters/";

export type MediaKind = "video" | "preview" | "poster" | "master";

export const KIND_PREFIX: Record<MediaKind, string> = {
    video: VIDEO_PREFIX,
    preview: PREVIEW_PREFIX,
    poster: POSTER_PREFIX,
    master: MASTER_PREFIX,
};

const VIDEO_FILE = /\.(mp4|webm|m4v|mov)$/i;
const SAFE_KEY = /^(videos|previews|posters|masters)\/[a-z0-9-]+\/[A-Za-z0-9._-]+$/;

export interface MediaItem {
    key: string;
    url: string;
    previewUrl: string | null;
    posterUrl: string | null;
    category: string;
    size: number;
    lastModified: string | null;
}

export interface MediaListing {
    videos: MediaItem[];
    categories: string[];
    delivery: "public" | "presigned";
}

/** Presigned URLs live this long; caches below stay well inside it. */
const PRESIGN_SECONDS = 2 * 60 * 60;
const LISTING_TTL_MS = 5 * 60 * 1000;
const PRESIGNED_LISTING_TTL_MS = 45 * 60 * 1000;

export function isSafeKey(key: string): boolean {
    return SAFE_KEY.test(key);
}

export function publicBase(): string | null {
    const base = process.env.R2_PUBLIC_BASE_URL?.trim().replace(/\/+$/, "");
    return base ? base : null;
}

export function categoryOf(key: string): string {
    const parts = key.split("/");
    return parts.length >= 3 ? parts[1] : "uncategorized";
}

/** Keys of the derived assets that belong to a deliverable video key. */
export function derivedKeys(videoKey: string) {
    const rel = videoKey.startsWith(VIDEO_PREFIX) ? videoKey.slice(VIDEO_PREFIX.length) : videoKey;
    const base = rel.replace(/\.[^.]+$/, "");
    return {
        preview: `${PREVIEW_PREFIX}${base}.mp4`,
        poster: `${POSTER_PREFIX}${base}.jpg`,
        master: `${MASTER_PREFIX}${rel}`,
    };
}

export function sanitizeCategory(category: string): string {
    const safe = category.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    return safe || "uncategorized";
}

export function sanitizeFileName(fileName: string): string {
    const safe = fileName.replace(/\s+/g, "-").replace(/[^A-Za-z0-9._-]/g, "");
    return safe || "file";
}

interface ObjectInfo { size: number; lastModified: Date | undefined }

async function listPrefix(prefix: string): Promise<Map<string, ObjectInfo>> {
    const client = getR2Client();
    const bucket = r2Bucket();
    const out = new Map<string, ObjectInfo>();
    let token: string | undefined;
    do {
        const res = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: token }));
        for (const item of res.Contents ?? []) {
            if (item.Key && !item.Key.endsWith("/")) {
                out.set(item.Key, { size: item.Size ?? 0, lastModified: item.LastModified });
            }
        }
        token = res.IsTruncated ? res.NextContinuationToken : undefined;
    } while (token);
    return out;
}

const signedCache = new Map<string, { url: string; expires: number }>();

/** URL a browser can play: CDN URL when the bucket is public, otherwise a presigned one. */
export async function urlForKey(key: string): Promise<string> {
    const base = publicBase();
    if (base) return `${base}/${key.split("/").map(encodeURIComponent).join("/")}`;
    const cached = signedCache.get(key);
    const now = Date.now();
    if (cached && cached.expires > now) return cached.url;
    const url = await getSignedUrl(getR2Client(), new GetObjectCommand({ Bucket: r2Bucket(), Key: key }), { expiresIn: PRESIGN_SECONDS });
    signedCache.set(key, { url, expires: now + (PRESIGN_SECONDS - 10 * 60) * 1000 });
    return url;
}

let listingCache: { at: number; data: MediaListing } | null = null;

export function invalidateMediaCache() {
    listingCache = null;
    signedCache.clear();
}

async function buildListing(): Promise<MediaListing> {
    const [videos, previews, posters] = await Promise.all([
        listPrefix(VIDEO_PREFIX),
        listPrefix(PREVIEW_PREFIX),
        listPrefix(POSTER_PREFIX),
    ]);
    const keys = [...videos.entries()]
        .filter(([key]) => VIDEO_FILE.test(key))
        .sort((a, b) => (b[1].lastModified?.getTime() ?? 0) - (a[1].lastModified?.getTime() ?? 0));

    const items = await Promise.all(keys.map(async ([key, info]) => {
        const derived = derivedKeys(key);
        const [url, previewUrl, posterUrl] = await Promise.all([
            urlForKey(key),
            previews.has(derived.preview) ? urlForKey(derived.preview) : Promise.resolve(null),
            posters.has(derived.poster) ? urlForKey(derived.poster) : Promise.resolve(null),
        ]);
        return {
            key,
            url,
            previewUrl,
            posterUrl,
            category: categoryOf(key),
            size: info.size,
            lastModified: info.lastModified?.toISOString() ?? null,
        } satisfies MediaItem;
    }));

    return {
        videos: items,
        categories: [...new Set(items.map(v => v.category))],
        delivery: publicBase() ? "public" : "presigned",
    };
}

export async function listVideos(opts: { category?: string | null; fresh?: boolean } = {}): Promise<MediaListing> {
    const ttl = publicBase() ? LISTING_TTL_MS : PRESIGNED_LISTING_TTL_MS;
    const now = Date.now();
    if (opts.fresh || !listingCache || now - listingCache.at > ttl) {
        listingCache = { at: now, data: await buildListing() };
    }
    const data = listingCache.data;
    if (!opts.category) return data;
    const videos = data.videos.filter(v => v.category === opts.category);
    return { ...data, videos, categories: [...new Set(videos.map(v => v.category))] };
}
