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
        note: "Deep dive analysis spanning 2-3 weeks.",
    },
    {
        title: "EDUCATE & STRATEGIZE",
        desc: "We translate findings into a clear strategic roadmap, educating your team on the 'Why' and 'How'.",
        note: "Comprehensive workshops and documentation.",
    },
    {
        title: "CUSTOM BUILD & INTEGRATE",
        desc: "Our engineers construct bespoke agents and API bridges tailored exactly to your unique constraints.",
        note: "Agile development sprints with weekly updates.",
    },
    {
        title: "TEST & DEPLOY",
        desc: "Rigorous stress testing in sandbox environments before phased rollout to production systems.",
        note: "Zero-downtime deployment strategy.",
    },
    {
        title: "OPTIMIZE & DELIVER",
        desc: "Continuous monitoring and fine-tuning to ensure the system evolves and improves over time.",
        note: "Long-term support and performance tracking.",
    },
];

export default function AuditParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);
    const textsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // Initial setup: Hide all but first layer
            layersRef.current.forEach((layer, i) => {
                if (layer) {
                    gsap.set(layer, {
                        scale: 0.5,
                        opacity: 0,
                        zIndex: 10 + i
                    });
                }
            });

            textsRef.current.forEach((text, i) => {
                if (text) {
                    gsap.set(text, {
                        opacity: 0,
                        y: 50,
                        pointerEvents: 'none',
                        zIndex: 100 + i
                    });
                }
            });


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=800%", // Increased scroll distance for cleaner separation
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Iterate through each step to create a sequence
            auditSteps.forEach((_, i) => {
                const layer = layersRef.current[i];
                const text = textsRef.current[i];

                // Significantly increased spacing to prevent overlap
                // Step 1: 0, Step 2: 2.5, Step 3: 5.0, etc.
                const startTime = i * 2.5;

                if (layer && text) {
                    // 1. Layer Zooms In & Appears
                    tl.to(layer, {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    }, startTime);

                    // 2. Text Appears (Synced with Layer appearance)
                    tl.to(text, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    }, startTime + 0.2);

                    // 3. Hold Phase -> Text Fades Out
                    // Fades out at startTime + 1.8, well before next start at + 2.5
                    tl.to(text, {
                        opacity: 0,
                        y: -30,
                        scale: 1.05,
                        duration: 0.5,
                        ease: "power2.in"
                    }, startTime + 1.8);

                    // 4. Layer Zooms Past Camera & Fades
                    // Fades out by startTime + 2.0
                    tl.to(layer, {
                        scale: 3,
                        opacity: 0,
                        duration: 1.0,
                        ease: "power1.in"
                    }, startTime + 1.8);
                }
            });

            // Continuous floating effect 
            layersRef.current.forEach((layer, i) => {
                if (layer) {
                    gsap.to(layer, {
                        y: "15px",
                        rotation: Math.random() * 5 - 2.5,
                        duration: 3 + Math.random() * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: Math.random() * 2
                    });
                }
            });


        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to cycle images
    const getLayerImage = (index: number) => {
        const images = [
            "/images/automations/parallax/glass_layer_1.png",
            "/images/automations/parallax/glass_layer_2.png",
            "/images/automations/parallax/glass_layer_3.png"
        ];
        return images[index % images.length];
    };

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#020609] text-white">

            {/* --- Sticky Header --- */}
            <div className="absolute top-0 left-0 w-full z-50 py-8 text-center bg-gradient-to-b from-[#020609] to-transparent pointer-events-none">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-cyan-500 drop-shadow-md">
                    Our Custom Audit-First Approach Breakdown
                </h2>
            </div>

            {/* --- SVG Filter for Liquid Distortion --- */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="liquid-glass-refine">
                    <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" result="noise" seed="5" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite operator="in" in2="SourceGraphic" />
                </filter>
            </svg>

            {/* --- Background: Obsidian to Deep Teal Gradient --- */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020609] via-[#041014] to-[#013a3a]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/images/noise.png')] pointer-events-none"></div>
            </div>

            {/* --- Center Content Wrapper --- */}
            <div className="relative z-10 w-full h-full flex items-center justify-center perspective-1000">

                {/* --- Multi-Layer Glass Objects --- */}
                {auditSteps.map((_, index) => (
                    <div
                        key={`layer-${index}`}
                        ref={(el) => { layersRef.current[index] = el }}
                        className="absolute w-[80vw] md:w-[60vmin] h-[50vh] md:h-[60vmin] pointer-events-none will-change-transform"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">

                            {/* The Glass Object Itself */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={getLayerImage(index)}
                                    alt="Abstract Liquid Glass"
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{
                                        transform: 'translateZ(0)',
                                        filter: 'contrast(1.2) brightness(1.1) drop-shadow(0 0 20px rgba(6,182,212,0.15))'
                                    }}
                                    priority={index === 0}
                                />

                                <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ filter: 'url(#liquid-glass-refine)' }}>
                                    <Image
                                        src={getLayerImage(index)}
                                        alt="Refraction Layer"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                {/* --- Text Content Layers --- */}
                {auditSteps.map((step, index) => (
                    <div
                        key={`text-${index}`}
                        ref={(el) => { textsRef.current[index] = el }}
                        className="absolute text-center max-w-4xl px-4 pointer-events-none w-full flex flex-col items-center justify-center h-full"
                    >
                        <div className="relative inline-block z-10">
                            <h3 className="text-[15rem] font-black text-white/[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-[-1] leading-none blur-sm">
                                0{index + 1}
                            </h3>

                            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white uppercase tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-100">
                                    {step.title}
                                </span>
                            </h2>

                            <div
                                className="bg-[#050505]/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto transform transition-transform"
                                style={{ transform: 'translateZ(0)' }}
                            >
                                <p className="text-xl md:text-2xl text-cyan-50 font-light leading-relaxed mb-6 drop-shadow-md">
                                    {step.desc}
                                </p>
                                <div className="inline-flex items-center gap-3 text-sm font-medium text-cyan-300 bg-cyan-950/30 px-4 py-2 rounded-lg border border-cyan-500/10">
                                    <CheckCircle className="w-4 h-4" />
                                    {step.note}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* --- Progress Indicators --- */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
                {auditSteps.map((_, i) => (
                    <div key={i} className="w-1 h-12 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <div className="w-full h-full bg-cyan-500/80 transform scale-y-0 origin-top transition-transform shadow-[0_0_10px_cyan]" />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-0 w-full text-center z-20 mix-blend-difference pointer-events-none">
                <p className="text-xs text-cyan-500/70 uppercase tracking-[0.5em] animate-pulse">Deep Dive Audit</p>
            </div>
        </section>
    );
}
