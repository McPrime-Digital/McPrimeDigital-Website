'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Zap, Shield, Eye, Database } from 'lucide-react';

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

            {/* Top Section: Split Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left Column: Know Our Story */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-serif">Know Our <span className="text-indigo-500">Story</span></h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        We started as a small team of filmmakers and developers who realized that the future of creativity wasn't just human—it was hybrid.
                        By combining cinematic storytelling with algorithmic precision, we unlocked a new era of digital expression.
                    </p>
                    <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-6 relative overflow-hidden group hover:bg-amber-500/10 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-amber-400 mb-3 font-serif">True Partnership Means Alignment, Not Just Service.</h3>
                        <p className="text-gray-400 italic">
                            "We align our systems with your business objectives so every initiative is tied to measurable outcomes. We build for performance, and shared results drive sustained growth."
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Built for Standards */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8"
                >
                    {/* Spacer removed for alignment */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Built for Standards, Not Shortcuts</h3>
                        <p className="text-gray-400 leading-relaxed mb-4 text-lg">
                            We do not operate as a traditional agency. We build structured systems for commercial filmmaking and business automation designed to perform under real operational pressure.
                        </p>
                        <p className="text-white font-medium text-lg">
                            Our work is defined by discipline, precision, and measurable execution.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                        <p className="text-gray-300 italic mb-4">
                            "We are chosen by organizations that value structured execution, measurable performance, and long-term scalability over short-term activity."
                        </p>
                        <p className="text-indigo-400 font-bold tracking-wide">
                            Where creativity meets intelligence, growth becomes engineered.
                        </p>
                    </div>
                </motion.div>
            </div>

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

                {/* Horizontal Accordion Container - Perspective Wrapper */}
                <div className="w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center md:px-0 perspective-[800px] overflow-hidden">
                    <WhyChooseUsVault />
                </div>
            </div>
        </section>
    );
}

// --- SUB-COMPONENT: Replicated Vault Logic ---
function WhyChooseUsVault() {
    // Default to index 2 open
    const [activeIndex, setActiveIndex] = useState<number | null>(2);

    return (
        <div className="flex gap-4 h-full w-full px-4 overflow-visible">
            {features.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                    <motion.div
                        key={item.id}
                        onHoverStart={() => setActiveIndex(i)}
                        onClick={() => setActiveIndex(i)}
                        className="relative h-full cursor-pointer group rounded-3xl overflow-hidden min-w-[60px] md:min-w-[80px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        animate={{
                            flex: isActive ? 2 : 1, // More dramatic size difference
                            y: isActive ? -10 : 0, // Lift active card
                        }}
                    >
                        {/* Continuous Floating Animation Wrapper */}
                        <motion.div
                            className="w-full h-full relative"
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 4 + i, // Staggered float duration
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        >
                            {/* --- GLASS SURFACE --- */}
                            {/* Removed rigid border, added gradient glow via shadow and internal gradient */}
                            <div className={`absolute inset-0 rounded-3xl backdrop-blur-xl transition-all duration-500
                                ${isActive
                                    ? 'bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_50px_-10px_rgba(45,107,255,0.3)]'
                                    : 'bg-white/5 hover:bg-white/10'
                                }`
                            }>
                                {/* Subtle Gradient Border (Top/Left light source) */}
                                <div className="absolute inset-0 rounded-3xl border border-white/10 opacity-50 pointer-events-none" />
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>

                            {/* --- CONTENT --- */}
                            <div className="relative z-10 w-full h-full flex flex-col p-2 md:p-4">

                                {/* Top Image Area (Only visible on open) */}
                                <div className="relative w-full overflow-hidden rounded-2xl flex-shrink-0 transition-all duration-500"
                                    style={{ height: isActive ? "45%" : "0%", opacity: isActive ? 1 : 0 }}
                                >
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="w-full h-full relative overflow-hidden rounded-2xl bg-black/20"
                                        >
                                            {/* Live & Free - Animated Gradient Orb */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D6BFF]/20" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#2D6BFF]/30 rounded-full blur-[60px] animate-pulse" />

                                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                <div className="relative group-hover:scale-110 transition-transform duration-700">
                                                    <div className="absolute inset-0 bg-[#2D6BFF]/40 blur-xl rounded-full" />
                                                    <item.icon className="relative z-10 w-16 h-16 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Text Content Area */}
                                <div className="flex-1 flex flex-col justify-end relative overflow-hidden mt-4">
                                    {/* ID Number - Floating Background Element */}
                                    <div className={`absolute top-0 right-0 text-6xl font-black transition-all duration-500 select-none pointer-events-none
                                        ${isActive ? 'text-white/10 translate-y-0 rotate-0' : 'text-white/5 translate-y-8 rotate-90 origin-bottom-right'}`}>
                                        {item.id}
                                    </div>

                                    {/* Collapsed Title - Vertical */}
                                    {!isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <h3 className="text-white/50 text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap -rotate-90">
                                                {item.title.split(' ')[0]}...
                                            </h3>
                                        </div>
                                    )}

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ delay: 0.1 }}
                                                className="relative z-10 space-y-4 p-2"
                                            >
                                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                                    {item.title}
                                                </h3>
                                                <div className="w-12 h-1 bg-[#2D6BFF]/80 rounded-full" />
                                                <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                                                    {item.content}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}
