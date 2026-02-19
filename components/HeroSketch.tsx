'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from './ui/Button';
import { Player } from '@remotion/player';
import { HeroLoop } from '../remotion/HeroLoop';

export default function HeroSketch() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    // Refs not needed for simple video

    // Video logic simplified - just standard HTML5 video tag


    const springConfig = { damping: 50, stiffness: 400 };
    // Reduced movement range for "classy" feel
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXPct = (e.clientX - rect.left) / width - 0.5;
            const mouseYPct = (e.clientY - rect.top) / height - 0.5;
            mouseX.set(mouseXPct);
            mouseY.set(mouseYPct);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[90vh] w-full flex flex-col items-center mb-32 overflow-hidden" // Full width container
        >
            {/* Background Video Layer - Full Width */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    key="homepage-hero-final"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                >
                    <source src="/homepage-hero-final.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-10" />
            </div>

            {/* Content Wrapper - Constrained Width */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center pt-10">
                {/* Top Row: Logo - AI - About */}
                <div className="flex justify-center items-center w-full mb-12 relative z-20">
                    {/* Logo Image - Absolute Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-0 flex items-center"
                    >
                        <img src="/logo.png" alt="McPrime Digital" className="h-10 w-auto" />
                    </motion.div>

                    {/* Central AI Node - Video with Mask and Glass Effect */}
                    <motion.div
                        style={{ x, y }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative z-50 group"
                    >
                        {/* Glass Circle Container - Reduced Size */}
                        <div className="w-[200px] h-[200px] flex items-center justify-center relative rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <video
                                src="/Hero Robot.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-80 mix-blend-screen"
                            />
                        </div>
                    </motion.div>

                    {/* About Button - Absolute Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute right-0"
                    >
                        <a href="/about">
                            <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">ABOUT</Button>
                        </a>
                    </motion.div>
                </div>

                {/* Connection Lines (Desktop) - Merging Logic */}
                <div className="hidden md:block relative w-full h-32 mb-6 -mt-20 z-0">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        {/* 
                       Logic: 
                       AI is TOP CENTER.
                       Branches are BOTTOM (20%, 50%, 80%).
                       "Join together above automations to connect to AI"
                       
                       Path 1: Center Branch (50%, 100%) -> Goes Up to Join Point (50%, 20%) -> AI (50%, 0%)
                       Path 2: Left Branch (20%, 100%) -> Curves to Join Point (50%, 20%)
                       Path 3: Right Branch (80%, 100%) -> Curves to Join Point (50%, 20%)
                       
                       Note: AI visual bottom is roughly around y=0% in this SVG context (relative layout)
                    */}

                        {/* Left Branch to Intersection */}
                        <motion.path
                            d="M20% 100% C20% 60%, 50% 60%, 50% 20%"
                            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Right Branch to Intersection */}
                        <motion.path
                            d="M80% 100% C80% 60%, 50% 60%, 50% 20%"
                            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Center Branch to Intersection */}
                        <motion.line
                            x1="50%" y1="100%" x2="50%" y2="20%"
                            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Intersection to AI (Trunk) */}
                        <motion.line
                            x1="50%" y1="20%" x2="50%" y2="-20%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Reactive Pulses - Flowing UP towards AI */}
                        {/* <motion.circle r="3" fill="#22d3ee" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M20% 100% C20% 60%, 50% 60%, 50% 20%')" }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                    <motion.circle r="3" fill="#22d3ee" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M80% 100% C80% 60%, 50% 60%, 50% 20%')" }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} />
                    <motion.circle r="3" fill="#22d3ee" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M50% 100% L50% 20%')" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }} /> */}
                    </svg>
                </div>

                {/* Services Row - Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10 px-4 md:px-20 mb-20 md:-mt-8">
                    <ServiceBox title="FILMMAKING" delay={1.2} href="/filmmaking" />
                    <ServiceBox title="AUTOMATIONS" delay={1.4} isCenter href="/automations" />
                    <ServiceBox title="ADD-ONS" delay={1.6} href="/add-ons" />
                </div>

                {/* Hero Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="text-center max-w-6xl mx-auto relative z-20 md:-mt-8" // Adjusted spacing and centered
                >
                    <div className="inline-block mb-6 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm tracking-widest uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        The Future of Digital Excellence
                    </div>

                    {/* Headline: Strict 2-Line Layout */}
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight font-serif uppercase max-w-7xl mx-auto">
                        <span className="block mb-2 !font-serif whitespace-nowrap">
                            <span className="text-white">CRAFTING HIGH-END </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 !font-serif">
                                VISUAL STORYTELLING
                            </span>
                        </span>
                        <span className="block !font-serif whitespace-nowrap">
                            <span className="text-white">BUILDING ADVANCED </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 !font-serif">
                                AUTOMATION SYSTEMS
                            </span>
                        </span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed mb-8">
                        Built to rigorous production standards and designed for speed, our AI-driven infrastructure replaces manual processes with structured execution. The result is faster delivery, reduced errors, and scalable growth.
                    </p>
                </motion.div>
            </div>


            {/* Premium Gradient Transition to Next Section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-20" />
        </section>
    );
}

function ServiceBox({ title, delay, isCenter = false, href }: { title: string, delay: number, isCenter?: boolean, href?: string }) {
    const Content = () => (
        <>
            {/* Connector dot at top of box (where line connects) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" />

            <div className={`absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`} />
            <div className={`
                relative p-6 md:p-8 rounded-xl text-center border transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer
                ${isCenter
                    ? 'border-indigo-500/50 bg-indigo-950/20 text-white shadow-[0_0_30px_rgba(99,102,241,0.15)] shadow-indigo-500/20'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                }
            `}>
                <span className="text-sm md:text-base font-bold tracking-[0.2em]">{title}</span>
            </div>
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
            className="group relative"
        >
            {href ? (
                <a href={href} className="block h-full">
                    <Content />
                </a>
            ) : (
                <Content />
            )}
        </motion.div>
    );
}
