'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function PremiumCard({ children, className = "", onClick }: PremiumCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    // Tilt Effect
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    // Glare Effect
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative group cursor-pointer ${className}`}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative z-10 w-full h-full"
            >
                {children}
            </div>

            {/* Glass Border & Background */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"></div>

            {/* Radial Glare */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: useTransform(
                        [glareX, glareY],
                        ([latestX, latestY]) => `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(255,255,255,0.15), transparent 60%)`
                    ),
                }}
            />
        </motion.div>
    );
}
