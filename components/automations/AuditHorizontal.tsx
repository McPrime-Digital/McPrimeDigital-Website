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
        desc: "We scan your entire operational workflow to pinpoint bottlenecks, redundancies, and high-value automation opportunities.",
        note: "Data-driven process discovery.",
        img: "/images/automations/audit_step1_identify_dashboard_v4.png"
    },
    {
        title: "EDUCATE & STRATEGIZE",
        desc: "We translate findings into a clear strategic roadmap, educating your team on the 'Why' and 'How'.",
        note: "Comprehensive workshops and documentation.",
        img: "/images/automations/audit_step2_strategy_dashboard.png"
    },
    {
        title: "CUSTOM BUILD & INTEGRATE",
        desc: "Our engineers construct bespoke agents and API bridges tailored exactly to your unique constraints.",
        note: "Agile development sprints with weekly updates.",
        img: "/images/automations/approach_build_integrate_v2.png"
    },
    {
        title: "TEST & DEPLOY",
        desc: "Rigorous stress testing in sandbox environments before phased rollout to production systems.",
        note: "Zero-downtime deployment strategy.",
        img: "/images/automations/approach_test_deploy_v2.png"
    },
    {
        title: "OPTIMIZE & DELIVER",
        desc: "Continuous monitoring and fine-tuning to ensure the system evolves and improves over time.",
        note: "Long-term support and performance tracking.",
        img: "/images/automations/audit_step5_optimize_deliver_dashboard_v4.png"
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

            {/* Removed absolute section title to let it scroll smoothly */}

            {/* --- Horizontal Track --- */}
            <div ref={trackRef} className="flex h-full items-center pl-[5vw] pr-[20vw] gap-[5vw] relative z-10 w-max">

                {/* --- Section Title Box (Scrolls with track) --- */}
                <div className="relative w-[80vw] md:w-[35vw] flex-shrink-0 flex flex-col justify-center px-4 md:px-0 md:pl-12 z-20">
                    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase mb-3 block drop-shadow-[0_2px_10px_rgba(34,211,238,0.5)] text-sm md:text-base">Process Breakdown</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase drop-shadow-2xl text-white leading-[1.1]">
                        Our Custom<br />Audit-First<br />Approach
                    </h2>
                    <p className="mt-6 text-gray-300 text-base md:text-lg max-w-md font-light leading-relaxed">
                        We don't just deploy solutions blindly; we diagnose. Discover how our meticulous 5-step blueprint transforms operational chaos into streamlined automation ecosystems.
                    </p>
                    <div className="mt-10 flex items-center gap-4 text-white/50 animate-pulse">
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Scroll to Explore</span>
                        <div className="w-16 h-[2px] bg-cyan-500/50" />
                    </div>
                </div>

                {auditSteps.map((step, index) => (
                    <div
                        key={index}
                        className={`relative w-[85vw] md:w-[35vw] lg:w-[28vw] flex-shrink-0 flex items-center justify-center ${index % 2 === 0 ? 'self-start mt-[10vh]' : 'self-end mb-[10vh]'}`}
                    >
                        {/* --- Ambient Color Glow Blob (Behind Glass) --- */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full blur-[80px] opacity-30 animate-pulse 
                            ${index % 2 === 0 ? 'bg-cyan-600' : 'bg-purple-600'}`}
                        />

                        {/* --- Compact Premium Vertical Card --- */}
                        <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/20 group shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">

                            {/* Deep Glass Background */}
                            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-2xl" />

                            {/* Gradient Sheen */}
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-40 ${index % 2 === 0 ? 'from-cyan-500/10 to-blue-600/5' : 'from-purple-500/10 to-pink-600/5'}`} />

                            {/* White Specular Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />

                            {/* Content Container (Vertical Stack) */}
                            <div className="relative p-6 md:p-8 flex flex-col gap-6">

                                {/* Image Content (Top) */}
                                <div className="w-full relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-[1.02] transition-transform duration-700">
                                    <Image
                                        src={step.img}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
                                </div>

                                {/* Text Content (Bottom) */}
                                <div className="space-y-4 relative z-10 w-full">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-lg leading-tight">
                                            {step.title}
                                        </h3>
                                        <span className="text-4xl md:text-5xl font-black text-white/10 select-none flex-shrink-0 mt-[-4px]">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light drop-shadow-sm line-clamp-3">
                                        {step.desc}
                                    </p>

                                    <div className="inline-flex items-center gap-2.5 text-cyan-200 text-xs md:text-sm font-medium bg-black/30 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md shadow-lg w-fit">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                                        <span>{step.note}</span>
                                    </div>
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

            {/* Removed the fixed absolute Scroll Right hint as it is now inside the flow */}

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </section>
    );
}
