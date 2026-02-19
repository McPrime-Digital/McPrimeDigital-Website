'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export default function ReactiveMesh() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize coordinates -1 to 1
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Dynamic background gradients that move in opposition to mouse
    const bgX = useSpring(mouseX, { ...springConfig, stiffness: 50 });
    const bgY = useSpring(mouseY, { ...springConfig, stiffness: 50 });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base Deep Space */}
            <div className="absolute inset-0 bg-[#050608]" />

            {/* Moving Gradient Orbs */}
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen"
                style={{
                    x: useMotionTemplate`calc(${bgX} * -50px)`,
                    y: useMotionTemplate`calc(${bgY} * -50px)`,
                }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-purple-900/15 blur-[100px] mix-blend-screen"
                style={{
                    x: useMotionTemplate`calc(${bgX} * 80px)`,
                    y: useMotionTemplate`calc(${bgY} * 80px)`,
                }}
            />
            <motion.div
                className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[90px] mix-blend-screen"
                style={{
                    x: useMotionTemplate`calc(${bgX} * -30px)`,
                    y: useMotionTemplate`calc(${bgY} * 60px)`,
                }}
            />

            {/* Mesh Overlay - SVG Pattern */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient-vignette opacity-80" />
        </div>
    );
}
