'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
    {
        title: "NEURAL NETWORK",
        category: "Tech Innovation",
        image: "/filmmaking/cyberpunk-girl.png" // Using existing assets as placeholders if needed, or specific ones if available
    },
    {
        title: "AEROSPACE DYNAMICS",
        category: "Industrial",
        image: "/filmmaking/astronaut-plants.png"
    },
    {
        title: "LUXURY RETAIL",
        category: "Commercial",
        image: "/filmmaking/face-leaves.png"
    },
    {
        title: "AUTOMOTIVE FUTURE",
        category: "Concept",
        image: "/filmmaking/hero-bg.png"
    }
];

export default function FilmmakingPortfolio() {
    return (
        <section className="bg-[#050608] py-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">VISUAL PORTFOLIO</h2>
                    <div className="h-1 w-20 bg-[#2D6BFF] mb-6" />
                    <p className="max-w-3xl text-gray-400 font-light leading-relaxed">
                        Selected commercial films created through AI-native production systems, demonstrating cinematic quality, structured execution, and scalable creative architecture. Production becomes Digital Infrastructure rather than event-based execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-video overflow-hidden bg-[#12151C] cursor-pointer"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />

                            {/* Overlay info - minimal */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-[#2D6BFF] text-xs tracking-widest font-mono mb-2 uppercase">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {project.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
