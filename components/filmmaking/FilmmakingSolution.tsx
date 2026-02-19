'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function FilmmakingSolution() {
    return (
        <section className="bg-black py-24 px-4 md:px-12 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <span className="text-[#00d2b4] uppercase tracking-wider text-sm font-semibold mb-4 block">Solution</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    AiMentor's AI Design features are here to transform the way you think about design.
                </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Card 1 - Astronaut */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative group h-[600px] rounded-3xl overflow-hidden"
                >
                    <img
                        src="/filmmaking/astronaut-plants.png"
                        alt="Astronaut with Plants"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            The future of UX/UI design is here with AiMentor, the world's first AI tool.
                        </p>
                    </div>
                </motion.div>

                {/* Card 2 - Face Leaves */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative group h-[600px] rounded-3xl overflow-hidden"
                >
                    <img
                        src="/filmmaking/face-leaves.png"
                        alt="Artistic Face"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            AiMentor Enterprise really is the complete AI graphics package for experts.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* FAB (Green arrow) */}
            <div className="absolute bottom-10 right-10">
                <button className="w-16 h-16 bg-[#00d2b4] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ArrowUp className="text-black w-8 h-8" strokeWidth={3} />
                </button>
            </div>
        </section>
    );
}
