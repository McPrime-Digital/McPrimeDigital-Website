import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Middleware for protecting routes in Next.js App Router.
 * Protects all routes under /admin and /api/upload.
 * For /admin routes: redirects unauthenticated users to /admin/login.
 * For /api routes: returns 401 Unauthorized for unauthenticated requests.
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define routes that require authentication
    const isAdminPath = pathname.startsWith("/admin");
    const isProtectedApiPath = pathname.startsWith("/api/upload");
    const isLoginPage = pathname === "/admin/login";

    if (isAdminPath || isProtectedApiPath) {
        // 2. Allow requests specifically for the login page
        if (isLoginPage) return NextResponse.next();

        // 3. Get token from cookies
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            if (isAdminPath) {
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 4. Verify JWT token using secret (Edge Compatible)
        try {
            const secret = new TextEncoder().encode(
                process.env.JWT_SECRET || "default_auth_secret_change_me_immediately_in_production"
            );
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (e) {
            console.error("JWT Verification failed:", e);
            // Remove invalid token and redirect to login if it's a page route
            if (isAdminPath) {
                const response = NextResponse.redirect(new URL("/admin/login", request.url));
                response.cookies.delete("admin_token");
                return response;
            }
            return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

// Configuration to only run middleware on specific routes
export const config = {
    matcher: ["/admin/:path*", "/api/upload/:path*"],
};
