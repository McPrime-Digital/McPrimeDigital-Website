'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileSearch,
    Route,
    Cpu,
    CheckCircle2,
    FileText,
    Layers,
    GitMerge,
    ShieldCheck,
    Database,
    Workflow,
} from 'lucide-react';

// --- DELIVERABLE MODULES: rendered as controlled specification documents ---
const modules = [
    {
        id: 'MOD-01',
        phase: 'DISCOVERY',
        title: 'Complete AI Opportunity Report',
        summary: 'A clear breakdown of your business processes showing exactly where AI can bring the strongest and fastest ROI.',
        icon: FileSearch,
        accent: 'indigo',
        spec: [
            { label: 'Process coverage', value: 'Full workflow inventory, department-level' },
            { label: 'Assessment model', value: 'ROI × implementation-effort matrix' },
            { label: 'Opportunity register', value: 'Ranked AI touchpoints with owners' },
            { label: 'Output format', value: 'Structured report + prioritized register' },
            { label: 'Review gate', value: 'Findings walkthrough with leadership' },
        ],
        deliverables: [
            { icon: Workflow, text: 'Workflow map of current operations' },
            { icon: Layers, text: 'AI touchpoint register, ranked by ROI' },
            { icon: FileText, text: 'Insights report with projections' },
        ],
    },
    {
        id: 'MOD-02',
        phase: 'STRATEGY',
        title: 'Adoption Blueprint',
        summary: 'A practical roadmap that outlines how AI fits into your workflows and helps your team embrace it with ease.',
        icon: Route,
        accent: 'purple',
        spec: [
            { label: 'Rollout design', value: 'Phased, mapped to team capacity' },
            { label: 'Integration plan', value: 'Existing stack — no rip-and-replace' },
            { label: 'Enablement', value: 'Team training + operating procedures' },
            { label: 'Governance', value: 'Review gates and feedback loops' },
            { label: 'Change control', value: 'Documented, versioned, auditable' },
        ],
        deliverables: [
            { icon: GitMerge, text: 'Workflow integration design' },
            { icon: FileText, text: 'Phased rollout plan with milestones' },
            { icon: ShieldCheck, text: 'Governance and review framework' },
        ],
    },
    {
        id: 'MOD-03',
        phase: 'BUILD',
        title: 'Custom Built AI Solutions',
        summary: 'Tailored systems designed around your existing tools that scale effortlessly and deliver measurable business results.',
        icon: Cpu,
        accent: 'cyan',
        spec: [
            { label: 'Architecture', value: 'Custom agents + workflow engine' },
            { label: 'Integrations', value: 'CRM · ERP · comms · data stores' },
            { label: 'Validation', value: 'Staged testing before deployment' },
            { label: 'Observability', value: 'Execution logs and audit trails' },
            { label: 'Handover', value: 'Documentation + accountability framework' },
        ],
        deliverables: [
            { icon: Cpu, text: 'Production-ready automation systems' },
            { icon: Database, text: 'Validated integrations across your stack' },
            { icon: FileText, text: 'Operational documentation and runbooks' },
        ],
    },
];

