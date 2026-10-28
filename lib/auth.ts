import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "admin_token";
export const SESSION_SECONDS = 60 * 60 * 2;

export interface AdminClaims extends JWTPayload {
    user: string;
    role: "admin";
}

/**
 * The signing secret is mandatory. Falling back to a built-in default would let
 * anyone who reads the source mint admin tokens, so a missing secret fails closed.
 */
export function getJwtSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 16) {
        throw new Error("JWT_SECRET is not configured (set a random string of at least 16 characters)");
    }
    return new TextEncoder().encode(secret);
}

export function isAuthConfigured(): boolean {
    return Boolean(process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 16);
}

export async function signJWT(payload: AdminClaims): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_SECONDS}s`)
        .sign(getJwtSecret());
}

export async function verifyJWT(token: string): Promise<AdminClaims | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecret());
        return payload.role === "admin" ? (payload as AdminClaims) : null;
    } catch {
        return null;
    }
}

/** True when the request carries a valid admin session cookie. */
export async function isAdminRequest(request: NextRequest): Promise<boolean> {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!token || !isAuthConfigured()) return false;
    return (await verifyJWT(token)) !== null;
}
