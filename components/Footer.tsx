'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#050505] text-white overflow-hidden font-sans border-t border-white/5">
            {/* --- Background Layer --- */}
            <div className="absolute inset-0 z-0 select-none">
                <img
                    src="/footer-bg-premium.png"
                    alt="City Horizon"
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">

                {/* --- NEWSLETTER SECTION --- */}
                <div className="flex flex-col items-center justify-center text-center mb-24 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-tight">
                        Receive Structured Insights
                    </h2>
                    <p className="text-gray-400 text-sm mb-10 font-light tracking-wide">
                        Periodic briefings on AI production and automation systems.
                    </p>

                    <div className="w-full max-w-md relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-30 group-hover:opacity-70 blur transition duration-500"></div>
                        <div className="relative flex bg-black rounded-full p-1 border border-white/10">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent text-white px-6 py-3 focus:outline-none placeholder-gray-600 text-sm rounded-l-full"
                            />
                            <button className="bg-white text-black px-8 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-cyan-50 transition-colors shrink-0">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- 4-COLUMN GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* COLUMN 1 — Identity */}
                    <div className="flex flex-col space-y-6">
                        {/* Logo */}
                        <div className="w-48">
                            <img src="/logo.png" alt="McPrime Digital" className="h-10 w-auto opacity-100" />
                        </div>

                        {/* Tagline */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-serif font-bold text-gray-200 tracking-wide">
                                Where Creativity Meets Intelligence
                            </h3>
                            <div className="h-px w-12 bg-indigo-500/50" />
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                                AI Commercial Filmmaking & Automation Infrastructure
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 pt-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2 — Services */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 opacity-50">Services</h4>
                        <ul className="space-y-3">
                            {['AI Commercial Filmmaking', 'AI Automation', 'Add-Ons'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Add-Ons' ? '/add-ons' : item === 'AI Commercial Filmmaking' ? '/filmmaking' : item === 'AI Automation' ? '/automations' : '#'}
                                        className="text-gray-400 hover:text-white transition-all text-sm font-light hover:underline underline-offset-4 decoration-indigo-500 decoration-2"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3 — Company */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 opacity-50">Company</h4>
                        <ul className="space-y-3">
                            {['About', 'Selected Engagements', 'Insights', 'Join Our Team', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Insights' ? '/insights' : item === 'Selected Engagements' ? '/selected-engagements' : item === 'Join Our Team' ? '/join-our-team' : item === 'About' ? '/about' : item === 'Contact' ? '/#contact' : '#'}
                                        className="text-gray-400 hover:text-white transition-all text-sm font-light hover:underline underline-offset-4 decoration-indigo-500 decoration-2"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4 — Governance */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 opacity-50">Governance</h4>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms of Service', 'Security & Governance', 'Data Protection Statement'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={['Security & Governance', 'Data Protection Statement'].includes(item) ? '/security-governance' : item === 'Privacy Policy' ? '/privacy-policy' : '#'}
                                        className="text-gray-500 hover:text-gray-300 transition-all text-xs font-light hover:underline underline-offset-4 decoration-gray-600 decoration-1"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* --- BOTTOM STRIP --- */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
                    <p>
                        © 2025 McPrime Digital. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {['Cookies', 'Privacy', 'Terms'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Cookies' ? '/security-governance' : item === 'Privacy' ? '/privacy-policy' : '#'}
                                className="hover:text-gray-300 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className="absolute right-8 bottom-8 md:right-12 md:bottom-12 w-10 h-10 rounded-full border border-white/10 bg-black/40 hover:bg-indigo-600 hover:border-indigo-600 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm group z-50"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
        </footer>
    );
}
