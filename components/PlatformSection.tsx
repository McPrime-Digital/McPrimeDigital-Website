'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, BadgeCheck, LayoutPanelLeft, LogIn, Workflow, type LucideIcon } from 'lucide-react';
import { GENRELINE } from '@/lib/site';

const GOLD = 'text-transparent bg-clip-text bg-gradient-to-r from-[#E6CB7C] via-[#CBA54D] to-[#A8832E]';

const pillars: { icon: LucideIcon; title: string; body: string }[] = [
    {
        icon: LayoutPanelLeft,
        title: 'A client portal under the McPrime name',
        body: 'Your stakeholders review cuts frame by frame, leave timecoded notes, approve, sign and pay in one place, presented under the McPrime name rather than a vendor’s.',
    },
    {
        icon: BadgeCheck,
        title: 'Approvals that hold up',
        body: 'Each approval records who decided, on which version, what they had viewed and when. Completed reviews close with a certificate your compliance team can file.',
    },
    {
        icon: Workflow,
        title: 'Commercial terms on the same record',
        body: 'Contracts are sealed on signature and invoices sit beside the work they cover, so creative, legal and finance work from a single source.',
    },
];

const spaces = [
    { label: 'Crew', note: 'where our team works' },
    { label: 'Client', note: 'where you review and approve' },
    { label: 'Suite', note: 'where the film is made' },
];

/**
 * "Runs on Genreline": the platform every McPrime engagement runs on, and the
 * relationship between the studio and the company that builds it. The capture
 * frame renders the real client portal once GENRELINE.portalCapture points at a
 * current screenshot; until then it shows the three spaces of the system.
 */
export default function PlatformSection() {
    return (
        <section className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#CBA54D]/[0.06] blur-[160px] -z-10 rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative p-8 md:p-14 rounded-[2.5rem] bg-gradient-to-b from-[#1a1508]/60 via-black/40 to-black/60 backdrop-blur-md border border-[#CBA54D]/15 overflow-hidden"
            >
                {/* Gold atmosphere */}
                <div className="absolute -top-20 left-1/3 w-[520px] h-[520px] bg-[#CBA54D]/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-amber-900/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-[2.5rem]" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CBA54D]/50 to-transparent pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Copy */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#CBA54D]/80 flex items-center gap-3">
                            <span className="w-8 h-px bg-[#CBA54D]/60" /> The platform
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold font-serif leading-[1.05] text-white">
                            McPrime Digital runs on{' '}
                            <span className="inline-flex items-center gap-3 align-baseline">
                                <Image
                                    src="/platform/genreline-mark-gold.png"
                                    alt=""
                                    width={512}
                                    height={407}
                                    className="hidden md:inline-block h-[0.8em] w-auto translate-y-[0.05em]"
                                />
                                <span className={GOLD}>Genreline<span className="text-white">.</span></span>
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Genreline is the operating system for AI and hybrid film production. It is developed by our sister company, a separate software business with its own engineering team. Both companies share one founder.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Every McPrime engagement is governed inside Genreline, from first treatment to final delivery. Creative review, approvals, contracts and invoicing share a single system of record, giving your team one accountable view of the work.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href={GENRELINE.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-black bg-gradient-to-r from-[#E6CB7C] to-[#CBA54D] hover:from-[#F0D98F] hover:to-[#D6B15C] transition-colors"
                            >
                                Explore Genreline
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href={GENRELINE.login}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-white/90 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-colors"
                            >
                                <LogIn className="w-4 h-4" />
                                Client login
                            </a>
                        </div>
                    </div>

                    {/* Capture frame */}
                    <div className="lg:col-span-6">
                        <div className="relative rounded-2xl border border-white/10 bg-[#07090f] shadow-[0_30px_80px_-30px_rgba(203,165,77,0.35)] overflow-hidden">
                            {/* Window chrome */}
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                </div>
                                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35">McPrime Digital · Client portal</span>
                                <span className="w-10" />
                            </div>

                            {GENRELINE.portalCapture ? (
                                <Image
                                    src={GENRELINE.portalCapture}
                                    alt="The McPrime Digital client portal on Genreline"
                                    width={1440}
                                    height={900}
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="w-full h-auto"
                                />
                            ) : (
                                <div className="relative md:aspect-[16/10] p-5 md:p-8 flex flex-col justify-between gap-6">
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />
                                    <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#CBA54D]/10 rounded-full blur-[90px] pointer-events-none" />

                                    {/* The three spaces, joined by one record */}
                                    <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                        {spaces.map((s, i) => (
                                            <motion.div
                                                key={s.label}
                                                initial={{ opacity: 0, y: 12 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                                                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5 flex items-baseline gap-3 sm:block"
                                            >
                                                <p className="hidden sm:block font-mono text-[10px] tracking-[0.3em] uppercase text-[#CBA54D]/80 mb-2">Space 0{i + 1}</p>
                                                <p className="text-white font-bold text-base md:text-lg leading-tight">{s.label}</p>
                                                <p className="text-white/45 text-xs md:text-sm sm:mt-1 leading-snug">{s.note}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
                                            className="h-px w-full origin-left bg-gradient-to-r from-[#CBA54D]/0 via-[#CBA54D]/70 to-[#CBA54D]/0"
                                        />
                                        <p className="mt-3 text-center font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/40">
                                            Contracts · Rights · Money · Security · One record
                                        </p>
                                    </div>

                                    <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <Image src="/logo.png" alt="McPrime Digital" width={160} height={40} className="h-6 md:h-7 w-auto opacity-90" />
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40">Powered by</span>
                                            <Image src="/platform/genreline-mark-gold.png" alt="" width={512} height={407} className="h-4 md:h-5 w-auto" />
                                            <span className="text-white font-semibold text-sm md:text-base tracking-tight">Genreline</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pillars */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-16">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative rounded-2xl border border-white/[0.08] bg-[#0A0E16]/80 p-6 md:p-7 hover:border-[#CBA54D]/30 transition-colors duration-500"
                        >
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                            <div className="w-11 h-11 rounded-xl bg-[#CBA54D]/10 border border-[#CBA54D]/25 flex items-center justify-center mb-5">
                                <p.icon className="w-5 h-5 text-[#E0C06A]" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-3 leading-tight">{p.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
