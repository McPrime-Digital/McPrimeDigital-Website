'use client';

import { motion } from 'framer-motion';
import { Zap, Cpu, Workflow, BarChart3, CheckCircle2 } from 'lucide-react';

const CYCLE = 6; // seconds per full pipeline run

const stages = [
    { icon: Zap, label: 'TRIGGER', color: 'text-amber-400', ring: 'border-amber-400/40', glow: 'rgba(251,191,36,0.35)' },
    { icon: Cpu, label: 'AI AGENT', color: 'text-pink-400', ring: 'border-pink-400/40', glow: 'rgba(244,114,182,0.35)' },
    { icon: Workflow, label: 'EXECUTE', color: 'text-purple-400', ring: 'border-purple-400/40', glow: 'rgba(192,132,252,0.35)' },
    { icon: BarChart3, label: 'REPORT', color: 'text-orange-400', ring: 'border-orange-400/40', glow: 'rgba(251,146,60,0.35)' },
];

/**
 * A live workflow run, on loop: the trigger fires, work travels the pipe,
 * each stage lights as it processes, and the run closes with a green tick.
 * Replaces a static media placeholder with the thing automations actually do.
 */
export default function AutomationFlow() {
    return (
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 select-none">
            {/* Faint circuit grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Run status line */}
            <div className="absolute top-4 left-6 md:top-5 md:left-10 flex items-center gap-2">
                <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                />
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">Workflow · Live Run</span>
            </div>
            <motion.span
                key="runtick"
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.78, 0.82, 0.95, 1] }}
                className="absolute top-4 right-6 md:top-5 md:right-10 flex items-center gap-1.5 text-emerald-400"
            >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono tracking-widest uppercase">Run Complete</span>
            </motion.span>

            {/* Pipeline */}
            <div className="relative flex items-center justify-between gap-2">
                {stages.map((stage, i) => (
                    <div key={stage.label} className="relative flex flex-col items-center gap-2.5 flex-1">
                        {/* Node */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    `0 0 0px ${stage.glow.replace('0.35', '0')}`,
                                    `0 0 24px ${stage.glow}`,
                                    `0 0 0px ${stage.glow.replace('0.35', '0')}`,
                                ],
                                scale: [1, 1.08, 1],
                            }}
                            transition={{
                                duration: CYCLE,
                                repeat: Infinity,
                                times: [Math.max(0, i * 0.2 - 0.02), i * 0.2 + 0.08, Math.min(1, i * 0.2 + 0.2)],
                            }}
                            className={`relative w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-black/60 border ${stage.ring} backdrop-blur-sm flex items-center justify-center z-10`}
                        >
                            <stage.icon className={`w-5 h-5 md:w-6 md:h-6 ${stage.color}`} />
                        </motion.div>
                        <span className="text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-white/40">{stage.label}</span>

                        {/* Connector to next node */}
                        {i < stages.length - 1 && (
                            <div className="absolute top-[22px] md:top-[28px] left-[calc(50%+26px)] right-[calc(-50%+26px)] md:left-[calc(50%+32px)] md:right-[calc(-50%+32px)] h-px bg-white/10 overflow-visible">
                                {/* Traveling packet */}
                                <motion.span
                                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                                    transition={{
                                        duration: CYCLE * 0.14,
                                        repeat: Infinity,
                                        repeatDelay: CYCLE * 0.86,
                                        delay: CYCLE * (0.08 + i * 0.2),
                                        ease: 'easeInOut',
                                        times: [0, 0.2, 0.8, 1],
                                    }}
                                    className="absolute -top-[2.5px] w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-[0_0_10px_rgba(244,114,182,0.9)]"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Throughput readout */}
            <div className="absolute bottom-4 inset-x-6 md:bottom-5 md:inset-x-10 flex items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-mono text-white/30 tracking-widest">MANUAL STEPS: 0</span>
                <div className="flex-1 mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: CYCLE, repeat: Infinity }}
                    className="text-[9px] md:text-[10px] font-mono text-orange-400/80 tracking-widest"
                >
                    24/7 EXECUTION
                </motion.span>
            </div>
        </div>
    );
}
