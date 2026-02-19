'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const auditSteps = [
    {
        title: "AUDIT & IDENTIFY",
        desc: "We scan your entire operational workflow to locate bottlenecks and high-value automation opportunities.",
        note: "Deep dive analysis.",
        img: "/images/automations/approach_audit_identify.png"
    },
    {
        title: "EDUCATE & STRATEGIZE",
        desc: "We translate findings into a clear strategic roadmap, educating your team on the 'Why' and 'How'.",
        note: "Comprehensive workshops and documentation.",
        img: "/images/automations/approach_educate_strategize.png"
    },
    {
        title: "CUSTOM BUILD & INTEGRATE",
        desc: "Our engineers construct bespoke agents and API bridges tailored exactly to your unique constraints.",
        note: "Agile development sprints with weekly updates.",
        img: "/images/automations/approach_build_integrate.png"
    },
    {
        title: "TEST & DEPLOY",
        desc: "Rigorous stress testing in sandbox environments before phased rollout to production systems.",
        note: "Zero-downtime deployment strategy.",
        img: "/images/automations/approach_test_deploy.png"
    },
    {
        title: "OPTIMIZE & DELIVER",
        desc: "Continuous monitoring and fine-tuning to ensure the system evolves and improves over time.",
        note: "Long-term support and performance tracking.",
        img: "/images/automations/approach_optimize_deliver.png"
    }
];

export default function AuditHorizontal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !trackRef.current) return;

            // Function to get scroll distance
            const getScrollDistance = () => {
                const totalWidth = trackRef.current?.scrollWidth || 0;
                const viewportWidth = window.innerWidth;
                return -(totalWidth - viewportWidth);
            };

            gsap.to(trackRef.current, {
                x: getScrollDistance, // Functional value for dynamic recalculation
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollDistance())}`, // Dynamic end value
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Recalculate on resize
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#020609] text-white">

            {/* --- Background Image (User Provided) --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/automations/audit_horizontal_bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-35"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020609] via-transparent to-[#020609] opacity-80" />
            </div>

            {/* --- Section Title --- */}
            <div className="absolute top-8 left-8 z-30 pointer-events-none">
                <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase mb-2 block drop-shadow-[0_2px_10px_rgba(34,211,238,0.5)] text-sm">Process Breakdown</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase drop-shadow-2xl text-white">
                    Our Custom<br />Audit-First Approach
                </h2>
            </div>

            {/* --- Horizontal Track --- */}
            <div ref={trackRef} className="flex h-full items-center pl-[5vw] pr-[20vw] gap-[5vw] relative z-10 w-max">

                {auditSteps.map((step, index) => (
                    <div
                        key={index}
                        className={`relative w-[90vw] md:w-[75vw] flex-shrink-0 flex items-center justify-center ${index % 2 === 0 ? 'self-start mt-[15vh]' : 'self-end mb-[15vh]'}`}
                    >
                        {/* --- Ambient Color Glow Blob (Behind Glass) --- */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] opacity-40 animate-pulse 
                            ${index % 2 === 0 ? 'bg-cyan-600' : 'bg-purple-600'}`}
                        />

                        {/* --- Massive Premium Liquid Glass Card --- */}
                        <div className="relative w-full rounded-[3rem] overflow-hidden border border-white/20 group shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">

                            {/* Deep Glass Background */}
                            <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-3xl" />

                            {/* Gradient Sheen */}
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-30 ${index % 2 === 0 ? 'from-cyan-500/10 to-blue-600/10' : 'from-purple-500/10 to-pink-600/10'}`} />

                            {/* White Specular Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />

                            {/* Content Container */}
                            <div className="relative p-10 md:p-16 flex flex-col md:flex-row gap-10 md:gap-16 items-center">

                                {/* Text Content */}
                                <div className="flex-1 space-y-8 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-lg leading-[0.9]">
                                            {step.title}
                                        </h3>
                                        <span className="text-8xl font-black text-white/5 absolute -right-4 -top-10 md:static select-none">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <p className="text-lg md:text-2xl text-gray-100 leading-relaxed font-light drop-shadow-md">
                                        {step.desc}
                                    </p>

                                    <div className="inline-flex items-center gap-4 text-cyan-200 text-base md:text-lg font-medium bg-black/20 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                                        <CheckCircle className="w-6 h-6 flex-shrink-0 text-cyan-400" />
                                        <span>{step.note}</span>
                                    </div>
                                </div>

                                {/* Image Content */}
                                <div className="flex-1 w-full relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                                    <Image
                                        src={step.img}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                </div>

                            </div>

                            {/* Border Shine Animation */}
                            <div className="absolute inset-0 border border-white/20 rounded-[3rem] pointer-events-none overflow-hidden">
                                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
                            </div>
                        </div>

                        {/* Connection Line Visual */}
                        {index < auditSteps.length - 1 && (
                            <div className={`absolute left-full top-1/2 w-[5vw] h-[4px] 
                                ${index % 2 === 0 ? 'bg-gradient-to-r from-cyan-500 to-purple-500 rotate-6' : 'bg-gradient-to-r from-purple-500 to-cyan-500 -rotate-6'} 
                                blur-[2px] opacity-60 hidden md:block`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* --- Progress Hint --- */}
            <div className="absolute bottom-10 left-10 z-30 mix-blend-difference pointer-events-none">
                <p className="text-sm font-bold text-white/70 uppercase tracking-[0.3em] flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-cyan-400 inline-block animate-pulse"></span>
                    Scroll Right
                </p>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </section>
    );
}
