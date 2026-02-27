'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    FileText, Image as ImageIcon, Layers, Film, Globe,
    Zap, TrendingDown, RefreshCw, Box, ShieldCheck, Target, ChevronLeft, ChevronRight
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
            <div className="relative w-full h-full flex flex-col items-center justify-end md:justify-end pb-10 md:pb-20 z-10 pt-32 md:pt-0">
                {/* Full Screen Blurred Background for Readability - Reduced opacity */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md -z-10" />

                {/* Header - Adjusted for mobile overlap */}
                <div className="absolute top-8 md:top-12 left-0 right-0 text-center z-20 pointer-events-none px-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight leading-tight">
                        CAPABILITIES THAT DRIVE<br className="hidden md:block" /><span className="text-[#2D6BFF]"> MEASURABLE PERFORMANCE</span>
                    </h2>
                    <p className="text-gray-400 text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mt-2 md:mt-0">Core Capabilities</p>
                </div>

                {/* Desktop Version */}
                <div className="hidden md:flex w-full h-[70vh] items-center justify-center px-4 md:px-12 perspective-[2000px]">
                    <BookPanelSystem />
                </div>

                {/* Mobile Version - 3D Swipe Carousel */}
                <div className="flex md:hidden w-full h-[60vh] items-center justify-center perspective-[2000px] px-2 overflow-visible mt-auto mb-4">
                    <BookPanelMobileCarousel />
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

// --- SUB-COMPONENT: Mobile 3D Swipe Carousel for Book Panels ---
function BookPanelMobileCarousel() {
    // Default to index 2
    const [activeIndex, setActiveIndex] = useState<number>(2);

    const handleNext = () => setActiveIndex((prev) => Math.min(capabilities.length - 1, prev + 1));
    const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));

    // Simple swipe detection using Framer Motion drag end
    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x < -40) handleNext();
        if (info.offset.x > 40) handlePrev();
    };

    return (
        <div className="w-full h-full flex flex-col pt-4">
            {/* Carousel Track */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-visible">
                <AnimatePresence initial={false}>
                    {capabilities.map((cap, i) => {
                        const offset = i - activeIndex;
                        const isCenter = offset === 0;
                        if (Math.abs(offset) > 2) return null; // Render only nearby items

                        return (
                            <motion.div
                                key={cap.id}
                                className="absolute h-full w-[75%] max-w-[300px] cursor-pointer rounded-2xl overflow-hidden"
                                initial={false}
                                animate={{
                                    x: offset * 80, // Horizontal shift
                                    scale: isCenter ? 1 : 0.85,
                                    zIndex: 10 - Math.abs(offset),
                                    opacity: Math.abs(offset) >= 2 ? 0 : isCenter ? 1 : 0.6,
                                    rotateY: offset * -15, // Light 3D angle
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => setActiveIndex(i)}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                            >
                                {/* Transparent Liquid Glass Material */}
                                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent opacity-50 pointer-events-none rounded-2xl" />
                                </div>

                                {/* Inner Content */}
                                <div className="relative z-10 w-full h-full flex flex-col">
                                    {isCenter ? (
                                        // Active/Center Panel - Full Info
                                        <>
                                            <div className="w-full h-[45%] relative overflow-hidden rounded-t-2xl border-b border-white/10 shrink-0">
                                                <img
                                                    src={cap.img}
                                                    alt={cap.title}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                                <div className="absolute top-4 left-4 text-[#2D6BFF] drop-shadow-md">
                                                    <cap.icon size={24} />
                                                </div>
                                            </div>
                                            <div className="flex-1 p-5 flex flex-col bg-black/40 overflow-y-auto">
                                                <div className="text-3xl font-mono font-bold text-[#2D6BFF] mb-2">{cap.id}</div>
                                                <h3 className="text-lg font-bold text-white leading-tight mb-3">
                                                    {cap.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-[#2D6BFF] pl-4 mb-2">
                                                    {cap.desc}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        // Inactive Side Panels - Collapsed
                                        <div className="flex-1 flex flex-col items-center justify-center opacity-60 px-2 py-4">
                                            <div className="text-3xl font-mono font-bold text-white/20 mb-4">{cap.id}</div>
                                            <cap.icon size={24} className="text-white/50 mb-auto" />
                                            <div className="relative h-32 w-full mt-auto mb-10">
                                                <h3 className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap -rotate-90 origin-bottom">
                                                    {cap.title.substring(0, 18)}...
                                                </h3>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Pagination / Arrows */}
            <div className="mt-8 flex items-center justify-center gap-6">
                <button
                    onClick={handlePrev}
                    className={`p-3 rounded-full border transition-all ${activeIndex === 0 ? 'bg-transparent border-white/5 text-white/20' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}`}
                    disabled={activeIndex === 0}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                    {capabilities.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#2D6BFF]' : 'w-1.5 bg-white/20'}`} />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className={`p-3 rounded-full border transition-all ${activeIndex === capabilities.length - 1 ? 'bg-transparent border-white/5 text-white/20' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}`}
                    disabled={activeIndex === capabilities.length - 1}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
