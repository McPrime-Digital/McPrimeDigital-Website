'use client';

import { useEffect, useRef, useState } from 'react';

interface LogLine {
    id: number;
    time: string;
    tag: string;
    color: string;
    message: string;
}

// One full pipeline run, as it appears in the event ledger
const RUN_SCRIPT: Omit<LogLine, 'id' | 'time'>[] = [
    { tag: 'TRG', color: 'text-amber-400', message: 'inbound.lead captured' },
    { tag: 'AGT', color: 'text-pink-400', message: 'intent classified · conf 0.98' },
    { tag: 'ENR', color: 'text-purple-400', message: 'crm.record enriched + synced' },
    { tag: 'EXE', color: 'text-purple-400', message: 'proposal.pdf generated' },
    { tag: 'NTF', color: 'text-sky-400', message: 'ops channel notified' },
    { tag: 'AUD', color: 'text-emerald-400', message: 'run committed · immutable log' },
];

/**
 * A live orchestration console: a branching pipeline DAG with continuous
 * packet flow, a timestamped event ledger, and run-level operations metrics.
 */
export default function AutomationFlow() {
    const [lines, setLines] = useState<LogLine[]>([]);
    const [runs, setRuns] = useState(1284);
    const [latency, setLatency] = useState('1.4');
    const idRef = useRef(0);
    const stepRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const step = stepRef.current % RUN_SCRIPT.length;
            const entry = RUN_SCRIPT[step];
            const now = new Date();
            const time = now.toLocaleTimeString('en-GB', { hour12: false });
            idRef.current += 1;
            setLines(prev => [...prev.slice(-5), { ...entry, id: idRef.current, time }]);
            if (step === RUN_SCRIPT.length - 1) {
                setRuns(r => r + 1);
                setLatency((1.1 + Math.random() * 0.6).toFixed(1));
            }
            stepRef.current += 1;
        }, 950);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 flex flex-col bg-[#05070C] select-none text-left">
            {/* Faint blueprint grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Console header */}
            <div className="relative flex items-center justify-between px-4 md:px-5 pt-3 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="relative flex w-1.5 h-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                    </span>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.22em] text-white/60 uppercase">McPrime Orchestrator</span>
                </div>
                <span className="text-[8px] md:text-[9px] font-mono tracking-[0.18em] text-white/30 uppercase">Pipeline · Lead-to-Invoice</span>
            </div>

            {/* Body: DAG + event ledger */}
            <div className="relative flex-1 flex min-h-0">
                {/* Pipeline DAG */}
                <div className="flex-1 min-w-0 flex items-center">
                    <svg viewBox="0 0 240 140" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        {/* Edges */}
                        <g stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none">
                            <path id="e-t1" d="M 30 70 C 62 70, 70 28, 102 28" />
                            <path id="e-t2" d="M 30 70 L 102 70" />
                            <path id="e-t3" d="M 30 70 C 62 70, 70 112, 102 112" />
                            <path id="e-1v" d="M 118 28 C 152 28, 160 70, 188 70" />
                            <path id="e-2v" d="M 118 70 L 188 70" />
                            <path id="e-3v" d="M 118 112 C 152 112, 160 70, 188 70" />
                        </g>

                        {/* Continuous packet flow (SMIL, zero JS) */}
                        {[
                            { path: 'M 30 70 C 62 70, 70 28, 102 28', begin: '0s', color: '#fbbf24' },
                            { path: 'M 30 70 L 102 70', begin: '0.35s', color: '#f472b6' },
                            { path: 'M 30 70 C 62 70, 70 112, 102 112', begin: '0.7s', color: '#c084fc' },
                            { path: 'M 118 28 C 152 28, 160 70, 188 70', begin: '1.05s', color: '#f472b6' },
                            { path: 'M 118 70 L 188 70', begin: '1.4s', color: '#fb923c' },
                            { path: 'M 118 112 C 152 112, 160 70, 188 70', begin: '1.75s', color: '#c084fc' },
                        ].map((p, i) => (
                            <circle key={i} r="2.4" fill={p.color} opacity="0.9">
                                <animateMotion dur="2.1s" begin={p.begin} repeatCount="indefinite" path={p.path} />
                            </circle>
                        ))}

                        {/* Nodes */}
                        {[
                            { x: 22, y: 70, label: 'TRIGGER', stroke: '#fbbf24' },
                            { x: 110, y: 28, label: 'PARSE', stroke: '#f472b6' },
                            { x: 110, y: 70, label: 'ENRICH', stroke: '#f472b6' },
                            { x: 110, y: 112, label: 'ROUTE', stroke: '#c084fc' },
                            { x: 196, y: 70, label: 'COMMIT', stroke: '#34d399' },
                        ].map((n) => (
                            <g key={n.label}>
                                <circle cx={n.x} cy={n.y} r="8" fill="#05070C" stroke={n.stroke} strokeOpacity="0.55" strokeWidth="1.2" />
                                <circle cx={n.x} cy={n.y} r="2.5" fill={n.stroke} fillOpacity="0.9" />
                                <text x={n.x} y={n.y + 19} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.45)" letterSpacing="1">
                                    {n.label}
                                </text>
                            </g>
                        ))}

                        {/* Commit node success pulse */}
                        <circle cx="196" cy="70" r="8" fill="none" stroke="#34d399" strokeOpacity="0.5">
                            <animate attributeName="r" values="8;14;8" dur="2.1s" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.1s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                {/* Event ledger */}
                <div className="hidden sm:flex flex-col justify-end w-[44%] border-l border-white/5 px-3 py-2 gap-[5px] overflow-hidden bg-black/30">
                    {lines.length === 0 && (
                        <span className="text-[8px] font-mono text-white/25 tracking-widest">AWAITING EVENTS…</span>
                    )}
                    {lines.map((line) => (
                        <div key={line.id} className="flex items-baseline gap-1.5 font-mono text-[8px] md:text-[9px] leading-tight">
                            <span className="text-white/25 tabular-nums shrink-0">{line.time}</span>
                            <span className={`${line.color} font-bold shrink-0`}>{line.tag}</span>
                            <span className="text-white/55 truncate">{line.message}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Operations metrics */}
            <div className="relative flex items-center justify-between px-4 md:px-5 py-2 border-t border-white/5 font-mono text-[8px] md:text-[9px] tracking-[0.14em] uppercase">
                <span className="text-white/40">Runs <span className="text-white/80 tabular-nums">{runs.toLocaleString()}</span></span>
                <span className="text-white/40">Success <span className="text-emerald-400 tabular-nums">99.97%</span></span>
                <span className="text-white/40">Avg <span className="text-white/80 tabular-nums">{latency}s</span></span>
                <span className="text-orange-400/80 hidden md:inline">24/7 Execution</span>
            </div>
        </div>
    );
}
