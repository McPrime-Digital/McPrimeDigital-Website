'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PremiumCard from './PremiumCard';
import { X, Volume2, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Metadata matched to S3 filenames (case-insensitive partial match)
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

interface S3Video {
    key: string;
    url: string;
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
    const filename = key.split('/').pop()?.replace(/\.[^.]+$/, '') || key;
    return { title: filename, context: '', views: '' };
}

export default function UGCGrid() {
    const [videos, setVideos] = useState<S3Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<S3Video | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/videos?category=addons-creations', { signal: controller.signal })
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
                    <VideoCard key={video.key} video={video} index={index} onOpen={() => setSelectedVideo(video)} />
                ))}
            </div>

            {/* Full Screen Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[85vh] bg-[#050608] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <video
                                src={selectedVideo.url}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                playsInline
                                preload="auto"
                            />

                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                                <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
                                <p className="text-gray-300 mt-2">{selectedVideo.context}</p>
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

    // 10 Second Loop Logic
    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 10) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

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
                {/* Background Video - Muted Loop 10s */}
                <video
                    ref={videoRef}
                    src={video.url}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    {/* Play Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 group-hover:bg-[#2D6BFF]">
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
