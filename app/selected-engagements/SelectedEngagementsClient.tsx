'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import { engagements } from '@/lib/engagements';
import { DEPARTMENTS, type Department } from '@/lib/departments';

const ORDER: { department: Department; line: string }[] = [
    { department: 'filmmaking', line: 'AI-native and hybrid commercial films, brand films and AI brand ambassador programs.' },
    { department: 'automations', line: 'Automation systems designed and deployed inside client operations.' },
];

export default function SelectedEngagementsPage() {
    return (
        <div className="min-h-screen bg-[#0b0b0d] text-white font-sans selection:bg-indigo-500/30">
            {/* HERO SECTION */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/" className="inline-block mb-8 text-sm text-gray-500 hover:text-white transition-colors">
                            ← Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight tracking-tight text-white">
                            Representative Engagements
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            Structured execution across industries where precision and measurable output are required, delivered by two separate departments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* One section per department */}
            {ORDER.map(({ department, line }) => {
                const d = DEPARTMENTS[department];
                const work = engagements.filter((e) => e.department === department);
                return (
                    <section key={department} className="relative px-6 md:px-12 lg:px-20 py-20 border-b border-white/10 overflow-hidden">
                        {/* The department's own light, faint, from the top corner */}
                        <div
                            aria-hidden
                            className="absolute -top-40 -left-40 w-[640px] h-[640px] pointer-events-none opacity-[0.12]"
                            style={{ background: `radial-gradient(closest-side, ${d.accent}, transparent)` }}
                        />
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                            <motion.header
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="lg:col-span-4 lg:sticky lg:top-28 self-start"
                            >
                                <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: d.accent }}>
                                    Department {d.index}
                                </p>
                                <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">{d.name}</h2>
                                <div className="h-px w-12 mb-5" style={{ background: d.accent }} />
                                <p className="text-gray-400 font-light leading-relaxed mb-6">{line}</p>
                                <Link href={d.href} className="group inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium text-white/70 hover:text-white transition-colors">
                                    Explore {d.short}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.header>

                            <div className="lg:col-span-8">
                                {work.map((item, index) => (
                                    <motion.article
                                        key={`${item.client}-${item.title}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.08 }}
                                        className="group"
                                    >
                                        <div className="py-12 border-b border-white/5 group-last:border-0 group-hover:bg-white/[0.02] transition-colors -mx-6 px-6 rounded-lg">
                                            <span className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-4">
                                                {item.client}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl font-light">{item.description}</p>
                                            <ul className="space-y-2">
                                                {item.points.map((point) => (
                                                    <li key={point} className="flex items-start text-sm text-gray-300">
                                                        <span className="mr-3" style={{ color: d.accent }}>•</span>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Bottom Navigation */}
            <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#0a0a0a]">
                <div className="max-w-4xl">
                    <h3 className="text-white text-lg font-bold mb-6">Ready to discuss your project?</h3>
                    <Link href="/#contact" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider text-sm font-medium">
                        Request Executive Consultation <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
