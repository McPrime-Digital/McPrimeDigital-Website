'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Activity, Zap, Server, Globe, Signal, BarChart3 } from 'lucide-react';

export default function LiveAdsDashboard() {
    return (
        <div className="w-full h-full bg-[#080a0f] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col font-mono text-xs">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Top Bar - Status */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="tracking-wider font-bold">LIVE OPTIMIZATION</span>
                    </div>
                    <div className="h-4 w-px bg-white/20" />
                    <div className="flex items-center gap-2 text-gray-400">
                        <Server className="w-3 h-3" />
                        <span>NODE: US-EAST-4</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-blue-400">
                    <Signal className="w-3 h-3 animate-pulse" />
                    <span>LATENCY: 12ms</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden z-10">
                {/* Left: Main Chart (70%) */}
                <div className="w-[70%] border-r border-white/10 p-4 relative flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 uppercase tracking-widest text-[10px] mb-1">Campaign Performance (ROAS vs Spend)</h3>
                            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                                4.85x <span className="text-emerald-400 text-sm font-normal">(+12.4%)</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {['1H', '24H', '7D'].map(t => (
                                <div key={t} className={`px-2 py-1 rounded ${t === '1H' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500'} cursor-pointer hover:bg-white/10`}>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Complex Moving Graph */}
                    <div className="flex-1 relative border border-white/5 rounded-lg bg-black/20 overflow-hidden">
                        <LiveGraph />
                    </div>

                    {/* Bot Ticker */}
                    <div className="mt-4 flex gap-4 overflow-hidden">
                        <TickerItem label="BID ADJ" value="+15%" color="text-cyan-400" />
                        <TickerItem label="AUDIENCE" value="EXPANDED" color="text-purple-400" />
                        <TickerItem label="A/B TEST" value="WINNER FOUND" color="text-emerald-400" />
                        <TickerItem label="BUDGET" value="SCALING" color="text-yellow-400" />
                    </div>
                </div>

                {/* Right: Metrics & Logs (30%) */}
                <div className="w-[30%] flex flex-col bg-white/[0.01]">
                    {/* Live Metrics */}
                    <div className="flex-1 p-4 border-b border-white/10 space-y-4">
                        <MetricRow label="CTR" value="2.4%" trend="up" color="text-blue-400" />
                        <MetricRow label="CPC" value="$0.85" trend="down" color="text-emerald-400" />
                        <MetricRow label="CPM" value="$12.40" trend="flat" color="text-gray-400" />
                        <MetricRow label="Conv." value="1,240" trend="up" color="text-purple-400" />
                    </div>

                    {/* Scrolling Logs */}
                    <div className="h-[40%] p-3 bg-black/40 overflow-hidden relative">
                        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/40 to-transparent z-10" />
                        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <LiveLogs />
                    </div>
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-[2px]" />
        </div>
    );
}

function LiveGraph() {
    // Simulated path data - just a visual representation
    const path1 = "M0 80 Q 20 75, 40 60 T 80 40 T 120 50 T 160 30 T 200 45 T 240 20 T 280 10"; // Blue
    const path2 = "M0 90 Q 20 85, 40 80 T 80 70 T 120 75 T 160 60 T 200 70 T 240 50 T 280 60"; // Purple

    return (
        <svg className="w-full h-full" viewBox="0 0 280 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="25" x2="280" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="280" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="0" y1="75" x2="280" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            {/* Path 1 Area */}
            <motion.path
                d={`${path1} L 280 100 L 0 100 Z`}
                fill="url(#gradBlue)"
            />

            {/* Path 1 Line - Animated */}
            <motion.path
                d={path1}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatType: "reverse" }} // Simple loop for visual activity
            />

            {/* Path 2 Line */}
            <motion.path
                d={path2}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.6"
            />

            {/* Scanning Line */}
            <motion.line
                x1="0" y1="0" x2="0" y2="100"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.5"
                animate={{ x1: [0, 280], x2: [0, 280] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            />
        </svg>
    );
}

function MetricRow({ label, value, trend, color }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-500">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`font-bold ${color}`}>{value}</span>
                {trend === 'up' && <span className="text-[9px] text-emerald-500">▲</span>}
                {trend === 'down' && <span className="text-[9px] text-emerald-500">▼</span>}
            </div>
        </div>
    );
}

function TickerItem({ label, value, color }: any) {
    return (
        <div className="flex flex-col bg-white/5 px-2 py-1 rounded min-w-[80px]">
            <span className="text-[9px] text-gray-500">{label}</span>
            <span className={`font-bold ${color}`}>{value}</span>
        </div>
    );
}

function LiveLogs() {
    const logs = [
        "Initialising creative variance scan...",
        "Anomaly detected in AdSet B - Pausing...",
        "Bid optimized for keyword 'scale'...",
        "Generating 3 new hook variations...",
        "CTR spike detected in Region US-CA...",
        "Reallocating budget to Winner A...",
        "Syncing conversion data to CRM...",
    ];

    const [visibleLogs, setVisibleLogs] = useState(logs);

    useEffect(() => {
        const interval = setInterval(() => {
            // Rotate logs
            setVisibleLogs(prev => {
                const newLogs = [...prev];
                const first = newLogs.shift();
                if (first) newLogs.push(first);
                return newLogs;
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-1.5">
            {visibleLogs.slice(0, 5).map((log, i) => (
                <motion.div
                    key={log + i} // key change forces animation
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1 - (i * 0.15), x: 0 }}
                    className="text-[10px] text-green-400 font-mono truncate"
                >
                    {`> ${log}`}
                </motion.div>
            ))}
        </div>
    );
}
