'use client';

import { motion } from 'framer-motion';
import { ArrowUp, CheckSquare, ArrowRight, Atom, Eye, Lightbulb, Sliders } from 'lucide-react';
import Button from '../ui/Button';

const features = [
    {
        icon: <Atom className="w-10 h-10 text-[#00d2b4]" />,
        title: "Intelligent",
        desc: "Adipiscing elit, sed do eiusmod labore dolore magna aliqua."
    },
    {
        icon: <Eye className="w-10 h-10 text-[#00d2b4]" />,
        title: "Visualization",
        desc: "Adipiscing elit, sed do eiusmod labore dolore magna aliqua."
    },
    {
        icon: <Lightbulb className="w-10 h-10 text-[#00d2b4]" />,
        title: "Creativity",
        desc: "Adipiscing elit, sed do eiusmod labore dolore magna aliqua."
    },
    {
        icon: <Sliders className="w-10 h-10 text-[#00d2b4]" />,
        title: "Flexible",
        desc: "Adipiscing elit, sed do eiusmod labore dolore magna aliqua."
    }
];

export default function FilmmakingFeatures() {
    return (
        <section className="bg-black py-24 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8"
                >
                    <span className="text-[#00d2b4] uppercase tracking-wider text-sm font-semibold">Huge Collection</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                        AI-Powered Design
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        Our Tools Simplify And Accelerate Workflows, Foster Creativity, And Enable Others To Create New Products.
                    </p>

                    <ul className="flex flex-col gap-4">
                        {["Seamless integration", "Analyze the chats and improvise", "Custom-trained on your data", "Flexible branding options"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white text-lg font-medium">
                                <CheckSquare className="text-[#00d2b4] w-6 h-6" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4">
                        <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-lg transition-colors">
                            Get Started
                        </button>
                    </div>
                </motion.div>

                {/* Right Column: 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#00d2b4]/30 transition-colors group flex flex-col items-center text-center gap-4"
                        >
                            <div className="mb-2 p-3 bg-white/5 rounded-full group-hover:bg-[#00d2b4]/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                            <ArrowRight className="w-5 h-5 text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* FAB (Green arrow) - Replicated from image */}
            <div className="absolute bottom-10 right-10">
                <button className="w-16 h-16 bg-[#00d2b4] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ArrowUp className="text-black w-8 h-8" strokeWidth={3} />
                </button>
            </div>
        </section>
    );
}
