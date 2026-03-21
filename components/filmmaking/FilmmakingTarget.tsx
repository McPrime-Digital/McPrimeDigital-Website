'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useState } from 'react';
import { MouseEvent } from 'react';
import { CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

// Reusable Spotlight Component for Premium Cards
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-white/[0.02] overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(45, 107, 255, 0.1),
              transparent 80%
            )
          `,
                }}
            />
            {/* Inner Border Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(45, 107, 255, 0.4),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative h-full z-10">{children}</div>
        </div>
    );
}

export default function FilmmakingTarget() {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, source: 'Filmmaking Target CTA' })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send request');
            }

            setStatus('success');
            setFormData({ name: '', company: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="relative bg-[#0B0D12] py-32 overflow-hidden border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2D6BFF]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 lg:items-start">

                    {/* Left Column: WHO IT'S FOR + INDUSTRY CONTEXT (60%) */}
                    <div className="lg:w-3/5 space-y-20">

                        {/* Who It's For */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight"
                            >
                                ENGINEERED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#88aaff]">SCALE</span>
                            </motion.h2>

                            <div className="space-y-10">
                                <div className="pl-4 border-l-2 border-[#2D6BFF]/30">
                                    <h3 className="text-xl font-bold text-[#2D6BFF] mb-6 uppercase tracking-wider">Who It&apos;s For</h3>
                                    <ul className="space-y-6">
                                        {[
                                            "Growth-stage brands requiring rapid content execution",
                                            "Enterprise teams seeking scalable creative infrastructure",
                                            "Luxury brands demanding visual precision without logistical complexity",
                                            "Agencies needing high-end production capacity without expanding operations"
                                        ].map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-4 group"
                                            >
                                                <div className="mt-1 p-1 rounded-full bg-[#2D6BFF]/10 group-hover:bg-[#2D6BFF]/20 transition-colors">
                                                    <CheckCircle2 className="w-4 h-4 text-[#2D6BFF]" />
                                                </div>
                                                <span className="text-lg text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                                                    {item}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-gradient-to-r from-[#2D6BFF]/10 to-transparent border border-[#2D6BFF]/20"
                                >
                                    <p className="text-xl text-white font-medium">
                                        "If speed, control, and scalability matter, this model aligns perfectly."
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Industry Context - Premium Cards */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-8 h-px bg-[#2D6BFF]"></span> Industry Context
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: "High-Standard Industries", desc: "Regulated sectors like pharma, healthtech, and finance.", color: "bg-blue-500" },
                                    { title: "Innovation Leaders", desc: "Tech and AI companies driving the future.", color: "bg-purple-500" },
                                    { title: "Performance Brands", desc: "High-volume commercial output with measurable ROI.", color: "bg-emerald-500" }
                                ].map((card, i) => (
                                    <SpotlightCard key={i} className="rounded-2xl p-6 md:p-8 backdrop-blur-md">
                                        <div className={`w-10 h-10 ${card.color}/20 rounded-lg flex items-center justify-center mb-4`}>
                                            <div className={`w-2 h-2 ${card.color} rounded-full animate-pulse`} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                                        <p className="text-gray-400 text-sm font-light leading-relaxed">{card.desc}</p>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: STRATEGY SESSION FORM (40%) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/5"
                    >
                        <SpotlightCard className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl bg-[#0B0D12]/80 backdrop-blur-xl">
                            <h3 className="text-3xl font-bold text-white mb-6">
                                Advance Your Commercial Production Architecture
                            </h3>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "AI-native production framework",
                                    "Accelerated timelines without logistical overhead",
                                    "Enterprise-level post-production standards",
                                    "Deployment structured for performance tracking"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400 font-light">
                                        <div className="mt-1 p-1 rounded-full bg-[#2D6BFF]/10 shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-[#2D6BFF]" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                {status === 'success' && (
                                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-400">
                                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-sm">Your strategy briefing request has been received.</span>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-sm">{errorMessage || 'Something went wrong. Please try again.'}</span>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    <PremiumInput label="Name" placeholder="Enter your name" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} required />
                                    <PremiumInput label="Company" placeholder="Company name" value={formData.company} onChange={(e: any) => setFormData({ ...formData, company: e.target.value })} />
                                    <PremiumInput label="Email" placeholder="work@email.com" type="email" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} required />
                                    <div className="group space-y-2">
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#2D6BFF] transition-colors">Message <span className="text-red-400">*</span></label>
                                        <textarea
                                            rows={3}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2D6BFF] focus:bg-white/[0.05] transition-all resize-none"
                                            placeholder="Briefly describe your project..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full group relative overflow-hidden rounded-xl bg-[#2D6BFF] p-4 text-white font-bold tracking-wider uppercase transition-all hover:bg-[#1a55db] shadow-[0_0_20px_rgba(45,107,255,0.3)] hover:shadow-[0_0_40px_rgba(45,107,255,0.6)] flex items-center justify-center gap-2 block text-center disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                                        {status === 'loading' ? (
                                            <><Loader2 className="w-5 h-5 animate-spin" /> SCHEDULING...</>
                                        ) : (
                                            <>Schedule a Production Strategy Briefing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </button>
                            </form>
                        </SpotlightCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function PremiumInput({ label, placeholder, type = "text", value, onChange, required }: { label: string, placeholder: string, type?: string, value?: string, onChange?: any, required?: boolean }) {
    return (
        <div className="group space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#2D6BFF] transition-colors">{label} {required && <span className="text-red-400">*</span>}</label>
            <input
                type={type}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2D6BFF] focus:bg-white/[0.05] transition-all"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}
