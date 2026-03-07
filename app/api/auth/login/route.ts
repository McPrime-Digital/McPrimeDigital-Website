import { NextResponse } from "next/server";
import { signJWT } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;

        if (!adminUser || !adminPass) {
            console.error("ADMIN_USERNAME or ADMIN_PASSWORD not configured.");
            return NextResponse.json(
                { error: "Auth misconfigured. Check environment variables." },
                { status: 500 }
            );
        }

        if (username === adminUser && password === adminPass) {
            const token = await signJWT({ user: adminUser, role: "admin" });

            const response = NextResponse.json(
                { message: "Login successful" },
                { status: 200 }
            );

            // Set cookie - secure, http-only, and SameSite=Strict
            response.cookies.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 2, // 2 hours
            });

            return response;
        }

        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
