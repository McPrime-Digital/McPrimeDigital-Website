'use client';

import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SecurityGovernanceSection() {
    return (
        <section className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* --- LEFT COLUMN: SECURITY & GOVERNANCE --- */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Shield className="w-3 h-3" /> Security & Governance
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                Controlled Integrations. <br />
                                <span className="text-gray-500">Defined Permissions.</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                All automation systems are deployed under strict access and governance standards.
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "Role-based access control",
                                "Scoped API permissions",
                                "No unrestricted administrative access",
                                "Audit logging",
                                "Human oversight for sensitive workflows"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 font-light">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 border-t border-white/10">
                            <p className="text-sm text-gray-500 italic">
                                "Automation supports operations — it does not override them."
                            </p>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: SELECTED APPLICATIONS --- */}
                    <div className="space-y-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <FileText className="w-3 h-3" /> Selected Applications
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-8">
                                Representative Deployments
                            </h3>
                        </div>

                        <div className="space-y-8">
                            {/* App 1 */}
                            <div className="group">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Financial Institution</h4>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    Payroll workflow automation architecture designed to improve operational efficiency within a regulated environment.
                                </p>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                            {/* App 2 */}
                            <div className="group">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Hospitality Organization</h4>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    Lead generation and internal coordination automation system implemented to improve workflow clarity.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/selected-engagements"
                                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider transition-colors group"
                            >
                                View Selected Engagements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
