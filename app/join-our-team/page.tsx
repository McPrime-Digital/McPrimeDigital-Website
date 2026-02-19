'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function JoinOurTeamPage() {
    return (
        <main className="min-h-screen bg-[#121212] text-white font-sans selection:bg-indigo-500/30">
            {/* HERO SECTION */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5 bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
                <div className="max-w-4xl mx-auto text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-gray-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight tracking-tight text-white">
                            Careers at McPrime Digital
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            We build structured systems for production and automation. We recruit accordingly.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTIONS GRID */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-20 divide-y divide-white/5">

                {/* SECTION 1 — Who We Look For */}
                <section className="py-16 first:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-8">
                            Who We Look For
                        </h2>
                        <h3 className="text-2xl font-semibold text-white mb-6">We look for professionals who operate with structure, precision, and accountability.</h3>
                        <ul className="space-y-4 text-gray-400 font-light leading-relaxed">
                            {[
                                "Think in systems rather than isolated tasks",
                                "Document processes clearly and communicate with discipline",
                                "Understand AI-native workflows and modern production environments",
                                "Approach problems analytically, not reactively",
                                "Prioritize measurable outcomes over activity",
                                "Work independently while respecting defined frameworks",
                                "Maintain confidentiality and operational integrity",
                                "Value clarity, execution speed, and professional standards"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="mr-4 text-indigo-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 block shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </section>

                {/* SECTION 2 — Working Model */}
                <section className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-8">
                            Working Model
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300 font-light">
                            <li className="flex items-center gap-3 border-l sm:border-l-2 border-white/10 pl-4 py-1">
                                Remote-first collaboration
                            </li>
                            <li className="flex items-center gap-3 border-l sm:border-l-2 border-white/10 pl-4 py-1">
                                Project-based execution
                            </li>
                            <li className="flex items-center gap-3 border-l sm:border-l-2 border-white/10 pl-4 py-1">
                                Structured deliverables
                            </li>
                            <li className="flex items-center gap-3 border-l sm:border-l-2 border-white/10 pl-4 py-1">
                                Defined performance standards
                            </li>
                            <li className="flex items-center gap-3 border-l sm:border-l-2 border-white/10 pl-4 py-1 md:col-span-2">
                                Documentation-driven workflows
                            </li>
                        </ul>
                    </motion.div>
                </section>

                {/* SECTION 3 — Current Openings */}
                <section className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-8">
                            Current Openings
                        </h2>
                        <div className="bg-white/5 rounded-lg p-8 border border-white/5">
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                We review applications on a rolling basis for the following disciplines:
                            </p>
                            <ul className="space-y-2 mb-8 text-white font-medium">
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-indigo-500" /> Traditional Cinematographer
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-indigo-500" /> Automations Auditor
                                </li>
                                <li className="flex items-center gap-2 opacity-70">
                                    <ArrowRight className="w-4 h-4 text-gray-500" /> AI production specialists
                                </li>
                                <li className="flex items-center gap-2 opacity-70">
                                    <ArrowRight className="w-4 h-4 text-gray-500" /> Automation architects
                                </li>
                                <li className="flex items-center gap-2 opacity-70">
                                    <ArrowRight className="w-4 h-4 text-gray-500" /> Post-production engineers
                                </li>
                                <li className="flex items-center gap-2 opacity-70">
                                    <ArrowRight className="w-4 h-4 text-gray-500" /> Performance strategists
                                </li>
                            </ul>

                            <Link href="/join-our-team/apply" className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm rounded hover:bg-gray-200 transition-colors">
                                Submit Portfolio
                            </Link>
                        </div>
                    </motion.div>
                </section>

            </div>
        </main>
    );
}
