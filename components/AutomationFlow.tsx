'use client';

import { useEffect, useRef, useState } from 'react';
import { Landmark, BrainCircuit, GitBranch, ShieldAlert, BookText, UserCheck, Hand } from 'lucide-react';

// Virtual canvas coordinate space (scaled to fit the card)
const CANVAS_W = 640;
const CANVAS_H = 340;
const NODE_W = 138;
const NODE_H = 56;

interface NodeDef {
    id: string;
    name: string;
    sub: string;
    icon: typeof Landmark;
    accent: string;   // tailwind text color for icon
    tile: string;     // icon tile gradient
    glow: string;     // ground glow rgba
}

const NODE_DEFS: NodeDef[] = [
    { id: 'intake', name: 'Transaction Intake', sub: 'core-banking · webhook', icon: Landmark, accent: 'text-amber-300', tile: 'from-amber-500/80 to-amber-700/80', glow: 'rgba(251,191,36,0.25)' },
    { id: 'fraud', name: 'AI Fraud Scoring', sub: 'model · risk-v4', icon: BrainCircuit, accent: 'text-pink-300', tile: 'from-pink-500/80 to-fuchsia-700/80', glow: 'rgba(244,114,182,0.25)' },
    { id: 'gate', name: 'Risk Gate', sub: 'if score ≥ 0.85', icon: GitBranch, accent: 'text-purple-300', tile: 'from-purple-500/80 to-violet-700/80', glow: 'rgba(192,132,252,0.25)' },
    { id: 'freeze', name: 'Freeze & Escalate', sub: 'compliance queue', icon: ShieldAlert, accent: 'text-red-300', tile: 'from-red-500/80 to-rose-700/80', glow: 'rgba(248,113,113,0.25)' },
    { id: 'ledger', name: 'Post to Ledger', sub: 'double-entry commit', icon: BookText, accent: 'text-emerald-300', tile: 'from-emerald-500/80 to-teal-700/80', glow: 'rgba(52,211,153,0.25)' },
    { id: 'review', name: 'Manual Review', sub: 'ops · four-eyes check', icon: UserCheck, accent: 'text-sky-300', tile: 'from-sky-500/80 to-blue-700/80', glow: 'rgba(56,189,248,0.25)' },
];

const EDGES: { from: string; to: string; label?: string; color: string }[] = [
    { from: 'intake', to: 'fraud', color: '#fbbf24' },
    { from: 'fraud', to: 'gate', color: '#f472b6' },
    { from: 'gate', to: 'freeze', label: 'HIGH', color: '#f87171' },
    { from: 'gate', to: 'ledger', label: 'CLEAR', color: '#34d399' },
    { from: 'gate', to: 'review', label: 'REVIEW', color: '#38bdf8' },
];

const INITIAL_POS: Record<string, { x: number; y: number }> = {
    intake: { x: 16, y: 142 },
    fraud: { x: 186, y: 142 },
    gate: { x: 356, y: 142 },
    freeze: { x: 494, y: 34 },
    ledger: { x: 494, y: 142 },
    review: { x: 494, y: 250 },
};

/**
 * An interactive n8n-style workflow: a banking transaction pipeline whose
 * nodes can be dragged (mouse or touch) and whose canvas pans, with live
 * data flow along the connectors.
 */
export default function AutomationFlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [positions, setPositions] = useState(INITIAL_POS);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState<string | null>(null);
    const [hintVisible, setHintVisible] = useState(true);
    const dragRef = useRef<{ mode: 'node' | 'pan'; id?: string; startX: number; startY: number; origin: { x: number; y: number } } | null>(null);

    // Fit the virtual canvas to the card
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            const w = entries[0]?.contentRect.width || CANVAS_W;
            setScale(w / CANVAS_W);
        });
        observer.observe(el);
        return () => observer.disconnect();
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
        dragRef.current = { mode: 'pan', startX: e.clientX, startY: e.clientY, origin: pan };
        setHintVisible(false);
    };

    const onPointerMove = (e: React.PointerEvent) => {
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

    const endDrag = () => {
        dragRef.current = null;
        setDragging(null);
    };

    const port = (id: string, side: 'in' | 'out') => {
        const p = positions[id];
        return { x: p.x + (side === 'out' ? NODE_W : 0), y: p.y + NODE_H / 2 };
    };

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
            {/* Depth vignette */}
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
                style={{ transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`, width: CANVAS_W, height: CANVAS_H }}
            >
                {/* Connectors */}
                <svg width={CANVAS_W} height={CANVAS_H} className="absolute top-0 left-0 overflow-visible pointer-events-none">
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

                {/* Nodes */}
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
                            {/* Ground glow — volume under the node */}
                            <div
                                className="absolute -inset-x-2 top-1/2 bottom-[-14px] rounded-[50%] blur-md pointer-events-none"
                                style={{ background: node.glow, opacity: isDragging ? 0.8 : 0.4 }}
                            />
                            {/* Body */}
                            <div
                                className="relative w-full h-full rounded-xl border border-white/10 bg-gradient-to-b from-[#151B29] to-[#0B0F18] flex items-center gap-2.5 px-2.5"
                                style={{
                                    boxShadow: isDragging
                                        ? `0 18px 32px -8px rgba(0,0,0,0.9), 0 0 24px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`
                                        : '0 12px 22px -10px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.09)',
                                }}
                            >
                                {/* Icon tile */}
                                <div className={`w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${node.tile} border border-white/15 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.5)]`}>
                                    <node.icon className="w-[18px] h-[18px] text-white drop-shadow" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-white leading-tight truncate">{node.name}</p>
                                    <p className="text-[8px] font-mono text-white/40 leading-tight truncate">{node.sub}</p>
                                </div>
                                {/* Ports */}
                                <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0B0F18] border border-white/30" />
                                <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0B0F18] border border-white/30" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Interaction hint */}
            {hintVisible && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm pointer-events-none">
                    <Hand className="w-3 h-3 text-white/50" />
                    <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Drag nodes · Pan canvas</span>
                </div>
            )}

            {/* Compliance strip */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-4 py-1.5 border-t border-white/5 bg-black/40 backdrop-blur-sm pointer-events-none">
                <span className="text-[8px] md:text-[9px] font-mono tracking-[0.15em] text-white/35 uppercase">PCI-DSS Scoped · SOC 2 Type II</span>
                <span className="text-[8px] md:text-[9px] font-mono tracking-[0.15em] text-white/50 uppercase tabular-nums">4,128 Executions Today</span>
            </div>
        </div>
    );
}
