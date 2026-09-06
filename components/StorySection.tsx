'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Zap, Shield, Eye, Database, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA ---
const features = [
    {
        id: "01",
        title: "Infrastructure, Not Temporary Campaigns",
        content: "Every engagement is built on structured frameworks. Whether producing AI-native commercial films or implementing automation systems, we prioritize repeatable architecture over one-off output. This ensures consistency, scalability, and operational clarity.",
        icon: Database
    },
    {
        id: "02",
        title: "Speed Without Compromising Control",
        content: "Acceleration means nothing without structure. Our workflows are engineered for rapid turnaround while maintaining defined quality standards, version control, and measurable performance alignment.",
        icon: Zap
    },
    {
        id: "03",
        title: "Precision in Regulated and Complex Environments",
        content: "We operate in industries where compliance, accountability, and accuracy are non-negotiable. Our systems are structured to support oversight, documentation, and performance visibility from the outset.",
        icon: Shield
    },
    {
        id: "04",
        title: "Complete Operational Transparency",
        content: "Clients maintain direct visibility into timelines, deliverables, and performance data. There are no opaque processes or disconnected reporting layers. Execution remains accountable and traceable.",
        icon: Eye
    },
    {
        id: "05",
        title: "Focused Capability",
        content: "We do not dilute our expertise across unnecessary service lines. Our specialization in AI commercial filmmaking and automation infrastructure allows us to operate with depth rather than breadth.",
        icon: Check
    }
];

