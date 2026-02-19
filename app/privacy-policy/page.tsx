'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#121212] text-white font-sans selection:bg-indigo-500/30">
            {/* HERO SECTION */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5 bg-[#141414]">
                <div className="max-w-4xl mx-auto text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-gray-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight tracking-tight text-white">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            Effective Date: February 17, 2026
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTENT SECTIONS */}
            <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-20 space-y-16">

                {/* 1. Information We Collect */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">1. Information We Collect</h2>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">We may collect:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-light mb-6 ml-2">
                        <li>Contact information (name, email address)</li>
                        <li>Business information provided through inquiry forms</li>
                        <li>Usage data through analytics tools</li>
                        <li>Technical data such as IP address and browser type</li>
                    </ul>
                    <p className="text-gray-400 font-light leading-relaxed">
                        We do not intentionally collect sensitive personal data unless voluntarily provided in a business context.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 2. How We Use Information */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">2. How We Use Information</h2>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">Information is used to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-light mb-6 ml-2">
                        <li>Respond to inquiries</li>
                        <li>Deliver contracted services</li>
                        <li>Improve website performance</li>
                        <li>Maintain security and integrity</li>
                    </ul>
                    <p className="text-gray-400 font-light leading-relaxed">
                        We do not sell personal data.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 3. Legal Basis for Processing */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">3. Legal Basis for Processing</h2>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">Where applicable, processing is based on:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-light ml-2">
                        <li>Contractual necessity</li>
                        <li>Legitimate business interests</li>
                        <li>User consent</li>
                    </ul>
                </section>

                <hr className="border-white/5" />

                {/* 4. Data Retention */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">4. Data Retention</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Information is retained only as long as necessary to fulfill its purpose or meet legal obligations.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 5. Third-Party Services */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">5. Third-Party Services</h2>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">We may use:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-light mb-6 ml-2">
                        <li>Hosting providers</li>
                        <li>Analytics services</li>
                        <li>Payment processors</li>
                    </ul>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Each third party is expected to maintain reasonable security standards.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 6. Data Security */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">6. Data Security</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        We implement reasonable technical and organizational measures to protect data against unauthorized access, alteration, or destruction.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 7. Your Rights */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">7. Your Rights</h2>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">Depending on jurisdiction, you may:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 font-light mb-6 ml-2">
                        <li>Request access to your data</li>
                        <li>Request correction</li>
                        <li>Request deletion</li>
                        <li>Withdraw consent</li>
                    </ul>
                    <p className="text-gray-400 font-light leading-relaxed mt-4">
                        Requests may be directed to: <a href="mailto:legal@mcprimedigital.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">legal@mcprimedigital.com</a>
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 8. Cookies */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">8. Cookies</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        We use essential and limited analytics cookies. Users may control cookies through browser settings.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 9. Updates */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">9. Updates</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        We may update this policy periodically. The updated version will be posted on this page.
                    </p>
                </section>

                <hr className="border-white/5" />

                {/* 10. Contact */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6">10. Contact</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                        For privacy inquiries: <br />
                        <a href="mailto:legal@mcprimedigital.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">legal@mcprimedigital.com</a>
                    </p>
                </section>

            </div>
        </main>
    );
}
