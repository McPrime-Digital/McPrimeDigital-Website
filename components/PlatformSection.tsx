'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, BadgeCheck, LayoutPanelLeft, LogIn, Workflow, type LucideIcon } from 'lucide-react';
import { GENRELINE } from '@/lib/site';
import { warmOrigins } from '@/lib/warmOrigins';

const warmGenreline = () => warmOrigins(GENRELINE.url, GENRELINE.login);

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

/**
 * Grid lines of a box seen from inside in one-point perspective (floor, ceiling and both walls
 * converging on the centre), in a 1000x1000 viewBox stretched to the card. `cols`/`rows` set the
 * lines along the floor and walls; `dzFloor`/`dzWall` set the depth spacing, so cells come out
 * near-square for the card's shape.
 */
function roomGrid({ cols, rows, dzFloor, dzWall }: { cols: number; rows: number; dzFloor: number; dzWall: number }) {
    const back = 140; // half-size of the far wall
    const depth = 500 / back;
    const farthest = depth * 0.67; // depth lines stop short of the far wall, which stays a clean dark centre
    const f = (n: number) => n.toFixed(1);
    const d: string[] = [];
    const line = (x1: number, y1: number, x2: number, y2: number) => d.push(`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`);

    for (let i = 0; i <= cols; i++) {
        const t = -1 + (2 * i) / cols;
        line(500 + 500 * t, 1000, 500 + back * t, 500 + back); // floor
        line(500 + 500 * t, 0, 500 + back * t, 500 - back); // ceiling
    }
    for (let j = 1; j < rows; j++) {
        const t = -1 + (2 * j) / rows;
        line(0, 500 + 500 * t, 500 - back, 500 + back * t); // left wall
        line(1000, 500 + 500 * t, 500 + back, 500 + back * t); // right wall
    }
    for (let z = 1 + dzFloor; z < farthest; z += dzFloor) {
        const s = 500 / z;
        line(500 - s, 500 + s, 500 + s, 500 + s);
        line(500 - s, 500 - s, 500 + s, 500 - s);
    }
    for (let z = 1 + dzWall; z < farthest; z += dzWall) {
        const s = 500 / z;
        line(500 - s, 500 - s, 500 - s, 500 + s);
        line(500 + s, 500 - s, 500 + s, 500 + s);
    }
    return d.join('');
}

// Desktop: a roughly square card. Phones: a tall, narrow one, so more rows and finer floor depth.
const ROOM_DESKTOP = roomGrid({ cols: 24, rows: 26, dzFloor: 0.08, dzWall: 0.08 });
const ROOM_PHONE = roomGrid({ cols: 8, rows: 60, dzFloor: 0.034, dzWall: 0.34 });

function RoomGrid({ d, className }: { d: string; className: string }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className={`absolute inset-0 w-full h-full pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_34%,black_78%)] ${className}`}
        >
            <path d={d} fill="none" stroke="rgb(240 217 143 / 0.15)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>
    );
}

const spaces = [
    { label: 'Crew', note: 'where our team works' },
    { label: 'Client', note: 'where you review and approve' },
    { label: 'Suite', note: 'where the film is made' },
];

/**
 * "Runs on Genreline": the platform every McPrime production (films, commercials,
 * ambassador and UGC content) runs on, and the relationship between the studio and
 * the company that builds it. Lives on the filmmaking page; the homepage carries a
 * short pointer (PlatformStrip). The capture
 * frame renders the real client portal once GENRELINE.portalCapture points at a
 * current screenshot; until then it shows the three spaces of the system.
 */
export default function PlatformSection() {
    return (
        <section className="relative">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onViewportEnter={warmGenreline}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="gold-room relative p-8 md:p-20 rounded-[1.75rem] overflow-hidden ring-1 ring-inset ring-[#F2D98A]/40"
            >
                {/* The room: gold rim light (.gold-room) and its perspective grid */}
                <RoomGrid d={ROOM_DESKTOP} className="hidden md:block" />
                <RoomGrid d={ROOM_PHONE} className="md:hidden" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Copy */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#F7E3A6] flex items-center gap-3">
                            <span className="w-8 h-px bg-[#F7E3A6]/70" /> The platform
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold font-serif leading-[1.05] text-white">
                            McPrime productions run on{' '}
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
                            Genreline is the operating system for AI and hybrid film production. It is separately managed infrastructure, developed and operated by our sister software company under common ownership.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Every McPrime production, from films and commercials to ambassador and UGC content, is governed inside Genreline from first treatment to final delivery. Creative review, approvals, contracts and invoicing share a single system of record, giving your team one accountable view of the work.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href={GENRELINE.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onPointerEnter={warmGenreline}
                                onFocus={warmGenreline}
                                onTouchStart={warmGenreline}
                                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-black bg-gradient-to-r from-[#E6CB7C] to-[#CBA54D] hover:from-[#F0D98F] hover:to-[#D6B15C] transition-colors"
                            >
                                Explore Genreline
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href={GENRELINE.login}
                                target="_blank"
                                rel="noopener noreferrer"
                                onPointerEnter={warmGenreline}
                                onFocus={warmGenreline}
                                onTouchStart={warmGenreline}
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
                                    <div className="absolute -bottom-[186px] -right-[154px] w-[468px] h-[468px] bg-radial from-[#CBA54D]/10 to-transparent to-70% pointer-events-none" />

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
