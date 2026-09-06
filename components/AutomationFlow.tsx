'use client';

import { useEffect, useRef, useState } from 'react';
import { Landmark, BrainCircuit, GitBranch, ShieldAlert, BookText, UserCheck, Hand, Fingerprint, Globe, Banknote, CheckCircle2, AlertTriangle, Clock3, ZoomIn, ZoomOut, Scan } from 'lucide-react';

// Virtual canvas coordinate space (scaled to fit the card, pannable beyond it)
const SCALE_BASE = 640;
const SVG_W = 1100;
const SVG_H = 460;
const NODE_W = 138;
const NODE_H = 56;

interface NodeDef {
    id: string;
    name: string;
    sub: string;
    icon: typeof Landmark;
    tile: string;
    glow: string;
}

const NODE_DEFS: NodeDef[] = [
    { id: 'intake', name: 'Transaction Intake', sub: 'core-banking · webhook', icon: Landmark, tile: 'from-amber-500/80 to-amber-700/80', glow: 'rgba(251,191,36,0.25)' },
    { id: 'kyc', name: 'KYC Verification', sub: 'identity · doc match', icon: Fingerprint, tile: 'from-orange-500/80 to-amber-700/80', glow: 'rgba(251,146,60,0.25)' },
    { id: 'sanctions', name: 'Sanctions Screen', sub: 'OFAC · AML watchlists', icon: Globe, tile: 'from-yellow-500/80 to-orange-700/80', glow: 'rgba(250,204,21,0.22)' },
    { id: 'fraud', name: 'AI Fraud Scoring', sub: 'model · risk-v4', icon: BrainCircuit, tile: 'from-pink-500/80 to-fuchsia-700/80', glow: 'rgba(244,114,182,0.25)' },
    { id: 'gate', name: 'Risk Gate', sub: 'if score ≥ 0.85', icon: GitBranch, tile: 'from-purple-500/80 to-violet-700/80', glow: 'rgba(192,132,252,0.25)' },
    { id: 'freeze', name: 'Freeze & Escalate', sub: 'compliance queue', icon: ShieldAlert, tile: 'from-red-500/80 to-rose-700/80', glow: 'rgba(248,113,113,0.25)' },
    { id: 'ledger', name: 'Post to Ledger', sub: 'double-entry commit', icon: BookText, tile: 'from-emerald-500/80 to-teal-700/80', glow: 'rgba(52,211,153,0.25)' },
    { id: 'review', name: 'Manual Review', sub: 'ops · four-eyes check', icon: UserCheck, tile: 'from-sky-500/80 to-blue-700/80', glow: 'rgba(56,189,248,0.25)' },
    { id: 'settle', name: 'Settlement', sub: 'T+0 · core sync', icon: Banknote, tile: 'from-emerald-400/80 to-green-700/80', glow: 'rgba(52,211,153,0.3)' },
];

const EDGES: { from: string; to: string; label?: string; color: string }[] = [
    { from: 'intake', to: 'kyc', label: 'KYC', color: '#fb923c' },
    { from: 'intake', to: 'sanctions', label: 'AML', color: '#facc15' },
    { from: 'kyc', to: 'fraud', color: '#f472b6' },
    { from: 'sanctions', to: 'fraud', color: '#f472b6' },
    { from: 'fraud', to: 'gate', label: 'SCORE', color: '#c084fc' },
    { from: 'gate', to: 'freeze', label: 'HIGH', color: '#f87171' },
    { from: 'gate', to: 'ledger', label: 'CLEAR', color: '#34d399' },
    { from: 'gate', to: 'review', label: 'REVIEW', color: '#38bdf8' },
    { from: 'ledger', to: 'settle', label: 'T+0', color: '#34d399' },
];

const INITIAL_POS: Record<string, { x: number; y: number }> = {
    intake: { x: 14, y: 172 },
    kyc: { x: 170, y: 88 },
    sanctions: { x: 170, y: 256 },
    fraud: { x: 326, y: 172 },
    gate: { x: 482, y: 172 },
    freeze: { x: 638, y: 56 },
    ledger: { x: 638, y: 172 },
    review: { x: 638, y: 288 },
    settle: { x: 794, y: 172 },
};

