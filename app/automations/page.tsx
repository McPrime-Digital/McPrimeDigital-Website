'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Brain, Network, Zap, ChevronRight, BarChart3, Lock, Shield, CheckCircle, ArrowRight, X, Mail, FileText, User, Building, ExternalLink, TrendingUp, MessageSquare, Settings, Users, Database } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import Hero3D from '@/components/automations/Hero3D';
import TextType from '@/components/TextType';

// Dynamically import below-the-fold heavy components
const AuditHorizontal = dynamic(() => import('@/components/automations/AuditHorizontal'), { ssr: true });
const RoiSection = dynamic(() => import('@/components/automations/RoiSection'), { ssr: true });
const SecurityGovernanceSection = dynamic(() => import('@/components/automations/SecurityGovernanceSection'), { ssr: true });
const CtaSection = dynamic(() => import('@/components/automations/CtaSection'), { ssr: true });
const SelectedEngagementsVertical = dynamic(() => import('@/components/SelectedEngagementsVertical'), { ssr: true });



// --- Animation Variants ---
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
};

const slideInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
};

export default function AutomationsPage() {
    const [isHoveringHeroText, setIsHoveringHeroText] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        // Reset success message after 3 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans relative">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                <Hero3D />
                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto text-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-900/10 border border-cyan-500/20 text-cyan-400 mb-8 backdrop-blur-md hover:bg-cyan-900/20 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="text-sm font-bold tracking-widest uppercase">Next Gen Ecosystems</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase"
                        >
                            <span className="liquid-glass-text block mb-6 text-center !font-[family-name:var(--font-libre)] font-bold tracking-tighter whitespace-normal md:whitespace-nowrap text-2xl md:text-4xl lg:text-5xl">
                                BUILDING SMARTER SYSTEMS WITH
                            </span>
                            <motion.span
                                className="inline-block relative py-4"
                                onMouseEnter={() => setIsHoveringHeroText(true)}
                                onMouseLeave={() => setIsHoveringHeroText(false)}
                                animate={{
                                    scale: isHoveringHeroText ? 1.02 : 1
                                }}
                            >
                                <TextType
                                    text={["Text typing effect", "for your websites", "Happy coding!"]}
                                    typingSpeed={75}
                                    pauseDuration={1500}
                                    showCursor
                                    cursorCharacter="●"
                                    texts={["INTELLIGENT AUTOMATIONS", "Not Just Code!"]}
                                    deletingSpeed={50}
                                    variableSpeedEnabled={false}
                                    variableSpeedMin={60}
                                    variableSpeedMax={120}
                                    cursorBlinkDuration={0.5}
                                    className="liquid-glass-text block text-center text-4xl md:text-7xl leading-tight max-w-6xl mx-auto !font-[family-name:var(--font-libre)] font-bold tracking-tighter"
                                />
                            </motion.span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-md">
                            We deploy custom AI automation across six core pillars of your business. This integration eliminates manual tasks, accelerates execution, reduces errors, and enables scalable operational efficiency.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex justify-center">
                            <Link href="#contact-automations" className="glass-button-3d px-12 py-6 text-white text-xl tracking-widest rounded-lg flex items-center gap-3">
                                <span className="relative z-10 flex items-center gap-3">
                                    REQUEST FOR PARTNERSHIP <ArrowRight className="w-6 h-6" />
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- CUSTOM AI SYSTEMS --- */}
            <section className="relative py-16 md:py-32 overflow-hidden">
                {/* Background Image & Gradient Overlays */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/ai robot.jpeg"
                        alt="AI Background"
                        fill
                        className="object-cover object-center opacity-30"
                        priority
                    />
                    {/* Gradient Overlays for Smooth Transition */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
                    <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto mb-20 text-center"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight uppercase drop-shadow-lg text-white/90 whitespace-nowrap">
                            CUSTOM AI SYSTEMS FOR SIX CORE PILLARS IN EVERY INDUSTRY
                        </h2>
                        <h3 className="text-lg md:text-xl text-cyan-300/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                            "We build intelligent AI agents that automate tasks, streamline workflows, and think like your best employee — only faster"
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "REVENUE & GROWTH", icon: TrendingUp, color: "from-green-400 to-emerald-600", desc: "Automated lead capture, campaign execution, CRM updates, and sales follow-ups." },
                            { title: "CUSTOMER EXPERIENCE", icon: MessageSquare, color: "from-blue-400 to-indigo-600", desc: "Structured onboarding, support routing, and lifecycle engagement." },
                            { title: "OPERATIONS & DELIVERY", icon: Settings, color: "from-amber-400 to-orange-600", desc: "Workflow automation, task orchestration, and execution tracking." },
                            { title: "FINANCE & ADMIN", icon: FileText, color: "from-purple-400 to-pink-600", desc: "Document routing, invoicing, compliance logging, and reporting." },
                            { title: "PEOPLE & IT", icon: Users, color: "from-teal-400 to-cyan-600", desc: "HR workflows, access provisioning, and internal system management." },
                            { title: "DATA & INTELLIGENCE LAYER", icon: Database, color: "from-red-400 to-rose-600", desc: "Unified analytics, forecasting, and embedded AI decision support." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all relative overflow-hidden backdrop-blur-xl shadow-2xl"
                            >
                                {/* Liquid Glass Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-500`} />

                                <item.icon className="w-12 h-12 mb-6 text-white/90 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

                                <h4 className="text-2xl font-bold mb-4 uppercase tracking-wider text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
                                    {item.title}
                                </h4>

                                <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed font-light drop-shadow-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- PROCESS SECTION (HORIZONTAL ZIG ZAG) --- */}
            < AuditHorizontal />



            {/* --- WHAT WE DELIVER (ROI DASHBOARD) --- */}
            < RoiSection />


            {/* --- SELECTED ENGAGEMENTS (VERTICAL) --- */}
            <SelectedEngagementsVertical />


            {/* --- CTA SECTION --- */}
            < CtaSection />

            {/* --- SECURITY & GOVERNANCE --- */}
            <SecurityGovernanceSection />

            <Footer />
        </main >
    );
}
