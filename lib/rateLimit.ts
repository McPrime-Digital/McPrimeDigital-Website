import { LRUCache } from "lru-cache";

type Options = {
    /** How many distinct clients to track at once. */
    uniqueTokenPerInterval?: number;
    /** Window length in milliseconds. */
    interval?: number;
};

/**
 * Small in-memory fixed-window limiter. Each serverless instance keeps its own
 * counters, so treat the limits as per-instance throttles rather than hard
 * global quotas; they still stop casual brute force and form spam.
 */
export default function rateLimit(options?: Options) {
    const tokenCache = new LRUCache<string, { count: number }>({
        max: options?.uniqueTokenPerInterval ?? 500,
        ttl: options?.interval ?? 60_000,
    });

    return {
        /** Resolves when the client is under `limit` hits in the window, rejects otherwise. */
        check: (limit: number, token: string): Promise<void> => {
            const entry = tokenCache.get(token) ?? { count: 0 };
            entry.count += 1;
            tokenCache.set(token, entry);
            return entry.count > limit
                ? Promise.reject(new Error("Rate limit exceeded"))
                : Promise.resolve();
        },
    };
}

/** Best-effort client address behind Vercel's proxy. */
export function getClientIp(headers: Headers): string {
    const forwarded = headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return headers.get("x-real-ip") ?? "unknown-ip";
}
