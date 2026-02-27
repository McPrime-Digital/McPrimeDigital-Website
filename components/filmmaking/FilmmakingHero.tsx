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

            {/* Content Anchored Bottom Left - No Grid / Immersion */}
            <div className="absolute bottom-20 left-6 md:bottom-32 md:left-20 z-10 max-w-2xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-8"
                >
                    AI COMMERCIAL<br />
                    FILMMAKING<br />
                    BUILT FOR<br />
                    SCALE, SPEED, & CONTROL
                </motion.h1>

                <div className="flex flex-col gap-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                        className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-lg"
                    >
                        We produce high-end commercial films through a fully AI-native production system. This structure eliminates physical shoot constraints and compresses timelines while maintaining precision and creative control.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
