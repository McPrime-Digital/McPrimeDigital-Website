'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/data';

export default function InsightsPage() {
    const articles = getAllArticles();

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <style jsx global>{`
                ::selection {
                    background: #6366f1; /* Indigo 500 */
                    color: white;
                }
            `}</style>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 px-4 md:px-8 border-b border-white/10 overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[2px] w-12 bg-indigo-500" />
                            <span className="text-indigo-400 font-mono tracking-widest uppercase text-sm">McPrime Intelligence</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                            Insights & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-white">Strategic Intelligence</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Deep dives into the architecture of modern business. We explore the intersection of generative AI, automation frameworks, and enterprise scalability.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ARTICLES LIST SECTION */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col gap-32">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="group relative"
                            >
                                {/* Article Header */}
                                <div className="mb-12">
                                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-gray-500 mb-6 font-mono border-b border-white/10 pb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-indigo-500" />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-indigo-500" />
                                            {article.category}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-indigo-500" />
                                            {article.author}
                                        </div>
                                    </div>

                                    <Link href={`/insights/${article.id}`} className="block">
                                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight group-hover:text-indigo-200 transition-colors cursor-pointer">
                                            {article.title}
                                        </h2>
                                    </Link>

                                    <Link href={`/insights/${article.id}`} className="block">
                                        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-gray-900 mb-12 shadow-2xl cursor-pointer">
                                            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-indigo-900/10 transition-colors z-10" />

                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                                                <div className="w-16 h-1 bg-indigo-500 mb-4" />
                                                <div className="flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                                                    Read Article <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Article Excerpt */}
                                    <div className="max-w-3xl">
                                        <p className="text-lg text-gray-400 leading-relaxed mb-6">
                                            {article.summary}
                                        </p>
                                        <Link href={`/insights/${article.id}`} className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors font-medium">
                                            Continue Reading <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                </div>

                                {/* Divider */}
                                <div className="mt-20 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-black to-indigo-950/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <h3 className="text-3xl md:text-5xl font-serif font-bold mb-8">Ready to move from Insight to Action?</h3>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        The strategies outlined here are not theoretical. They are the same frameworks we deploy for our partners daily.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/#contact">
                            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)]">
                                REQUEST CONSULTATION
                            </button>
                        </Link>
                        <Link href="/">
                            <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-full transition-all flex items-center gap-2 justify-center">
                                <ArrowLeft className="w-5 h-5" /> BACK TO HOME
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
