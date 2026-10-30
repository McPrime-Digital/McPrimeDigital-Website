"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses every CSS animation inside the element while it is off-screen, by toggling the
 * data-offscreen attribute that globals.css matches. Looping decoration then costs nothing
 * once the visitor has scrolled past it, which is what keeps phones cool.
 */
export function usePauseOffscreen<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting),
            { rootMargin: "100px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
