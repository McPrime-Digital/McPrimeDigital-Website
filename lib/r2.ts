import { S3Client } from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 is S3-compatible: same SDK, pointed at the R2 endpoint.
 * requestChecksumCalculation must be WHEN_REQUIRED: the SDK's default (v3.729+)
 * adds checksum headers to presigned URLs that the browser never sends, which
 * makes R2 reject the upload with a signature mismatch.
 */
export function isR2Configured(): boolean {
    return Boolean(
        process.env.R2_ACCOUNT_ID &&
        process.env.R2_ACCESS_KEY_ID &&
        process.env.R2_SECRET_ACCESS_KEY &&
        process.env.R2_BUCKET_NAME
    );
}

export function r2Bucket(): string {
    const bucket = process.env.R2_BUCKET_NAME;
    if (!bucket) throw new Error("R2_BUCKET_NAME is not configured");
    return bucket;
}

let client: S3Client | null = null;

export function getR2Client(): S3Client {
    if (!client) {
        client = new S3Client({
            region: "auto",
            endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
            },
            requestChecksumCalculation: "WHEN_REQUIRED",
            responseChecksumValidation: "WHEN_REQUIRED",
        });
    }
    return client;
}
