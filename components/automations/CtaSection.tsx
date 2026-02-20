'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CtaSection() {
    return (
        <section id="contact-automations" className="py-24 md:py-32 relative bg-[#020202] text-white overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* --- LEFT: TEXT CONTENT --- */}
                    <div className="lg:w-1/2 space-y-10">
                        <div>
                            <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">Schedule Your Call With Bond</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 uppercase">
                                SCHEDULE A SYSTEMS <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AUDIT CALL</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                A structured consultation designed to evaluate operational inefficiencies, integration opportunities, and automation feasibility within your organization.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">THIS SESSION IS APPROPRIATE IF:</h3>

                            <ul className="space-y-6">
                                {[
                                    "Your workflows rely heavily on manual coordination",
                                    "Repetitive tasks are consuming team capacity",
                                    "You are scaling but processes are not keeping up",
                                    "CRM or internal tools are not fully integrated",
                                    "You suspect automation opportunities but lack clarity on priorities",
                                    "You need validation before investing in new systems",
                                    "Your team is spending time on tasks that should be automated",
                                    "Data is scattered across platforms and lacks visibility",
                                    "You want a structured roadmap rather than isolated tools",
                                    "You are unsure how AI fits into your current operations"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-900/20 transition-colors mt-1">
                                            <CheckCircle2 size={14} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                                        </div>
                                        <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* --- RIGHT: FORM --- */}
                    <div className="lg:w-1/2">
                        <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl p-8 md:p-12 hover:border-emerald-500/30 hover:shadow-[0_0_80px_rgba(16,185,129,0.15)] transition-all duration-700 group/form overflow-hidden">

                            {/* Premium Glow Effects */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                            {/* Form Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
                                Optimize Your Operational Infrastructure
                            </h3>

                            <ul className="space-y-4 mb-8 relative z-10">
                                {[
                                    "Comprehensive workflow audit",
                                    "Custom automation architecture design",
                                    "Controlled integration and validation",
                                    "Measurable efficiency and performance improvements"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400 font-light">
                                        <div className="mt-1 p-1 rounded-full bg-emerald-500/10 shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <form className="space-y-6 relative z-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-emerald-400/80 ml-1 uppercase tracking-wider">Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-950/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-emerald-400/80 ml-1 uppercase tracking-wider">Company</label>
                                        <input
                                            type="text"
                                            placeholder="Acme Inc."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-950/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-emerald-400/80 ml-1 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-950/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-emerald-400/80 ml-1 uppercase tracking-wider">Message</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Tell us about your automation needs..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-950/10 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <button className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/20">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                                        REQUEST A SYSTEMS ASSESSMENT <ArrowRight size={18} />
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
