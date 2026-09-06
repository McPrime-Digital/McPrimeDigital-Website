'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize, Minimize, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

export interface TheaterFilm {
    src: string;
    title: string;
    subtitle?: string;
    category?: string;
}

interface PortfolioTheaterProps {
    films: TheaterFilm[];
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

/** Horizontal sprocket row — the perforated edge of a 35mm strip */
function SprocketRow() {
    return (
        <div className="flex items-center justify-between px-4 h-6 md:h-7 bg-[#0B0B0E] gap-1.5 overflow-hidden">
            {Array.from({ length: 26 }).map((_, i) => (
                <span
                    key={i}
                    className="w-3.5 md:w-4 h-3 md:h-3.5 shrink-0 rounded-[3px] bg-black border border-white/12 shadow-[inset_0_1px_2px_rgba(255,255,255,0.07)]"
                />
            ))}
        </div>
    );
}

/**
 * The Portfolio Theater: house lights down, a widescreen 35mm frame with
 * perforated edges and live light-spill from the film itself, neighboring
 * films staged faintly behind — next/previous auto-play through the catalog.
 */
export default function PortfolioTheater({ films, index, onClose, onNavigate }: PortfolioTheaterProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [buffering, setBuffering] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const open = index !== null;
    const count = films.length;
    const current = open ? films[index!] : null;

    const goTo = useCallback((next: number) => {
        onNavigate(((next % count) + count) % count);
    }, [count, onNavigate]);

    const wakeControls = useCallback(() => {
        setControlsVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
            const v = videoRef.current;
            if (v && !v.paused) setControlsVisible(false);
        }, 3000);
    }, []);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play();
        else v.pause();
        wakeControls();
    }, [wakeControls]);

    const toggleFullscreen = useCallback(() => {
        const stage = stageRef.current;
        const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
        if (!document.fullscreenElement) {
            if (stage?.requestFullscreen) {
                stage.requestFullscreen().catch(() => v?.webkitEnterFullscreen?.());
            } else {
                v?.webkitEnterFullscreen?.();
            }
        } else {
            document.exitFullscreen().catch(() => undefined);
        }
        wakeControls();
    }, [wakeControls]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape': onClose(); break;
                case 'ArrowRight': goTo(index! + 1); break;
                case 'ArrowLeft': goTo(index! - 1); break;
                case ' ': e.preventDefault(); togglePlay(); break;
                case 'f': case 'F': toggleFullscreen(); break;
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
    }, [open, index, onClose, goTo, togglePlay, toggleFullscreen]);

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    // Ambilight: light-spill sampled from the film
    useEffect(() => {
        if (!open) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        canvas.width = 32;
        canvas.height = 18;
        const interval = setInterval(() => {
            const v = videoRef.current;
            if (v && v.readyState >= 2) {
                try {
                    ctx.drawImage(v, 0, 0, 32, 18);
                } catch {
                    // decoder hiccup — glow holds its last frame
                }
            }
        }, 250);
        return () => clearInterval(interval);
    }, [open]);

    // Reset per film
    useEffect(() => {
        if (open) {
            setBuffering(true);
            setProgress(0);
            setDuration(0);
            setPlaying(false);
            wakeControls();
        }
    }, [open, index, wakeControls]);

    const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
        const bar = progressRef.current;
        const v = videoRef.current;
        if (!bar || !v || !v.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
        v.currentTime = ratio * v.duration;
        setProgress(ratio * 100);
    };

    const ghostOf = (offset: number) => (open && count > 1 ? films[(((index! + offset) % count) + count) % count] : null);
    const prevGhost = ghostOf(-1);
    const nextGhost = ghostOf(1);

    const plateVisible = controlsVisible || !playing;

    return (
        <AnimatePresence>
            {open && current && (
                <motion.div
                    key="portfolio-theater"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="fixed inset-0 z-[100] bg-black overflow-hidden"
                    onPointerMove={wakeControls}
                    onTouchStart={wakeControls}
                >
                    <div ref={stageRef} className={`relative w-full h-full bg-black ${controlsVisible ? '' : 'cursor-none'}`} onClick={onClose}>
                        {/* Light-spill into the hall */}
                        <canvas
                            ref={canvasRef}
                            aria-hidden
                            className="absolute inset-0 w-full h-full scale-125 blur-[120px] saturate-150 brightness-[0.4] opacity-70 pointer-events-none"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.88)_100%)]" />

                        {/* Catalog ghosts */}
                        {prevGhost && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 left-[-14%] md:left-[-8%] w-[38vw] aspect-video rounded-lg overflow-hidden blur-[4px] opacity-20 scale-90 cursor-pointer hidden sm:block"
                                onClick={(e) => { e.stopPropagation(); goTo(index! - 1); }}
                            >
                                <video src={prevGhost.src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        )}
                        {nextGhost && count > 2 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 right-[-14%] md:right-[-8%] w-[38vw] aspect-video rounded-lg overflow-hidden blur-[4px] opacity-20 scale-90 cursor-pointer hidden sm:block"
                                onClick={(e) => { e.stopPropagation(); goTo(index! + 1); }}
                            >
                                <video src={nextGhost.src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        )}

                        {/* The 35mm frame */}
                        <div className="absolute inset-0 flex items-center justify-center p-3 pb-20 md:pb-24">
                            <motion.div
                                key={`frame-${index}`}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.97, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="relative rounded-lg overflow-hidden bg-[#0B0B0E] border border-white/10 shadow-[0_0_140px_rgba(0,0,0,0.95)]"
                                style={{ width: 'min(86vw, 118vh)' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Top marking + sprockets */}
                                <div className="flex items-center justify-between px-4 h-6 bg-[#0B0B0E] text-[8px] md:text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase select-none">
                                    <span className="truncate">McPrime Digital · {current.category || 'Original'}</span>
                                    <span className="tabular-nums shrink-0">Film {String(index! + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
                                </div>
                                <SprocketRow />

                                {/* Screen */}
                                <div className="relative aspect-video bg-black">
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
                                        onPlay={() => { setPlaying(true); wakeControls(); }}
                                        onPause={() => { setPlaying(false); setControlsVisible(true); }}
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
                                            <Loader2 className="w-10 h-10 animate-spin text-white/60" />
                                        ) : !playing ? (
                                            <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                                <Play className="w-8 h-8 text-white ml-1" />
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Transport inside the frame */}
                                    <motion.div
                                        animate={{ opacity: plateVisible ? 1 : 0, y: plateVisible ? 0 : 8 }}
                                        transition={{ duration: 0.3 }}
                                        className={`absolute bottom-0 inset-x-0 px-4 pb-2.5 pt-14 bg-gradient-to-t from-black/90 to-transparent ${plateVisible ? '' : 'pointer-events-none'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
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
                                        <div className="flex items-center gap-3">
                                            <button onClick={togglePlay} className="p-1.5 text-white hover:text-[#2D6BFF] transition-colors" aria-label={playing ? 'Pause' : 'Play'}>
                                                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => { const v = videoRef.current; if (v) { v.muted = !v.muted; setMuted(v.muted); } }}
                                                className="p-1.5 text-white/60 hover:text-white transition-colors"
                                                aria-label={muted ? 'Unmute' : 'Mute'}
                                            >
                                                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                            </button>
                                            <span className="text-[11px] font-mono text-white/50 tabular-nums">
                                                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                                            </span>
                                            <div className="flex-1" />
                                            <button onClick={toggleFullscreen} className="p-1.5 text-white/60 hover:text-white transition-colors" aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                                                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Bottom sprockets + marking */}
                                <SprocketRow />
                                <div className="flex items-center justify-between px-4 h-6 bg-[#0B0B0E] text-[8px] md:text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase select-none">
                                    <span className="truncate max-w-[60%]">{current.title}</span>
                                    <span className="tabular-nums shrink-0">{duration > 0 ? `Runtime ${formatTime(duration)}` : ''}</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Prev / Next */}
                        <motion.button
                            animate={{ opacity: controlsVisible ? 1 : 0 }}
                            onClick={(e) => { e.stopPropagation(); goTo(index! - 1); }}
                            aria-label="Previous film"
                            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            animate={{ opacity: controlsVisible ? 1 : 0 }}
                            onClick={(e) => { e.stopPropagation(); goTo(index! + 1); }}
                            aria-label="Next film"
                            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>

                        {/* Close */}
                        <motion.button
                            animate={{ opacity: controlsVisible ? 1 : 0 }}
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            aria-label="Close"
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Marquee */}
                        <motion.div
                            animate={{ opacity: plateVisible ? 1 : 0 }}
                            transition={{ duration: 0.35 }}
                            className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none px-6 max-w-2xl"
                        >
                            {current.category && (
                                <span className="text-[#2D6BFF] text-[10px] tracking-[0.25em] font-mono uppercase block mb-1">
                                    {current.category} · {String(index! + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}
                                </span>
                            )}
                            <h3 className="text-white text-xl md:text-2xl font-black tracking-tight leading-tight">{current.title}</h3>
                            {current.subtitle && <p className="text-gray-500 text-sm mt-1 hidden md:block">{current.subtitle}</p>}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
