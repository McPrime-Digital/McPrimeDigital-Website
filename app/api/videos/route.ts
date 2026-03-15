import { NextResponse } from "next/server";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            return NextResponse.json(
                { error: "S3 Bucket name is not configured." },
                { status: 500 }
            );
        }

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: "samples/",
        });

        const response = await s3Client.send(command);

        const sortedContents = (response.Contents || [])
            .filter(item => item.Key !== 'samples/' && item.Key)
            .sort((a, b) => {
                const aTime = a.LastModified?.getTime() || 0;
                const bTime = b.LastModified?.getTime() || 0;
                return bTime - aTime;
            });

        const videos = await Promise.all(sortedContents.map(async (item) => {
            const getCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: item.Key,
            });
            const signedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

            return {
                key: item.Key,
                url: signedUrl,
                lastModified: item.LastModified,
                size: item.Size,
            };
        }));

        return NextResponse.json({ videos });
    } catch (error) {
        console.error("Error fetching videos from S3:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
