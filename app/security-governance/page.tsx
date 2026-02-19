'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText, Activity, Cookie } from 'lucide-react';

export default function SecurityGovernancePage() {
    return (
        <main className="min-h-screen bg-[#121212] text-white font-sans selection:bg-indigo-500/30">
            {/* HERO SECTION */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5 bg-[#141414]">
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
                            Security & Governance
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            Structured integration standards and data handling principles.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTENT SECTIONS */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-20 space-y-20">

                {/* SECTION 1 — Integration Security */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-2xl font-semibold text-white">Integration Security</h2>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed mb-6">
                            All integrations are implemented using scoped API permissions and role-based access control. We do not request unrestricted system access. The principle of least privilege applies to all automation deployments.
                        </p>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Every system undergoes sandbox validation before production release.
                        </p>
                    </motion.div>
                </section>

                <hr className="border-white/5" />

                {/* SECTION 2 — Access Controls */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-2xl font-semibold text-white">Access Controls</h2>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 font-light">
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Role-based access management
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Tokenized authentication
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Expiring credentials
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                No shared administrative accounts
                            </li>
                        </ul>
                    </motion.div>
                </section>

                <hr className="border-white/5" />

                {/* SECTION 3 — Data Protection Principles */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-2xl font-semibold text-white">Data Protection Principles</h2>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 font-light">
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Access limited to required data
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Defined retention policies
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                No unauthorized third-party processing
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Client oversight during sensitive deployments
                            </li>
                        </ul>
                    </motion.div>
                </section>

                <hr className="border-white/5" />

                {/* SECTION 4 — Logging & Monitoring */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-2xl font-semibold text-white">Logging & Monitoring</h2>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 font-light">
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Workflow activity logging
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Trigger and event tracking
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Audit trail preservation
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                Human oversight checkpoints
                            </li>
                        </ul>
                    </motion.div>
                </section>

                <hr className="border-white/5" />

                {/* SECTION 5 — Cookies & Tracking */}
                <section id="cookies">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Cookie className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-2xl font-semibold text-white">Cookies & Tracking</h2>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed mb-6">
                            We use essential cookies required for website functionality and limited analytics for performance monitoring. We do not deploy invasive tracking systems without disclosure.
                        </p>
                        <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 border-b border-indigo-500/30 hover:border-indigo-500 transition-colors uppercase text-sm tracking-wider font-medium">
                            Read Privacy Policy
                        </Link>
                    </motion.div>
                </section>

            </div>
        </main>
    );
}
