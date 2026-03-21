import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";

/**
 * API route to delete a video from S3.
 * The [key] param is the URL-encoded S3 object key.
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ key: string }> }
) {
    try {
        const { key: encodedKey } = await params;
        const key = decodeURIComponent(encodedKey);

        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            return NextResponse.json(
                { error: "S3 Bucket name is not configured." },
                { status: 500 }
            );
        }

        // Safety check: only allow deleting from the videos/ prefix
        if (!key.startsWith("videos/")) {
            return NextResponse.json(
                { error: "Invalid key. Only video files can be deleted." },
                { status: 400 }
            );
        }

        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        await s3Client.send(command);

        return NextResponse.json({ success: true, deletedKey: key });
    } catch (error) {
        console.error("Error deleting video from S3:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
