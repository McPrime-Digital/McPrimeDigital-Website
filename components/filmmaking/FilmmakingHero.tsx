'use client';

import { motion } from 'framer-motion';

export default function FilmmakingHero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0B0D12]">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 select-none bg-[#0a0a0d]">
                <video
                    key="filmmaking-hero-v2"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/compressed_videos/filmmaking-hero-v2.mp4" type="video/mp4" />
                </video>
                {/* Cinematic Overlay - Darkened for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-black/40 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-[#0B0D12]/20" /> {/* General tint */}
            </div>

            {/* Positioning badge - top center */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="px-5 py-1.5 rounded-full border border-white/15 bg-black/30 text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase backdrop-blur-sm whitespace-nowrap">
                    Genreline as Infrastructure
                </div>
            </motion.div>

            {/* Content Anchored Bottom Left - No Grid / Immersion */}
            <div className="absolute bottom-20 left-6 md:bottom-32 md:left-20 z-10 max-w-2xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6"
                >
                    AI-NATIVE<br />
                    FILM, TV,<br />
                    COMMERCIAL,<br />
                    MUSIC VIDEO
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 1, ease: 'easeOut' }}
                    className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-[#2D6BFF] mb-8"
                >
                    BUILT FOR SCALE, SPEED, & CONTROL
                </motion.p>

                <div className="flex flex-col gap-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                        className="text-lg md:text-xl text-gray-300 font-light italic leading-relaxed max-w-lg"
                    >
                        An AI-native production system delivering broadcast-grade film without physical shoot constraints — compressed timelines, full creative control.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
