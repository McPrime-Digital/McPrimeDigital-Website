import { S3Client } from "@aws-sdk/client-s3";

// Cloudflare R2 is S3-compatible: same SDK, pointed at the R2 endpoint.
// requestChecksumCalculation must be WHEN_REQUIRED — the SDK's default (v3.729+)
// adds checksum headers to presigned URLs that the browser never sends,
// which makes R2 reject the upload with a signature mismatch.
export const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
});
