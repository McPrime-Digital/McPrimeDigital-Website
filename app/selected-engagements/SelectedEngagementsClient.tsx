'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const engagements = [
    {
        industry: "Pharmaceutical Organization",
        title: "AI Commercial Film Production",
        description: "Developed and delivered an AI-native commercial film explaining a pharmaceutical product, its intended use, and the problem it addresses. Scriptwriting was structured to align with approval requirements, and full production was completed in under six days.",
        outcomes: [
            "Structured script development",
            "Compliance-aware messaging",
            "Accelerated production timeline",
            "Deployment-ready commercial asset"
        ]
    },
    {
        industry: "Food & Beverage Brand",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting brand positioning and product appeal within a competitive consumer market.",
        outcomes: [
            "Concept development",
            "AI-native production",
            "Multi-format commercial delivery"
        ]
    },
    {
        industry: "AI Software Company",
        title: "Capability-Focused Commercial Film",
        description: "Produced a short-form commercial explaining product capabilities, target users, practical application, and functional benefits.",
        outcomes: [
            "Structured product narrative",
            "Clear use-case communication",
            "Benefit-driven positioning",
            "Platform-ready output"
        ]
    },
    {
        industry: "Mobile Banking Institution",
        title: "Payroll Automation Architecture",
        description: "Designed and implemented an automation workflow supporting payroll operations within a financial environment.",
        outcomes: [
            "Workflow mapping",
            "Process automation design",
            "Operational efficiency improvement",
            "Structured deployment"
        ]
    },
    {
        industry: "Luxury Brand",
        title: "Multi-Product Commercial Production",
        description: "Produced a high-end commercial showcasing five products within a unified narrative framework.",
        outcomes: [
            "Coordinated visual architecture",
            "Controlled brand tone",
            "Premium visual delivery"
        ]
    },
    {
        industry: "Food & Beverage Brand",
        title: "AI Brand Ambassador Program",
        description: "Developed a recurring AI-powered brand ambassador system producing weekly content for snack product promotion.",
        outcomes: [
            "Structured weekly content framework",
            "Consistent brand voice",
            "Scalable short-form output"
        ]
    },
    {
        industry: "Hotel & Resort",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting property experience, amenities, and brand positioning within the hospitality market.",
        outcomes: [
            "Visual storytelling",
            "Structured narrative flow",
            "Destination-focused messaging"
        ]
    },
    {
        industry: "Hospitality Organization",
        title: "Operational & Lead Generation Workflow",
        description: "Designed and implemented operational and lead generation workflows to improve internal coordination and marketing pipeline structure.",
        outcomes: [
            "Lead capture optimization",
            "Workflow automation",
            "Structured operational alignment"
        ]
    }
];

export default function SelectedEngagementsPage() {
    return (
        <main className="min-h-screen bg-[#121212] text-white font-sans selection:bg-indigo-500/30">
            {/* HERO SECTION */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/" className="inline-block mb-8 text-sm text-gray-500 hover:text-white transition-colors">
                            ← Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight tracking-tight text-white">
                            Representative Engagements
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            Structured execution across industries where precision and measurable output are required.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ENGAGEMENT MODULES */}
            <section className="px-6 md:px-12 lg:px-20 py-20">
                <div className="max-w-3xl">
                    {engagements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="py-16 border-b border-white/5 last:border-0 group-hover:bg-white/[0.02] transition-colors -mx-6 px-6 rounded-lg">
                                {/* Industry Label */}
                                <span className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-4">
                                    {item.industry}
                                </span>

                                {/* Title */}
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                    {item.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl font-light">
                                    {item.description}
                                </p>

                                {/* Outcomes */}
                                <ul className="space-y-2">
                                    {item.outcomes.map((outcome, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-300">
                                            <span className="mr-3 text-indigo-500/50">•</span>
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Bottom Navigation */}
            <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-white/10 bg-[#0a0a0a]">
                <div className="max-w-4xl">
                    <h3 className="text-white text-lg font-bold mb-6">Ready to discuss your project?</h3>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider text-sm font-medium">
                        Request Executive Consultation <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