interface RunResult {
    id: string;
    score: string;
    disposition: 'CLEAR' | 'HIGH' | 'REVIEW';
    detail: string;
    elapsed: string;
    audit: string;
}

function nextResult(seq: number): RunResult {
    const roll = Math.random();
    const score = roll < 0.72 ? Math.random() * 0.5 : roll < 0.88 ? 0.6 + Math.random() * 0.24 : 0.86 + Math.random() * 0.13;
    const disposition = score >= 0.85 ? 'HIGH' : score >= 0.6 ? 'REVIEW' : 'CLEAR';
    const detail =
        disposition === 'CLEAR' ? `ledger L-${88300 + seq} · settled T+0`
        : disposition === 'REVIEW' ? `queued · four-eyes pending`
        : `case C-${2200 + seq} opened · funds held`;
    return {
        id: `TG-2026-${String(84000 + seq).padStart(6, '0')}`,
        score: score.toFixed(2),
        disposition,
        detail,
        elapsed: (0.9 + Math.random() * 0.9).toFixed(2),
        audit: Math.random().toString(16).slice(2, 8),
    };
}

/**
 * An interactive n8n-style banking workflow (Transaction-Guard): KYC and
 * sanctions verification, AI fraud scoring, a risk gate with three governed
 * dispositions, ledger commit and T+0 settlement — draggable nodes, pannable
 * canvas, and a live execution result readout.
 */
// Default view: the whole pipeline fits inside the card
const FIT_ZOOM = 0.65;
const FIT_PAN = { x: 19, y: 64 };
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 1.8;

