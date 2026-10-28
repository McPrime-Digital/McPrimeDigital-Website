"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor asked the OS/browser to minimise motion. False during SSR. */
export function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
