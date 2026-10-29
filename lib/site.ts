/** Canonical public origin, without a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mcprimedigital.com").replace(/\/$/, "");

export const SITE_NAME = "McPrime Digital";

export const DEFAULT_TITLE = "AI-Native Films, Commercials & Automation Systems | McPrime Digital";

export const DEFAULT_DESCRIPTION =
    "McPrime Digital delivers AI commercial filmmaking and AI automation systems engineered for mid-market and enterprise organizations. We design AI-native cinematic production and structured automation infrastructure built for speed, governance alignment, and scalable execution.";

/** Public profiles, used by the footer and the Organization structured data. */
export const SOCIAL_URLS = {
    facebook: "https://www.facebook.com/share/14VRKiD58fL/?mibextid=wwXIfr",
    x: "https://x.com/mcprimedigital?s=11",
    instagram: "https://www.instagram.com/mcprimedigital?igsh=MWN6ZG44aGpyYTlsMQ%3D%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/company/mcprimedigital/",
} as const;

/**
 * Genreline is the production operating system every McPrime engagement runs on.
 * It is built by our software company, a sister company under the same founder.
 */
export const GENRELINE = {
    name: "Genreline",
    url: "https://genreline.com",
    login: "https://app.genreline.com/login",
    tagline: "The operating system for AI and hybrid film production",
    /** Set to a path under /public once a current capture of the McPrime client portal is supplied. */
    portalCapture: null as string | null,
} as const;
