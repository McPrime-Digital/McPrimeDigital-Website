import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3";

/**
 * API route to generate a pre-signed S3 URL for secure direct uploads.
 * 
 * Flow:
 * 1. The frontend asks for a pre-signed URL by providing filename and content type.
 * 2. The backend generates a signed URL and returns it to the frontend.
 * 3. The frontend then uploads the file directly to S3 using that URL.
 */
export async function POST(request: Request) {
    try {
        const { fileName, fileType } = await request.json();
        console.log(fileName, fileType)

        if (!fileName || !fileType) {
            return NextResponse.json(
                { error: "Filename and fileType are required." },
                { status: 400 }
            );
        }

        const bucketName = process.env.AWS_BUCKET_NAME;
        console.log(bucketName)
        if (!bucketName) {
            return NextResponse.json(
                { error: "S3 Bucket name is not configured." },
                { status: 500 }
            );
        }

        // Define the S3 object key (path and filename)
        // We'll store it under a 'samples/' folder for organization.
        const key = `samples/${Date.now()}-${fileName}`;
        console.log(key)

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: fileType,
        });

        // Generate the signed URL with a 5-minute expiration
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
        console.log(signedUrl)

        return NextResponse.json({
            uploadUrl: signedUrl,
            fileKey: key,
            publicUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
