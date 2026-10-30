"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Pauses every CSS animation inside the element while it is off-screen, by toggling the
 * data-offscreen attribute that globals.css matches. Looping decoration then costs nothing
 * once the visitor has scrolled past it, which is what keeps phones cool.
 * Pass an existing ref when the element already has one; otherwise use the returned ref.
 */
export function usePauseOffscreen<T extends HTMLElement>(existing?: RefObject<T | null>) {
    const own = useRef<T>(null);
    const ref = existing ?? own;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting),
            { rootMargin: "100px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref]);

    return ref;
}
