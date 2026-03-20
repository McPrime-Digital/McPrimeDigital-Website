'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Metadata map matched to S3 filenames (keyword-based)
const videoMeta: Record<string, { title: string; subtitle: string; category: string }> = {
    'primeos': {
        title: 'PRIME.OS',
        subtitle: 'The AI that builds execution paths and turns imagination into action.',
        category: 'AI Commercial'
    },
    'vexorin': {
        title: 'VEXORIN',
        subtitle: 'Precision-engineered commercial storytelling built for maximum brand impact at scale.',
        category: 'Brand Film'
    }
};

// 2 placeholder slots shown while remaining videos are pending
const placeholders = [
    { title: 'COMING SOON', subtitle: 'Next production in post. Stay tuned.', category: 'In Production' },
    { title: 'COMING SOON', subtitle: 'Another project dropping shortly.', category: 'In Production' }
];

interface S3Video {
    key: string;
    url: string;
    title: string;
    subtitle: string;
    category: string;
}

function getMetaForVideo(key: string) {
    const lower = key.toLowerCase();
    for (const [keyword, meta] of Object.entries(videoMeta)) {
        if (lower.includes(keyword)) return meta;
    }
    const filename = key.split('/').pop()?.replace(/^\d+-/, '').replace(/\.[^.]+$/, '') || key;
    return { title: filename.toUpperCase(), subtitle: '', category: 'Commercial' };
}

export default function FilmmakingPortfolio() {
    const [videos, setVideos] = useState<S3Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<S3Video | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/videos?category=filmmaking-portfolio', { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                const mapped: S3Video[] = (data.videos || []).map((v: { key: string; url: string }) => ({
                    ...v,
                    ...getMetaForVideo(v.key),
                }));
                setVideos(mapped);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
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
                                        video={slot.data as S3Video}
                                        index={index}
                                        onOpen={() => setSelectedVideo(slot.data as S3Video)}
                                    />
                                ) : (
                                    <PlaceholderCard key={`placeholder-${index}`} data={slot.data} index={index} />
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl bg-[#050608] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <video
                                src={selectedVideo.url}
                                className="w-full h-auto max-h-[80vh] object-contain"
                                controls
                                autoPlay
                                playsInline
                                preload="auto"
                            />

                            <div className="p-6 bg-gradient-to-t from-black to-transparent">
                                <span className="text-[#2D6BFF] text-xs tracking-widest font-mono uppercase mb-2 block">
                                    {selectedVideo.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{selectedVideo.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{selectedVideo.subtitle}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function VideoCard({ video, index, onOpen }: { video: S3Video; index: number; onOpen: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // 20-second loop
    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 20) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
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
            {/* Looping Video Thumbnail */}
            <video
                ref={videoRef}
                src={video.url}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                muted
                autoPlay
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#2D6BFF] group-hover:border-[#2D6BFF] transition-all duration-300 scale-90 group-hover:scale-100">
                    <Play className="w-6 h-6 text-white ml-1" />
                </div>
            </div>

            {/* Text Info — Always Visible at Bottom */}
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
