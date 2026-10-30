'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { Target, Zap, Clock, Eye, Sliders, Clapperboard, Code2, Layers, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { GENRELINE } from '@/lib/site';

const companies: { icon: LucideIcon; kicker: string; name: string; body: string; accent: string; href?: string }[] = [
    {
        icon: Clapperboard,
        kicker: 'The studio',
        name: 'McPrime Digital',
        body: 'AI-native film, commercials and automation systems for mid-market and enterprise teams. Founded in 2023. Every engagement runs on Genreline.',
        accent: '#2D6BFF',
    },
    {
        icon: Code2,
        kicker: 'The builder',
        name: 'Our software company',
        body: 'Develops and operates Genreline. A separately managed business under common ownership with McPrime Digital.',
        accent: '#A78BFA',
    },
    {
        icon: Layers,
        kicker: 'The platform',
        name: 'Genreline',
        body: 'Developed by our sister software company. The operating system for AI and hybrid film production: the Crew space, the Client space and portal, and the Suite where the work is made, with contracts, rights and money on one record.',
        accent: '#CBA54D',
        href: GENRELINE.url,
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#2D6BFF] selection:text-white relative overflow-x-clip">

            {/* RICH GLOBAL BACKGROUND - "Colored Beauty" */}
            <div className="fixed inset-0 bg-[#050608] z-[-2]" />
            {/* Grain overlay (desktop: a full-screen fixed blend layer is recomposited on every scroll frame on phones) */}
            <div className="hidden md:block fixed inset-0 bg-[url('/noise.svg')] opacity-[0.04] pointer-events-none z-[-1] mix-blend-overlay" />

            {/* Ambient Orbs: gradient glows (no GPU blur). They drift slowly on desktop and hold still on
                phones, where three animated full-screen blurs were the page's biggest drain. */}
            <div className="fixed top-[calc(-20%_-_10vw)] left-[-20vw] w-[70vw] h-[70vw] bg-radial from-blue-600/20 to-transparent to-70% opacity-40 pointer-events-none z-0 md:animate-[orb-drift_15s_ease-in-out_infinite]" />
            <div className="fixed bottom-[calc(-10%_-_12vw)] right-[-22vw] w-[84vw] h-[84vw] bg-radial from-purple-600/15 to-transparent to-70% opacity-30 pointer-events-none z-0 md:animate-[orb-drift_20s_ease-in-out_2s_infinite_reverse]" />
            <div className="fixed top-[calc(40%_-_7vw)] left-[13vw] w-[44vw] h-[44vw] bg-radial from-cyan-500/10 to-transparent to-70% opacity-20 pointer-events-none z-0 md:animate-[orb-drift_12s_ease-in-out_1s_infinite]" />


            <div className="pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">

                {/* 1. HERO: ALIGNMENT OVER TRANSACTIONS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16 md:mb-32 text-center relative"
                >
                    {/* Hero Gradient Text Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-80 bg-radial from-blue-500/20 to-transparent to-70% pointer-events-none" />

                    <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold mb-8 uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        Alignment Over<br />Transactions
                    </h1>
                    <p className="relative z-10 text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed md:mix-blend-plus-lighter">
                        We do not operate as a traditional agency. We build structured AI-native production and automation systems designed to scale creative output and operational efficiency. Every engagement is engineered for alignment, not short-term execution.
                    </p>
                </motion.div>


                {/* 2. ABOUT McPRIME DIGITAL - With Glass Background */}
                <section className="mb-20 md:mb-40 grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 md:pt-20 relative">
                    <div className="absolute inset-0 bg-white/[0.01] border border-white/5 rounded-3xl md:backdrop-blur-sm -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent opacity-30 rounded-3xl -z-10" />

                    <div className="md:col-span-4 p-8 md:p-12">
                        <h2 className="text-sm font-mono text-[#2D6BFF] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-px bg-[#2D6BFF]" /> Who We Are
                        </h2>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap">About McPrime Digital</h3>
                    </div>
                    <div className="md:col-span-8 space-y-8 text-lg text-gray-300 leading-relaxed font-light p-8 md:p-12 md:pl-0">
                        <p>
                            Founded in 2023, McPrime Digital was established to rethink how commercial production and business automation operate in an AI-driven environment. From filmmaking and generative content to integrated automation systems and performance deployment, our work replaces fragmented workflows with unified digital infrastructure.
                        </p>
                        <p>
                            We combine AI-assisted scripting, image and video generation, high-end post-production, and operational automation into cohesive systems that reduce friction, accelerate execution, and preserve creative authority.
                        </p>
                        <p>
                            Our clients operate across regulated industries, high-growth technology sectors, and enterprise environments where precision and scalability are non-negotiable.
                        </p>
                        <p className="text-white font-medium pl-6 border-l-2 border-[#2D6BFF] italic relative">
                            <span className="absolute -left-[3px] top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#2D6BFF] to-cyan-400 blur-[2px]" />
                            We build infrastructure that performs — not campaigns that expire.
                        </p>
                        <p className="text-gray-400 text-sm pt-4">
                            Our focus is not volume for its own sake, but controlled, scalable execution aligned with measurable performance.
                        </p>
                    </div>
                </section>


                {/* 2b. THE COMPANIES - studio, builder, platform */}
                <section className="mb-20 md:mb-40 relative">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-sm font-mono text-[#CBA54D] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                            <span className="w-8 h-px bg-[#CBA54D]" /> Who builds what <span className="w-8 h-px bg-[#CBA54D]" />
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">Two companies. One founder. One platform.</h3>
                        <p className="text-gray-400 text-lg mt-5 max-w-2xl mx-auto font-light leading-relaxed">
                            McPrime Digital and our software company are separately managed businesses under common ownership. One makes the work. The other builds Genreline, the platform the work runs on.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {companies.map((c, i) => {
                            const Wrapper = c.href ? 'a' : 'div';
                            return (
                                <motion.div
                                    key={c.name}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="h-full"
                                >
                                    <Wrapper
                                        {...(c.href ? { href: c.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="group relative flex h-full flex-col rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:backdrop-blur-sm transition-colors duration-500 hover:border-white/20"
                                    >
                                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                                        <div className="absolute -top-32 -right-32 w-80 h-80 pointer-events-none opacity-30" style={{ background: `radial-gradient(closest-side, ${c.accent}, transparent)` }} />
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ borderColor: c.accent + '55', background: c.accent + '1a' }}>
                                                <c.icon className="w-6 h-6" style={{ color: c.accent }} />
                                            </div>
                                            {c.href && <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />}
                                        </div>
                                        <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: c.accent }}>{c.kicker}</p>
                                        <h4 className="text-2xl font-bold text-white mb-4">{c.name}</h4>
                                        <p className="text-gray-400 leading-relaxed text-[15px]">{c.body}</p>
                                    </Wrapper>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>


                {/* 3. OUR PHILOSOPHY - Vibrant Split Layout */}
                <section className="mb-20 md:mb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative">
                    {/* Background glow for section */}
                    <div className="absolute -right-[100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-purple-900/10 to-transparent to-70% pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 relative z-10"
                    >
                        <h2 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Our Philosophy
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white drop-shadow-lg">We believe scale is a systems problem, not a creativity problem.</h3>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                            <p>
                                Creative output without infrastructure leads to inconsistency. Automation without strategy leads to inefficiency. Our philosophy integrates both. We build AI-native production and operational systems that align creative execution with measurable performance.
                            </p>
                            <p>
                                We do not operate outside our clients’ businesses. We embed within their objectives, their metrics, and their operational reality. Alignment means shared visibility, structured execution, and accountable outcomes — not surface-level collaboration.
                            </p>
                            <p>
                                Technology is not the centerpiece. Discipline is. AI is a tool. Systems are the advantage. Precision replaces guesswork. Structure replaces fragmentation.
                            </p>
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold pt-4 text-xl">
                                Where creativity meets intelligence, growth becomes repeatable.
                            </p>
                        </div>
                    </motion.div>

                    {/* Image Placeholder - Enhanced with "Colored Beauty" */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 h-[500px] rounded-2xl bg-[#0A0C10] border border-white/10 relative overflow-hidden flex items-center justify-center group shadow-2xl"
                    >
                        {/* Internal Gradients & Image */}
                        <div className="absolute inset-0">
                            <Image
                                src="/imax-future.jpg"
                                alt="Philosophy Visual"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 hover:scale-105 transform"
                            />
                        </div>

                        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-60 mix-blend-overlay pointer-events-none" />
                        <div className="absolute -top-[160px] -right-[160px] w-[416px] h-[416px] bg-radial from-cyan-500/20 to-transparent to-70% pointer-events-none" />
                        <div className="absolute -bottom-[160px] -left-[160px] w-[416px] h-[416px] bg-radial from-purple-500/20 to-transparent to-70% pointer-events-none" />
                        <div className="hidden md:block absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

                        <div className="relative z-10 text-center transform group-hover:scale-105 transition-transform duration-700 pointer-events-none">
                            <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6 md:backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-white/5">
                                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                            </div>
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest bg-black/30 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">Philosophy Module</span>
                        </div>
                    </motion.div>
                </section>


                {/* 4. OUR COMMITMENT - Glass Panel */}
                <section className="mb-20 md:mb-40 text-center relative py-16 md:py-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.015] to-transparent pointer-events-none" />
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto relative z-10"
                    >
                        <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Our Commitment <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-bold mb-10 text-white drop-shadow-md">Mastery requires focus.</h3>

                        <p className="text-xl text-gray-300 leading-relaxed mb-10 font-light">
                            We remove inefficiencies across production, automation, and performance deployment. Every workflow is designed for clarity, speed, and measurable output. Clients gain full visibility into spend, performance, and return — without opacity or disconnected reporting.
                        </p>

                        <p className="text-gray-400">
                            We do not pursue volume for its own sake. We pursue controlled, scalable execution that compounds over time.
                        </p>
                    </motion.div>
                </section>


                {/* 5. SPLIT SECTION - Vertical Divider Gradient */}
                <section className="mb-20 md:mb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
                    {/* Vertical Gutter Line on LG */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                    {/* LEFT: Why We Exist */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 p-6 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-white">Why We Exist</h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-[#2D6BFF] to-transparent mb-8" />

                        <div className="space-y-6 text-gray-400 leading-relaxed font-light">
                            <p>
                                Traditional commercial production is slow, resource-heavy, and constrained by physical logistics. Automation systems in many organizations are fragmented, inefficient, and dependent on manual coordination.
                            </p>
                            <p className="text-white text-lg font-medium">
                                We exist to build modern alternatives.
                            </p>
                            <p>
                                In commercial filmmaking, we replace physical production constraints with AI-native creative systems designed for speed, precision, and scalable output.
                            </p>
                            <p>
                                In automation, we design structured workflows that eliminate repetitive processes, reduce operational drag, and increase execution clarity.
                            </p>
                            <p className="italic border-l-2 border-[#2D6BFF] pl-4 py-2 bg-gradient-to-r from-[#2D6BFF]/10 to-transparent rounded-r-lg">
                                Our role is to modernize how creative output and business systems operate — independently and effectively.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT: Transparency & Reporting */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 p-6 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-white">Transparency & Reporting Philosophy</h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-transparent mb-8" />

                        <div className="space-y-6 text-gray-400 leading-relaxed font-light">
                            <p className="text-xl text-white font-medium">
                                Performance requires visibility.
                            </p>
                            <p>
                                For filmmaking projects, reviews, approvals, contracts and invoices sit in your McPrime client portal on Genreline, with a record of who approved each version and when.
                            </p>
                            <p>
                                For automation systems and paid deployment, clients have direct access to operational data, performance metrics, and measurable return tracking.
                            </p>
                            <ul className="space-y-3 py-4">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-[#2D6BFF] rounded-full shadow-[0_0_5px_#2D6BFF]" /> No opaque processes.
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-[#2D6BFF] rounded-full shadow-[0_0_5px_#2D6BFF]" /> No hidden layers.
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-[#2D6BFF] rounded-full shadow-[0_0_5px_#2D6BFF]" /> No inflated reporting.
                                </li>
                            </ul>
                            <p className="text-white font-medium">
                                Execution remains accountable, measurable, and aligned with defined objectives.
                            </p>
                        </div>
                    </motion.div>
                </section>


                {/* 6. CORE PRINCIPLES - 4D DEEP LIQUID GLASSS HORIZONTAL LAYOUT */}
                <section className="mb-12 md:mb-20">
                    <div className="text-center mb-16 relative">
                        {/* Glow behind title */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-radial from-blue-500/20 to-transparent to-70%" />
                        <h2 className="relative z-10 text-sm font-mono text-cyan-400 uppercase tracking-widest mb-4">Our DNA</h2>
                        <h3 className="relative z-10 text-4xl font-bold">Core Principles</h3>
                    </div>

                    {/* 5-COLUMN GRID - All modules on one horizontal line */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <PrincipleCard
                            title="Precision Over Hype"
                            desc="Every deliverable is built to defined standards and measurable objectives."
                            icon={Target}
                            color="blue"
                            delay={0.1}
                        />
                        <PrincipleCard
                            title="Execution Over Noise"
                            desc="Work is structured, controlled, and aligned to performance outcomes."
                            icon={Zap}
                            color="cyan"
                            delay={0.2}
                        />
                        <PrincipleCard
                            title="Speed With Discipline"
                            desc="Acceleration does not replace quality control or process rigor."
                            icon={Clock}
                            color="purple"
                            delay={0.3}
                        />
                        <PrincipleCard
                            title="Clarity Over Complexity"
                            desc="Clients have direct visibility into workflows, metrics, and results."
                            icon={Eye}
                            color="emerald"
                            delay={0.4}
                        />
                        <PrincipleCard
                            title="Focus Over Expansion"
                            desc="We prioritize depth of capability over offering unnecessary services."
                            icon={Sliders}
                            color="pink"
                            delay={0.5}
                        />
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
}

// Modular Component - 4D DEEP LIQUID GLASS
type PrincipleColor = 'blue' | 'cyan' | 'purple' | 'emerald' | 'pink';

function PrincipleCard({ title, desc, icon: Icon, delay, color = "blue", className = "" }: { title: string; desc: string; icon: LucideIcon; delay: number; color?: PrincipleColor; className?: string }) {
    const colorClasses: Record<PrincipleColor, string> = {
        blue: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-gradient-to-b from-blue-900/10 to-transparent",
        cyan: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] bg-gradient-to-b from-cyan-900/10 to-transparent",
        purple: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-gradient-to-b from-purple-900/10 to-transparent",
        emerald: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] bg-gradient-to-b from-emerald-900/10 to-transparent",
        pink: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] bg-gradient-to-b from-pink-900/10 to-transparent",
    };

    // Spelled out so Tailwind generates each class (a template-built name like bg-pink-500/20 never rendered)
    const orbColor: Record<PrincipleColor, string> = {
        blue: "from-blue-500/20",
        cyan: "from-cyan-500/20",
        purple: "from-purple-500/20",
        emerald: "from-emerald-500/20",
        pink: "from-pink-500/20",
    };

    const iconColor: Record<PrincipleColor, string> = {
        blue: "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]",
        cyan: "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]",
        purple: "text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]",
        emerald: "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]",
        pink: "text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, ease: "backOut" }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`relative flex flex-col items-center text-center p-8 rounded-2xl h-full border border-white/10 md:backdrop-blur-2xl overflow-hidden transition-all duration-500 group ${className} ${colorClasses[color]}`}
            style={{
                boxShadow: "inset 0 0 20px rgba(255,255,255,0.02), 0 10px 30px rgba(0,0,0,0.5)" // Deep glass internal shadow
            }}
        >
            {/* 4D Liquid Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

            {/* Gradient Orb Behind Icon */}
            <div className={`absolute -top-12 w-full h-56 bg-radial ${orbColor[color]} to-transparent to-70% pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* LARGER ICON */}
            <div className={`w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-300 relative z-10 group-hover:bg-white/10 ${colorClasses[color].split(" ")[0]} shadow-inner`}>
                <Icon className={`w-10 h-10 transition-colors ${iconColor[color]}`} />
            </div>

            <h4 className={`text-xl font-bold mb-4 text-white transition-colors relative z-10 w-full`}>{title}</h4>
            <div className={`w-12 h-0.5 bg-${color}-500/50 mb-4 rounded-full`} />
            <p className="text-gray-400 leading-relaxed text-sm font-light relative z-10 group-hover:text-white transition-colors">
                {desc}
            </p>
        </motion.div>
    );
}
