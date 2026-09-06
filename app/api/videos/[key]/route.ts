import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/r2";

/**
 * API route to delete a video from R2.
 * The [key] param is the URL-encoded S3 object key.
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ key: string }> }
) {
    try {
        const { key: encodedKey } = await params;
        const key = decodeURIComponent(encodedKey);

        const bucketName = process.env.R2_BUCKET_NAME;
        if (!bucketName) {
            return NextResponse.json(
                { error: "R2 bucket name is not configured." },
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

        await r2Client.send(command);

        return NextResponse.json({ success: true, deletedKey: key });
    } catch (error) {
        console.error("Error deleting video from R2:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
