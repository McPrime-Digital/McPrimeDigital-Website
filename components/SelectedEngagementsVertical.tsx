'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePauseOffscreen } from '@/lib/usePauseOffscreen';
import { engagements as allEngagements } from '@/lib/engagements';
import { DEPARTMENTS, type Department } from '@/lib/departments';
import DepartmentTag from './DepartmentTag';


/** Pass a department to show only its work (department pages). A short list sits still; four or more run as a loop. */
export default function SelectedEngagementsVertical({ department }: { department?: Department }) {
    const engagements = department ? allEngagements.filter((e) => e.department === department) : allEngagements;
    const looping = engagements.length >= 4;
    // Duplicate the array to create a seamless infinite loop
    const doubledEngagements = looping ? [...engagements, ...engagements] : engagements;
    const sectionRef = usePauseOffscreen<HTMLElement>();
    const [touchedCard, setTouchedCard] = useState<number | null>(null);

    return (
        <section ref={sectionRef} className="py-24 sm:py-32 relative bg-[#050505] overflow-hidden rounded-3xl border border-white/5 my-12">
            {/* Background elements specific to the vertical flow (already soft gradients, so no blur filter) */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-50" />
            <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Title Context */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-xs font-bold text-gray-300 uppercase tracking-[0.2em] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            Selected Engagements
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 uppercase text-white drop-shadow-md">
                            Architected For<br />Enterprise Scale
                        </h2>

                        <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
                            {department === 'automations'
                                ? `Representative work from our ${DEPARTMENTS.automations.name}: autonomous pipelines and governed workflows running inside client operations.`
                                : department === 'filmmaking'
                                    ? `Representative work from our ${DEPARTMENTS.filmmaking.name}: commercial and brand films for leading brands.`
                                    : 'Representative work from both departments: commercial production from Filmmaking, operational systems from Automations.'}
                        </p>

                        {/* Visual Structural Diagram Line */}
                        <div className="hidden lg:flex items-center gap-4 mt-12 opacity-50">
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-cyan-500" />
                            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Right Column: Vertical Infinite Scroll Marquee */}
                    <div className={`relative w-full overflow-hidden rounded-2xl border border-white/5 bg-black/20 md:backdrop-blur-sm group ${looping ? 'h-[600px] md:h-[800px]' : ''}`}>

                        {/* Top/Bottom Fade Masks to hide the seam */}
                        {looping && (
                            <>
                                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
                            </>
                        )}

                        {/* Animated Track: a CSS loop, paused while the section is off-screen */}
                        <div className={`flex flex-col gap-6 p-4 md:p-8 ${looping ? 'animate-[marquee-vertical_45s_linear_infinite]' : ''}`}>
                            {doubledEngagements.map((item, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setTouchedCard(index)}
                                    onMouseLeave={() => setTouchedCard(null)}
                                    onClick={() => setTouchedCard(touchedCard === index ? null : index)} // Toggle on Touch
                                    className={`w-full flex-shrink-0 relative rounded-2xl border bg-[#0a0a0a]/90 md:bg-[#0a0a0a]/80 md:backdrop-blur-xl p-6 transition-all duration-500 overflow-hidden cursor-pointer ${touchedCard === index ? 'border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#111] scale-105 z-20' : 'border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:bg-[#111] hover:scale-[1.02] z-10'}`}
                                >
                                    {/* Card Hover Glow (Active on Touch) */}
                                    <div className={`absolute -top-48 -right-48 w-96 h-96 bg-radial ${item.glow} to-transparent to-70% transition-opacity duration-700 pointer-events-none ${touchedCard === index ? 'opacity-60' : 'opacity-20 hover:opacity-60'}`} />

                                    <div className="mb-4 flex items-center justify-between relative z-10">
                                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full">{item.client}</span>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor} drop-shadow-[0_0_10px_currentColor]`} />
                                    </div>

                                    <DepartmentTag department={item.department} className="mb-2 relative z-10" />
                                    <h3 className="text-lg md:text-xl font-bold mb-3 text-white leading-tight uppercase tracking-wide relative z-10">{item.title}</h3>

                                    <p className={`text-gray-400 text-xs md:text-sm leading-relaxed mb-6 relative z-10 font-light ${looping ? 'hidden md:block' : ''}`}>
                                        {item.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 relative z-10 border-t border-white/5 pt-4">
                                        {item.points.map((point, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-current ${item.iconColor} shadow-[0_0_8px_currentColor] flex-shrink-0`} />
                                                <span className="font-medium tracking-wide">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
