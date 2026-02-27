'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, UtensilsCrossed, MonitorPlay, Building2, Gem, Handshake, Map, BriefcaseBusiness } from 'lucide-react';

const engagements = [
    {
        client: "Pharmaceutical Organization",
        title: "AI Commercial Film Production",
        description: "Developed and delivered an AI-native commercial film explaining a pharmaceutical product, its intended use, and the problem it addresses. Scriptwriting was structured to align with approval requirements, and full production was completed in under six days.",
        points: ["Structured script development", "Compliance-aware messaging", "Accelerated production timeline", "Deployment-ready commercial asset"],
        icon: FlaskConical,
        color: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-cyan-400"
    },
    {
        client: "Food & Beverage Brand",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting brand positioning and product appeal within a competitive consumer market.",
        points: ["Concept development", "AI-native production", "Multi-format commercial delivery"],
        icon: UtensilsCrossed,
        color: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-400"
    },
    {
        client: "AI Software Company",
        title: "Capability-Focused Commercial Film",
        description: "Produced a short-form commercial explaining product capabilities, target users, practical application, and functional benefits.",
        points: ["Structured product narrative", "Clear use-case communication", "Benefit-driven positioning", "Platform-ready output"],
        icon: MonitorPlay,
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
        icon: Gem,
        color: "from-rose-500/20 to-pink-500/20",
        iconColor: "text-rose-400"
    },
    {
        client: "Food & Beverage Brand",
        title: "AI Brand Ambassador Program",
        description: "Developed a recurring AI-powered brand ambassador system producing weekly content for snack product promotion.",
        points: ["Structured weekly content framework", "Consistent brand voice", "Scalable short-form output"],
        icon: Handshake,
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
        icon: BriefcaseBusiness,
        color: "from-teal-500/20 to-emerald-500/20",
        iconColor: "text-teal-400"
    }
];

export default function SelectedEngagementsHorizontal() {
    // Duplicate the array to create a seamless infinite loop
    const doubledEngagements = [...engagements, ...engagements];
    const [touchedCard, setTouchedCard] = useState<number | null>(null);

    return (
        <section className="py-24 sm:py-32 relative bg-[#050505] overflow-hidden rounded-3xl border border-white/5 my-12 group/section">
            {/* Reinstated Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none transition-transform duration-1000 scale-100 group-hover/section:scale-105">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                        Representative work across commercial production and operational systems.
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Continuous Marquee */}
            <div className="relative w-full flex overflow-hidden group">
                {/* Left/Right Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {doubledEngagements.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setTouchedCard(index)}
                            onMouseLeave={() => setTouchedCard(null)}
                            onClick={() => setTouchedCard(touchedCard === index ? null : index)} // Toggle on Touch
                            className={`w-[350px] md:w-[450px] flex-shrink-0 relative rounded-2xl border bg-[#0a0a0a]/80 backdrop-blur-xl p-8 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer ${touchedCard === index ? 'border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#111] scale-105 z-20' : 'border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:bg-[#111] hover:scale-105 z-10'}`}
                        >
                            {/* Card Hover Glow (Active on Touch) */}
                            <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${item.color} rounded-full blur-[80px] transition-opacity duration-700 pointer-events-none ${touchedCard === index ? 'opacity-60' : 'opacity-20 hover:opacity-60'}`} />

                            <div className="mb-6 flex items-center justify-between relative z-10">
                                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full">{item.client}</span>
                                <item.icon className={`w-6 h-6 ${item.iconColor} drop-shadow-[0_0_10px_currentColor]`} />
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-white leading-tight uppercase tracking-wide relative z-10">{item.title}</h3>

                            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow relative z-10 font-light">
                                {item.description}
                            </p>

                            <div className="space-y-3 relative z-10 mt-auto border-t border-white/5 pt-6">
                                {item.points.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${item.iconColor} shadow-[0_0_8px_currentColor] flex-shrink-0`} />
                                        <span className="font-medium tracking-wide">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
