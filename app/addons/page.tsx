'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Video, DollarSign, Target, Zap, Play } from 'lucide-react';
import Link from 'next/link';

// Custom Components
const RevealText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h2
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} className="inline-block relative">
                    {letter === " " ? "\u00A0" : letter}
                    {/* Glitch effect on hover/random */}
                    <motion.span
                        className="absolute inset-0 text-cyan-400 opacity-0"
                        animate={{ opacity: [0, 0.5, 0], x: [0, 2, -2, 0] }}
                        transition={{ duration: 0.2, delay: delay + index * 0.1 + Math.random() * 2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                </motion.span>
            ))}
        </motion.h2>
    );
};

const MagneticButton = ({ children, className = "", href = "#" }: { children: React.ReactNode; className?: string; href?: string }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.2);
        y.set(middleY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative overflow-hidden group ${className}`}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
            />
        </motion.a>
    );
};

const ParallaxCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
};


export default function AddonsPage() {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#d4af37]/30 selection:text-white overflow-x-hidden">

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url('/images/addons/noise.png')`, backgroundSize: '200px' }} />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-cyan-400 to-[#d4af37] origin-left z-50 mix-blend-screen"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />

                {/* Animated Background Mesh (using CSS/SVG or Video could go here, simulating with code for now) */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#d4af37]/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
                            EXPAND YOUR<br />
                            <span className="italic font-serif text-[#d4af37]">EMPIRE</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto uppercase tracking-[0.2em] font-light mb-12"
                    >
                        Elite Digital Add-ons
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col md:flex-row gap-8 justify-center items-center"
                    >
                        <div className="h-[60px] w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent" />
                        <p className="text-xs text-[#d4af37] uppercase tracking-widest animate-pulse">Scroll to Initiate</p>
                        <div className="h-[60px] w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* Service 1: AI UGC Influencer */}
            <section className="relative min-h-screen py-32 flex items-center overflow-hidden">
                {/* Background Glitch Elements */}

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">

                        {/* Visual */}
                        <div className="lg:w-1/2 perspective-1000">
                            <motion.div
                                initial={{ opacity: 0, rotateY: 15, x: -100 }}
                                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                                transition={{ duration: 1.2, type: "spring" }}
                                viewport={{ once: true }}
                                className="relative group cursor-none"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-[#d4af37] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                                <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black">
                                    <Image
                                        src="/images/addons/ai_avatar.png"
                                        alt="AI Avatar"
                                        width={800}
                                        height={800}
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110"
                                    />
                                    {/* Scanning Line Effect */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                                        animate={{ top: ["0%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* Overlay UI */}
                                    <div className="absolute bottom-6 left-6 flex gap-2">
                                        <span className="bg-black/60 backdrop-blur border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-cyan-300 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> Live Render
                                        </span>
                                        <span className="bg-black/60 backdrop-blur border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-[#d4af37]">
                                            99.9% Human Match
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <div className="flex items-center gap-4 text-cyan-400">
                                <Users className="w-6 h-6" />
                                <span className="text-sm font-bold uppercase tracking-[0.3em]">AI Identity System</span>
                            </div>

                            <RevealText
                                text="THE PERFECT DIGITAL AMBASSADOR"
                                className="text-4xl md:text-6xl font-bold leading-tight"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                                className="space-y-6 text-gray-400 text-lg leading-relaxed"
                            >
                                <p>
                                    Elevate your brand with our cutting-edge, <span className="text-white font-medium">ultra-realistic AI-generated influencers</span>. Meticulously designed to align with your specific objectives, our avatars foster authentic engagement without the headaches of traditional production.
                                </p>
                                <p>
                                    Avoid the expense. Skip the casting calls. Produce unlimited, high-fidelity content that resonates with your audience 24/7.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-4 py-6">
                                {['Cost-Effective', 'Brand Aligned', 'Infinite Content', 'Global Reach'].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + (i * 0.1) }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3 border-l border-[#d4af37]/30 pl-4"
                                    >
                                        <Zap className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-sm uppercase tracking-wider text-gray-300">{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <MagneticButton href="/contact" className="inline-block px-10 py-5 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Deploy Avatar
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="relative h-32 overflow-hidden flex items-center justify-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                <div className="absolute w-4 h-4 rotate-45 border border-[#d4af37] bg-black z-10" />
            </div>

            {/* Service 2: Paid Advertising */}
            <section className="relative min-h-screen py-32 flex items-center bg-[#080808] overflow-hidden">
                {/* Floating background data elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute font-mono text-cyan-500 text-xs"
                            initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: 0 }}
                            animate={{ y: [0, -100], opacity: [0, 1, 0] }}
                            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                        >
                            ROI_METRIC_{Math.random().toFixed(4)}
                        </motion.div>
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-20">

                        {/* Visual */}
                        <div className="lg:w-1/2">
                            <ParallaxCard className="relative">
                                <div className="absolute -inset-4 bg-[#d4af37]/20 rounded-full blur-3xl opacity-20 animate-pulse" />
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                    className="relative border border-white/5 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl shadow-[#d4af37]/10"
                                >
                                    <Image
                                        src="/images/addons/analytics.png"
                                        alt="Analytics Hologram"
                                        width={800}
                                        height={800}
                                        className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                    />
                                    {/* Floating Data Points */}
                                    <motion.div
                                        className="absolute top-10 right-10 p-4 bg-black/80 border border-cyan-500/30 backdrop-blur rounded"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="text-xs text-gray-400 uppercase mb-1">Conversion Rate</div>
                                        <div className="text-2xl font-mono text-cyan-400">8.4% <span className="text-[10px] text-green-500">▲</span></div>
                                    </motion.div>

                                    <motion.div
                                        className="absolute bottom-20 left-10 p-4 bg-black/80 border border-[#d4af37]/30 backdrop-blur rounded"
                                        animate={{ y: [0, 15, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    >
                                        <div className="text-xs text-gray-400 uppercase mb-1">Return on Ad Spend</div>
                                        <div className="text-2xl font-mono text-[#d4af37]">12.5x <span className="text-[10px] text-green-500">▲</span></div>
                                    </motion.div>

                                </motion.div>
                            </ParallaxCard>
                        </div>

                        {/* Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <div className="flex items-center gap-4 text-[#d4af37]">
                                <Target className="w-6 h-6" />
                                <span className="text-sm font-bold uppercase tracking-[0.3em]">Precision Targeting</span>
                            </div>

                            <RevealText
                                text="DOMINATE THE FEED"
                                className="text-4xl md:text-6xl font-bold leading-tight"
                                delay={0.2}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                                className="space-y-6 text-gray-400 text-lg leading-relaxed"
                            >
                                <p>
                                    Boost your visibility with our <span className="text-white font-medium">expert paid advertising campaigns</span>. We don't just run ads; we engineer growth engines. Tailored strategies drive targeted traffic, maximizing every dollar of your budget.
                                </p>
                                <p>
                                    Partner with us to reach your audience effectively. Let's create impactful ads that resonate, convert, and deliver measurable results.
                                </p>
                            </motion.div>

                            <div className="flex flex-col gap-4">
                                {[
                                    { title: "Strategic ROI", desc: "Data-backed allocation meant to multiply investment." },
                                    { title: "Hyper-Targeting", desc: "Reaching the exact demographic that needs your product." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-6 border border-white/5 bg-white/5 hover:border-[#d4af37]/30 transition-colors rounded-lg group"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <MagneticButton href="/contact" className="inline-block px-10 py-5 bg-transparent border border-[#d4af37] text-[#d4af37] font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-colors mt-8">
                                Start Campaign
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent opacity-20" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <RevealText text="READY TO ASCEND?" className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
                            The tools for exponential growth are at your fingertips.
                        </p>

                        <Link href="/contact" className="group relative inline-flex items-center justify-center px-16 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-black border-2 border-white rounded hover:bg-white hover:text-black">
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                            <span className="relative text-xl uppercase tracking-widest">Begin Now</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
