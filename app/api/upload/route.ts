import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, r2Bucket, isR2Configured } from "@/lib/r2";
import {
    KIND_PREFIX,
    type MediaKind,
    invalidateMediaCache,
    isSafeKey,
    publicBase,
    sanitizeCategory,
    sanitizeFileName,
} from "@/lib/media";

const MB = 1024 * 1024;

const LIMITS: Record<MediaKind, { types: string[]; maxBytes: number }> = {
    video: { types: ["video/mp4", "video/webm", "video/quicktime"], maxBytes: 300 * MB },
    preview: { types: ["video/mp4", "video/webm"], maxBytes: 25 * MB },
    poster: { types: ["image/jpeg", "image/png", "image/webp"], maxBytes: 3 * MB },
    master: { types: ["video/mp4", "video/webm", "video/quicktime"], maxBytes: 2048 * MB },
};

interface UploadRequest {
    fileName?: string;
    fileType?: string;
    fileSize?: number;
    category?: string;
    kind?: MediaKind;
    /** Exact destination key (admin tooling). Must sit under the prefix for `kind`. */
    targetKey?: string;
}

/**
 * Issues a short-lived presigned PUT so the browser (or the media sync script)
 * uploads straight to R2. Protected by the admin session in proxy.ts.
 */
export async function POST(request: Request) {
    if (!isR2Configured()) {
        return NextResponse.json({ error: "Video storage is not configured." }, { status: 503 });
    }

    try {
        const body = (await request.json()) as UploadRequest;
        const { fileName, fileType, fileSize, targetKey } = body;
        const kind: MediaKind = body.kind && body.kind in KIND_PREFIX ? body.kind : "video";
        const limits = LIMITS[kind];

        if (!fileName || !fileType) {
            return NextResponse.json({ error: "fileName and fileType are required." }, { status: 400 });
        }
        if (!limits.types.includes(fileType)) {
            return NextResponse.json({ error: `Unsupported type ${fileType} for ${kind}. Allowed: ${limits.types.join(", ")}` }, { status: 415 });
        }
        if (typeof fileSize === "number" && fileSize > limits.maxBytes) {
            return NextResponse.json({ error: `File too large for ${kind}. Limit is ${Math.round(limits.maxBytes / MB)} MB.` }, { status: 413 });
        }

        let key: string;
        if (targetKey) {
            if (!isSafeKey(targetKey) || !targetKey.startsWith(KIND_PREFIX[kind])) {
                return NextResponse.json({ error: "targetKey is not a valid key for this kind." }, { status: 400 });
            }
            key = targetKey;
        } else {
            const safeCategory = sanitizeCategory(body.category ?? "uncategorized");
            key = `${KIND_PREFIX[kind]}${safeCategory}/${Date.now()}-${sanitizeFileName(fileName)}`;
        }

        const command = new PutObjectCommand({ Bucket: r2Bucket(), Key: key, ContentType: fileType });
        const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 600 });
        invalidateMediaCache();

        const base = publicBase();
        return NextResponse.json({
            uploadUrl,
            fileKey: key,
            publicUrl: base ? `${base}/${key}` : key,
        });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
