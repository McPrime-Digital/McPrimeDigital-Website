import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { ADMIN_COOKIE, SESSION_SECONDS, isAuthConfigured, signJWT } from "@/lib/auth";
import rateLimit, { getClientIp } from "@/lib/rateLimit";

// 5 attempts per 15 minutes per address.
const limiter = rateLimit({ interval: 15 * 60_000, uniqueTokenPerInterval: 1000 });

/** Constant-time string comparison over fixed-length digests. */
function safeEqual(a: string, b: string): boolean {
    const da = createHash("sha256").update(a).digest();
    const db = createHash("sha256").update(b).digest();
    return timingSafeEqual(da, db);
}

export async function POST(request: Request) {
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass || !isAuthConfigured()) {
        console.error("ADMIN_USERNAME, ADMIN_PASSWORD or JWT_SECRET is not configured.");
        return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
    }

    try {
        await limiter.check(5, getClientIp(request.headers));
    } catch {
        return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
    }

    try {
        const body = (await request.json()) as { username?: unknown; password?: unknown };
        const username = typeof body.username === "string" ? body.username : "";
        const password = typeof body.password === "string" ? body.password : "";

        // Evaluate both comparisons so the response time does not reveal which field failed.
        const userOk = safeEqual(username, adminUser);
        const passOk = safeEqual(password, adminPass);
        if (!(userOk && passOk)) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = await signJWT({ user: adminUser, role: "admin" });
        const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
        response.cookies.set(ADMIN_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: SESSION_SECONDS,
        });
        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
