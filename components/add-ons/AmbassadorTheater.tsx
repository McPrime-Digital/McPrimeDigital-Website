'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

export interface TheaterVideo {
    src: string;
    title: string;
    context?: string;
}

interface AmbassadorTheaterProps {
    videos: TheaterVideo[];
    index: number | null; // null = closed
    onClose: () => void;
    onNavigate: (index: number) => void;
}

function formatTime(seconds: number) {
    if (!isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Vertical sprocket strip — the film-stock edge of the frame */
function SprocketStrip() {
    return (
        <div className="flex flex-col justify-between items-center py-3 w-7 md:w-9 shrink-0 bg-[#0B0B0E] gap-2 border-x border-black">
            {Array.from({ length: 14 }).map((_, i) => (
                <span
                    key={i}
                    className="w-3 md:w-4 h-3.5 md:h-4 rounded-[3px] bg-black border border-white/12 shadow-[inset_0_1px_2px_rgba(255,255,255,0.07)]"
                />
            ))}
        </div>
    );
}

/**
 * The Ambassador Theater: an IMAX-style catalog player. The active film sits
 * in a 35mm-style frame — sprocket strips and frame markings — with the
 * neighboring films faintly staged behind it; next/previous auto-play.
 */
export default function AmbassadorTheater({ videos, index, onClose, onNavigate }: AmbassadorTheaterProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [buffering, setBuffering] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const open = index !== null;
    const count = videos.length;
    const current = open ? videos[index!] : null;

    const goTo = useCallback((next: number) => {
        onNavigate(((next % count) + count) % count);
    }, [count, onNavigate]);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play();
        else v.pause();
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape': onClose(); break;
                case 'ArrowRight': goTo(index! + 1); break;
                case 'ArrowLeft': goTo(index! - 1); break;
                case ' ': e.preventDefault(); togglePlay(); break;
                case 'm': case 'M': {
                    const v = videoRef.current;
                    if (v) { v.muted = !v.muted; setMuted(v.muted); }
                    break;
                }
            }
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, index, onClose, goTo, togglePlay]);

    // Reset per film
    useEffect(() => {
        if (open) {
            setBuffering(true);
            setProgress(0);
            setDuration(0);
            setPlaying(false);
        }
    }, [open, index]);

    const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
        const bar = progressRef.current;
        const v = videoRef.current;
        if (!bar || !v || !v.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
        v.currentTime = ratio * v.duration;
        setProgress(ratio * 100);
    };

    const ghostOf = (offset: number) => (open && count > 1 ? videos[(((index! + offset) % count) + count) % count] : null);
    const prevGhost = ghostOf(-1);
    const nextGhost = ghostOf(1);

    return (
        <AnimatePresence>
            {open && current && (
                <motion.div
                    key="ambassador-theater"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[100] bg-black overflow-hidden"
                    onClick={onClose}
                >
                    {/* Hall vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(30,30,40,0.35)_0%,black_75%)]" />

                    {/* Catalog ghosts: neighboring films staged behind the active frame */}
                    {prevGhost && (
                        <motion.div
                            key={`ghost-prev-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25, x: '-50%', y: '-50%' }}
                            className="absolute top-1/2 left-[18%] md:left-[26%] h-[54vh] aspect-[9/16] rounded-xl overflow-hidden blur-[3px] scale-90 cursor-pointer hidden sm:block"
                            onClick={(e) => { e.stopPropagation(); goTo(index! - 1); }}
                        >
                            <video src={prevGhost.src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                            <div className="absolute inset-0 bg-black/50" />
                        </motion.div>
                    )}
                    {nextGhost && count > 2 && (
                        <motion.div
                            key={`ghost-next-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25, x: '-50%', y: '-50%' }}
                            className="absolute top-1/2 left-[82%] md:left-[74%] h-[54vh] aspect-[9/16] rounded-xl overflow-hidden blur-[3px] scale-90 cursor-pointer hidden sm:block"
                            onClick={(e) => { e.stopPropagation(); goTo(index! + 1); }}
                        >
                            <video src={nextGhost.src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                            <div className="absolute inset-0 bg-black/50" />
                        </motion.div>
                    )}

                    {/* The film frame */}
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                        <motion.div
                            key={`frame-${index}`}
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="relative rounded-lg overflow-hidden bg-[#0B0B0E] shadow-[0_0_120px_rgba(0,0,0,0.95),0_0_60px_rgba(45,107,255,0.08)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top frame marking */}
                            <div className="flex items-center justify-between px-4 h-7 bg-[#0B0B0E] border-b border-black text-[8px] md:text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase select-none">
                                <span>MCPD · 35MM · KODAK 5219</span>
                                <span className="tabular-nums">REEL {String(index! + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
                            </div>

                            <div className="flex items-stretch">
                                <SprocketStrip />

                                {/* Screen */}
                                <div className="relative h-[62vh] md:h-[70vh] aspect-[9/16] bg-black">
                                    <video
                                        key={current.src}
                                        ref={videoRef}
                                        src={current.src}
                                        className="w-full h-full object-contain bg-black"
                                        autoPlay
                                        playsInline
                                        preload="auto"
                                        muted={muted}
                                        onClick={togglePlay}
                                        onPlay={() => setPlaying(true)}
                                        onPause={() => setPlaying(false)}
                                        onWaiting={() => setBuffering(true)}
                                        onPlaying={() => setBuffering(false)}
                                        onCanPlay={() => setBuffering(false)}
                                        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                                        onTimeUpdate={(e) => {
                                            const v = e.currentTarget;
                                            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
                                        }}
                                        onEnded={() => goTo(index! + 1)}
                                    />
                                    {/* Center state */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {buffering ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-white/60" />
                                        ) : !playing ? (
                                            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                                <Play className="w-6 h-6 text-white ml-0.5" />
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Transport, inside the frame */}
                                    <div className="absolute bottom-0 inset-x-0 px-3 pb-2 pt-10 bg-gradient-to-t from-black/90 to-transparent" onClick={(e) => e.stopPropagation()}>
                                        <div
                                            ref={progressRef}
                                            className="group/bar relative h-5 flex items-center cursor-pointer touch-none"
                                            onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); handleScrub(e); }}
                                            onPointerMove={(e) => { if (e.buttons > 0) handleScrub(e); }}
                                        >
                                            <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden transition-all group-hover/bar:h-[5px]">
                                                <div className="h-full bg-[#2D6BFF] rounded-full" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={togglePlay} className="p-1.5 text-white hover:text-[#2D6BFF] transition-colors" aria-label={playing ? 'Pause' : 'Play'}>
                                                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => { const v = videoRef.current; if (v) { v.muted = !v.muted; setMuted(v.muted); } }}
                                                className="p-1.5 text-white/60 hover:text-white transition-colors"
                                                aria-label={muted ? 'Unmute' : 'Mute'}
                                            >
                                                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                            </button>
                                            <span className="text-[10px] font-mono text-white/50 tabular-nums ml-auto">
                                                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <SprocketStrip />
                            </div>

                            {/* Bottom frame marking */}
                            <div className="flex items-center justify-between px-4 h-7 bg-[#0B0B0E] border-t border-black text-[8px] md:text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase select-none">
                                <span className="truncate max-w-[60%]">{current.title}</span>
                                <span>SCENE 0{index! + 1} · TAKE 01</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Prev / Next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goTo(index! - 1); }}
                        aria-label="Previous film"
                        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); goTo(index! + 1); }}
                        aria-label="Next film"
                        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Close */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        aria-label="Close"
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Marquee: title + context */}
                    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none px-6 max-w-xl">
                        <span className="text-[#2D6BFF] text-[10px] tracking-[0.25em] font-mono uppercase block mb-1">Verified Ambassador · {String(index! + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}</span>
                        <h3 className="text-white text-lg md:text-xl font-black tracking-tight leading-tight">{current.title}</h3>
                        {current.context && <p className="text-gray-500 text-xs mt-1 hidden md:block">{current.context}</p>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
