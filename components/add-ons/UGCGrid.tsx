'use client';

import { motion } from 'framer-motion';
import PremiumCard from './PremiumCard';
import { Volume2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import AmbassadorTheater from './AmbassadorTheater';
import InViewVideo from '@/components/media/InViewVideo';
import { prettifyFilename } from '@/lib/video-utils';

// Metadata matched to stored filenames (case-insensitive partial match)
const videoMeta: Record<string, { title: string; context: string; views: string }> = {
    'easyes': {
        title: 'Alice on Skincare',
        context: 'AI-driven persona delivering authentic product education for skincare lines.',
        views: '1.2M'
    },
    'mcnortons': {
        title: 'McNortons on AI Filmmaking',
        context: 'Founder thought leadership and industry authority content at scale.',
        views: '850K'
    },
    'drizzilicious': {
        title: 'Drizzilicious Snack Ad',
        context: 'High-energy consumer product showcase with dynamic editing patterns.',
        views: '2.4M'
    }
};

interface ApiVideo {
    key: string;
    url: string;
    previewUrl?: string | null;
    posterUrl?: string | null;
}

interface AmbassadorVideo {
    key: string;
    url: string;
    previewUrl: string | null;
    posterUrl: string | null;
    title: string;
    context: string;
    views: string;
}

function getMetaForVideo(key: string) {
    const lower = key.toLowerCase();
    for (const [keyword, meta] of Object.entries(videoMeta)) {
        if (lower.includes(keyword)) return meta;
    }
    // Fallback: derive title from filename
    return { title: prettifyFilename(key), context: '', views: '' };
}

export default function UGCGrid() {
    const [videos, setVideos] = useState<AmbassadorVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/videos?category=addons-creations', { signal: controller.signal })
            .then(res => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
            .then((data: { videos?: ApiVideo[] }) => {
                setVideos((data.videos ?? []).map(v => ({
                    key: v.key,
                    url: v.url,
                    previewUrl: v.previewUrl ?? null,
                    posterUrl: v.posterUrl ?? null,
                    ...getMetaForVideo(v.key),
                })));
                setLoading(false);
            })
            .catch(() => setLoading(false));

        return () => controller.abort();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                {videos.map((video, index) => (
                    <VideoCard key={video.key} video={video} index={index} onOpen={() => setSelectedIndex(index)} />
                ))}
            </div>

            {/* The Ambassador Theater: film-frame catalog player. Loads a film only when opened. */}
            <AmbassadorTheater
                videos={videos.map(v => ({ src: v.url, poster: v.posterUrl, title: v.title, context: v.context }))}
                index={selectedIndex}
                onClose={() => setSelectedIndex(null)}
                onNavigate={(i) => setSelectedIndex(i)}
            />
        </>
    );
}

function VideoCard({ video, index, onOpen }: { video: AmbassadorVideo; index: number; onOpen: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="relative z-10 group"
            onClick={onOpen}
        >
            <PremiumCard className="aspect-[9/16] rounded-2xl overflow-hidden bg-[#0A0E14] border-white/5 transition-transform duration-500 group-hover:-translate-y-2">
                {/* Background loop: poster first, 10s preview only while on screen */}
                <InViewVideo
                    src={video.previewUrl ?? video.url}
                    poster={video.posterUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    {...(video.previewUrl ? {} : { windowStart: 0, windowSeconds: 10 })}
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    {/* Play Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 md:backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 group-hover:bg-[#2D6BFF]">
                        <Volume2 className="w-6 h-6 text-white" />
                    </div>

                    <div className="transform transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2D6BFF] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-[#2D6BFF] font-mono">Verified Ambassador</span>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight mb-2">{video.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                            {video.context}
                        </p>
                    </div>
                </div>

                {/* Glass Shim */}
                <div className="absolute inset-0 border-[1px] border-white/10 rounded-2xl pointer-events-none" />
            </PremiumCard>
        </motion.div>
    );
}
