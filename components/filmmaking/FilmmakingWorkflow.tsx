'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FileText, Video, Film, Music, Mic, Layers, CheckCircle2, MoreHorizontal, Play, Settings, RefreshCw, Smartphone, Monitor, ChevronRight, Hash, Eye, Zap, Command, Clock } from 'lucide-react';

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
        title: "Hollywood-Level Post-Production",
        desc: "Professional editing, advanced color grading, cinematic sound design, and custom music production shape the final narrative."
    },
    {
        number: "05",
        title: "Deployment-Ready Asset Structuring",
        desc: "Final outputs are formatted for multiple platforms, campaign variations, and automated distribution pipelines."
    }
];

export default function FilmmakingWorkflow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative py-12 md:py-24 min-h-screen bg-[#0B0D12] overflow-hidden perspective-1000">
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

            {/* --- Layer 4: Ambient Reactive Lighting --- */}
            <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#2D6BFF]/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
            <div className="absolute bottom-1/3 left-[-200px] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />


            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* --- LEFT COLUMN: Interactive Timeline (40%) --- */}
                    <div className="lg:w-[40%] relative">
                        <div className="sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-16"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-[0.9]">
                                    PRODUCTION<br />REBUILT AS A<br /><span className="text-[#2D6BFF]">DIGITAL SYSTEM</span>
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                    Traditional production depends on physical locations, large crews, and manual coordination. Our model replaces that structure with an AI-native production architecture that accelerates development, reduces friction, and maintains high creative standards.
                                </p>
                            </motion.div>

                            <div className="relative pl-10 border-l border-white/5">
                                {/* Filling Connector Line */}
                                <motion.div
                                    style={{ scaleY, transformOrigin: "top" }}
                                    className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#2D6BFF] shadow-[0_0_15px_rgba(45,107,255,0.5)]"
                                />

                                <div className="space-y-16">
                                    {workflowSteps.map((step, i) => (
                                        <WorkflowStep key={i} step={step} index={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Staggered Glass Engines (60%) --- */}
                    <div className="lg:w-[60%] relative flex flex-col gap-8 pt-0">  {/* REDUCED VERTICAL GAP: gap-12 -> gap-8 */}

                        {/* Module 1: Script Logic */}
                        <GlassModule
                            title="SCRIPT_LOGIC_CORE"
                            color="border-indigo-500/50"
                            glow="shadow-indigo-500/10"
                            connectorColor="#6366f1"
                            delay={0.1}
                        >
                            <ScriptInterface />
                        </GlassModule>

                        {/* Module 2: Generative Pipeline */}
                        <GlassModule
                            title="GENERATIVE_PIPELINE_V4"
                            color="border-cyan-500/50"
                            glow="shadow-cyan-500/10"
                            connectorColor="#06b6d4"
                            delay={0.2}
                        >
                            <GenerativePipeline />
                        </GlassModule>

                        {/* Module 3: Post-Processing */}
                        <GlassModule
                            title="POST_PROCESSING_MASTER"
                            color="border-rose-500/50"
                            glow="shadow-rose-500/10"
                            connectorColor="#f43f5e"
                            delay={0.3}
                        >
                            <PostProduction />
                        </GlassModule>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
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
function WorkflowStep({ step, index }: { step: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    return (
        <motion.div
            ref={ref}
            animate={{
                opacity: isInView ? 1 : 0.3,
                x: isInView ? 10 : 0,
                scale: isInView ? 1.05 : 1
            }}
            transition={{ duration: 0.5 }}
            className="group relative"
        >
            <div className={`absolute -left-[45px] top-1 flex items-center justify-center w-6 h-6 rounded-full border transition-colors duration-500 ${isInView ? 'bg-[#0B0D12] border-[#2D6BFF] shadow-[0_0_10px_#2D6BFF]' : 'bg-[#0B0D12] border-white/10'}`}>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isInView ? 'bg-[#2D6BFF]' : 'bg-white/20'}`} />
            </div>

            <span className={`block text-4xl font-light mb-2 font-mono transition-colors duration-500 ${isInView ? 'text-[#2D6BFF]' : 'text-white/20'}`}>
                {step.number}
            </span>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isInView ? 'text-white' : 'text-gray-500'}`}>
                {step.title}
            </h3>
            <div className={`overflow-hidden transition-all duration-700 ${isInView ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                    {step.desc}
                </p>
            </div>
        </motion.div>
    );
}

// --- Right Column Glass Module Container ---
function GlassModule({ children, title, color, glow, connectorColor, delay }: any) {
    return (
        <div className="relative pl-8">
            {/* Connecting Workflow Line */}
            <div className="absolute left-0 top-[-60px] bottom-[-60px] w-[1px] bg-white/5 mx-auto">
                <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1.5, delay: delay }}
                    className="w-full bg-gradient-to-b from-transparent via-current to-transparent opacity-50"
                    style={{ color: connectorColor }}
                />
            </div>
            <div className="absolute left-[-4px] top-1/2 w-2 h-2 rounded-full box-content border-4 border-[#0B0D12]" style={{ backgroundColor: connectorColor }} />


            <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: delay, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -5, rotateX: 2, scale: 1.01 }}
                className={`relative group bg-[#0F1115]/80 backdrop-blur-2xl border border-white/5 rounded-xl overflow-hidden shadow-2xl ${glow}`}
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
                    <span className="text-gray-400">SCENE_02: DREAM_vs_REALITY ( CONFLICT )</span>
                    <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-[9px]">
                        <CheckCircle2 size={10} /> VALIDATED
                    </span>
                </div>

                <div className="space-y-3 font-sans opacity-90">
                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-mono pt-1">01</span>
                        <p className="text-gray-300 leading-relaxed bg-white/5 p-2 rounded w-full border border-white/5">
                            Camera dollies forward through all the 4 flash moments. Father and son excited at Man utd game, astronaut asp flash, office meeting intro,  F1  drift as ....
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-mono pt-1">02</span>
                        <div className="relative w-full">
                            <p className="text-gray-300 leading-relaxed bg-white/5 p-2 rounded w-full border border-white/5">
                                The subject turns, revealing the interface. <span className="bg-indigo-500/20 text-indigo-200 px-1">Macro focus</span> on the retina scan. Camera pans ....
                            </p>
                            {/* Cursor */}
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="absolute inline-block w-0.5 h-4 bg-indigo-500 ml-1 top-3"
                            />
                        </div>
                    </div>
                </div>

                {/* Simulated Metadata */}
                <div className="absolute bottom-0 w-full flex gap-4 text-[9px] text-gray-600 font-mono">
                    <span>TOKENS: 4,210</span>
                    <span>TEMP: 0.7</span>
                    <span className="text-indigo-400">CONTEXT_WINDOW: ACTIVE</span>
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
                    <span className="text-cyan-400">OPTIMIZING_TENSORS</span>
                </div>
                <span className="text-gray-500">BATCH_ID: #9928-AX</span>
            </div>

            {/* Sequence Thumbnails with Real Imagery - ASPECT SQUARE for REDUCED HEIGHT */}
            <div className="grid grid-cols-4 gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                {thumbnails.map((src, i) => (
                    <div key={i} className="relative aspect-square bg-[#0B0D12] rounded border border-white/10 overflow-hidden group">
                        {/* Real Image Content */}
                        <img
                            src={src}
                            alt={`Gen ${i}`}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-500/50 rounded-full group-hover:bg-cyan-400 transition-colors z-10" />

                        {/* Focusing Effect */}
                        <motion.div
                            animate={{ opacity: [0.3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                            className="absolute inset-0 bg-white mix-blend-overlay"
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
                    <span>Coherence Score</span>
                    <span className="text-white">98.4%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-cyan-500 relative"
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                    </motion.div>
                </div>
            </div>

            {/* GPU Stats */}
            <div className="flex gap-4 text-[9px] font-mono text-gray-600 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1"><Monitor size={10} /> H100_CLUSTER: ONLINE</span>
                <span className="flex items-center gap-1"><Zap size={10} /> LATENCY: 42ms</span>
            </div>
        </div>
    );
}

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
                    <video
                        src="/filmmaking/mv scene.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-80 contrast-110 saturate-100"
                    />

                    {/* Secondary Layer for "Depth" / Chromatic Shake (Simulates 3D Edge) - KEEPING FOR DEPTH BUT REDUCED OPACITY */}
                    <motion.div
                        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-20 pointer-events-none"
                        initial={{ scale: 1.05 }}
                        animate={{
                            x: [0, 2, -1, 1, 0],
                            y: [0, -1, 1, -1, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1]
                        }}
                    >
                        <video
                            src="/filmmaking/mv scene.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover filter blur-[2px]"
                        />
                    </motion.div>

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
                        <motion.div
                            animate={{
                                x: ["20%", "60%", "40%"],
                                y: ["30%", "40%", "20%"],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-16 h-16 border border-white/20 rounded-lg flex items-center justify-center"
                        >
                            <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        </motion.div>
                    </div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 opacity-10 z-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="w-20 bg-black/40 rounded border border-white/5 p-2 flex flex-col gap-2 justify-center items-center">
                    {/* Color Wheel Simulation */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 opacity-50 blur-[1px]"
                    />
                    <div className="w-full h-6 flex gap-[1px] items-end justify-center opacity-50">
                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-1 bg-white/40" style={{ height: `${Math.random() * 100}%` }} />)}
                    </div>
                </div>
            </div>

            {/* Timeline Tracks */}
            <div className="flex-1 space-y-1 relative"> {/* Tighter spacing */}
                {/* Playhead */}
                <motion.div
                    animate={{ left: ["10%", "90%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-4px] bottom-0 w-[1px] bg-rose-500 z-20"
                >
                    <div className="w-2 h-2 bg-rose-500 absolute top-0 -left-[3.5px] transform rotate-45" />
                </motion.div>

                {/* Video Track */}
                <div className="h-6 bg-white/5 rounded border border-white/5 relative overflow-hidden">
                    <span className="absolute left-2 top-1 text-[8px] text-gray-500 font-mono z-10">V1_MAIN</span>
                    {/* Video Strips - CONSISTENT PIPELINE ASSETS */}
                    <div className="flex h-full ml-10 gap-[1px]">
                        {pipelineAssets.map((src, i) => (
                            <div key={i} className="h-full flex-1 bg-rose-500/10 border-r border-black/50 relative overflow-hidden">
                                <img src={src} className="w-full h-full object-cover opacity-30" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audio Track */}
                <div className="h-6 bg-white/5 rounded border border-white/5 relative overflow-hidden flex items-center">
                    <span className="absolute left-2 text-[8px] text-gray-500 font-mono">A1_SFX</span>
                    <div className="ml-10 flex h-3 items-center gap-[2px] w-full px-2 opacity-50">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 12, 6, 14, 4] }}
                                transition={{ duration: 0.5, delay: i * 0.02, repeat: Infinity }}
                                className="w-[3px] bg-rose-400/50 rounded-full"
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
                        <motion.div
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                            className="h-full bg-rose-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
