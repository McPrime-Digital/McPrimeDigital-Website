'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Network, Zap, Lock, Database, RefreshCw } from 'lucide-react';

const systems = [
    {
        id: 'neural',
        title: "Neural Core",
        icon: Brain,
        color: "text-cyan-400",
        bg: "bg-cyan-500/20",
        border: "border-cyan-500/50",
        desc: "Advanced decision engines that process data in real-time."
    },
    {
        id: 'workflow',
        title: "Workflow Sync",
        icon: Network,
        color: "text-purple-400",
        bg: "bg-purple-500/20",
        border: "border-purple-500/50",
        desc: "Autonomous agents handling complex cross-platform tasks."
    },
    {
        id: 'scale',
        title: "Auto-Scale",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-500/20",
        border: "border-amber-500/50",
        desc: "Infrastructure that grows instantly with your demand."
    },
    {
        id: 'security',
        title: "Sentinel Guard",
        icon: Lock,
        color: "text-emerald-400",
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/50",
        desc: "AI-driven threat detection and automated compliance."
    },
    {
        id: 'data',
        title: "Data Nexus",
        icon: Database,
        color: "text-rose-400",
        bg: "bg-rose-500/20",
        border: "border-rose-500/50",
        desc: "Unified data warehousing with predictive analytics."
    }
];

export default function AiSystemsInteractive() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden py-10">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-900/20 to-transparent opacity-50" />

            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">

                {/* Central Hub */}
                <div
                    className="relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl flex items-center justify-center cursor-pointer group hover:border-cyan-500/50 transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    onMouseEnter={() => setActiveId('hub')}
                    onMouseLeave={() => setActiveId(null)}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 animate-pulse-slow" />
                    <RefreshCw className={`w-12 h-12 md:w-16 md:h-16 text-white/80 transition-transform duration-700 ${activeId ? 'rotate-180 text-cyan-400' : ''}`} />
                    <div className="absolute -bottom-10 text-xs md:text-sm font-bold tracking-widest text-gray-500 uppercase">McPrime AI Core</div>
                </div>

                {/* Orbiting Satellites */}
                {systems.map((sys, index) => {
                    // Calculate position in a circle (pentagon)
                    const angle = (index * (360 / systems.length)) - 90; // Start from top
                    const radius = 240; // Distance from center
                    const isActive = activeId === 'hub' || activeId === sys.id;

                    // Simple trig for positioning (responsive radius could be added)
                    // We'll use CSS transforms for simplicity in positioning

                    return (
                        <div
                            key={sys.id}
                            className="absolute flex items-center justify-center"
                            style={{
                                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                            }}
                        >
                            {/* Connecting Line (Only visible when hovering Center or Self) */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0" style={{ transform: `rotate(${angle}deg)` }}>
                                <motion.line
                                    x1="250" y1="250"
                                    x2="250" y2={250 - radius + 50} // 60 is approx half node size
                                    stroke={isActive ? "url(#gradient-line)" : "rgba(255,255,255,0.05)"}
                                    strokeWidth={isActive ? 2 : 1}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: isActive ? 1 : 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                                <defs>
                                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Node Card */}
                            <motion.div
                                className={`
                                    relative z-20 w-48 p-4 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md
                                    flex flex-col items-center text-center gap-3
                                    ${isActive
                                        ? `${sys.bg} ${sys.border} shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-110`
                                        : 'bg-black/60 border-white/10 hover:bg-white/5'
                                    }
                                `}
                                onMouseEnter={() => setActiveId(sys.id)}
                                onMouseLeave={() => setActiveId(null)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: isActive ? 1.1 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <sys.icon className={`w-8 h-8 ${isActive ? sys.color : 'text-gray-400'} transition-colors`} />
                                <div>
                                    <h4 className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-300'}`}>{sys.title}</h4>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-[10px] text-gray-300 mt-2 leading-tight"
                                            >
                                                {sys.desc}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Fallback (Hidden on Desktop) */}
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black md:hidden p-4 text-center">
                <p className="text-gray-500 mb-4">View on Desktop for Interactive Experience</p>
                <div className="grid grid-cols-1 gap-4 w-full">
                    {systems.map((sys) => (
                        <div key={sys.id} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-4">
                            <sys.icon className={`w-6 h-6 ${sys.color}`} />
                            <span className="text-sm font-bold text-white">{sys.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
