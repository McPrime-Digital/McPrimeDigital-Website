import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Request proxy (Next.js 16 name for middleware).
 *  1. Production hosts other than the canonical www domain (the *.vercel.app alias,
 *     the bare apex) are permanently redirected so search engines see one site.
 *  2. /admin pages and the mutating media APIs require a valid admin session.
 *     A missing JWT_SECRET fails closed instead of falling back to a known default.
 */
const CANONICAL_HOST = "www.mcprimedigital.com";
const ADMIN_COOKIE = "admin_token";

function isProtectedApi(pathname: string, method: string): boolean {
    if (pathname.startsWith("/api/upload")) return true;
    return pathname.startsWith("/api/videos") && method !== "GET";
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = request.headers.get("host") ?? "";

    // 1. Canonical host (production only; preview deployments keep their own URLs)
    if (
        process.env.VERCEL_ENV === "production" &&
        host !== CANONICAL_HOST &&
        (host.endsWith(".vercel.app") || host === "mcprimedigital.com")
    ) {
        const url = request.nextUrl.clone();
        url.protocol = "https:";
        url.host = CANONICAL_HOST;
        url.port = "";
        return NextResponse.redirect(url, 308);
    }

    // 2. Admin protection
    const isAdminPath = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";
    const protectedApi = isProtectedApi(pathname, request.method);

    if (!isAdminPath && !protectedApi) return NextResponse.next();
    if (isLoginPage) return NextResponse.next();

    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 16) {
        console.error("JWT_SECRET is not configured; refusing admin access.");
        return isAdminPath
            ? new NextResponse("Admin access is not configured on this deployment.", { status: 503 })
            : NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
    }

    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const toLogin = () => {
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.cookies.delete(ADMIN_COOKIE);
        return response;
    };

    if (!token) {
        return isAdminPath ? toLogin() : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        if (payload.role !== "admin") throw new Error("not an admin token");
        return NextResponse.next();
    } catch {
        return isAdminPath ? toLogin() : NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }
}

export const config = {
    // Pages and API routes only; skip Next internals and any file with an extension.
    matcher: ["/((?!_next/|.*\\..*).*)"],
};
