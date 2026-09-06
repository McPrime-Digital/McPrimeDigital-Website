import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2";

/**
 * API route to generate a pre-signed Cloudflare R2 URL for secure direct uploads.
 *
 * Flow:
 * 1. The frontend asks for a pre-signed URL by providing filename, content type and category.
 * 2. The backend generates a signed URL and returns it to the frontend.
 * 3. The frontend then uploads the file directly to R2 using that URL.
 */
export async function POST(request: Request) {
    try {
        const { fileName, fileType, category = "uncategorized" } = await request.json();

        if (!fileName || !fileType) {
            return NextResponse.json(
                { error: "Filename and fileType are required." },
                { status: 400 }
            );
        }

        const bucketName = process.env.R2_BUCKET_NAME;
        if (!bucketName) {
            return NextResponse.json(
                { error: "R2 bucket name is not configured." },
                { status: 500 }
            );
        }

        // Define the object key (path and filename)
        // We organize uploads into folders based on their website category.
        // Filenames are normalized so keys and URLs stay clean.
        const safeCategory = category.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
        const safeName = fileName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
        const key = `videos/${safeCategory}/${Date.now()}-${safeName}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: fileType,
        });

        // Generate the signed URL with a 5-minute expiration
        const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });

        // Public base is optional (e.g. the bucket's r2.dev subdomain or a custom
        // domain); the site itself plays videos through presigned URLs from /api/videos.
        const publicBase = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "");

        return NextResponse.json({
            uploadUrl: signedUrl,
            fileKey: key,
            publicUrl: publicBase ? `${publicBase}/${key}` : key,
        });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
