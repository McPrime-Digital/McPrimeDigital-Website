'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, BrainCircuit, Code2, Rocket, ArrowRight } from 'lucide-react';

export default function BlueprintSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Atmosphere - Deep Brown/Amber Glow */}
            <div className="absolute inset-0 bg-[#050201]">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 text-white">
                {/* Section Header */}
                <div className="mb-20 max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-500 font-mono tracking-[0.2em] mb-4 text-sm uppercase"
                    >
                        Our Blueprint Approach
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} // transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-500"
                    >
                        Structured Execution Begins With Understanding
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} // transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-amber-100/60 leading-relaxed max-w-2xl font-light"
                    >
                        We do not deploy solutions before understanding the operational reality of your business. Every engagement follows a defined progression designed to reduce assumptions and increase precision.
                    </motion.p>
                </div>

                {/* Vertical Panels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    {/* Connecting Lightline Fiber (Desktop) */}
                    <div className="hidden md:block absolute top-[120px] left-0 right-0 h-[2px] bg-amber-900/30 z-0">
                        <motion.div
                            className="h-full w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50 blur-[2px]"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>

                    <StepPanel
                        number="01"
                        title="Audit & Identify"
                        icon={Search}
                        content="We conduct a structured audit of your current production processes, automation systems, performance data, and operational bottlenecks. This phase identifies inefficiencies, constraints, and opportunity gaps."
                        tagline="No implementation begins without clarity."
                        imageColor="amber"
                    />
                    <StepPanel
                        number="02"
                        title="Education & Strategy"
                        icon={BrainCircuit}
                        content="We align with leadership and internal teams to define objectives, performance metrics, and structural priorities. This stage ensures shared understanding of scope, expectations, compliance considerations, and measurable outcomes."
                        tagline="Strategy is documented before execution."
                        imageColor="yellow"
                    />
                    <StepPanel
                        number="03"
                        title="Custom Dev & Testing"
                        icon={Code2}
                        content="Solutions are developed specifically for your operational context. In filmmaking, this includes structured creative architecture and iteration frameworks. In automation, this involves workflow engineering, integration testing, and performance validation."
                        tagline="Controlled testing ensures reliability before scale."
                        imageColor="orange"
                    />
                    <StepPanel
                        number="04"
                        title="Implementation & Delivery"
                        icon={Rocket}
                        content="Once validated, systems are deployed with defined timelines, accountability structures, and measurable tracking. Assets and workflows are delivered in operational-ready formats."
                        tagline="Execution remains transparent, documented, performance-aligned."
                        imageColor="amber"
                    />
                </div>

                {/* Closing Position */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-950/40 to-black border border-amber-500/10 backdrop-blur-xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent skew-x-12 opacity-50" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            {/* Header Removed */}
                            <p className="text-amber-200/60 leading-relaxed max-w-3xl">
                                Our approach prioritizes precision over speed and structure over assumption. By following a disciplined process, we reduce inefficiency and deliver scalable results that operate beyond a single campaign cycle.
                            </p>
                        </div>
                        {/* Interactive decorative element */}
                        <div className="hidden md:block w-24 h-24 relative">
                            <div className="absolute inset-0 border border-amber-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-2 border border-amber-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute inset-[40%] bg-amber-500 rounded-full blur-md animate-pulse" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StepPanel({ number, title, icon: Icon, content, tagline, imageColor }: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-full"
        >
            {/* Connection Node on Lightline */}
            <div className="hidden md:flex absolute top-[120px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050201] border-2 border-amber-500/50 rounded-full z-20 items-center justify-center transition-all duration-500 group-hover:scale-150 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Lit Brown Liquid Glass Card */}
            <div className={`
                relative h-full p-8 pt-12 rounded-[2rem] 
                bg-gradient-to-b from-amber-950/20 via-black/40 to-black/60
                backdrop-blur-md border border-amber-500/10 
                transition-all duration-500 ease-out
                hover:border-amber-500/30 hover:bg-amber-900/10 hover:shadow-[0_20px_40px_-10px_rgba(66,32,6,0.3)]
                flex flex-col
            `}>
                {/* Inner Glow Polish */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-[2rem]" />

                {/* Reactive Image Module (Icon Placeholder) */}
                <div className="mb-12 relative flex justify-center">
                    <div className="relative w-24 h-24">
                        {/* Glow Behind */}
                        <div className={`absolute inset-0 bg-${imageColor}-500/20 rounded-full blur-xl transition-all duration-500 group-hover:bg-${imageColor}-500/40 group-hover:blur-2xl`} />

                        {/* Glass Icon Container */}
                        <div className={`
                            relative w-full h-full rounded-2xl 
                            bg-gradient-to-br from-white/10 to-white/0 
                            border border-white/10 backdrop-blur-md
                            flex items-center justify-center
                            shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
                            transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3
                        `}>
                            <Icon className="w-10 h-10 text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

                            {/* Fluid Reflection Highligth */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />
                        </div>
                    </div>
                    {/* Number Behind */}
                    <div className="absolute -top-6 -right-2 text-8xl font-serif font-bold text-amber-950/30 pointer-events-none select-none group-hover:text-amber-900/20 transition-colors">
                        {number}
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                    <h4 className="text-2xl font-bold font-serif text-amber-100 mb-6 group-hover:text-white transition-colors">
                        {title}
                    </h4>
                    <div className="w-12 h-[2px] bg-amber-800/50 mb-6 group-hover:w-full group-hover:bg-amber-500/50 transition-all duration-700 ease-in-out" />
                    <p className="text-amber-200/50 text-sm leading-relaxed mb-8 group-hover:text-amber-100/70 transition-colors">
                        {content}
                    </p>
                </div>

                {/* Tagline */}
                <div className="mt-auto pt-6 border-t border-amber-900/30">
                    <p className="text-xs font-mono text-amber-500/80 uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                        {tagline}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
