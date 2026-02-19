'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "McPrime Digital transformed our workflow entirely. The AI automation saved us countless hours and the video quality is unmatched.",
        author: "Sarah J.",
        role: "Marketing Director",
        company: "TechFlow"
    },
    {
        quote: "The ROI we saw from the paid ads campaign was incredible. Their strategic approach really works.",
        author: "Michael R.",
        role: "CEO",
        company: "GrowthX"
    },
    {
        quote: "I was skeptical about AI influencers, but the engagement has been phenomenal. Truly cutting edge.",
        author: "Elena V.",
        role: "Brand Manager",
        company: "LuxeLife"
    },
    {
        quote: "Efficiency skyrocketed by 40%. The blueprint strategy they implemented is a game changer for our operations.",
        author: "David K.",
        role: "COO",
        company: "FutureScale"
    },
    {
        quote: "The programmatic video solution allows us to scale content production like never before.",
        author: "Jessica T.",
        role: "Content Head",
        company: "StreamLine"
    },
    {
        quote: "Their auditing process uncovered hidden value we didn't know existed. Highly recommend.",
        author: "Robert L.",
        role: "Founder",
        company: "Innovate Inc"
    },
    {
        quote: "Professional, futuristic, and results-driven. McPrime is the partner you need in the AI era.",
        author: "Amanda B.",
        role: "VP of Sales",
        company: "SalesForce One"
    },
    {
        quote: "Exceptional quality on the commercial videos. It looks like a million-dollar production.",
        author: "Chris M.",
        role: "Creative Director",
        company: "AdVantage"
    }
];

const companies = [
    "TechFlow", "GrowthX", "LuxeLife", "Innovate", "FutureCorp",
    "AI Systems", "StreamLine", "AdVantage", "GlobalTech", "NextGen",
    "CyberCore", "DataMind"
];

export default function TestimonialsSection() {
    return (
        <section className="overflow-hidden relative py-20">
            {/* Background Image - Adjusted coverage */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: 'url(/redglass.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
            </div>

            <div className="relative z-10 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    What Our Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Say</span>
                </motion.h2>
            </div>

            {/* Marquee/Slider Container */}
            <div className="relative w-full mb-24 overflow-hidden mask-gradient-x z-10">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: "-50%" }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {/* Duplicate the list to create infinite loop effect */}
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[85vw] md:w-[400px] p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 relative flex-shrink-0"
                        >
                            <Quote className="w-8 h-8 text-white/20 mb-6 absolute top-8 right-8" />
                            <p className="text-gray-300 mb-8 leading-relaxed relative z-10 text-lg">"{t.quote}"</p>
                            <div>
                                <div className="font-bold text-white text-lg">{t.author}</div>
                                <div className="text-sm text-gray-500">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Trust/Partner Logos - Transparent & Animated */}
            <div className="pt-16 pb-12 relative z-10">
                <p className="text-center text-gray-500 text-sm tracking-widest uppercase mb-12">INDUSTRY PARTNERSHIPS</p>
                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />

                    <motion.div
                        className="flex gap-16 w-max items-center"
                        animate={{ x: "-50%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[
                            { name: "TechFlow", logo: "/logos/techflow.svg" },
                            { name: "GrowthX", logo: "/logos/growthx.svg" },
                            { name: "LuxeLife", logo: "/logos/luxelife.svg" },
                            { name: "Innovate", logo: "/logos/innovate.svg" },
                            { name: "FutureCorp", logo: "/logos/futurecorp.svg" },
                            { name: "DataMind", logo: "/logos/datamind.svg" },
                            // Repeating to fill space since we only made 6
                            { name: "TechFlow", logo: "/logos/techflow.svg" },
                            { name: "GrowthX", logo: "/logos/growthx.svg" }
                        ].concat([
                            { name: "TechFlow", logo: "/logos/techflow.svg" },
                            { name: "GrowthX", logo: "/logos/growthx.svg" },
                            { name: "LuxeLife", logo: "/logos/luxelife.svg" },
                            { name: "Innovate", logo: "/logos/innovate.svg" },
                            { name: "FutureCorp", logo: "/logos/futurecorp.svg" },
                            { name: "DataMind", logo: "/logos/datamind.svg" },
                            { name: "TechFlow", logo: "/logos/techflow.svg" },
                            { name: "GrowthX", logo: "/logos/growthx.svg" }
                        ]).map((company, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 w-40 grayscale hover:grayscale-0"
                            >
                                <img src={company.logo} alt={company.name} className="h-10 w-auto" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