export default function StorySection() {
    return (
        <section className="flex flex-col gap-24 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] -z-10 rounded-full" />

            {/* Top Section: Story Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-8 md:p-14 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/20 via-black/40 to-black/60 backdrop-blur-md border border-indigo-500/10 overflow-hidden"
            >
                {/* Indigo atmosphere */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-[2.5rem]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left: Know Our Story */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif">Know Our <span className="text-indigo-500">Story</span></h2>
                        <div className="w-12 h-1 bg-indigo-500/60 rounded-full" />
                        <p className="text-gray-300 text-lg leading-relaxed">
                            We started as a small team of filmmakers and developers who realized that the future of creativity wasn't just human—it was hybrid.
                            By combining cinematic storytelling with algorithmic precision, we unlocked a new era of digital expression.
                        </p>
                    </div>

                    {/* Right: Chosen By */}
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/15 relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                        <p className="text-gray-300 italic mb-4 text-lg leading-relaxed">
                            "We are chosen by organizations that value structured execution, measurable performance, and long-term scalability over short-term activity."
                        </p>
                        <p className="text-indigo-400 font-bold tracking-wide">
                            Where creativity meets intelligence, growth becomes engineered.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Section: Why Choose Us - Cinematic Vault Style */}
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-3xl font-bold font-mono uppercase tracking-widest text-[#2D6BFF] inline-block relative">
                        Why Choose Us
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#2D6BFF] rounded-full" />
                    </h3>
                </motion.div>

                {/* Desktop Version - Horizontal Accordion Container */}
                <div className="hidden md:flex w-full max-w-6xl mx-auto h-[500px] items-center justify-center md:px-0 overflow-hidden">
                    <WhyChooseUsVault />
                </div>

                {/* Mobile Version - 3D Swipe Carousel */}
                <div className="flex md:hidden w-full h-[520px] items-center justify-center perspective-[800px] overflow-visible px-2">
                    <WhyChooseUsMobileCarousel />
                </div>
            </div>
        </section>
    );
}

// --- SUB-COMPONENT: Expanding Vault (enterprise spec) ---
function WhyChooseUsVault() {
    // Default to index 2 open
    const [activeIndex, setActiveIndex] = useState<number>(2);

    return (
        <div className="flex gap-3 h-full w-full">
            {features.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                    <motion.div
                        key={item.id}
                        onHoverStart={() => setActiveIndex(i)}
                        onClick={() => setActiveIndex(i)}
                        animate={{ flexGrow: isActive ? 3.4 : 1 }}
                        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                        style={{ flexBasis: 0 }}
                        className={`relative h-full min-w-[68px] cursor-pointer overflow-hidden rounded-2xl border transition-[border-color,box-shadow,background-color] duration-500
                            ${isActive
                                ? 'border-[#2D6BFF]/40 bg-gradient-to-b from-[#0E1526] to-[#080B12] shadow-[0_24px_60px_-20px_rgba(45,107,255,0.35)]'
                                : 'border-white/[0.08] bg-[#0A0E16] hover:border-white/20 hover:bg-[#0C1019]'
                            }`}
                    >
                        {/* Top light edge */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                        {/* Collapsed state: number / vertical title / icon */}
                        {!isActive && (
                            <div className="absolute inset-0 flex flex-col items-center justify-between py-6">
                                <span className="text-[11px] font-mono text-white/30 tracking-widest">{item.id}</span>
                                <h3
                                    className="text-white/45 text-[11px] font-bold tracking-[0.28em] uppercase whitespace-nowrap"
                                    style={{ writingMode: 'vertical-rl' }}
                                >
                                    {item.title}
                                </h3>
                                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                                    <item.icon className="w-4 h-4 text-white/50" />
                                </div>
                            </div>
                        )}

                        {/* Expanded state */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.18 }}
                                    className="absolute inset-0 flex flex-col p-8 md:p-10"
                                >
                                    {/* Accent atmosphere */}
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2D6BFF]/10 rounded-full blur-[80px] pointer-events-none" />

                                    <div className="flex items-start justify-between mb-auto relative z-10" style={{ minWidth: 300 }}>
                                        <div className="w-12 h-12 rounded-xl bg-[#2D6BFF]/15 border border-[#2D6BFF]/30 flex items-center justify-center shadow-[0_0_24px_rgba(45,107,255,0.2)]">
                                            <item.icon className="w-6 h-6 text-[#2D6BFF]" />
                                        </div>
                                        <span className="text-6xl font-black text-white/[0.07] select-none leading-none pointer-events-none">{item.id}</span>
                                    </div>

                                    <div className="space-y-5 relative z-10" style={{ minWidth: 300 }}>
                                        <span className="text-[10px] font-mono tracking-[0.28em] text-[#2D6BFF]/80 uppercase block">
                                            {item.id} / 0{features.length}
                                        </span>
                                        <h3 className="text-2xl md:text-[1.7rem] font-bold text-white leading-tight max-w-md">
                                            {item.title}
                                        </h3>
                                        <div className="w-12 h-1 bg-[#2D6BFF] rounded-full" />
                                        <p className="text-gray-400 text-[15px] leading-relaxed max-w-lg">
                                            {item.content}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}

// --- SUB-COMPONENT: Mobile 3D Swipe Carousel ---
function WhyChooseUsMobileCarousel() {
    const [activeIndex, setActiveIndex] = useState<number>(2);

    const handleNext = () => setActiveIndex((prev) => Math.min(features.length - 1, prev + 1));
    const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));

    // Simple swipe detection using Framer Motion drag end
    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x < -50) handleNext();
        if (info.offset.x > 50) handlePrev();
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Carousel Track */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-visible">
                <AnimatePresence initial={false}>
                    {features.map((item, i) => {
                        const offset = i - activeIndex;
                        const isCenter = offset === 0;
                        if (Math.abs(offset) > 2) return null; // Render only nearby items

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute h-[90%] w-[75%] max-w-[300px] cursor-pointer rounded-3xl overflow-hidden"
                                initial={false}
                                animate={{
                                    x: offset * 72, // Horizontal shift for side panels
                                    scale: isCenter ? 1 : 0.88,
                                    zIndex: 10 - Math.abs(offset),
                                    opacity: Math.abs(offset) >= 2 ? 0 : isCenter ? 1 : 0.5,
                                    rotateY: offset * -8, // Restrained 3D angle
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 32 }}
                                onClick={() => setActiveIndex(i)}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                            >
                                {/* Glass Surface Details */}
                                <div className={`absolute inset-0 rounded-3xl backdrop-blur-xl transition-all duration-500
                                    ${isCenter
                                        ? 'bg-gradient-to-b from-[#0E1526] to-[#080B12] shadow-[0_24px_60px_-20px_rgba(45,107,255,0.4)] border border-[#2D6BFF]/40'
                                        : 'bg-[#0A0E16] border border-white/[0.08]'
                                    }`
                                }>
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                                </div>

                                {/* Inner Content */}
                                <div className="relative z-10 w-full h-full flex flex-col p-5">
                                    {isCenter ? (
                                        // Active/Center Panel - Full Info
                                        <div className="flex-1 flex flex-col relative h-full">
                                            {/* ID Float */}
                                            <div className="absolute top-0 right-0 text-5xl font-black text-white/5 pointer-events-none select-none">
                                                {item.id}
                                            </div>

                                            {/* Icon */}
                                            <div className="mb-4 mt-2">
                                                <div className="w-12 h-12 rounded-full bg-[#2D6BFF]/20 flex items-center justify-center">
                                                    <item.icon className="w-6 h-6 text-[#2D6BFF]" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white leading-tight mb-3 pr-8">
                                                {item.title}
                                            </h3>
                                            <div className="w-8 h-1 bg-[#2D6BFF] rounded-full mb-4 shrink-0" />

                                            {/* Scrollable text area if content is too long on very small screens */}
                                            <div className="flex-1 overflow-y-auto pr-1 pb-4">
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        // Inactive Side Panels - Collapsed
                                        <div className="flex-1 flex flex-col items-center justify-center opacity-60">
                                            <item.icon className="w-8 h-8 text-white mb-6" />
                                            <h3 className="text-white/80 text-xs font-bold tracking-[0.1em] uppercase text-center -rotate-90 origin-center whitespace-nowrap translate-y-8">
                                                {item.title.substring(0, 15)}...
                                            </h3>
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
                    {features.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#2D6BFF]' : 'w-1.5 bg-white/20'}`} />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className={`p-3 rounded-full border transition-all ${activeIndex === features.length - 1 ? 'bg-transparent border-white/5 text-white/20' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}`}
                    disabled={activeIndex === features.length - 1}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
