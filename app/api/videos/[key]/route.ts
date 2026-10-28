import { NextResponse } from "next/server";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, r2Bucket, isR2Configured } from "@/lib/r2";
import { VIDEO_PREFIX, derivedKeys, invalidateMediaCache, isSafeKey } from "@/lib/media";

type Params = { params: Promise<{ key: string }> };

async function keyFrom({ params }: Params): Promise<string | null> {
    const { key: encodedKey } = await params;
    const key = decodeURIComponent(encodedKey);
    return isSafeKey(key) ? key : null;
}

/** Delete a media object. Deleting a deliverable also removes its preview and poster. */
export async function DELETE(_request: Request, ctx: Params) {
    if (!isR2Configured()) {
        return NextResponse.json({ error: "Video storage is not configured." }, { status: 503 });
    }
    const key = await keyFrom(ctx);
    if (!key) {
        return NextResponse.json({ error: "Invalid key." }, { status: 400 });
    }

    try {
        const client = getR2Client();
        const bucket = r2Bucket();
        const keys = [key];
        if (key.startsWith(VIDEO_PREFIX)) {
            const derived = derivedKeys(key);
            keys.push(derived.preview, derived.poster);
        }
        await Promise.all(keys.map(k =>
            client.send(new DeleteObjectCommand({ Bucket: bucket, Key: k })).catch(() => undefined)
        ));
        invalidateMediaCache();
        return NextResponse.json({ success: true, deleted: keys });
    } catch (error) {
        console.error("Error deleting from R2:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

/**
 * Maintenance actions on a deliverable key.
 *   { action: "archive-master" }  copies videos/x to masters/x and removes videos/x,
 *   so a web encode can be uploaded under the original key afterwards.
 */
export async function POST(request: Request, ctx: Params) {
    if (!isR2Configured()) {
        return NextResponse.json({ error: "Video storage is not configured." }, { status: 503 });
    }
    const key = await keyFrom(ctx);
    if (!key || !key.startsWith(VIDEO_PREFIX)) {
        return NextResponse.json({ error: "Invalid key." }, { status: 400 });
    }
    const body = await request.json().catch(() => ({})) as { action?: string };
    if (body.action !== "archive-master") {
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    try {
        const client = getR2Client();
        const bucket = r2Bucket();
        const target = derivedKeys(key).master;
        await client.send(new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${key}`,
            Key: target,
        }));
        await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
        invalidateMediaCache();
        return NextResponse.json({ success: true, archivedTo: target });
    } catch (error) {
        console.error("Error archiving master in R2:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
