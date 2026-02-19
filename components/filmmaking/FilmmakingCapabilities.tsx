'use client';

import { motion } from 'framer-motion';
import { PenTool, Image, Layers, Film, FileOutput, Zap } from 'lucide-react';

const capabilities = [
    {
        title: "AI-Assisted Script Development",
        desc: "Structured narrative design, iterative refinement, and scalable concept validation.",
        icon: PenTool
    },
    {
        title: "Advanced Image & Video Generation",
        desc: "High-resolution scene creation with controlled visual consistency and cinematic composition.",
        icon: Image
    },
    {
        title: "Digital Compositing & Enhancement",
        desc: "Blending generated visuals with real assets where needed for realism and depth.",
        icon: Layers
    },
    {
        title: "Cinematic Post-Production",
        desc: "Editing, sound design, custom music scoring, and color grading executed at professional standards.",
        icon: Film
    },
    {
        title: "Multi-Platform Commercial Structuring",
        desc: "Assets formatted for paid media, web, broadcast, and campaign variations.",
        icon: FileOutput
    }
];

export default function FilmmakingCapabilities() {
    return (
        <section className="bg-[#0B0D12] py-32 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <span className="text-[#2D6BFF] font-mono text-sm tracking-widest uppercase mb-4 block">
                        System Modules
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        CAPABILITIES THAT DRIVE<br />MEASURABLE PERFORMANCE
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {capabilities.map((cap, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 bg-white/[0.02] border border-white/5 hover:border-[#2D6BFF]/50 rounded-xl transition-all duration-300 hover:bg-white/[0.04]"
                        >
                            <cap.icon className="w-8 h-8 text-gray-400 mb-6 group-hover:text-[#2D6BFF] transition-colors" />
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#2D6BFF] transition-colors">
                                {cap.title}
                            </h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                {cap.desc}
                            </p>
                        </motion.div>
                    ))}

                    {/* Performance Metrics Block as the 6th item */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="p-8 bg-gradient-to-br from-[#1A1F27] to-[#0B0D12] border border-white/10 rounded-xl flex flex-col justify-center relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-[#2D6BFF]/5 group-hover:bg-[#2D6BFF]/10 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-6 relative z-10">
                            Performance Impact
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-light relative z-10">
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-[#2D6BFF] rounded-full" /> Faster turnaround
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-[#2D6BFF] rounded-full" /> Reduced overhead
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-[#2D6BFF] rounded-full" /> Creative iteration speed
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-[#2D6BFF] rounded-full" /> Scalable generation
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
