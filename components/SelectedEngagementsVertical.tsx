'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Video, LayoutTemplate, BriefcaseBusiness, TrendingUp, Users, Building2, Map } from 'lucide-react';

const engagements = [
    {
        client: "Pharmaceutical Organization",
        title: "AI Commercial Film Production",
        description: "Developed and delivered an AI-native commercial film explaining a pharmaceutical product, its intended use, and the problem it addresses. Scriptwriting was structured to align with approval requirements, and full production was completed in under six days.",
        points: ["Structured script development", "Compliance-aware messaging", "Accelerated production timeline", "Deployment-ready commercial asset"],
        icon: ShieldCheck,
        color: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-cyan-400"
    },
    {
        client: "Food & Beverage Brand",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting brand positioning and product appeal within a competitive consumer market.",
        points: ["Concept development", "AI-native production", "Multi-format commercial delivery"],
        icon: Video,
        color: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-400"
    },
    {
        client: "AI Software Company",
        title: "Capability-Focused Commercial Film",
        description: "Produced a short-form commercial explaining product capabilities, target users, practical application, and functional benefits.",
        points: ["Structured product narrative", "Clear use-case communication", "Benefit-driven positioning", "Platform-ready output"],
        icon: LayoutTemplate,
        color: "from-purple-500/20 to-indigo-500/20",
        iconColor: "text-indigo-400"
    },
    {
        client: "Mobile Banking Institution",
        title: "Payroll Automation Architecture",
        description: "Designed and implemented an automation workflow supporting payroll operations within a financial environment.",
        points: ["Workflow mapping", "Process automation design", "Operational efficiency improvement", "Structured deployment"],
        icon: Building2,
        color: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-400"
    },
    {
        client: "Luxury Brand",
        title: "Multi-Product Commercial Production",
        description: "Produced a high-end commercial showcasing five products within a unified narrative framework.",
        points: ["Coordinated visual architecture", "Controlled brand tone", "Premium visual delivery"],
        icon: BriefcaseBusiness,
        color: "from-rose-500/20 to-pink-500/20",
        iconColor: "text-rose-400"
    },
    {
        client: "Food & Beverage Brand",
        title: "AI Brand Ambassador Program",
        description: "Developed a recurring AI-powered brand ambassador system producing weekly content for snack product promotion.",
        points: ["Structured weekly content framework", "Consistent brand voice", "Scalable short-form output"],
        icon: Users,
        color: "from-fuchsia-500/20 to-purple-500/20",
        iconColor: "text-fuchsia-400"
    },
    {
        client: "Hotel & Resort",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting property experience, amenities, and brand positioning within the hospitality market.",
        points: ["Visual storytelling", "Structured narrative flow", "Destination-focused messaging"],
        icon: Map,
        color: "from-cyan-500/20 to-blue-500/20",
        iconColor: "text-blue-400"
    },
    {
        client: "Hospitality Organization",
        title: "Operational & Lead Generation Workflow",
        description: "Designed and implemented operational and lead generation workflows to improve internal coordination and marketing pipeline structure.",
        points: ["Lead capture optimization", "Workflow automation", "Structured operational alignment"],
        icon: TrendingUp,
        color: "from-teal-500/20 to-emerald-500/20",
        iconColor: "text-teal-400"
    }
];

export default function SelectedEngagementsVertical() {
    // Duplicate the array to create a seamless infinite loop
    const doubledEngagements = [...engagements, ...engagements];

    return (
        <section className="py-24 sm:py-32 relative bg-[#050505] overflow-hidden rounded-3xl border border-white/5 my-12">
            {/* Background elements specific to the vertical flow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-50 blur-[100px]" />
            <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50 blur-[100px]" />

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
                            Representative work across commercial production and operational systems. We build autonomous pipelines and high-end visual tools utilized by leading brands.
                        </p>

                        {/* Visual Structural Diagram Line */}
                        <div className="hidden lg:flex items-center gap-4 mt-12 opacity-50">
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-cyan-500" />
                            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Right Column: Vertical Infinite Scroll Marquee */}
                    <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm group">

                        {/* Top/Bottom Fade Masks to hide the seam */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

                        {/* Animated Track */}
                        <motion.div
                            className="flex flex-col gap-6 p-4 md:p-8"
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{
                                ease: "linear",
                                duration: 45,
                                repeat: Infinity,
                            }}
                        >
                            {doubledEngagements.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 group/card relative rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-6 hover:bg-[#111] transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden"
                                >
                                    {/* Card Hover Glow */}
                                    <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${item.color} rounded-full blur-[80px] opacity-20 group-hover/card:opacity-60 transition-opacity duration-700 pointer-events-none`} />

                                    <div className="mb-4 flex items-center justify-between relative z-10">
                                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full">{item.client}</span>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor} drop-shadow-[0_0_10px_currentColor]`} />
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold mb-3 text-white leading-tight uppercase tracking-wide relative z-10">{item.title}</h3>

                                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 relative z-10 font-light hidden md:block">
                                        {item.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 relative z-10 border-t border-white/5 pt-4">
                                        {item.points.map((point, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${item.iconColor} shadow-[0_0_8px_currentColor] flex-shrink-0`} />
                                                <span className="font-medium tracking-wide">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
