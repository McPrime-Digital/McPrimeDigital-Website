'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Zap,
    FileText,
    Users,
    GitMerge,
    RefreshCw,
    Send,
    Database,
    Mic,
    Code2,
    Smartphone,
    Layers
} from 'lucide-react';

export default function RoiSection() {
    const [isConnecting, setIsConnecting] = useState(false);

    return (
        <section className="py-24 sm:py-32 relative bg-[#050505] text-white overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* --- STATS ROW --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-b border-white/5 pb-12">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left md:border-r border-white/10 last:border-0 px-4">
                        <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">82%</span>
                        <p className="text-gray-400 text-sm max-w-[200px]">of companies discover new AI opportunities within the first audit.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left md:border-r border-white/10 last:border-0 px-4">
                        <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">41%</span>
                        <p className="text-gray-400 text-sm max-w-[200px]">savings on development spend through strategic AI due diligence.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left px-4">
                        <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">4.7x</span>
                        <p className="text-gray-400 text-sm max-w-[200px]">higher ROI on AI projects built with our audit-first framework.</p>
                    </div>
                </div>

                {/* --- HEADER --- */}
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">What We Deliver</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
                        Automation Is Infrastructure — <span className="text-indigo-400 drop-shadow-[0_0_25px_rgba(129,140,248,0.4)]">Not a Shortcut</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Automation is often deployed as a collection of disconnected tools. We design structured systems that integrate with your existing environment, maintain governance standards, and operate within defined accountability frameworks.
                    </p>
                    <p className="text-xl text-gray-400 leading-relaxed mt-6">
                        Every workflow is mapped before implementation. Every integration is validated before deployment.
                    </p>
                </div>

                {/* --- CARDS GRID --- */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Card 1: Complete AI Opportunity Report */}
                    <div className="group relative rounded-3xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl p-8 hover:bg-[#0a0a0a]/80 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <h3 className="text-2xl font-bold mb-4">Complete AI Opportunity Report</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 h-12">
                            A clear breakdown of your business processes showing exactly where AI can bring the strongest and fastest ROI.
                        </p>

                        {/* Visual: Stacked List */}
                        <div className="space-y-4 relative">
                            {/* Item 1 */}
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group/item transition-colors duration-300 hover:bg-white/10 hover:border-white/20">
                                <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-gray-400 group-hover/item:text-white transition-colors">
                                    <LayoutDashboard size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white">Map all Workflows</div>
                                    <div className="text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors">Visualize business operations</div>
                                </div>
                                <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">NEW</span>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group/item transition-colors duration-300 hover:bg-white/10 hover:border-white/20">
                                <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-gray-400 group-hover/item:text-white transition-colors">
                                    <Zap size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white">Add AI Touchpoints</div>
                                    <div className="text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors">Spot automation opportunities</div>
                                </div>
                                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">LINK</span>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group/item opacity-60 hover:opacity-100 transition-all duration-300">
                                <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-gray-400 group-hover/item:text-white transition-colors">
                                    <FileText size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white">Generate Insights Report</div>
                                    <div className="text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors">See ROI projections</div>
                                </div>
                                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">UPDATED</span>
                            </div>
                        </div>
                    </div>


                    {/* Card 2: Adoption Blueprint */}
                    <div className="group relative rounded-3xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl p-8 hover:bg-[#0a0a0a]/80 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <h3 className="text-2xl font-bold mb-4">Adoption Blueprint</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 h-12">
                            A practical roadmap that outlines how AI fits into your workflows and helps your team embrace it with ease.
                        </p>

                        {/* Visual: Flow Chart */}
                        <div className="relative h-64 flex flex-col items-center justify-center gap-6">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-10 right-10 h-[1px] border-t border-dashed border-white/20 -z-10 hidden md:block group-hover:border-white/40 transition-colors duration-500" />

                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <div className="px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs text-gray-300 flex items-center gap-2 group-hover:border-indigo-500/50 group-hover:bg-indigo-900/10 group-hover:text-white transition-all duration-300">
                                    <Users size={14} className="group-hover:text-indigo-400 transition-colors" /> Align team
                                </div>
                                <div className="px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs text-gray-300 flex items-center gap-2 group-hover:border-purple-500/50 group-hover:bg-purple-900/10 group-hover:text-white transition-all duration-300 delay-75">
                                    <GitMerge size={14} className="group-hover:text-purple-400 transition-colors" /> Design Workflow
                                </div>
                            </div>

                            {/* Central Active Node */}
                            <div className="relative z-10 p-1 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(129,140,248,0.3)] group-hover:shadow-[0_0_50px_rgba(129,140,248,0.6)] transition-all duration-500">
                                <div className="bg-black rounded-lg p-2">
                                    <RefreshCw size={24} className="text-indigo-400 animate-spin-slow group-hover:text-white transition-colors" />
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <div className="px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs text-gray-300 flex items-center gap-2 group-hover:border-blue-500/50 group-hover:bg-blue-900/10 group-hover:text-white transition-all duration-300 delay-100">
                                    <RefreshCw size={14} className="group-hover:text-blue-400 transition-colors" /> Feedback loop
                                </div>
                                <div className="px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs text-gray-300 flex items-center gap-2 group-hover:border-emerald-500/50 group-hover:bg-emerald-900/10 group-hover:text-white transition-all duration-300 delay-150">
                                    <Send size={14} className="group-hover:text-emerald-400 transition-colors" /> Rollout plan
                                </div>
                            </div>

                            {/* Bottom Note */}
                            <div className="w-full mt-4 px-4 py-2 border border-white/5 bg-white/5 rounded-lg text-center text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                Continuous improvement plan.
                            </div>
                        </div>
                    </div>


                    {/* Card 3: Custom Built AI Solutions */}
                    <div
                        onMouseEnter={() => setIsConnecting(true)}
                        onMouseLeave={() => setIsConnecting(false)}
                        onClick={() => setIsConnecting(!isConnecting)}
                        className="group relative rounded-3xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl p-8 hover:bg-[#0a0a0a]/80 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <h3 className="text-2xl font-bold mb-4">Custom Built AI Solutions</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 h-12">
                            Tailored systems designed around your existing tools that scale effortlessly and deliver measurable business results.
                        </p>

                        {/* Visual: Central Hub */}
                        <div className="relative h-64 flex items-center justify-center">

                            {/* SVG Overlay for connecting lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* 5 Lines connecting center (50% 50%) to 5 satellites ! */}
                                {/* Top Satellite */}
                                <line x1="50%" y1="50%" x2="50%" y2="15%" stroke={isConnecting ? "url(#lineGradActive)" : "url(#lineGrad)"} strokeWidth={isConnecting ? "3" : "2"}
                                    className={`transition-all duration-700 ease-out ${isConnecting ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ strokeDasharray: 100, strokeDashoffset: isConnecting ? 0 : 100 }}
                                />
                                {/* Top-Right */}
                                <line x1="50%" y1="50%" x2="85%" y2="35%" stroke={isConnecting ? "url(#lineGradActive)" : "url(#lineGrad)"} strokeWidth={isConnecting ? "3" : "2"}
                                    className={`transition-all duration-700 ease-out ${isConnecting ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ strokeDasharray: 100, strokeDashoffset: isConnecting ? 0 : 100, transitionDelay: '100ms' }}
                                />
                                {/* Bottom-Right */}
                                <line x1="50%" y1="50%" x2="75%" y2="80%" stroke={isConnecting ? "url(#lineGradActive)" : "url(#lineGrad)"} strokeWidth={isConnecting ? "3" : "2"}
                                    className={`transition-all duration-700 ease-out ${isConnecting ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ strokeDasharray: 100, strokeDashoffset: isConnecting ? 0 : 100, transitionDelay: '200ms' }}
                                />
                                {/* Bottom-Left */}
                                <line x1="50%" y1="50%" x2="25%" y2="80%" stroke={isConnecting ? "url(#lineGradActive)" : "url(#lineGrad)"} strokeWidth={isConnecting ? "3" : "2"}
                                    className={`transition-all duration-700 ease-out ${isConnecting ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ strokeDasharray: 100, strokeDashoffset: isConnecting ? 0 : 100, transitionDelay: '300ms' }}
                                />
                                {/* Top-Left */}
                                <line x1="50%" y1="50%" x2="15%" y2="35%" stroke={isConnecting ? "url(#lineGradActive)" : "url(#lineGrad)"} strokeWidth={isConnecting ? "3" : "2"}
                                    className={`transition-all duration-700 ease-out ${isConnecting ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ strokeDasharray: 100, strokeDashoffset: isConnecting ? 0 : 100, transitionDelay: '400ms' }}
                                />
                            </svg>

                            {/* Orbit Rings */}
                            <div className={`absolute w-56 h-56 border border-white/5 rounded-full transition-all duration-700 ${isConnecting ? 'border-cyan-400/30 scale-105' : ''}`} />
                            <div className={`absolute w-36 h-36 border border-white/10 rounded-full transition-all duration-700 ${isConnecting ? 'border-indigo-400/40 scale-95' : ''}`} />

                            {/* 5 Satellites - Custom active colors for each */}

                            {/* Top (Database) */}
                            <div className={`absolute top-2 left-1/2 -translate-x-1/2 p-3 rounded-full border transition-all duration-500 z-10 ${isConnecting ? 'bg-emerald-900/60 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-110' : 'bg-black/50 border-white/10 text-gray-500'}`}>
                                <Database size={20} />
                            </div>

                            {/* Top-Right (Layers) */}
                            <div className={`absolute top-[25%] right-[5%] p-3 rounded-full border transition-all duration-500 z-10 ${isConnecting ? 'bg-cyan-900/60 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.7)] scale-110 transition-delay-100' : 'bg-black/50 border-white/10 text-gray-500'}`}>
                                <Layers size={20} />
                            </div>

                            {/* Bottom-Right (Code) */}
                            <div className={`absolute bottom-[10%] right-[15%] p-3 rounded-full border transition-all duration-500 z-10 ${isConnecting ? 'bg-purple-900/60 border-purple-400 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.7)] scale-110 transition-delay-200' : 'bg-black/50 border-white/10 text-gray-500'}`}>
                                <Code2 size={20} />
                            </div>

                            {/* Bottom-Left (Smartphone) */}
                            <div className={`absolute bottom-[10%] left-[15%] p-3 rounded-full border transition-all duration-500 z-10 ${isConnecting ? 'bg-blue-900/60 border-blue-400 text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.7)] scale-110 transition-delay-300' : 'bg-black/50 border-white/10 text-gray-500'}`}>
                                <Smartphone size={20} />
                            </div>

                            {/* Top-Left (Mic) */}
                            <div className={`absolute top-[25%] left-[5%] p-3 rounded-full border transition-all duration-500 z-10 ${isConnecting ? 'bg-rose-900/60 border-rose-400 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.7)] scale-110 transition-delay-400' : 'bg-black/50 border-white/10 text-gray-500'}`}>
                                <Mic size={20} />
                            </div>

                            {/* Central Core */}
                            <div className={`relative z-20 w-28 h-28 bg-black rounded-2xl border flex items-center justify-center shadow-2xl transition-all duration-500 ${isConnecting ? 'border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.6)]' : 'border-white/10'}`}>
                                <div className={`absolute -top-8 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest flex items-center gap-2 transition-all duration-300 ${isConnecting ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 border border-cyan-400/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'bg-indigo-900/40 border border-indigo-500/30 text-indigo-300'}`}>
                                    <span className={`w-2 h-2 rounded-full ${isConnecting ? 'bg-white shadow-[0_0_8px_white]' : 'bg-indigo-400 animate-pulse'}`} />
                                    {isConnecting ? 'ACTIVE' : 'STANDBY'}
                                </div>
                                {/* Chip Grid */}
                                <div className="grid grid-cols-4 gap-1 opacity-50">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className={`w-1 h-1 rounded-full transition-colors duration-300 ${isConnecting ? 'bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,0.8)]' : (i % 3 === 0 ? 'bg-indigo-500' : 'bg-gray-600')}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
