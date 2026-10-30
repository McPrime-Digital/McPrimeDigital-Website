'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useCallback, useRef, useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import { BadgeCheck, CheckCircle2, Layers, Lock } from 'lucide-react';
import InViewVideo from '@/components/media/InViewVideo';
import { usePauseOffscreen } from '@/lib/usePauseOffscreen';

/* --- WORKFLOW DATA --- */
const workflowSteps = [
    {
        number: "01",
        title: "Strategic Concept Development",
        desc: "We define positioning, messaging, audience intent, and performance goals before creative execution begins."
    },
    {
        number: "02",
        title: "AI-Assisted Scripting",
        desc: "Scripts are developed through structured prompt engineering and iterative refinement. Scene breakdowns and visual direction are validated."
    },
    {
        number: "03",
        title: "AI Image & Video Generation",
        desc: "High-quality visual assets are generated, refined, and blended with real imagery when required. Scene continuity is managed through structured workflows."
    },
    {
        number: "04",
        title: "Broadcast-Standard Post-Production",
        desc: "Professional editing, advanced color grading, cinematic sound design, and custom music production shape the final narrative."
    },
    {
        number: "05",
        title: "Client Review & Approval",
        desc: "Cuts are reviewed frame by frame in your McPrime client portal on Genreline. Every note, version and approval is recorded, and each sign-off closes with a certificate."
    },
    {
        number: "06",
        title: "Deployment-Ready Asset Structuring",
        desc: "Final outputs are formatted for multiple platforms, campaign variations, and automated distribution pipelines."
    }
];

// Steps light up as the blue line reaches them. The line's tip sits on a fixed reading line
// 60% of the way down the screen, so this tracks the steps themselves rather than the whole
// section (on phones the glass panels stack underneath and would otherwise stall it at 02).
const READING_LINE = '60%';
// Centre of a step's dot, measured from the top of the step
const DOT_CENTER = 16;

