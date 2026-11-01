'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePauseOffscreen } from '@/lib/usePauseOffscreen';
import { engagements as allEngagements, type Engagement } from '@/lib/engagements';
import { DEPARTMENTS, type Department } from '@/lib/departments';
import DepartmentTag from './DepartmentTag';


/** Pass a department to show only its work (department pages); without one, both departments' work runs together, each card labelled. */
export default function SelectedEngagementsHorizontal({ department }: { department?: Department }) {
    const sectionRef = usePauseOffscreen<HTMLElement>();
    const engagements = department ? allEngagements.filter((e) => e.department === department) : allEngagements;
    const [touchedCard, setTouchedCard] = useState<string | null>(null);

    const card = (item: Engagement, key: string, className: string) => (
        <EngagementCard
            key={key}
            item={item}
            className={className}
            active={touchedCard === key}
            onActivate={(on) => setTouchedCard(on ? key : null)}
        />
    );

    return (
        <section ref={sectionRef} className="py-24 sm:py-32 relative bg-[#050505] overflow-hidden rounded-3xl border border-white/5 my-12 group/section">
            {/* Reinstated Background Image (desktop: its overlay blend all but vanishes over this dark base on phones) */}
            <div className="hidden md:block absolute inset-0 z-0 pointer-events-none transition-transform duration-1000 scale-100 group-hover/section:scale-105">
                <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay max-h-full"
                    style={{
                        backgroundImage: 'url(/redglass.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/50 to-[#020202]" />
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent z-10" />

            <div className="container mx-auto px-4 relative z-10 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-xs font-bold text-gray-300 uppercase tracking-[0.2em] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        Selected Engagements
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 uppercase text-white drop-shadow-md">
                        Proven Value Delivery
                    </h2>

                    <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                        {department
                            ? `Representative work from our ${DEPARTMENTS[department].name}.`
                            : 'Representative work from both departments: commercial production from Filmmaking, operational systems from Automations.'}
                    </p>
                </motion.div>
            </div>

            {/* Phones: a row you swipe at your own pace. Auto-scrolling text is hard to read on a
                small screen, and one long animated strip is the heaviest layer a phone can be given. */}
            <div className="md:hidden relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {engagements.map((item, index) => card(item, `row-${index}`, 'w-[85vw] max-w-[360px] snap-center'))}
            </div>

            {/* Desktop: continuous marquee — pauses on hover for reading */}
            <div className="hidden md:flex relative w-full overflow-hidden group/marquee">
                <style>{`@keyframes engagementsMarquee { from { transform: translateX(-50%); } to { transform: translateX(0); } }`}</style>
                {/* Left/Right Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                <div
                    className="flex gap-6 px-4 py-3 group-hover/marquee:[animation-play-state:paused]"
                    style={{ animation: 'engagementsMarquee 52s linear infinite' }}
                >
                    {/* The list runs twice so the loop is seamless */}
                    {[...engagements, ...engagements].map((item, index) => card(item, `marquee-${index}`, 'w-[450px]'))}
                </div>
            </div>
        </section>
    );
}

function EngagementCard({ item, className, active, onActivate }: { item: Engagement; className: string; active: boolean; onActivate: (on: boolean) => void }) {
    return (
        <div
            onMouseEnter={() => onActivate(true)}
            onMouseLeave={() => onActivate(false)}
            onClick={() => onActivate(!active)} // Toggle on Touch
            className={`${className} flex-shrink-0 relative rounded-2xl border bg-[#0a0a0a]/90 p-8 transition-[border-color,box-shadow,translate,background-color] duration-500 overflow-hidden flex flex-col cursor-pointer ${active ? 'border-white/25 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.85)] bg-[#101014] -translate-y-1.5 z-20' : 'border-white/10 hover:border-white/25 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.85)] hover:bg-[#101014] hover:-translate-y-1.5 z-10'}`}
        >
            {/* Top light edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            {/* Card glow (Active on Touch), drawn as a gradient rather than a blurred circle */}
            <div className={`absolute -top-48 -right-48 w-96 h-96 bg-radial ${item.glow} to-transparent to-70% transition-opacity duration-700 pointer-events-none ${active ? 'opacity-50' : 'opacity-20'}`} />

            <div className="mb-6 flex items-center justify-between gap-3 relative z-10">
                <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full truncate">{item.client}</span>
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
            </div>

            <DepartmentTag department={item.department} className="mb-3 relative z-10" />
            <h3 className="text-xl font-bold mb-4 text-white leading-tight uppercase tracking-wide relative z-10 min-h-[3.5rem]">{item.title}</h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow relative z-10 font-light">
                {item.description}
            </p>

            <div className="space-y-3 relative z-10 mt-auto border-t border-white/10 pt-6">
                {item.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-current ${item.iconColor} shadow-[0_0_8px_currentColor] flex-shrink-0`} />
                        <span className="font-medium tracking-wide">{point}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
