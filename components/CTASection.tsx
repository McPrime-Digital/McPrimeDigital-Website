'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Button from './ui/Button';
import { Send } from 'lucide-react';
import { MouseEvent } from 'react';

function SpotlightBox({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-slate-900/50 rounded-xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 197, 253, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export default function CTASection() {
    return (
        <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900/40 to-black border border-white/10 p-8 md:p-20">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left Side: Text */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
                    >
                        Establish the Infrastructure for <span className="text-white">Scalable Execution</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 mb-8"
                    >
                        Schedule your <span className="text-purple-400 font-bold">Free AI Audit</span> today. Discover hidden efficiencies and scale your impact with McPrime Digital.
                    </motion.p>

                    <ul className="space-y-4 mb-8 text-gray-400">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Defined engagement scope and governance structure
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Performance objectives aligned to measurable outcomes
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Documented implementation roadmap
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Structured reporting and operational visibility
                        </li>
                    </ul>
                </div>

                {/* Right Side: Lead Gen Form */}
                {/* Right Side: Lead Gen Form with Reactive Spotlight */}
                <SpotlightBox className="p-8 md:p-10 rounded-3xl shadow-2xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all">
                    <form className="flex flex-col gap-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Name" type="text" placeholder="John Doe" />
                            <InputField label="Company" type="text" placeholder="Acme Inc." />
                        </div>
                        <InputField label="Email" type="email" placeholder="john@company.com" />
                        <InputField label="Message" type="textarea" placeholder="Tell us about your goals..." />

                        <Button
                            className="w-full py-4 text-lg bg-indigo-600 hover:bg-indigo-500 border-none shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 mt-2 relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center justify-center">REQUEST EXECUTIVE CONSULTATION <Send className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        </Button>
                    </form>
                </SpotlightBox>
            </div>
        </section>
    );
}

function InputField({ label, type, placeholder }: { label: string, type: string, placeholder: string }) {
    return (
        <div className="flex flex-col gap-2 group">
            <label className="text-sm font-bold text-gray-400 group-focus-within:text-indigo-400 transition-colors uppercase tracking-wider ml-1">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    className="bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:bg-white/5 focus:outline-none transition-all duration-300 min-h-[120px] resize-none"
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:bg-white/5 focus:outline-none transition-all duration-300"
                />
            )}
        </div>
    );
}
