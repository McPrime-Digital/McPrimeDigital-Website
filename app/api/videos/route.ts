import { NextResponse } from "next/server";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            return NextResponse.json(
                { error: "S3 Bucket name is not configured." },
                { status: 500 }
            );
        }

        // List from the specific category folder if requested, otherwise list all videos
        const prefix = category ? `videos/${category}/` : `videos/`;

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        });

        const response = await s3Client.send(command);

        const sortedContents = (response.Contents || [])
            .filter(item => !item.Key?.endsWith('/') && item.Key)
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

            // Extract category from key: videos/{category}/{filename}
            const parts = item.Key!.split('/');
            const videoCategory = parts.length >= 3 ? parts[1] : 'uncategorized';

            return {
                key: item.Key,
                url: signedUrl,
                lastModified: item.LastModified,
                size: item.Size,
                category: videoCategory,
            };
        }));

        // Collect unique categories
        const categories = [...new Set(videos.map(v => v.category))];

        return NextResponse.json({ videos, categories });
    } catch (error) {
        console.error("Error fetching videos from S3:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
