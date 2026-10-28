"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export interface InViewVideoProps {
    src: string;
    poster?: string | null;
    className?: string;
    /** Begin fetching metadata as soon as the element mounts (hero backgrounds). */
    eager?: boolean;
    /** Loop only a window of a longer film: start second, length in seconds. */
    windowStart?: number;
    windowSeconds?: number;
    /** Start the loop window this many seconds before the end instead of at windowStart. */
    fromEndSeconds?: number;
    /** Extra margin around the viewport that counts as "visible". */
    rootMargin?: string;
    onLoadedMetadata?: () => void;
}

/**
 * A muted, looping video that only downloads and plays while it is on screen.
 * It renders its poster until then, pauses when scrolled away, and stays on the
 * poster entirely for visitors who prefer reduced motion. This replaces the
 * previous pattern of autoplaying every film with preload="auto".
 */
export default function InViewVideo({
    src,
    poster,
    className,
    eager = false,
    windowStart,
    windowSeconds,
    fromEndSeconds,
    rootMargin = "200px 0px",
    onLoadedMetadata,
}: InViewVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const loopStart = useRef(0);
    const [inView, setInView] = useState(false);
    const reduced = usePrefersReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin, threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (inView && !reduced) {
            el.play().catch(() => undefined);
        } else {
            el.pause();
        }
    }, [inView, reduced]);

    const handleLoadedMetadata = () => {
        const el = ref.current;
        if (!el) return;
        let start = 0;
        if (fromEndSeconds !== undefined) {
            start = Math.max(0, el.duration - fromEndSeconds);
        } else if (windowStart !== undefined) {
            start = Math.min(windowStart, Math.max(0, el.duration - 5));
        }
        loopStart.current = start;
        if (start > 0) el.currentTime = start;
        onLoadedMetadata?.();
    };

    const handleTimeUpdate = () => {
        const el = ref.current;
        if (!el || !windowSeconds) return;
        if (el.currentTime >= loopStart.current + windowSeconds) {
            el.currentTime = loopStart.current;
        }
    };

    return (
        <video
            ref={ref}
            src={src}
            poster={poster ?? undefined}
            className={className}
            muted
            loop
            playsInline
            preload={eager ? "metadata" : "none"}
            aria-hidden
            tabIndex={-1}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={windowSeconds ? handleTimeUpdate : undefined}
        />
    );
}
