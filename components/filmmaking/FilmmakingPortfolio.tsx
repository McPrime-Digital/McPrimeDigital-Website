'use client';

import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import PortfolioTheater from './PortfolioTheater';
import InViewVideo from '@/components/media/InViewVideo';
import { prettifyFilename } from '@/lib/video-utils';

// Metadata map matched to stored filenames (keyword-based).
// previewStart/previewDuration only matter when a film has no dedicated preview clip.
const videoMeta: Record<string, {
    title: string;
    subtitle: string;
    category: string;
    loopFromEnd?: boolean;
    previewStart?: number;
    previewDuration?: number;
}> = {
    'primeos': {
        title: 'PRIME.OS',
        subtitle: 'The AI that builds execution paths and turns imagination into action.',
        category: 'AI Commercial'
    },
    'vexorin': {
        title: 'VEXORIN',
        subtitle: 'The new standard in mental focus.',
        category: 'Brand Film',
        loopFromEnd: true // thumbnail loops from 30s before end
    },
    'primers': {
        title: 'THE PRIMERS HOTEL',
        subtitle: 'Where luxury meets reality.',
        category: 'Comedy Commercial',
        previewStart: 24, // poolside sequence
        previewDuration: 12
    }
};

// 2 placeholder slots shown while remaining videos are pending
const placeholders = [
    { title: 'COMING SOON', subtitle: 'Next production in post. Stay tuned.', category: 'In Production' },
    { title: 'COMING SOON', subtitle: 'Another project dropping shortly.', category: 'In Production' }
];

interface ApiVideo {
    key: string;
    url: string;
    previewUrl?: string | null;
    posterUrl?: string | null;
}

interface PortfolioVideo {
    key: string;
    url: string;
    previewUrl: string | null;
    posterUrl: string | null;
    title: string;
    subtitle: string;
    category: string;
    loopFromEnd?: boolean;
    previewStart?: number;
    previewDuration?: number;
}

function getMetaForVideo(key: string) {
    const lower = key.toLowerCase();
    for (const [keyword, meta] of Object.entries(videoMeta)) {
        if (lower.includes(keyword)) return meta;
    }
    return { title: prettifyFilename(key).toUpperCase(), subtitle: '', category: 'Commercial', loopFromEnd: false };
}

export default function FilmmakingPortfolio() {
    const [videos, setVideos] = useState<PortfolioVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/videos?category=filmmaking-portfolio', { signal: controller.signal })
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

    // Fill up to 4 total slots: real videos first, then placeholders
    const totalSlots = 4;
    const placeholdersNeeded = Math.max(0, totalSlots - videos.length);
    const slots = [
        ...videos.map(v => ({ type: 'video' as const, data: v })),
        ...placeholders.slice(0, placeholdersNeeded).map(p => ({ type: 'placeholder' as const, data: p }))
    ];

    return (
        <>
            <section className="bg-[#050608] py-32">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Section Header */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">VISUAL PORTFOLIO</h2>
                        <div className="h-1 w-20 bg-[#2D6BFF] mb-6" />
                        <p className="max-w-3xl text-gray-400 font-light leading-relaxed">
                            Selected commercial films created through AI-native production systems, demonstrating cinematic quality, structured execution, and scalable creative architecture. Production becomes Digital Infrastructure rather than event-based execution.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {slots.map((slot, index) =>
                                slot.type === 'video' ? (
                                    <VideoCard
                                        key={slot.data.key}
                                        video={slot.data as PortfolioVideo}
                                        index={index}
                                        onOpen={() => setSelectedIndex(index)}
                                    />
                                ) : (
                                    <PlaceholderCard key={`placeholder-${index}`} data={slot.data} index={index} />
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* The Portfolio Theater: widescreen 35mm catalog player. Loads a film only when opened. */}
            <PortfolioTheater
                films={videos.map(v => ({
                    src: v.url,
                    poster: v.posterUrl,
                    title: v.title,
                    subtitle: v.subtitle,
                    category: v.category,
                }))}
                index={selectedIndex}
                onClose={() => setSelectedIndex(null)}
                onNavigate={(i) => setSelectedIndex(i)}
            />
        </>
    );
}

function VideoCard({ video, index, onOpen }: { video: PortfolioVideo; index: number; onOpen: () => void }) {
    // With a dedicated preview clip the whole clip loops; otherwise loop a window of the full film.
    const windowProps = video.previewUrl
        ? {}
        : {
            windowStart: video.previewStart,
            windowSeconds: video.previewDuration ?? 20,
            fromEndSeconds: video.loopFromEnd ? 30 : undefined,
        };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            className="group relative aspect-video overflow-hidden bg-[#0B0D12] rounded-xl cursor-pointer shadow-2xl"
            onClick={onOpen}
        >
            {/* Looping thumbnail: poster first, preview clip only while on screen */}
            <InViewVideo
                src={video.previewUrl ?? video.url}
                poster={video.posterUrl}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                {...windowProps}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#2D6BFF] group-hover:border-[#2D6BFF] transition-all duration-300 scale-90 group-hover:scale-100">
                    <Play className="w-6 h-6 text-white ml-1" />
                </div>
            </div>

            {/* Text Info: always visible at bottom */}
            <div className="absolute bottom-0 inset-x-0 p-6">
                <span className="text-[#2D6BFF] text-[10px] tracking-[0.2em] font-mono uppercase mb-2 block">
                    {video.category}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight leading-tight mb-1">
                    {video.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-sm">
                    {video.subtitle}
                </p>
            </div>

            {/* Glass Border */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none group-hover:border-[#2D6BFF]/40 transition-colors duration-300" />
        </motion.div>
    );
}

function PlaceholderCard({ data, index }: { data: { title: string; subtitle: string; category: string }; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            className="relative aspect-video overflow-hidden bg-[#0B0D12] rounded-xl border border-white/5"
        >
            {/* Animated Placeholder BG */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                </div>
                <span className="text-[#2D6BFF] text-[10px] tracking-[0.2em] font-mono uppercase mb-3">
                    {data.category}
                </span>
                <h3 className="text-xl font-black text-white/30 tracking-tight mb-2">{data.title}</h3>
                <p className="text-sm text-white/20 leading-relaxed max-w-xs">{data.subtitle}</p>
            </div>
        </motion.div>
    );
}
