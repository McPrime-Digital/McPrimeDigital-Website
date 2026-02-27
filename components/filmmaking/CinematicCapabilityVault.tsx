'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    FileText, Image as ImageIcon, Layers, Film, Globe,
    Zap, TrendingDown, RefreshCw, Box, ShieldCheck, Target
} from 'lucide-react';

// --- DATA ---
const capabilities = [
    {
        id: "01",
        title: "AI-Assisted Script Development",
        desc: "Structured narrative design, iterative refinement, and scalable concept validation.",
        icon: FileText,
        img: "/filmmaking/ai-script.png"
    },
    {
        id: "02",
        title: "Advanced Image & Video Generation",
        desc: "High-resolution scene creation with controlled visual consistency and cinematic composition.",
        icon: ImageIcon,
        img: "/filmmaking/gen-ai.png"
    },
    {
        id: "03",
        title: "Digital Compositing & Enhancement",
        desc: "Blending generated visuals with real assets where needed for realism and depth.",
        icon: Layers,
        img: "/filmmaking/compositing.png"
    },
    {
        id: "04",
        title: "Cinematic Post-Production",
        desc: "Editing, sound design, custom music scoring, and color grading executed at professional standards.",
        icon: Film,
        img: "/filmmaking/post-production.png"
    },
    {
        id: "05",
        title: "Multi-Platform Commercial Structuring",
        desc: "Assets formatted for paid media, web, broadcast, and campaign variations.",
        icon: Globe,
        img: "/filmmaking/commercial-dist.png"
    }
];

const impactPoints = [
    { title: "Faster Turnaround", desc: "No physical logistics", icon: Zap, x: 10, y: 50 },
    { title: "Reduced Overhead", desc: "Digital-first production", icon: TrendingDown, x: 25, y: 30 },
    { title: "Iteration Speed", desc: "Real-time refinement", icon: RefreshCw, x: 40, y: 60 },
    { title: "Scalable Output", desc: "Unlimited variations", icon: Box, x: 60, y: 40 },
    { title: "Visual Control", desc: "Consistent branding", icon: ShieldCheck, x: 75, y: 70 },
    { title: "Deployment Ready", desc: "Measurable impact", icon: Target, x: 90, y: 50 },
];

export default function CinematicCapabilityVault() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Phase Transition: 0 -> 1 as we scroll
    const phaseOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 0, 0]);
    const timelineOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
    const timelineScale = useTransform(scrollYProgress, [0.4, 1], [0.8, 1]);

    return (
        <section ref={containerRef} className="relative h-screen bg-black overflow-hidden border-b border-white/10">
            {/* --- GLOBAL BACKGROUND: Liquid Water --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.img
                    src="/filmmaking/watersplash.jpeg"
                    alt="Liquid Background"
                    className="w-full h-full object-cover opacity-60"
                    style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "5%"]) }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                {/* Dust Particles */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
            </div>

            {/* --- CORE CAPABILITIES --- */}
            <div className="relative w-full h-full flex flex-col items-center justify-end pb-20 z-10">
                {/* Full Screen Blurred Background for Readability - Reduced opacity */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md -z-10" />

                {/* Header */}
                <div className="absolute top-12 left-0 right-0 text-center z-20 pointer-events-none">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        CAPABILITIES THAT DRIVE<br /><span className="text-[#2D6BFF]">MEASURABLE PERFORMANCE</span>
                    </h2>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">Core Capabilities</p>
                </div>

                {/* Book Panels Container */}
                <div className="w-full h-[70vh] flex items-center justify-center px-4 md:px-12 perspective-[2000px]">
                    <BookPanelSystem />
                </div>
            </div>

        </section>
    );
}

// --- SUB-COMPONENT: Liquid Glass Book Panels ---
function BookPanelSystem() {
    // Default to index 2 (Capability #3) open
    const [activeIndex, setActiveIndex] = useState<number | null>(2);

    return (
        <div className="flex gap-4 h-full w-full max-w-7xl">
            {capabilities.map((cap, i) => {
                const isActive = activeIndex === i;

                return (
                    <motion.div
                        key={cap.id}
                        onHoverStart={() => setActiveIndex(i)}
                        onClick={() => setActiveIndex(i)}
                        // Removed onHoverEnd to maintain state until another is hovered
                        className="relative h-full cursor-pointer group rounded-2xl overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{
                            flex: isActive ? 2.5 : 1, // Flex grow ratio
                            transform: isActive
                                ? "perspective(1000px) rotateY(0deg) translateZ(50px)"
                                : "perspective(1000px) rotateY(10deg) translateZ(0px)",
                            zIndex: isActive ? 50 : 1
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* 80% Transparent Liquid Glass Material */}
                        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] group-hover:bg-white/[0.08] group-hover:border-white/[0.2] transition-all duration-500">

                            {/* Inner Glass Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent opacity-50 pointer-events-none rounded-2xl" />

                            {/* --- CONTENT --- */}
                            <div className="relative z-10 w-full h-full flex flex-col">

                                {/* Top Image Area (Only visible on open) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "45%" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="w-full relative overflow-hidden rounded-t-2xl border-b border-white/10"
                                        >
                                            <img
                                                src={cap.img}
                                                alt={cap.title}
                                                className="w-full h-full object-cover object-center"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Text Content Area */}
                                <div className={`flex-1 p-6 flex flex-col justify-between ${isActive ? 'bg-black/40' : ''} transition-colors duration-500`}>

                                    {/* Header / Vertical Text */}
                                    <div className="relative h-full">
                                        {/* Number */}
                                        <div className={`text-4xl font-mono font-bold transition-all duration-300 ${isActive ? 'text-[#2D6BFF]' : 'text-white/20'}`}>
                                            {cap.id}
                                        </div>

                                        {/* Collapsed Title */}
                                        {!isActive && (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <h3 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap -rotate-90">
                                                    {cap.title.substring(0, 20)}...
                                                </h3>
                                            </div>
                                        )}

                                        {/* Expanded Title & Desc */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="mt-4 space-y-4"
                                                >
                                                    <h3 className="text-xl font-bold text-white leading-tight">
                                                        {cap.title}
                                                    </h3>
                                                    <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-[#2D6BFF] pl-4">
                                                        {cap.desc}
                                                    </p>

                                                    {/* Active Indicator Icon */}
                                                    <div className="pt-4 text-[#2D6BFF] opacity-80">
                                                        <cap.icon size={28} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