export default function FilmmakingWorkflow() {
    const sectionRef = usePauseOffscreen<HTMLElement>();
    const timelineRef = useRef<HTMLDivElement>(null);
    const thresholds = useRef<number[]>([]);
    const [litCount, setLitCount] = useState(0);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: [`start ${READING_LINE}`, `end ${READING_LINE}`]
    });

    const updateLit = useCallback((progress: number) => {
        setLitCount(thresholds.current.filter(t => progress >= t).length);
    }, []);

    // Where each dot sits along the line, as a fraction of its length; re-measured on resize
    useEffect(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;
        const observer = new ResizeObserver(() => {
            const height = timeline.offsetHeight || 1;
            thresholds.current = Array.from(timeline.querySelectorAll<HTMLElement>('[data-step]'))
                .map(step => (step.offsetTop + DOT_CENTER) / height);
            updateLit(scrollYProgress.get());
        });
        observer.observe(timeline);
        return () => observer.disconnect();
    }, [scrollYProgress, updateLit]);

    useMotionValueEvent(scrollYProgress, 'change', updateLit);

    return (
        <section ref={sectionRef} className="relative py-12 md:py-24 min-h-screen bg-[#0B0D12] overflow-hidden">
            {/* --- Layer 1 & 2: Base & Depth Gradient --- */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1115] via-[#0B0D12] to-[#050608]" />

            {/* --- Layer 3: Architectural Grid (Reduced Scale) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px', // Reduced size
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
            />

            {/* --- Layer 4: Ambient lighting, drawn as gradients (a blurred circle looks the same but costs the GPU far more) --- */}
            <div className="absolute top-1/3 -right-[100px] w-[800px] h-[800px] bg-radial from-[#2D6BFF]/5 to-transparent to-70% pointer-events-none" />
            <div className="absolute bottom-1/3 -left-[320px] w-[740px] h-[740px] bg-radial from-cyan-500/5 to-transparent to-70% pointer-events-none" />


            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* --- LEFT COLUMN: Interactive Timeline (40%) --- */}
                    <div className="lg:w-[40%] relative">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-[0.9]">
                                PRODUCTION<br />REBUILT AS A<br /><span className="text-[#2D6BFF]">DIGITAL SYSTEM</span>
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Traditional production depends on physical locations, large crews, and manual coordination. Our model replaces that structure with an AI-native production architecture that accelerates development, reduces friction, and maintains high creative standards.
                            </p>
                        </motion.div>

                        <div ref={timelineRef} className="relative pl-10 border-l border-white/5">
                            {/* Filling Connector Line */}
                            <motion.div
                                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                                className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#2D6BFF] shadow-[0_0_15px_rgba(45,107,255,0.5)]"
                            />

                            <div className="space-y-16">
                                {workflowSteps.map((step, i) => (
                                    <WorkflowStep key={step.number} step={step} active={i < litCount} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Staggered Glass Engines (60%) --- */}
                    <div className="lg:w-[60%] relative flex flex-col gap-8 pt-0">  {/* REDUCED VERTICAL GAP: gap-12 -> gap-8 */}

                        {/* Module 1: Script Logic */}
                        <GlassModule
                            title="SCRIPT_LOGIC_CORE"
                            glow="shadow-indigo-500/10"
                            connectorColor="#6366f1"
                        >
                            <ScriptInterface />
                        </GlassModule>

                        {/* Module 2: Generative Pipeline */}
                        <GlassModule
                            title="GENERATIVE_PIPELINE_V4"
                            glow="shadow-cyan-500/10"
                            connectorColor="#06b6d4"
                        >
                            <GenerativePipeline />
                        </GlassModule>

                        {/* Module 3: Post-Processing */}
                        <GlassModule
                            title="POST_PROCESSING_MASTER"
                            glow="shadow-rose-500/10"
                            connectorColor="#f43f5e"
                        >
                            <PostProduction />
                        </GlassModule>

                        {/* Module 4: Client review on Genreline */}
                        <GlassModule
                            title="CLIENT_REVIEW_PORTAL"
                            glow="shadow-amber-500/10"
                            connectorColor="#CBA54D"
                        >
                            <ReviewInterface />
                        </GlassModule>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="pl-8 pt-4"
                        >
                            <p className="text-gray-400 text-sm leading-relaxed max-w-lg border-l border-white/10 pl-4 italic">
                                "This filmmaking system removes physical constraints while preserving creative authority and execution quality, delivering substantial cost efficiencies compared to traditional production models."
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Left Column Step ---
// Every step keeps its full height whether lit or not, so lighting one never moves the page.
function WorkflowStep({ step, active }: { step: { number: string; title: string; desc: string }, active: boolean }) {
    return (
        <div
            data-step
            className={`group relative transition-[opacity,translate] duration-500 ${active ? 'opacity-100 translate-x-2.5' : 'opacity-35'}`}
        >
            <div className={`absolute -left-[45px] top-1 flex items-center justify-center w-6 h-6 rounded-full border transition-colors duration-500 ${active ? 'bg-[#0B0D12] border-[#2D6BFF] shadow-[0_0_10px_#2D6BFF]' : 'bg-[#0B0D12] border-white/10'}`}>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${active ? 'bg-[#2D6BFF]' : 'bg-white/20'}`} />
            </div>

            <span className={`block text-4xl font-light mb-2 font-mono transition-colors duration-500 ${active ? 'text-[#2D6BFF]' : 'text-white/20'}`}>
                {step.number}
            </span>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${active ? 'text-white' : 'text-gray-500'}`}>
                {step.title}
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                {step.desc}
            </p>
        </div>
    );
}

// --- Right Column Glass Module Container ---
// Phones get a near-solid panel; the live frosted blur is desktop-only.
function GlassModule({ children, title, glow, connectorColor }: { children: ReactNode; title: string; glow?: string; connectorColor: string }) {
    return (
        <div className="relative pl-8">
            {/* Connecting Workflow Line */}
            <div className="absolute left-0 top-[-60px] bottom-[-60px] w-[1px] bg-white/5 mx-auto">
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="h-full w-full origin-top bg-gradient-to-b from-transparent via-current to-transparent opacity-50"
                    style={{ color: connectorColor }}
                />
            </div>
            <div className="absolute left-[-4px] top-1/2 w-2 h-2 rounded-full box-content border-4 border-[#0B0D12]" style={{ backgroundColor: connectorColor }} />


            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -5 }}
                className={`relative group bg-[#0F1115]/95 md:bg-[#0F1115]/80 md:backdrop-blur-2xl border border-white/5 rounded-xl overflow-hidden shadow-2xl ${glow}`}
            >
                {/* 3D Inner Depth Bevel */}
                <div className="absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-xl pointer-events-none z-20" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">{title}</span>
                    </div>
                </div>

                {/* Content Area - REDUCED HEIGHT: 260px -> 200px */}
                <div className="p-6 md:p-8 min-h-[200px] relative">
                    {children}
                </div>

                {/* Ambient Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30" />
            </motion.div>
        </div>
    );
}

// --- 1. Script Logic Interface ---
function ScriptInterface() {
    return (
        <div className="flex h-full gap-4 text-xs font-mono">
            {/* Sidebar */}
            <div className="w-1/4 min-w-[100px] border-r border-white/5 pr-4 space-y-4">
                <div className="space-y-2">
                    <div className="text-[9px] uppercase text-indigo-400 opacity-60">Structure</div>
                    {['Hook', 'Problem', 'Solution', 'CTA'].map((item, i) => (
                        <div key={i} className={`p-2 rounded bg-white/[0.02] border border-white/5 ${i === 1 && 'border-l-2 border-l-indigo-500 bg-white/[0.04]'}`}>
                            {item}
                        </div>
                    ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="text-[9px] uppercase text-white/20">Refinement</div>
                    <div className="flex gap-2">
                        <span className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded text-[9px]">v1.3</span>
                        <span className="text-white/40">v1.2</span>
                    </div>
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 space-y-4 relative">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-gray-400">SCENE 02 · DREAM VS REALITY</span>
                    <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-[9px]">
                        <Lock size={10} /> LOCKED
                    </span>
                </div>

                <div className="space-y-3 font-sans opacity-90">
                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-mono pt-1">01</span>
                        <p className="text-gray-300 leading-relaxed bg-white/5 p-2 rounded w-full border border-white/5">
                            Camera dollies through four flash moments: a stadium crowd, an astronaut in a greenhouse, a boardroom pitch, a race-car drift.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-mono pt-1">02</span>
                        <div className="relative w-full">
                            <p className="text-gray-300 leading-relaxed bg-white/5 p-2 rounded w-full border border-white/5">
                                The subject turns, revealing the interface. <span className="bg-indigo-500/20 text-indigo-200 px-1">Macro focus</span> on the retina scan. Camera pulls back to the product.
                            </p>
                            {/* Cursor */}
                            <div className="absolute inline-block w-0.5 h-4 bg-indigo-500 ml-1 top-3 animate-[blink_0.8s_ease-in-out_infinite]" />
                        </div>
                    </div>
                </div>

                {/* Production metadata */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-white/5 text-[9px] text-gray-600 font-mono">
                    <span>DRAFT v1.3</span>
                    <span>REVIEW: CREATIVE LEAD</span>
                    <span className="text-indigo-400">STATUS: APPROVED</span>
                </div>
            </div>
        </div>
    );
}

// --- 2. Generative Pipeline Interface ---
function GenerativePipeline() {
    // Image assets for generation thumbnails
    const thumbnails = [
        "/filmmaking/father-son-man-utd.png",
        "/filmmaking/astronaut-plants.png",
        "/filmmaking/workplace-meeting.png",
        "/filmmaking/f1-race.png"
    ];

    return (
        <div className="h-full flex flex-col gap-4"> {/* Reduced gap */}
            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] font-mono">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse rounded-full" />
                    <span className="text-cyan-400">GENERATING SHOTS 14–17</span>
                </div>
                <span className="text-gray-500">SCENE 02</span>
            </div>

            {/* Sequence Thumbnails with Real Imagery - ASPECT SQUARE for REDUCED HEIGHT */}
            <div className="grid grid-cols-4 gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                {thumbnails.map((src, i) => (
                    <div key={i} className="relative aspect-square bg-[#0B0D12] rounded border border-white/10 overflow-hidden group">
                        {/* Real Image Content */}
                        <Image
                            src={src}
                            alt={`Generated frame ${i + 1}`}
                            fill
                            sizes="160px"
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-500/50 rounded-full group-hover:bg-cyan-400 transition-colors z-10" />

                        {/* Focusing Effect */}
                        <div
                            className="absolute inset-0 bg-white/40 md:bg-white opacity-0 md:mix-blend-overlay animate-[flash_1.5s_ease-out_infinite]"
                            style={{ animationDelay: `${i * 0.4}s` }}
                        />

                        {/* Alignment Marker */}
                        <div className="absolute inset-0 border-[0.5px] border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                            <div className="w-2 h-[0.5px] bg-cyan-500" />
                            <div className="h-2 w-[0.5px] bg-cyan-500 absolute" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress & Consistency */}
            <div className="mt-auto space-y-2">
                <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                    <span>Continuity check</span>
                    <span className="text-white">3 of 4 shots approved</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-cyan-500 relative"
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                    </motion.div>
                </div>
            </div>

            {/* GPU Stats */}
            <div className="flex gap-4 text-[9px] font-mono text-gray-600 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1"><Layers size={10} /> CHARACTER SHEET v2</span>
                <span className="flex items-center gap-1"><Lock size={10} /> LOOK LOCKED</span>
            </div>
        </div>
    );
}

// --- 4. Client Review Interface (Genreline portal) ---
function ReviewInterface() {
    const notes = [
        { tc: '00:00:12:04', note: 'Title card lands two frames early.', by: 'Brand lead' },
        { tc: '00:00:42:10', note: 'Hold the product shot half a second longer.', by: 'Marketing' },
    ];
    const chain = ['Creative review', 'Brand review', 'Legal review'];

    return (
        <div className="h-full flex flex-col gap-4 text-xs">
            <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-gray-400">BRAND FILM · CUT v4</span>
                <span className="flex items-center gap-1 text-[#E0C06A] bg-[#CBA54D]/10 border border-[#CBA54D]/25 px-2 py-0.5 rounded">
                    <BadgeCheck size={10} /> APPROVED
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <div className="space-y-2">
                    {notes.map((n) => (
                        <div key={n.tc} className="flex gap-3 items-start bg-white/[0.03] border border-white/5 rounded p-2">
                            <span className="font-mono text-[10px] text-[#E0C06A] pt-0.5 shrink-0">{n.tc}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-300 leading-snug">{n.note}</p>
                                <p className="text-[10px] text-gray-500 mt-1">{n.by} · <span className="text-emerald-400/80">Resolved</span></p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="sm:w-40 space-y-2 sm:border-l sm:border-white/5 sm:pl-4">
                    <div className="text-[9px] uppercase tracking-wider text-gray-500">Chain of review</div>
                    {chain.map((stage, i) => (
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle2 size={12} className="text-emerald-400/80 shrink-0" />
                            <span className="text-gray-300">{stage}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5 font-mono text-[9px] text-gray-500">
                <span>CERTIFICATE ISSUED · RECORD KEPT</span>
                <span className="flex items-center gap-1.5">
                    MCPRIME CLIENT PORTAL ·
                    <Image src="/platform/genreline-mark-gold.png" alt="" width={512} height={407} className="h-3 w-auto" />
                    <span className="text-gray-300 font-sans text-[10px] tracking-normal">Genreline</span>
                </span>
            </div>
        </div>
    );
}

// Bar heights for the still audio waveform
const WAVEFORM = [0.35, 0.8, 0.5, 1, 0.6, 0.9, 0.4, 0.7, 0.55, 0.85];

// --- 3. Post-Production Interface ---
function PostProduction() {
    const pipelineAssets = [
        "/filmmaking/father-son-man-utd.png",
        "/filmmaking/astronaut-plants.png",
        "/filmmaking/workplace-meeting.png",
        "/filmmaking/f1-race.png"
    ];

    return (
        <div className="h-full flex flex-col gap-3"> {/* Reduced gap */}
            {/* Main Viewer & Scopes */}
            <div className="flex gap-4 h-24"> {/* Reduced height: h-32 -> h-24 */}
                <div className="flex-1 bg-black/40 rounded border border-white/5 relative overflow-hidden group">
                    {/* Animated Imagery (Video Viewer) - ACTUAL VIDEO ASSET */}
                    <InViewVideo
                        src="/filmmaking/mv-scene.mp4"
                        poster="/filmmaking/mv-scene.jpg"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 contrast-110 saturate-100"
                    />

                    {/* Secondary Layer for "Depth" / Chromatic Shake (Simulates 3D Edge) - KEEPING FOR DEPTH BUT REDUCED OPACITY */}
                    <div className="absolute inset-0 w-full h-full scale-105 md:mix-blend-overlay opacity-20 pointer-events-none animate-[drift_8s_ease-in-out_infinite]">
                        {/* Soft chromatic haze; a second video decoder for a 96px panel was not worth it */}
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.35),transparent_70%)]" />
                    </div>

                    {/* Active Scanning Overlay */}
                    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                        <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur px-1.5 py-0.5 rounded border border-white/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[8px] font-mono text-red-400 tracking-wider">REC: 00:14:23</span>
                            </div>
                            <span className="text-[7px] font-mono text-white/40">ISO 800 • f/2.8 • 1/50</span>
                        </div>

                        {/* Dynamic Focus Bracket */}
                        <div className="absolute w-16 h-16 border border-white/20 rounded-lg flex items-center justify-center animate-[focus-sweep_5s_ease-in-out_infinite_alternate]">
                            <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        </div>
                    </div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 opacity-10 z-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="w-20 bg-black/40 rounded border border-white/5 p-2 flex flex-col gap-2 justify-center items-center">
                    {/* Color Wheel Simulation */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 opacity-50 blur-[1px] animate-[spin_20s_linear_infinite]" />
                    <div className="w-full h-6 flex gap-[1px] items-end justify-center opacity-50">
                        {[62, 38, 85, 47, 70, 55].map((h, i) => <div key={i} className="w-1 bg-white/40" style={{ height: `${h}%` }} />)}
                    </div>
                </div>
            </div>

            {/* Timeline Tracks */}
            <div className="flex-1 space-y-1 relative"> {/* Tighter spacing */}
                {/* Playhead: travels the middle 80% of the tracks by translating, so no layout runs per frame */}
                <div className="absolute top-[-4px] bottom-0 left-[10%] w-[80%] z-20 pointer-events-none">
                    <div className="h-full w-full animate-[sweep-x_5s_linear_infinite]">
                        <div className="relative h-full w-[1px] bg-rose-500">
                            <div className="w-2 h-2 bg-rose-500 absolute top-0 -left-[3.5px] transform rotate-45" />
                        </div>
                    </div>
                </div>

                {/* Video Track */}
                <div className="h-6 bg-white/5 rounded border border-white/5 relative overflow-hidden">
                    <span className="absolute left-2 top-1 text-[8px] text-gray-500 font-mono z-10">V1_MAIN</span>
                    {/* Video Strips - CONSISTENT PIPELINE ASSETS */}
                    <div className="flex h-full ml-10 gap-[1px]">
                        {pipelineAssets.map((src, i) => (
                            <div key={i} className="h-full flex-1 bg-rose-500/10 border-r border-black/50 relative overflow-hidden">
                                <Image src={src} alt="" fill sizes="80px" className="object-cover opacity-30" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audio Track */}
                <div className="h-6 bg-white/5 rounded border border-white/5 relative overflow-hidden flex items-center">
                    <span className="absolute left-2 text-[8px] text-gray-500 font-mono">A1_SFX</span>
                    <div className="ml-10 flex h-3 items-center gap-[2px] w-full px-2 opacity-50">
                        {/* A still waveform on phones (forty moving bars kept the main thread busy); it bounces on desktop */}
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="w-[3px] h-3.5 bg-rose-400/50 rounded-full md:animate-[eq_0.5s_linear_infinite]"
                                style={{ transform: `scaleY(${WAVEFORM[i % WAVEFORM.length]})`, animationDelay: `-${i * 0.02}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Render Queue */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex gap-3 text-[9px] text-gray-500 font-mono">
                    <span className="text-white">QUEUE: 3 ITEMS</span>
                    <span>EST: 04:20</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] text-rose-500 animate-pulse">RENDERING</span>
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full origin-left bg-rose-500 animate-[fill-x_8s_linear_infinite]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
