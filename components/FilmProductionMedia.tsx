'use client';

import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Media for the homepage AI Film Production card: plays the reel uploaded to
 * the home-hero / homepage-core-services category on loop; falls back to the
 * play glyph until a video is available.
 */
export default function FilmProductionMedia() {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/videos', { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                const videos: { key: string; url: string; category: string }[] = data.videos || [];
                const reel = videos.find(v => v.category === 'home-hero')
                    || videos.find(v => v.category === 'homepage-core-services');
                if (reel) setSrc(reel.url);
            })
            .catch(() => undefined);
        return () => controller.abort();
    }, []);

    if (!src) {
        return (
            <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Play className="w-8 h-8 text-white ml-1 fill-white/20" />
                </div>
            </div>
        );
    }

    return (
        <video
            src={src}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
        />
    );
}
