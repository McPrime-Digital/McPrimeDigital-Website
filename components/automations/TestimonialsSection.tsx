'use client';

import React from 'react';
import Image from 'next/image';

const testimonials = [
    { name: "Sarah Jenkins", role: "COO", company: "TechFlow Inc.", text: "Bond's automation audit completely changed how we view our operations. We saved 40+ hours a week in just the first month." },
    { name: "Michael Chen", role: "Director of Ops", company: "Alpha Logistics", text: "The ROI was clear from day one. The custom agents they built handled our entire support triage process flawlessly." },
    { name: "Elena Rodriguez", role: "Founder", company: "GrowthScale", text: "Finally, an agency that doesn't just sell 'AI' but solves actual business problems. The blueprint was a game changer." },
    { name: "David Kim", role: "CTO", company: "NexGen Finance", text: "Security was our improved concern, and Bond nailed it. Their local-first approach gave us the confidence to automate sensitive workflows." },
    { name: "Jessica Lee", role: "VP of Marketing", company: "BrightSpark", text: "Our content production increased by 500% without hiring a single new person. The custom systems are magic." },
    { name: "Robert Fox", role: "CEO", company: "BuildRight", text: "Transformational. We moved from chaotic spreadsheets to a fully automated project management flow in weeks." },
    { name: "Amanda Low", role: "Head of Product", company: "InnovateX", text: "The audit identified bottlenecks we didn't even know existed. The efficiency gains have been massive." },
    { name: "Thomas Wright", role: "Operations Lead", company: "SwiftCargo", text: "Highly recommended. The team is technical, responsive, and they actually understand business logic." },
    { name: "Olivia Green", role: "CMO", company: "TrendSetters", text: "We automated our entire outreach sequence. The personalization at scale is something we couldn't achieve manually." },
    { name: "James Hall", role: "Director", company: "Peak Performance", text: "Professional, fast, and high quality. The custom dashboard they built gives us real-time insights we never had before." },
    { name: "Emily White", role: "HR Manager", company: "TalentScout", text: "Recruitment screening is now 90% automated. We only interview the best candidates, saving us hundreds of hours." },
    { name: "Daniel Grey", role: "Founder", company: "StartLine", text: "They helped us scale our startup operations 10x without increasing headcount. The ROI is undeniable." },
    { name: "Sophia King", role: "Marketing Lead", company: "EcoGoods", text: "Our customer retention automated flows have increased LTV by 30%. The system paid for itself in two months." },
    { name: "William Scott", role: "COO", company: "LogiTech", text: "The integration with our legacy ERP was seamless. No downtime, just immediate efficiency improvements." },
    { name: "Mia Turn", role: "Head of Sales", company: "CloseIt", text: "Our sales team focuses on closing now, not data entry. Bond's automation handles all the CRM updates perfectly." },
];

const partners = [
    { name: "Peak & Flow", style: "font-sans font-bold text-xl tracking-tight" },
    { name: "Urban Greens", style: "font-serif italic text-lg" },
    { name: "NextStep Realty", style: "font-sans font-light text-xl uppercase tracking-widest" },
    { name: "BrightPath", style: "font-sans font-bold text-xl text-yellow-500/80" }, // maybe too specific color? let's stick to classes mostly or neutral. sticking to classes.
    { name: "Swift Courier", style: "font-mono font-bold text-lg italic -skew-x-12" },
    { name: "Oakwood Dental", style: "font-serif font-medium text-lg tracking-wide" },
    { name: "Focus Marketing", style: "font-sans font-black text-xl uppercase" },
    { name: "ClearView Tech", style: "font-mono text-lg tracking-tight" }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 relative bg-[#050505] text-white overflow-hidden isolate">
            {/* Background Image - Debug Approach using standard img */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/automations/mationspic.jpeg"
                    alt="Background Pattern"
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10" />
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">Our Network</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 uppercase">
                        Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Partnerships</span>
                    </h2>
                </div>

                {/* --- TRUSTED BY MARQUEE (Horizontal) --- */}
                <div className="relative w-full overflow-hidden mb-24 border-y border-white/5 py-12 bg-white/[0.02]">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                    <div className="flex w-max animate-marquee">
                        {[...partners, ...partners, ...partners].map((p, i) => (
                            <div key={i} className="mx-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-500">
                                <span className={`${p.style} text-white whitespace-nowrap`}>
                                    {p.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- TESTIMONIALS (Vertical Loop) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px] overflow-hidden relative mask-image-gradient">
                    {/* Gradient Masks for Vertical Scroll */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

                    {/* Column 1 */}
                    <div className="space-y-6 animate-marquee-vertical">
                        {[...testimonials, ...testimonials].filter((_, i) => i % 2 === 0).map((t, i) => (
                            <TestimonialCard key={`col1-${i}`} data={t} />
                        ))}
                    </div>

                    {/* Column 2 (Offset Animation) */}
                    <div className="space-y-6 animate-marquee-vertical" style={{ animationDelay: '-10s' }}>
                        {[...testimonials, ...testimonials].filter((_, i) => i % 2 !== 0).map((t, i) => (
                            <TestimonialCard key={`col2-${i}`} data={t} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

function TestimonialCard({ data }: { data: any }) {
    return (
        <div className="group p-8 rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl hover:bg-[#0a0a0a]/80 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-default">
            <div className="mb-6">
                <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">"{data.text}"</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                    {data.name.charAt(0)}
                </div>
                <div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{data.name}</div>
                    <div className="text-xs text-gray-500">{data.role}</div>
                </div>
            </div>
        </div>
    );
}
