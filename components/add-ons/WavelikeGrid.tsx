'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function WavelikeGrid() {
    // Grid configuration
    const rows = 15;
    const cols = 20;
    const gridItems = Array.from({ length: rows * cols }, (_, i) => i);

    return (
        <div className="absolute inset-0 overflow-hidden perspective-1000 -z-10">
            {/* Dark Base */}
            <div className="absolute inset-0 bg-[#050608]" />

            {/* Grid Container */}
            <div
                className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 opacity-20 transform-gpu"
                style={{ transform: 'rotateX(60deg) scale(1.5) translateY(-20%)' }}
            >
                {gridItems.map((i) => (
                    <Square key={i} />
                ))}
            </div>

            {/* Faint Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,107,255,0.05),transparent_70%)] pointer-events-none" />
        </div>
    );
}

function Square() {
    const controls = useAnimation();

    // Interactive hover effect
    const handleMouseEnter = () => {
        controls.start({
            scale: 0.8,
            backgroundColor: "rgba(45, 107, 255, 0.4)",
            boxShadow: "0 0 15px rgba(45, 107, 255, 0.6)",
            transition: { duration: 0.2 }
        });
    };

    const handleMouseLeave = () => {
        controls.start({
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "none",
            transition: { duration: 1, ease: "easeOut" }
        });
    };

    return (
        <motion.div
            className="w-12 h-12 bg-white/[0.05] border border-white/[0.02] rounded-md backdrop-blur-sm"
            initial={{ scale: 1, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            animate={controls}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ zIndex: 10 }}
        />
    );
}
