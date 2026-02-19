'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Lock, Zap, LayoutGrid, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import FlowingBackground from '@/components/add-ons/FlowingBackground';
import PremiumCard from '@/components/add-ons/PremiumCard';
import UGCGrid from '@/components/add-ons/UGCGrid';
import LiveAdsDashboard from '@/components/add-ons/LiveAdsDashboard';

// --- SHARED COMPONENTS ---

function Section({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) {
    return (
        <section id={id} className={`relative py-32 overflow-hidden ${className}`}>
            {children}
        </section>
    );
}

function Container({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`container mx-auto px-6 md:px-12 relative z-10 ${className}`}>
            {children}
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---

export default function GrowthAddOns() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <main className="bg-[#050608] min-h-screen text-white selection:bg-[#2D6BFF] selection:text-white relative overflow-x-hidden font-sans">

            {/* GLOBAL AMBIANCE */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-[50] mix-blend-overlay" />

            {/* 1. HERO SECTION - REFINED */}
            <Section className="min-h-screen flex items-center justify-center relative">
                {/* Flowing Organic Background - Updated with threads & pop */}
                <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
                    <FlowingBackground />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent z-10" />
                </motion.div>

                <Container className="text-center max-w-[90vw] relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Blinking Light Badge */}
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_cyan]"></span>
                            </span>
                            <span className="text-xs font-mono tracking-widest text-cyan-100 uppercase text-shadow-sm">Integrated Growth Add-Ons</span>
                        </div>

                        {/* Force 2-Line Headline - Slightly Reduced Size (text-[4.5vw]) */}
                        <h1 className="text-[5vw] md:text-[5.5vw] lg:text-[5vw] font-bold tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-2xl uppercase whitespace-nowrap">
                            STRATEGIC EXTENSIONS FOR<br />
                            EXISTING PARTNERS
                        </h1>

                        {/* Refined Exclusive Undertext */}
                        <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed mix-blend-plus-lighter">
                            Reserved strictly for our existing partners. A unified extension of your production ecosystem ensuring creative, distribution, and performance remain integrated under one infrastructure.
                        </p>
                    </motion.div>
                </Container>
            </Section>


            {/* 2. WHY ADD-ONS EXIST - VIBRANT UPGRADE */}
            <Section className="bg-[#080a0f] border-t border-white/5 relative overflow-hidden">
                {/* Dynamic Background Glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_100%] opacity-20" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8 relative z-10">
                            <motion.h2
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
                            >
                                <span className="text-white">Built to Operate</span><br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(45,107,255,0.5)]">
                                    Within Your Existing System
                                </span>
                            </motion.h2>
                            <p className="text-lg text-gray-300 leading-relaxed font-light">
                                Our add-on services are not standalone offerings. They extend the <span className="text-cyan-300 font-medium">production and automation systems</span> already built for your organization. By keeping creative, performance, and infrastructure aligned under one framework, execution remains consistent, measurable, and efficient.
                                <br /><br />
                                This structure prevents fragmentation across vendors and preserves operational control.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 relative z-10">
                            {[
                                { title: "Unified Framework", desc: "No fragmentation. One system for creative and performance.", icon: LayoutGrid, color: "from-cyan-500 to-blue-600" },
                                { title: "Consistent Execution", desc: "Maintain brand voice across every new channel.", icon: CheckCircle2, color: "from-blue-500 to-indigo-600" },
                                { title: "Measurable Impact", desc: "Data flows back into your central automation core.", icon: Zap, color: "from-purple-500 to-pink-600" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <PremiumCard className="p-6 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/5 hover:border-white/20 transition-all duration-300 group">
                                        <div className="flex items-start gap-6">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-[1px] shadow-[0_0_20px_rgba(45,107,255,0.2)] group-hover:shadow-[0_0_30px_rgba(45,107,255,0.4)] transition-shadow duration-500`}>
                                                <div className="w-full h-full bg-[#080a0f] rounded-[10px] flex items-center justify-center">
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
                                                    <item.icon className="w-7 h-7 text-white relative z-10" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                                            </div>
                                        </div>
                                    </PremiumCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>


            {/* 3. AI BRAND AMBASSADOR SECTION */}
            <Section className="bg-[#050608] border-t border-white/5 relative overflow-visible">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-blue-900/10 to-transparent blur-[100px] pointer-events-none" />

                <Container>
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* LEFT: Context */}
                        <div className="w-full lg:w-1/3 space-y-8 sticky top-32">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                            >
                                AI Brand Ambassadors
                            </motion.h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We design custom AI brand ambassadors that meet your exact standards and integrate seamlessly into your business. These digital personas embody your company and brand identity for years—forever—eliminating contract disputes, legal issues, or personal conflicts.
                            </p>

                            <h3 className="text-gray-500 uppercase tracking-widest text-sm font-mono pt-4">Ambassador Capabilities:</h3>
                            <ul className="space-y-4">
                                {[
                                    "Ageless & Always Available",
                                    "Conflict-Free Representation",
                                    "Multi-Language & Global Reach",
                                    "Consistent Brand Messaging"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-[#2D6BFF]/20 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-[#2D6BFF]" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-gray-500 italic text-sm pt-4 border-l-2 border-[#2D6BFF] pl-4">
                                A permanent asset for your brand legacy.
                            </p>
                        </div>

                        {/* RIGHT: Grid */}
                        <div className="w-full lg:w-2/3">
                            <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
                                <h3 className="text-2xl font-bold text-white tracking-widest">OUR SELECTED CREATIONS</h3>
                                <div className="flex gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs text-gray-500 uppercase">Live Preview</span>
                                </div>
                            </div>
                            <UGCGrid />
                        </div>
                    </div>
                </Container>
            </Section>


            {/* 4. PAID ADVERTISING INFRASTRUCTURE - Updated Visuals */}
            <Section className="bg-[#090C12] border-t border-white/5 relative">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:100%_2rem] perspective-[500px] transform-gpu rotate-x-60 origin-bottom" />

                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 order-2 lg:order-1 relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
                                Integrated Paid Advertising
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                For clients seeking unified execution, we manage paid advertising within the same performance framework as your AI-produced assets. Campaign deployment, optimization, and reporting remain connected to your automation systems, eliminating disconnected workflows.
                            </p>

                            <h3 className="text-gray-500 uppercase tracking-widest text-sm font-mono pt-4">Services include:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Media buying strategy",
                                    "Creative testing deployment",
                                    "Campaign optimization",
                                    "Performance tracking integration"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#2D6BFF]/30 transition-colors">
                                        <div className="w-1.5 h-1.5 bg-[#2D6BFF] rounded-full shadow-[0_0_10px_#2D6BFF]" />
                                        <span className="text-sm text-gray-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-gray-500 italic text-sm pt-4 border-l-2 border-[#2D6BFF] pl-4">
                                This ensures creative and distribution operate as one system.
                            </p>
                        </div>

                        {/* RIGHT: LIVE ADS DASHBOARD - "GO HARD" Redesign */}
                        <div className="order-1 lg:order-2 perspective-1000 relative z-30 transform-gpu hover:scale-105 transition-transform duration-500">
                            <PremiumCard className="rounded-2xl p-0 border border-white/10 shadow-2xl overflow-hidden h-[400px]">
                                <LiveAdsDashboard />
                            </PremiumCard>
                        </div>
                    </div>
                </Container>
            </Section>


            {/* 5. ACCESS CONTROL */}
            <Section className="bg-[#050608] border-t border-white/5 relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />

                <Container className="text-center max-w-2xl relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                    >
                        <Lock className="w-10 h-10 text-gray-300" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                        Exclusively for Active Clients
                    </h2>

                    <p className="text-gray-400 leading-relaxed text-lg mb-12">
                        These services are available only to organizations currently engaged in our AI Commercial Filmmaking or Automation programs. This ensures every extension integrates seamlessly into an existing production and operational framework.
                    </p>

                    <div className="inline-block px-10 py-5 border border-white/5 rounded-full bg-white/[0.01] backdrop-blur-sm">
                        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                            We do not offer these services as standalone engagements.
                        </p>
                    </div>
                </Container>
            </Section>


            {/* 6. FINAL CTA - "Expand Within the System" */}
            <Section id="cta" className="bg-black py-40 relative">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <motion.div
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-gradient-radial from-[#2D6BFF]/10 via-purple-900/5 to-transparent blur-[150px] rounded-full pointer-events-none"
                    />
                </div>

                <Container className="max-w-6xl relative z-10">
                    <PremiumCard className="rounded-[4rem] p-12 md:p-32 text-center bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group/card">

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(45,107,255,0.1)_180deg,transparent_360deg)] opacity-30 pointer-events-none blur-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 mb-10 tracking-tighter drop-shadow-2xl">
                                Expand Within<br />the System
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed mix-blend-plus-lighter">
                                If you are an active client and want to extend your production into UGC or paid advertising, request integration below.
                            </p>

                            <div className="relative group/btn inline-block">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl blur opacity-40 group-hover/btn:opacity-100 transition duration-500 group-hover/btn:duration-200"></div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative px-16 py-6 text-xl md:text-2xl bg-white text-black font-bold tracking-tight rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-shadow duration-300"
                                    onClick={() => window.location.href = '#cta'}
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Request Add-On Access
                                        <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />
                                </motion.button>
                            </div>
                        </div>
                    </PremiumCard>
                </Container>
            </Section>

        </main>
    );
}
