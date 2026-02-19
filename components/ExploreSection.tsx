'use client';

import { motion } from 'framer-motion';
import { Clapperboard, Cpu, Users, Megaphone, ArrowRight, Play, CheckCircle } from 'lucide-react';
import Button from './ui/Button';
import BlueprintSection from './BlueprintSection'; // Import the new component

export default function ExploreSection() {
    return (
        <section>
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight whitespace-nowrap overflow-visible w-full flex justify-center gap-3"
                >
                    HARNESSING <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">AI POWER</span>
                    FOR OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">PARTNERS SUCCESS</span>
                </motion.h2>
            </div>

            {/* 1. Innovative Solutions */}
            <div className="mb-32">
                <SectionHeader title="Our Innovative Solutions" subtitle="Core services driven by cutting-edge AI." color="text-teal-400" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SolutionCard
                        title="AI Commercial Video"
                        description="Ultra-realistic 8K quality videos with fast turnaround. We blend creativity with AI precision to produce stunning commercial content that converts."
                        icon={Clapperboard}
                        color="teal"
                        mediaPlaceholder="Video: AI Commercial Showcase"
                        href="/filmmaking"
                    />
                    <SolutionCard
                        title="AI Automations"
                        description="Streamline your business with AI chatbots, workflow automations, and performance dashboards. Efficiency meets intelligence to save you 38% on dev spend."
                        icon={Cpu}
                        color="orange"
                        mediaPlaceholder="Video: Workflow Demo"
                        href="/automations"
                    />
                </div>
            </div>

            {/* 2. Add-on Services - Integrated Extensions */}
            <div className="mb-32">
                {/* Top Row: Header & Alignment Context */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start">
                    {/* Left: Header */}
                    <div className="border-l-4 pl-6 border-indigo-500/50">
                        <h3 className="text-3xl font-bold mb-4 text-indigo-400">Integrated Extensions for Active Partners</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Available exclusively to clients engaged in our AI Commercial Filmmaking or Automation programs, these add-ons extend your existing infrastructure without fragmentation or vendor complexity.
                        </p>
                    </div>

                    {/* Right: Access & Alignment Disclaimer */}
                    <div className="p-8 rounded-2xl bg-indigo-900/10 border border-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <div className="w-24 h-24 bg-indigo-500/30 rounded-full blur-2xl" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Access & Alignment</h4>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            These services are not offered as standalone engagements. They are available only to active partners to preserve alignment, operational clarity, and structured execution across all initiatives.
                        </p>
                    </div>
                </div>

                {/* Bottom Row: Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Left Column: AI Brand Ambassador */}
                    <a href="/add-ons" className="block h-full">
                        <AddOnCard
                            title="AI Brand Ambassador"
                            icon={Users}
                            content={
                                <>
                                    <p className="mb-4">
                                        AI-powered digital ambassadors built for scalable, performance-driven communication. Structured scripting, controlled variation testing, and multi-platform deployment ensure consistent messaging and measurable output.
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 mb-6 text-gray-400 ml-2">
                                        <li>Scalable short- and long-form content</li>
                                        <li>Structured A/B testing</li>
                                        <li>Controlled brand voice</li>
                                        <li>Rapid iteration</li>
                                    </ul>
                                    <p className="text-indigo-400 font-medium italic">
                                        The result is predictable, repeatable communication infrastructure rather than personality-driven campaigns.
                                    </p>
                                </>
                            }
                        />
                    </a>

                    {/* Right Column: Paid Advertising */}
                    <a href="/add-ons" className="block h-full">
                        <AddOnCard
                            title="Paid Advertising"
                            icon={Megaphone}
                            content={
                                <>
                                    <p className="mb-4">
                                        Paid media managed within a defined, performance-led framework aligned to your existing systems. Campaign deployment, testing, and reporting remain structured and transparent.
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 mb-6 text-gray-400 ml-2">
                                        <li>Clear performance accountability</li>
                                        <li>Defined testing cycles</li>
                                        <li>Measurable return tracking</li>
                                        <li>Continuous optimization</li>
                                    </ul>
                                    <p className="text-indigo-400 font-medium italic">
                                        Paid advertising, when integrated properly, becomes a performance extension of your creative and operational systems — not a disconnected channel.
                                    </p>
                                </>
                            }
                        />
                    </a>
                </div>
            </div>

            {/* 3. Blueprint Approach (Redesigned) */}
            <BlueprintSection />
        </section>
    );
}

// Sub-components

function SectionHeader({ title, subtitle, color = "text-white", align = "left" }: { title: string, subtitle: string, color?: string, align?: 'left' | 'right' }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`mb-12 ${align === 'right' ? 'text-right border-r-4 pr-6 border-white/20' : 'border-l-4 pl-6 border-white/20'}`}
        >
            <h3 className={`text-3xl font-bold mb-2 ${color}`}>{title}</h3>
            <p className="text-gray-400 text-lg">{subtitle}</p>
        </motion.div>
    );
}