const accentStyles: Record<string, { text: string; border: string; bg: string; bar: string; glow: string }> = {
    indigo: { text: 'text-indigo-400', border: 'border-indigo-500/40', bg: 'bg-indigo-500/10', bar: 'bg-indigo-400', glow: 'rgba(129,140,248,0.25)' },
    purple: { text: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/10', bar: 'bg-purple-400', glow: 'rgba(192,132,252,0.25)' },
    cyan: { text: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', bar: 'bg-cyan-400', glow: 'rgba(34,211,238,0.25)' },
};

export default function RoiSection() {
    const [activeId, setActiveId] = useState('MOD-01');
    const active = modules.find(m => m.id === activeId)!;
    const accent = accentStyles[active.accent];

    return (
        <section className="py-24 sm:py-32 relative bg-[#050505] text-white overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* --- HEADER --- */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">What We Deliver</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
                        Automation Is Infrastructure — <span className="text-indigo-400 drop-shadow-[0_0_25px_rgba(129,140,248,0.4)]">Not a Shortcut</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Automation is often deployed as a collection of disconnected tools. We design structured systems that integrate with your existing environment, maintain governance standards, and operate within defined accountability frameworks.
                    </p>
                    <p className="text-xl text-gray-400 leading-relaxed mt-6">
                        Every workflow is mapped before implementation. Every integration is validated before deployment.
                    </p>
                </div>

                {/* --- SPEC CONSOLE --- */}
                <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#08090C] overflow-hidden shadow-[0_40px_80px_-32px_rgba(0,0,0,0.9)]">
                    {/* Document header bar */}
                    <div className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-white/5 bg-black/40">
                        <div className="flex items-center gap-3">
                            <span className="relative flex w-1.5 h-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                            </span>
                            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.22em] text-white/60 uppercase">McPrime · Engagement Specification</span>
                        </div>
                        <span className="text-[9px] md:text-[10px] font-mono tracking-[0.18em] text-white/30 uppercase">Doc MCP-ENG-SPEC · Rev 3.2 · Controlled</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
                        {/* Module rail */}
                        <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20">
                            {modules.map((mod) => {
                                const isActive = mod.id === activeId;
                                const modAccent = accentStyles[mod.accent];
                                return (
                                    <button
                                        key={mod.id}
                                        onClick={() => setActiveId(mod.id)}
                                        className={`relative flex-1 lg:flex-none text-left px-4 md:px-6 py-4 lg:py-6 transition-colors duration-300 border-b border-white/5 last:border-b-0 group
                                            ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                                    >
                                        {/* Active accent bar */}
                                        <span className={`absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300 ${modAccent.bar} ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center transition-colors duration-300 ${isActive ? `${modAccent.bg} ${modAccent.border}` : 'bg-white/[0.03] border-white/10'}`}>
                                                <mod.icon className={`w-4 h-4 ${isActive ? modAccent.text : 'text-white/40'}`} />
                                            </div>
                                            <div className="min-w-0 hidden sm:block">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[9px] font-mono tracking-[0.2em] ${isActive ? modAccent.text : 'text-white/30'}`}>{mod.id}</span>
                                                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/25">{mod.phase}</span>
                                                </div>
                                                <p className={`text-sm font-bold leading-tight truncate transition-colors ${isActive ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
                                                    {mod.title}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                            {/* Rail footer */}
                            <div className="hidden lg:block mt-auto px-6 py-5 border-t border-white/5">
                                <p className="text-[9px] font-mono tracking-[0.18em] text-white/25 uppercase leading-relaxed">
                                    Sequential engagement<br />Each module gates the next
                                </p>
                            </div>
                        </div>

                        {/* Spec sheet */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="relative p-6 md:p-10"
                            >
                                {/* Accent atmosphere */}
                                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: accent.glow }} />

                                {/* Sheet header */}
                                <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-[10px] font-mono tracking-[0.25em] ${accent.text}`}>{active.id} · {active.phase}</span>
                                            <span className={`px-2 py-0.5 rounded-full border text-[8px] font-mono tracking-widest uppercase ${accent.border} ${accent.bg} ${accent.text}`}>Scoped Deliverable</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-lg">{active.title}</h3>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${accent.bg} ${accent.border}`}>
                                        <active.icon className={`w-6 h-6 ${accent.text}`} />
                                    </div>
                                </div>

                                <p className="relative z-10 text-gray-400 leading-relaxed max-w-2xl mb-10">{active.summary}</p>

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
                                    {/* Specification table */}
                                    <div>
                                        <p className="text-[10px] font-mono tracking-[0.25em] text-white/35 uppercase mb-4">Specification</p>
                                        <div className="divide-y divide-white/5 border-y border-white/5">
                                            {active.spec.map((row) => (
                                                <div key={row.label} className="flex items-baseline justify-between gap-6 py-3 group/row hover:bg-white/[0.02] transition-colors px-2 -mx-2">
                                                    <span className="text-[11px] font-mono tracking-wider text-white/40 uppercase shrink-0">{row.label}</span>
                                                    <span className="text-sm text-gray-200 text-right leading-snug">{row.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Deliverables */}
                                    <div>
                                        <p className="text-[10px] font-mono tracking-[0.25em] text-white/35 uppercase mb-4">You Receive</p>
                                        <div className="space-y-3">
                                            {active.deliverables.map((d) => (
                                                <div key={d.text} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-colors">
                                                    <div className={`w-8 h-8 shrink-0 rounded-lg border flex items-center justify-center ${accent.bg} ${accent.border}`}>
                                                        <d.icon className={`w-4 h-4 ${accent.text}`} />
                                                    </div>
                                                    <div className="flex items-start gap-2 pt-1">
                                                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accent.text}`} />
                                                        <span className="text-sm text-gray-300 leading-snug">{d.text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sheet footer */}
                                <div className="relative z-10 mt-10 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-[9px] font-mono tracking-[0.18em] text-white/25 uppercase">Mapped before implementation · Validated before deployment</span>
                                    <span className="text-[9px] font-mono tracking-[0.18em] text-white/35 uppercase tabular-nums">{active.id} / MOD-0{modules.length}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
