import { NextResponse, type NextRequest } from "next/server";
import { listVideos } from "@/lib/media";
import { isR2Configured } from "@/lib/r2";
import { isAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Public catalogue of films. Results are cached in-process and at the CDN so a
 * page view costs no R2 operations; the admin gallery passes ?fresh=1 to bypass.
 */
export async function GET(request: NextRequest) {
    if (!isR2Configured()) {
        return NextResponse.json({ error: "Video storage is not configured." }, { status: 503 });
    }

    try {
        const { searchParams } = request.nextUrl;
        const category = searchParams.get("category");
        const fresh = searchParams.get("fresh") === "1" && (await isAdminRequest(request));
        const data = await listVideos({ category, fresh });
        const maxAge = data.delivery === "public" ? 300 : 600;

        return NextResponse.json(data, {
            headers: {
                "Cache-Control": fresh
                    ? "no-store"
                    : `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
            },
        });
    } catch (error) {
        console.error("Error listing videos from R2:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
