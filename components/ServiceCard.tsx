'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    delay?: number;
}

export default function ServiceCard({ title, description, icon: Icon, delay = 0 }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass-card p-8 group hover:border-[rgb(var(--primary))]/50 transition-all duration-300 relative overflow-hidden"
        >
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {Icon && (
                    <div className="mb-6 inline-flex p-3 rounded-lg bg-[rgb(var(--primary))]/20 text-[rgb(var(--primary))] group-hover:text-white group-hover:bg-[rgb(var(--primary))] transition-colors duration-300">
                        <Icon size={32} />
                    </div>
                )}

                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-gradient transition-all duration-300">
                    {title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