function SolutionCard({ title, description, icon: Icon, color, mediaPlaceholder, href }: any) {
    const colorClasses: { [key: string]: string } = {
        teal: "from-blue-600 via-cyan-500 to-emerald-400", // Cyber-Cinematic: Deep Blue -> Cyan -> Emerald
        orange: "from-purple-600 via-pink-500 to-orange-400" // High-Energy: Purple -> Pink -> Orange
    };

    const glowColor = color === 'teal' ? 'bg-cyan-500/20' : 'bg-pink-500/20';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative p-0 rounded-3xl bg-gradient-to-b from-white/10 to-black border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
            {/* Elegant Background Glow from Blueprint - Enhanced */}
            <div className={`absolute top-0 right-0 w-80 h-80 ${glowColor} rounded-full blur-[100px] -mr-20 -mt-20 transition-all duration-700 group-hover:opacity-60 group-hover:scale-125`} />
            <div className={`absolute bottom-0 left-0 w-64 h-64 ${color === 'teal' ? 'bg-blue-600/10' : 'bg-purple-600/10'} rounded-full blur-[80px] -ml-20 -mb-20 transition-all duration-700 group-hover:opacity-50`} />


            <div className="aspect-video bg-black/50 relative flex items-center justify-center group-hover:bg-black/30 transition-colors overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-20 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />

                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <Play className="w-8 h-8 text-white ml-1 fill-white/20" />
                    </div>
                </div>
            </div>
            <div className="p-8 relative">
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[color]} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">{title}</h4>
                </div>
                <p className="text-gray-400 leading-relaxed mb-8 relative z-10 group-hover:text-gray-300 transition-colors text-lg">{description}</p>
                {href ? (
                    <a href={href} className="inline-block relative z-10">
                        <Button variant="outline" className="border-white/10 pl-6 pr-6 py-3 hover:pl-8 transition-all bg-white/5 hover:bg-white/10 backdrop-blur-sm group-hover:border-white/20">
                            LEARN MORE <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                ) : (
                    <Button variant="outline" className="border-white/10 pl-6 pr-6 py-3 hover:pl-8 transition-all relative z-10 bg-white/5 hover:bg-white/10 backdrop-blur-sm group-hover:border-white/20">
                        LEARN MORE <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </motion.div>
    );
}

function AddOnCard({ title, content, icon: Icon }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-black border border-white/10 overflow-hidden shadow-lg h-full transition-all duration-300 hover:border-indigo-500/30"
        >
            {/* Elegant Background Glow from Blueprint */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 transition-all group-hover:bg-indigo-500/15 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                    <Icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>

                <h4 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{title}</h4>

                {/* Content Rendered Here */}
                <div className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors mb-4 flex-grow">
                    {content}
                </div>

                <div className="w-10 h-1 bg-indigo-500/30 rounded-full mt-auto group-hover:w-full transition-all duration-500" />
            </div>
        </motion.div>
    );
}
