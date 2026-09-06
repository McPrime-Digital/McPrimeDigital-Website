'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

export interface CinemaVideo {
    src: string;
    title: string;
    subtitle?: string;
    category?: string;
}

interface CinemaModalProps {
    video: CinemaVideo | null;
    onClose: () => void;
}

function formatTime(seconds: number) {
    if (!isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * The Screening Room — a full-takeover cinema viewer.
 * House lights go down, the screen ignites with light-spill sampled from the
 * film itself, and controls stay out of the way until asked for.
 */
export default function CinemaModal({ video, onClose }: CinemaModalProps) {
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

    // --- Controls auto-hide ("lights off") ---
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

    const toggleMute = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
        wakeControls();
    }, [wakeControls]);

    const seekBy = useCallback((delta: number) => {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration || 0);
        wakeControls();
    }, [wakeControls]);

    const toggleFullscreen = useCallback(() => {
        const stage = stageRef.current;
        const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
        if (!document.fullscreenElement) {
            if (stage?.requestFullscreen) {
                stage.requestFullscreen().catch(() => v?.webkitEnterFullscreen?.());
            } else {
                // iPhone Safari: only the video element itself can go fullscreen
                v?.webkitEnterFullscreen?.();
            }
        } else {
            document.exitFullscreen().catch(() => undefined);
        }
        wakeControls();
    }, [wakeControls]);

    // --- Keyboard: space play/pause, arrows seek, M mute, F fullscreen, ESC close ---
    useEffect(() => {
        if (!video) return;
        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape': onClose(); break;
                case ' ': e.preventDefault(); togglePlay(); break;
                case 'ArrowRight': seekBy(10); break;
                case 'ArrowLeft': seekBy(-10); break;
                case 'm': case 'M': toggleMute(); break;
                case 'f': case 'F': toggleFullscreen(); break;
            }
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [video, onClose, togglePlay, seekBy, toggleMute, toggleFullscreen]);

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    // --- Ambilight: sample the film into a tiny canvas, blur it huge behind the screen ---
    useEffect(() => {
        if (!video) return;
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
                    // drawing failed (e.g. decoder hiccup) — glow simply holds its last frame
                }
            }
        }, 250);
        return () => clearInterval(interval);
    }, [video]);

    // Reset state each time a new film opens
    useEffect(() => {
        if (video) {
            setPlaying(false);
            setBuffering(true);
            setProgress(0);
            setDuration(0);
            setMuted(false);
            wakeControls();
        }
    }, [video, wakeControls]);

    const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
        const bar = progressRef.current;
        const v = videoRef.current;
        if (!bar || !v || !v.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
        v.currentTime = ratio * v.duration;
        setProgress(ratio * 100);
    };

    const onScrubDown = (e: React.PointerEvent<HTMLDivElement>) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        handleScrub(e);
    };

    const onScrubMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.buttons > 0) handleScrub(e);
    };

    const plateVisible = controlsVisible || !playing;

    return (
        <AnimatePresence>
            {video && (
                <motion.div
                    key="cinema"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="fixed inset-0 z-[100] bg-black"
                    onPointerMove={wakeControls}
                    onTouchStart={wakeControls}
                >
                    <div
                        ref={stageRef}
                        className={`relative w-full h-full bg-black overflow-hidden ${controlsVisible ? '' : 'cursor-none'}`}
                        onClick={onClose}
                    >
                        {/* Light-spill from the screen into the hall */}
                        <canvas
                            ref={canvasRef}
                            aria-hidden
                            className="absolute inset-0 w-full h-full scale-125 blur-[120px] saturate-150 brightness-[0.45] opacity-70 pointer-events-none"
                        />
                        {/* Vignette keeps the hall's edges pitch black */}
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

                        {/* The screen */}
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                            className="absolute inset-0 flex items-center justify-center p-3 pb-24 md:p-12 md:pb-28"
                        >
                            <div
                                className="relative max-w-full max-h-full rounded-md overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video
                                    ref={videoRef}
                                    src={video.src}
                                    className="max-h-[78vh] max-w-full w-auto h-auto block"
                                    autoPlay
                                    playsInline
                                    preload="auto"
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
                                    onEnded={() => { setPlaying(false); setControlsVisible(true); }}
                                />

                                {/* Center state: buffering reel or paused play glyph */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {buffering ? (
                                        <Loader2 className="w-10 h-10 animate-spin text-white/60" />
                                    ) : !playing ? (
                                        <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </motion.div>

                        {/* Close — house lights up */}
                        <motion.button
                            animate={{ opacity: controlsVisible ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Title plate + control bar */}
                        <motion.div
                            animate={{ opacity: plateVisible ? 1 : 0, y: plateVisible ? 0 : 12 }}
                            transition={{ duration: 0.35 }}
                            className={`absolute bottom-0 inset-x-0 z-10 px-4 pb-4 md:px-10 md:pb-8 pt-24 bg-gradient-to-t from-black via-black/70 to-transparent ${plateVisible ? '' : 'pointer-events-none'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="max-w-5xl mx-auto space-y-4">
                                {/* Lower-third title */}
                                <div>
                                    {video.category && (
                                        <span className="text-[#2D6BFF] text-[10px] tracking-[0.25em] font-mono uppercase mb-1.5 block">
                                            {video.category}
                                        </span>
                                    )}
                                    <h3 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                                        {video.title}
                                    </h3>
                                    {video.subtitle && (
                                        <p className="text-gray-400 text-sm mt-1 max-w-xl leading-relaxed hidden md:block">
                                            {video.subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Timeline */}
                                <div
                                    ref={progressRef}
                                    className="group/bar relative h-6 flex items-center cursor-pointer touch-none"
                                    onPointerDown={onScrubDown}
                                    onPointerMove={onScrubMove}
                                >
                                    <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden transition-all group-hover/bar:h-[5px]">
                                        <div
                                            className="h-full bg-[#2D6BFF] rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Transport */}
                                <div className="flex items-center gap-3 md:gap-5">
                                    <button
                                        onClick={togglePlay}
                                        className="p-2 text-white hover:text-[#2D6BFF] transition-colors"
                                        aria-label={playing ? 'Pause' : 'Play'}
                                    >
                                        {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                    </button>
                                    <button
                                        onClick={toggleMute}
                                        className="p-2 text-white/60 hover:text-white transition-colors"
                                        aria-label={muted ? 'Unmute' : 'Mute'}
                                    >
                                        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <span className="text-xs font-mono text-white/50 tabular-nums">
                                        {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                                    </span>
                                    <div className="flex-1" />
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 text-white/60 hover:text-white transition-colors"
                                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                                    >
                                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
