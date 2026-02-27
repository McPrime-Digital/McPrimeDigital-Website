'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

// 8 Posts
const posts = [
    { title: "The Rise of AI in 2026: What to Expect", category: "Industry Insights", date: "Jan 24, 2026", image: "/blog/ai-rise-2026.png", type: "blog", slug: "ai-rise-2026" },
    { title: "How Automation Cut Development Costs by 40%", category: "Case Study", date: "Jan 18, 2026", image: "/blog/cost-reduction.png", type: "case-study", slug: "automation-cost-reduction" },
    { title: "The Future of Paid Ads is Generative", category: "Marketing", date: "Jan 12, 2026", image: "/blog/gen-ads.png", type: "blog", slug: "generative-paid-ads" },
    { title: "AI UGC: Authenticity at Scale", category: "Social Media", date: "Jan 05, 2026", image: "/blog/data-analytics.png", type: "blog", slug: "ai-ugc" },
    { title: "Strategic Due Diligence in AI Adoption", category: "Strategy", date: "Dec 28, 2025", image: "/blog/ai-strategy.png", type: "blog", slug: "strategic-due-diligence" },
    { title: "Video Production 2.0: The AI Revolution", category: "Production", date: "Dec 20, 2025", image: "/blog/future-tech.png", type: "blog", slug: "video-production-2-0" },
    { title: "Scaling with Digital Humans: A Retail Success", category: "Case Study", date: "Dec 15, 2025", image: "/blog/automation.png", type: "case-study", slug: "scaling-digital-humans" },
    { title: "The Ethics of Generative Content", category: "Opinion", date: "Dec 10, 2025", image: "/blog/ai-ethics.png", type: "blog", slug: "ethics-generative-content" }
];

export default function BlogSection() {
    return (
        <section className="overflow-hidden">
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="flex justify-between items-end mb-12">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white">Insights</span>
                    </motion.h2>
                    <p className="text-gray-400">Updates, trends, and strategies from the AI frontier.</p>
                </div>
            </div>

            {/* Auto-Slideshow Container */}
            <div className="relative w-full overflow-hidden mask-gradient-x">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />

                <div
                    className="flex w-max animate-marquee"
                >
                    {/* Double the list for infinite loop */}
                    {[...posts, ...posts].map((post, i) => (
                        <div
                            key={i}
                            className="group w-[300px] md:w-[25vw] flex-shrink-0 px-4"
                        >
                            <Link href={`/insights#${post.slug}`} className="block h-full">
                                {/* Card Image Area */}
                                <div className={`aspect-[4/3] rounded-3xl bg-gray-900 border border-white/10 mb-6 overflow-hidden relative group-hover:border-white/20 transition-all`}>
                                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10 backdrop-blur-md ${post.type === 'case-study' ? 'bg-amber-500/80' : 'bg-black/50'}`}>
                                        {post.type === 'case-study' ? '★ CASE STUDY' : post.category}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <span>{post.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition-colors duration-300 leading-tight h-[3.5em] overflow-hidden">
                                    {post.title}
                                </h3>

                                <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                                    READ ARTICLE <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <Link href="/insights">
                    <Button variant="outline">VIEW ALL POSTS</Button>
                </Link>
            </div>
        </section>
    );
}