export default function AutomationFlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [fitScale, setFitScale] = useState(1);
    const [zoom, setZoom] = useState(FIT_ZOOM);
    const [positions, setPositions] = useState(INITIAL_POS);
    const [pan, setPan] = useState(FIT_PAN);
    const [dragging, setDragging] = useState<string | null>(null);
    const [hintVisible, setHintVisible] = useState(true);
    const [runSeq, setRunSeq] = useState(128);
    const [result, setResult] = useState<RunResult | null>(null);
    const dragRef = useRef<{ mode: 'node' | 'pan'; id?: string; startX: number; startY: number; origin: { x: number; y: number } } | null>(null);
    const pinchRef = useRef<Map<number, { x: number; y: number }>>(new Map());
    const pinchDistRef = useRef<number | null>(null);

    const scale = fitScale * zoom;

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            const w = entries[0]?.contentRect.width || SCALE_BASE;
            setFitScale(w / SCALE_BASE);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Zoom about the card center so the view stays anchored
    const zoomTo = (nextZoomRaw: number) => {
        const el = containerRef.current;
        if (!el) return;
        const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoomRaw));
        const s1 = fitScale * zoom;
        const s2 = fitScale * nextZoom;
        const cx = el.clientWidth / 2;
        const cy = el.clientHeight / 2;
        setPan(p => ({ x: p.x + cx * (1 / s2 - 1 / s1), y: p.y + cy * (1 / s2 - 1 / s1) }));
        setZoom(nextZoom);
    };

    const resetView = () => {
        setZoom(FIT_ZOOM);
        setPan(FIT_PAN);
    };

    // Execution loop: each cycle produces a verifiable run result
    useEffect(() => {
        setResult(nextResult(128));
        const interval = setInterval(() => {
            setRunSeq(seq => {
                const next = seq + 1;
                setResult(nextResult(next));
                return next;
            });
        }, 4200);
        return () => clearInterval(interval);
    }, []);

    const onNodePointerDown = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        dragRef.current = { mode: 'node', id, startX: e.clientX, startY: e.clientY, origin: positions[id] };
        setDragging(id);
        setHintVisible(false);
    };

    const onCanvasPointerDown = (e: React.PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        pinchRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pinchRef.current.size === 2) {
            const [a, b] = Array.from(pinchRef.current.values());
            pinchDistRef.current = Math.hypot(a.x - b.x, a.y - b.y);
            dragRef.current = null; // pinch takes over from pan
            return;
        }
        dragRef.current = { mode: 'pan', startX: e.clientX, startY: e.clientY, origin: pan };
        setHintVisible(false);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (pinchRef.current.has(e.pointerId)) {
            pinchRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }
        // Two-finger pinch: zoom
        if (pinchRef.current.size === 2 && pinchDistRef.current !== null) {
            const [a, b] = Array.from(pinchRef.current.values());
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist > 0 && pinchDistRef.current > 0) {
                zoomTo(zoom * (dist / pinchDistRef.current));
                pinchDistRef.current = dist;
            }
            return;
        }
        const drag = dragRef.current;
        if (!drag) return;
        const dx = (e.clientX - drag.startX) / scale;
        const dy = (e.clientY - drag.startY) / scale;
        if (drag.mode === 'node' && drag.id) {
            const id = drag.id;
            setPositions(prev => ({ ...prev, [id]: { x: drag.origin.x + dx, y: drag.origin.y + dy } }));
        } else {
            setPan({ x: drag.origin.x + dx, y: drag.origin.y + dy });
        }
    };

    const endDrag = (e?: React.PointerEvent) => {
        if (e) pinchRef.current.delete(e.pointerId);
        if (pinchRef.current.size < 2) pinchDistRef.current = null;
        dragRef.current = null;
        setDragging(null);
    };

    const port = (id: string, side: 'in' | 'out') => {
        const p = positions[id];
        return { x: p.x + (side === 'out' ? NODE_W : 0), y: p.y + NODE_H / 2 };
    };

    const dispositionStyles = {
        CLEAR: { color: 'text-emerald-300', badge: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300', icon: CheckCircle2, label: 'SETTLED' },
        REVIEW: { color: 'text-sky-300', badge: 'border-sky-400/40 bg-sky-400/10 text-sky-300', icon: Clock3, label: 'PENDING' },
        HIGH: { color: 'text-red-300', badge: 'border-red-400/40 bg-red-400/10 text-red-300', icon: AlertTriangle, label: 'FROZEN' },
    } as const;

    const ds = result ? dispositionStyles[result.disposition] : null;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 bg-[#070A11] overflow-hidden select-none"
            style={{ touchAction: 'none' }}
            onPointerDown={onCanvasPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
        >
            {/* Dot grid, n8n style */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
                    backgroundSize: `${18 * scale}px ${18 * scale}px`,
                    backgroundPosition: `${pan.x * scale}px ${pan.y * scale}px`,
                }}
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />

            {/* Header strip */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2 pointer-events-none">
                <div className="flex items-center gap-2">
                    <span className="relative flex w-1.5 h-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                    </span>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-white/60 uppercase">Workflow · Transaction-Guard</span>
                </div>
                <span className="text-[8px] md:text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 tracking-widest uppercase">Active</span>
            </div>

            {/* Scaled virtual canvas */}
            <div
                className="absolute top-0 left-0 origin-top-left"
                style={{ transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`, width: SVG_W, height: SVG_H }}
            >
                <svg width={SVG_W} height={SVG_H} className="absolute top-0 left-0 overflow-visible pointer-events-none">
                    <style>{`@keyframes af-flow { to { stroke-dashoffset: -24; } }`}</style>
                    {EDGES.map((edge) => {
                        const a = port(edge.from, 'out');
                        const b = port(edge.to, 'in');
                        const bend = Math.max(40, Math.abs(b.x - a.x) / 2);
                        const d = `M ${a.x} ${a.y} C ${a.x + bend} ${a.y}, ${b.x - bend} ${b.y}, ${b.x} ${b.y}`;
                        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 8 };
                        return (
                            <g key={`${edge.from}-${edge.to}`}>
                                <path d={d} stroke="rgba(255,255,255,0.14)" strokeWidth="2" fill="none" />
                                <path
                                    d={d}
                                    stroke={edge.color}
                                    strokeWidth="2"
                                    strokeOpacity="0.75"
                                    fill="none"
                                    strokeDasharray="5 19"
                                    strokeLinecap="round"
                                    style={{ animation: 'af-flow 0.9s linear infinite' }}
                                />
                                {edge.label && (
                                    <text x={mid.x} y={mid.y} textAnchor="middle" fontSize="8" fontFamily="monospace" fill={edge.color} fillOpacity="0.9" letterSpacing="1.5">
                                        {edge.label}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {NODE_DEFS.map((node) => {
                    const p = positions[node.id];
                    const isDragging = dragging === node.id;
                    return (
                        <div
                            key={node.id}
                            onPointerDown={(e) => onNodePointerDown(e, node.id)}
                            className="absolute cursor-grab active:cursor-grabbing"
                            style={{
                                left: p.x,
                                top: p.y,
                                width: NODE_W,
                                height: NODE_H,
                                transform: isDragging ? 'scale(1.06)' : 'scale(1)',
                                transition: isDragging ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease',
                                zIndex: isDragging ? 30 : 10,
                            }}
                        >
                            <div
                                className="absolute -inset-x-2 top-1/2 bottom-[-14px] rounded-[50%] blur-md pointer-events-none"
                                style={{ background: node.glow, opacity: isDragging ? 0.8 : 0.4 }}
                            />
                            <div
                                className="relative w-full h-full rounded-xl border border-white/10 bg-gradient-to-b from-[#151B29] to-[#0B0F18] flex items-center gap-2.5 px-2.5"
                                style={{
                                    boxShadow: isDragging
                                        ? `0 18px 32px -8px rgba(0,0,0,0.9), 0 0 24px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`
                                        : '0 12px 22px -10px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.09)',
                                }}
                            >
                                <div className={`w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${node.tile} border border-white/15 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.5)]`}>
                                    <node.icon className="w-[18px] h-[18px] text-white drop-shadow" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-white leading-tight truncate">{node.name}</p>
                                    <p className="text-[8px] font-mono text-white/40 leading-tight truncate">{node.sub}</p>
                                </div>
                                <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0B0F18] border border-white/30" />
                                <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0B0F18] border border-white/30" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Execution result readout */}
            {result && ds && (
                <div className="absolute bottom-9 right-2.5 z-20 w-[186px] md:w-[210px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-md shadow-[0_16px_32px_-12px_rgba(0,0,0,0.9)] pointer-events-none overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
                        <span className="text-[8px] font-mono tracking-[0.18em] text-white/45 uppercase">Execution Result</span>
                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[7px] font-mono tracking-widest uppercase ${ds.badge}`}>
                            <ds.icon className="w-2.5 h-2.5" />
                            {ds.label}
                        </span>
                    </div>
                    <div className="px-3 py-2 space-y-1 font-mono text-[8px] md:text-[9px] leading-relaxed">
                        <div className="flex justify-between gap-2">
                            <span className="text-white/35">run</span>
                            <span className="text-white/80 tabular-nums truncate">{result.id}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <span className="text-white/35">risk</span>
                            <span className={ds.color}>{result.score} → {result.disposition}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <span className="text-white/35">action</span>
                            <span className="text-white/70 truncate">{result.detail}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <span className="text-white/35">audit</span>
                            <span className="text-white/60 tabular-nums">{result.elapsed}s · #{result.audit}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Zoom controls */}
            <div className="absolute bottom-9 left-2.5 z-30 flex flex-col gap-1" onPointerDown={(e) => e.stopPropagation()}>
                <button
                    onClick={() => zoomTo(zoom * 1.25)}
                    aria-label="Zoom in"
                    className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-colors"
                >
                    <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => zoomTo(zoom / 1.25)}
                    aria-label="Zoom out"
                    className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-colors"
                >
                    <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={resetView}
                    aria-label="Fit workflow to view"
                    className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-colors"
                >
                    <Scan className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Interaction hint */}
            {hintVisible && (
                <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm pointer-events-none">
                    <Hand className="w-3 h-3 text-white/50" />
                    <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Drag · Pan · Zoom</span>
                </div>
            )}

            {/* Compliance strip */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-4 py-1.5 border-t border-white/5 bg-black/40 backdrop-blur-sm pointer-events-none">
                <span className="text-[8px] md:text-[9px] font-mono tracking-[0.15em] text-white/35 uppercase">PCI-DSS Scoped · SOC 2 Type II</span>
                <span className="text-[8px] md:text-[9px] font-mono tracking-[0.15em] text-white/50 uppercase tabular-nums">{(4000 + runSeq).toLocaleString()} Executions Today</span>
            </div>
        </div>
    );
}
