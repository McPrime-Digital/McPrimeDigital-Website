'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
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
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0D14]">
                <video
                    key="homepage-hero-final"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                >
                    <source src="/compressed_videos/homepage-hero-final.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-10" />
            </div>

            {/* Content Wrapper - Constrained Width */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center pt-10">
                {/* Top Row: Logo - AI - About */}
                <div className="flex justify-center items-center w-full mb-8 md:mb-12 relative z-20">
                    {/* Logo Image - Absolute Left (Hidden on Mobile, handled by Navbar) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:flex absolute left-0 items-center"
                    >
                        <Image src="/logo.png" alt="McPrime Digital" width={160} height={40} priority className="h-10 w-auto" />
                    </motion.div>

                    {/* Central AI Node - Video with Mask and Glass Effect */}
                    <motion.div
                        style={{ x, y }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative z-50 group mt-16 md:mt-0"
                    >
                        {/* Glass Circle Container - Reduced Size */}
                        <div
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center relative rounded-full border border-white/10 bg-[#0B0F19] backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            style={{ isolation: 'isolate', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                        >
                            <video
                                src="/compressed_videos/Hero Robot.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="w-full h-full object-cover opacity-80 mix-blend-screen rounded-full"
                            />
                        </div>
                    </motion.div>

                    {/* About Button - Absolute Right (Hidden on Mobile, handled by Navbar) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block absolute right-0"
                    >
                        <a href="/about">
                            <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">ABOUT</Button>
                        </a>
                    </motion.div>
                </div>

                {/* Connection Lines (Desktop) - Mathematically aligned to Grid fractions */}
                <div className="hidden md:block relative w-full h-32 mb-6 -mt-20 z-0 px-4 md:px-20">
                    <svg className="w-full h-full overflow-visible">
                        {/* Left Branch */}
                        <motion.line
                            x1="16.67%" y1="93.75%" x2="16.67%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />
                        <motion.line
                            x1="16.67%" y1="80%" x2="50%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Right Branch */}
                        <motion.line
                            x1="83.33%" y1="93.75%" x2="83.33%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />
                        <motion.line
                            x1="83.33%" y1="80%" x2="50%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Center Branch */}
                        <motion.line
                            x1="50%" y1="93.75%" x2="50%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Intersection to AI (Trunk) */}
                        <motion.line
                            x1="50%" y1="80%" x2="50%" y2="-20%"
                            stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />
                    </svg>
                </div>

                {/* Services Row - Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 w-full relative z-10 px-4 md:px-20 mb-20 md:-mt-8">
                    {/* Mobile vertical connection line from Robot down through all nodes */}
                    <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-[-60px] bottom-10 w-[2px] z-[-1]">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 2, delay: 0.8 }}
                            className="w-full bg-gradient-to-b from-cyan-500/60 via-indigo-500/40 to-transparent"
                        />
                    </div>

                    <div className="md:px-4"><ServiceBox title="FILMMAKING" delay={1.2} href="/filmmaking" /></div>
                    <div className="md:px-4"><ServiceBox title="AUTOMATIONS" delay={1.4} href="/automations" /></div>
                    <div className="md:px-4"><ServiceBox title="ADD-ONS" delay={1.6} href="/add-ons" /></div>
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

                    {/* Headline: Responsive Wrap */}
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight font-serif uppercase max-w-7xl mx-auto flex flex-col gap-2">
                        <span className="block mb-2 !font-serif">
                            <span className="text-white block md:inline">CRAFTING HIGH-END </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 !font-serif block md:inline mt-1 md:mt-0">
                                VISUAL STORYTELLING
                            </span>
                        </span>
                        <span className="block !font-serif">
                            <span className="text-white block md:inline">BUILDING ADVANCED </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 !font-serif block md:inline mt-1 md:mt-0">
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
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            />

            <div className={`absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`} />
            <div className={`
                relative p-6 md:p-8 rounded-xl text-center border transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer
                ${isCenter
                    ? 'border-indigo-500/50 bg-indigo-950/20 text-white shadow-[0_0_30px_rgba(99,102,241,0.15)] shadow-indigo-500/20'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                }
            `}>
                <span className="text-sm md:text-base font-black tracking-[0.2em]">{title}</span>
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
