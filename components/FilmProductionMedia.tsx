'use client';

import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import InViewVideo from '@/components/media/InViewVideo';

interface Reel {
    url: string;
    previewUrl: string | null;
    posterUrl: string | null;
}

interface ApiVideo {
    key: string;
    url: string;
    previewUrl?: string | null;
    posterUrl?: string | null;
}

/**
 * Media for the homepage AI Film Production card: loops the reel uploaded to the
 * home-hero category (falling back to homepage-core-services) once it scrolls
 * into view; shows the play glyph until a reel exists.
 */
export default function FilmProductionMedia() {
    const [reel, setReel] = useState<Reel | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            for (const category of ['home-hero', 'homepage-core-services']) {
                const res = await fetch(`/api/videos?category=${category}`, { signal: controller.signal });
                if (!res.ok) continue;
                const data = (await res.json()) as { videos?: ApiVideo[] };
                const first = data.videos?.[0];
                if (first) {
                    setReel({ url: first.url, previewUrl: first.previewUrl ?? null, posterUrl: first.posterUrl ?? null });
                    return;
                }
            }
        };
        load().catch(() => undefined);
        return () => controller.abort();
    }, []);

    if (!reel) {
        return (
            <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Play className="w-8 h-8 text-white ml-1 fill-white/20" />
                </div>
            </div>
        );
    }

    return (
        <InViewVideo
            src={reel.previewUrl ?? reel.url}
            poster={reel.posterUrl}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
