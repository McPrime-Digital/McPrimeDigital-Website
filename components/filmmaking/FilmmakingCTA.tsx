'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FilmmakingCTA() {
    return (
        <section className="relative py-32 overflow-hidden bg-[#0B0D12] flex items-center justify-center">
            {/* Background Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2D6BFF10_0%,_transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
                >
                    {/* Glass Shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
                        Build your next commercial through a<br />
                        structured AI-native production system.
                    </h2>

                    <div className="flex justify-center relative z-10 mt-10">
                        <Link href="/contact" className="group relative inline-flex items-center gap-3 bg-[#2D6BFF] text-white px-8 py-4 rounded-lg font-bold tracking-wide uppercase overflow-hidden hover:bg-[#2055CC] transition-colors">
                            <span>Schedule Strategy Session</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
