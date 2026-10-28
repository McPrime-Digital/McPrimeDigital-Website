import type { NextConfig } from "next";
import path from "node:path";


/**
 * Report-only CSP: violations are logged in the browser console without blocking
 * anything, which is the safe first step before enforcing. Inline/eval are allowed
 * because Next.js and Framer Motion inject inline styles and scripts without nonces.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

// Static media in /public: a week at the edge and in browsers, revalidated in the background.
const mediaCache = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" };

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    serverActions: {
      // Career applications attach a resume capped at 5 MB in the action itself.
      bodySizeLimit: "6mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized variants are cached for 31 days, which keeps Vercel transformation counts low.
    minimumCacheTTL: 2678400,
    qualities: [75],
  },
  async redirects() {
    return [
      { source: "/addons", destination: "/add-ons", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/:all*(mp4|webm|jpg|jpeg|png|svg|webp|avif|gif|ico)", headers: [mediaCache] },
    ];
  },
};

export default nextConfig;
