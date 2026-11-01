'use client';

import {
    AnimatePresence,
    animate,
    motion,
    useIsPresent,
    useMotionValue,
    type AnimationPlaybackControls,
    type MotionValue,
    type Transition,
    type Variants,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export interface TheaterFilm {
    src: string;
    poster?: string | null;
    title: string;
    subtitle?: string;
    category?: string;
}

type Step = 1 | -1;
type Axis = 'x' | 'y';
/** What every change of film needs to know: which way the strip runs, and whether it moves at all. */
interface Travel {
    dir: Step;
    axis: Axis;
    reduced: boolean;
}

interface FilmTheaterProps {
    films: TheaterFilm[];
    index: number | null; // null = closed
    onClose: () => void;
    onNavigate: (index: number) => void;
    /** landscape: widescreen frame perforated top and bottom. portrait: 9:16 frame perforated at the sides, advancing vertically. */
    orientation: 'landscape' | 'portrait';
    /** Accessible name of the dialog */
    label: string;
    /** Edge marking of the frame, after "McPrime Digital ·" */
    marking: (film: TheaterFilm) => string;
    /** Line above the marquee title; the catalog position is appended */
    kicker: (film: TheaterFilm) => string;
}

// The strip advances on one curve: a slow start, a decisive middle and a soft landing.
const ADVANCE = 0.9;
const EASE_ADVANCE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** The incoming picture drifts a fifth of the gate while its edge crosses all of it. */
const PARALLAX = 0.2;
/** Seconds before the end that the next film is announced */
const UP_NEXT_LEAD = 6;
/** Perforation pitch in px. The strip is EXTRA pitches longer at each end, so whole-pitch shifts never show a seam. */
const PITCH = { x: 36, y: 44 } as const;
const EXTRA = 12;

const along = (axis: Axis, value: string) => (axis === 'x' ? { x: value } : { y: value });

/** The incoming film slides over the outgoing one, edge first. */
const gate: Variants = {
    enter: ({ dir, axis, reduced }: Travel) => (reduced ? { opacity: 0, zIndex: 2 } : { ...along(axis, `${dir * 100}%`), zIndex: 2 }),
    center: { x: '0%', y: '0%', opacity: 1, zIndex: 2 },
    exit: { zIndex: 1 },
};
/** The picture inside each gate moves less than the gate itself: parallax. */
const picture: Variants = {
    enter: ({ dir, axis, reduced }: Travel) => (reduced ? {} : along(axis, `${-dir * (1 - PARALLAX) * 100}%`)),
    center: { x: '0%', y: '0%' },
    exit: ({ dir, axis, reduced }: Travel) => (reduced ? {} : along(axis, `${-dir * PARALLAX * 100}%`)),
};
/** The outgoing film dims as it is covered. */
const shade: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 0 },
    exit: ({ reduced }: Travel) => ({ opacity: reduced ? 0.4 : 0.7 }),
};
/** Markings and titles roll to their next value in the strip's direction: the old one leaves, then the new one lands. */
const roll: Variants = {
    enter: ({ dir, reduced }: Travel & { delay: number }) => ({ opacity: 0, y: reduced ? '0%' : `${dir * 70}%` }),
    center: { opacity: 1, y: '0%', transition: { duration: 0.5, ease: EASE_OUT } },
    exit: ({ dir, reduced, delay }: Travel & { delay: number }) => ({
        opacity: 0,
        y: reduced ? '0%' : `${-dir * 70}%`,
        transition: { duration: 0.22, ease: [0.4, 0, 1, 1], delay },
    }),
};

function formatTime(seconds: number) {
    if (!isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Fades a film's sound rather than cutting it. Browsers that fix volume (iOS) simply ignore it. */
function fadeVolume(video: HTMLVideoElement, to: number, duration: number, then?: () => void): AnimationPlaybackControls {
    return animate(video.volume, to, {
        duration,
        ease: 'easeInOut',
        onUpdate: (level) => { video.volume = level; },
        onComplete: then,
    });
}

const subscribeNever = () => () => undefined;

/** Text that rolls to its next value, like a split-flap marking. */
function Roll({ value, travel, delay = 0, className = '' }: { value: string; travel: Travel; delay?: number; className?: string }) {
    const custom = { ...travel, delay };
    return (
        <span
            className={`grid min-w-0 overflow-hidden py-[0.15em] -my-[0.15em] [mask-image:linear-gradient(transparent,#000_0.15em,#000_calc(100%_-_0.15em),transparent)] ${className}`}
        >
            <AnimatePresence initial={false} custom={custom} mode="wait">
                <motion.span
                    key={value}
                    custom={custom}
                    variants={roll}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="col-start-1 row-start-1 truncate"
                >
                    {value || ' '}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/** Perforated film edge that travels with the picture when the strip advances. */
function Perforations({ axis, offset }: { axis: Axis; offset: MotionValue<number> }) {
    const horizontal = axis === 'x';
    const holes = Array.from({ length: horizontal ? 96 : 56 }, (_, i) => (
        <span key={i} className={`flex shrink-0 items-center justify-center ${horizontal ? 'w-9 h-full' : 'h-11 w-full'}`}>
            <span
                className={`rounded-[3px] bg-black border border-white/12 shadow-[inset_0_1px_2px_rgba(255,255,255,0.07)] ${horizontal ? 'w-3.5 h-3 md:w-4 md:h-3.5' : 'w-3 h-3.5 md:w-4 md:h-4'}`}
            />
        </span>
    ));
    return horizontal ? (
        <div aria-hidden className="relative h-6 md:h-7 overflow-hidden bg-[#0B0B0E]">
            <motion.div style={{ x: offset, left: -EXTRA * PITCH.x }} className="absolute inset-y-0 flex">
                {holes}
            </motion.div>
        </div>
    ) : (
        <div aria-hidden className="relative w-7 md:w-9 shrink-0 overflow-hidden bg-[#0B0B0E] border-x border-black">
            <motion.div style={{ y: offset, top: -EXTRA * PITCH.y }} className="absolute inset-x-0 flex flex-col">
                {holes}
            </motion.div>
        </div>
    );
}

/** Frame marking along the top or bottom edge of the strip */
function Marking({ left, right }: { left: ReactNode; right: ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 h-6 md:h-7 bg-[#0B0B0E] text-[8px] md:text-[9px] font-mono tracking-[0.25em] text-white/35 uppercase select-none">
            <span className="flex min-w-0 flex-1">{left}</span>
            <span className="flex shrink-0 items-center tabular-nums">{right}</span>
        </div>
    );
}

/** A neighbouring film staged faintly behind the frame: its poster, never a second video decoder. */
function Ghost({ film, side, onSelect }: { film: TheaterFilm; side: 'left' | 'right'; onSelect: () => void }) {
    return (
        <div
            aria-hidden
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${side === 'left' ? 'left-[18%] md:left-[26%]' : 'left-[82%] md:left-[74%]'} hidden sm:block h-[54vh] aspect-[9/16] scale-90 cursor-pointer opacity-25 blur-[3px] bg-[#0B0B0E] [mask-image:linear-gradient(to_right,transparent,#000_22%,#000_78%,transparent),linear-gradient(transparent,#000_14%,#000_86%,transparent)] [mask-composite:intersect]`}
        >
            <AnimatePresence initial={false}>
                {film.poster && (
                    <motion.img
                        key={film.src}
                        src={film.poster}
                        alt=""
                        draggable={false}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

interface ReelEvents {
    onToggle: () => void;
    onPlay: () => void;
    onPause: (video: HTMLVideoElement) => void;
    onWaiting: () => void;
    onReady: () => void;
    onDuration: (seconds: number) => void;
    onSecond: (second: number) => void;
    onEnded: () => void;
}

interface ReelProps {
    film: TheaterFilm;
    /** Seconds to hold the poster before rolling, so a film starts once it has landed in the gate */
    delay: number;
    travel: Travel;
    timing: Transition;
    muted: boolean;
    register: (video: HTMLVideoElement) => void;
    onSoundBlocked: () => void;
    onBlocked: () => void;
    events: ReelEvents;
}

/**
 * One film in the gate. When the next film arrives this one stays where it is, keeps moving and
 * dims while the new film slides over it, and its sound fades out instead of stopping dead.
 * Only the film in the gate reports to the controls.
 */
function Reel({ film, delay, travel, timing, muted, register, onSoundBlocked, onBlocked, events }: ReelProps) {
    const isPresent = useIsPresent();
    const video = useRef<HTMLVideoElement | null>(null);
    const rise = useRef<AnimationPlaybackControls | null>(null);
    const [startDelay] = useState(delay);
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
        const v = video.current;
        if (!v) return;
        // Sound rises with the picture instead of starting at full level
        v.volume = 0;
        const onPlaying = () => { rise.current = fadeVolume(v, 1, 0.8); };
        v.addEventListener('playing', onPlaying, { once: true });
        const start = setTimeout(() => {
            v.play().catch(() => {
                // Browsers that refuse sound without a click still play the film muted
                v.muted = true;
                onSoundBlocked();
                v.play().catch(onBlocked);
            });
        }, startDelay * 1000);
        return () => {
            clearTimeout(start);
            v.removeEventListener('playing', onPlaying);
        };
    }, [startDelay, onSoundBlocked, onBlocked]);

    useEffect(() => {
        const v = video.current;
        if (isPresent || !v) return;
        rise.current?.stop();
        const fall = fadeVolume(v, 0, 0.45, () => v.pause());
        return () => {
            fall.stop();
            v.pause();
        };
    }, [isPresent]);

    const live = isPresent ? events : undefined;

    return (
        <motion.div
            custom={travel}
            variants={gate}
            initial="enter"
            animate="center"
            exit="exit"
            transition={timing}
            className="absolute inset-0 shadow-[0_0_64px_16px_rgba(0,0,0,0.75)]"
        >
            <motion.div custom={travel} variants={picture} transition={timing} className="absolute inset-0">
                <video
                    ref={(el) => {
                        video.current = el;
                        if (el && isPresent) register(el);
                    }}
                    src={film.src}
                    poster={film.poster ?? undefined}
                    className="w-full h-full object-contain bg-black"
                    playsInline
                    preload="auto"
                    muted={muted}
                    onClick={live?.onToggle}
                    onPlay={live?.onPlay}
                    onPause={live ? (e) => live.onPause(e.currentTarget) : undefined}
                    onWaiting={live?.onWaiting}
                    onPlaying={() => { setRolling(true); live?.onReady(); }}
                    onCanPlay={live?.onReady}
                    onLoadedMetadata={live ? (e) => live.onDuration(e.currentTarget.duration) : undefined}
                    onTimeUpdate={live ? (e) => live.onSecond(Math.floor(e.currentTarget.currentTime)) : undefined}
                    onEnded={live?.onEnded}
                />
                {/* The poster holds while the film lands, then dissolves into the moving picture */}
                {film.poster && (
                    <motion.img
                        src={film.poster}
                        alt=""
                        draggable={false}
                        initial={false}
                        animate={{ opacity: rolling ? 0 : 1 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-contain bg-black pointer-events-none"
                    />
                )}
            </motion.div>
            <motion.div custom={travel} variants={shade} transition={timing} className="absolute inset-0 bg-black pointer-events-none" />
        </motion.div>
    );
}

/**
 * The film theater: house lights down, the film in a 35mm frame whose perforations and
 * markings travel with it. Changing film, by arrow, key, swipe or at the end of a film,
 * advances the strip: the next film slides in over the last while the frame stays put,
 * the markings roll to the new title and the sound crossfades. The final seconds of each
 * film announce what plays next.
 */
export default function FilmTheater({ films, index, onClose, onNavigate, orientation, label, marking, kicker }: FilmTheaterProps) {
    const client = useSyncExternalStore(subscribeNever, () => true, () => false);
    const reduced = usePrefersReducedMotion();
    const portrait = orientation === 'portrait';
    const axis: Axis = portrait ? 'y' : 'x';

    const rootRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const stripMotion = useRef<AnimationPlaybackControls | null>(null);
    const rewinding = useRef(false);
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const strip = useMotionValue(0);
    const progress = useMotionValue(0);
    const upNextFill = useMotionValue(0);

    const [dir, setDir] = useState<Step>(1);
    const [advanced, setAdvanced] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [buffering, setBuffering] = useState(true);
    const [duration, setDuration] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const open = index !== null;
    const count = films.length;
    const current = open ? films[index] : null;
    const travel = useMemo<Travel>(() => ({ dir, axis, reduced }), [dir, axis, reduced]);
    const timing: Transition = reduced ? { duration: 0.4, ease: 'easeOut' } : { duration: ADVANCE, ease: EASE_ADVANCE };

    // Reset per film: state is adjusted during render when the selected film changes
    const [shownIndex, setShownIndex] = useState<number | null>(index);
    if (index !== shownIndex) {
        if (shownIndex === null) setAdvanced(false);
        setShownIndex(index);
        setBuffering(true);
        setDuration(0);
        setSeconds(0);
        setPaused(false);
        setControlsVisible(true);
    }

    const wakeControls = useCallback(() => {
        setControlsVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
            const v = videoRef.current;
            if (v && !v.paused) setControlsVisible(false);
        }, 3000);
    }, []);

    const advance = useCallback((step: Step) => {
        if (index === null || count < 2) return;
        setDir(step);
        setAdvanced(true);
        wakeControls();
        // The perforations travel with the new picture, by whole pitches so the strip never jumps
        const screen = screenRef.current;
        if (screen && !reduced) {
            const pitch = PITCH[axis];
            const size = axis === 'x' ? screen.offsetWidth : screen.offsetHeight;
            const pitches = Math.max(1, Math.round((size * PARALLAX) / pitch));
            let from = strip.get() + step * pitches * pitch;
            while (Math.abs(from) > EXTRA * pitch) from -= Math.sign(from) * pitch;
            stripMotion.current?.stop();
            strip.set(from);
            stripMotion.current = animate(strip, 0, { duration: ADVANCE, ease: EASE_ADVANCE });
        }
        // The progress line glides back to the start rather than snapping
        rewinding.current = true;
        animate(progress, 0, { duration: 0.6, ease: EASE_OUT, onComplete: () => { rewinding.current = false; } });
        upNextFill.set(0);
        onNavigate((((index + step) % count) + count) % count);
    }, [index, count, reduced, axis, strip, progress, upNextFill, onNavigate, wakeControls]);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => undefined);
        else v.pause();
        wakeControls();
    }, [wakeControls]);

    const toggleMute = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        if (!v.muted && v.volume === 0) v.volume = 1;
        setMuted(v.muted);
        wakeControls();
    }, [wakeControls]);

    const toggleFullscreen = useCallback(() => {
        const stage = rootRef.current;
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

    const onSoundBlocked = useCallback(() => setMuted(true), []);
    const onBlocked = useCallback(() => {
        setPaused(true);
        setBuffering(false);
    }, []);
    const register = useCallback((v: HTMLVideoElement) => {
        videoRef.current = v;
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape': onClose(); break;
                case 'ArrowRight': advance(1); break;
                case 'ArrowLeft': advance(-1); break;
                case 'ArrowDown': if (portrait) { e.preventDefault(); advance(1); } break;
                case 'ArrowUp': if (portrait) { e.preventDefault(); advance(-1); } break;
                case ' ': e.preventDefault(); togglePlay(); break;
                case 'f': case 'F': toggleFullscreen(); break;
                case 'm': case 'M': toggleMute(); break;
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, portrait, onClose, advance, togglePlay, toggleFullscreen, toggleMute]);

    // While the theater is open the page behind it is out of reach: it cannot scroll, even under a
    // finger on iOS, and it takes no focus and no screen-reader attention.
    useEffect(() => {
        if (!open) return;
        const root = rootRef.current;
        const { body, documentElement: html } = document;
        const scrollbar = window.innerWidth - html.clientWidth;
        const saved = { html: html.style.overflow, body: body.style.overflow, padding: body.style.paddingRight };
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
        const holdStill = (e: TouchEvent) => e.preventDefault();
        root?.addEventListener('touchmove', holdStill, { passive: false });
        const behind = Array.from(body.children).filter(
            (el): el is HTMLElement => el instanceof HTMLElement && el !== root && !el.inert
        );
        behind.forEach((el) => { el.inert = true; });
        const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        root?.focus({ preventScroll: true });
        strip.set(0);
        progress.set(0);
        upNextFill.set(0);
        return () => {
            html.style.overflow = saved.html;
            body.style.overflow = saved.body;
            body.style.paddingRight = saved.padding;
            root?.removeEventListener('touchmove', holdStill);
            behind.forEach((el) => { el.inert = false; });
            returnFocus?.focus({ preventScroll: true });
            // The sound fades with the house lights instead of cutting off
            const v = videoRef.current;
            if (v && !v.paused) fadeVolume(v, 0, 0.4, () => v.pause());
            if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
        };
    }, [open, strip, progress, upNextFill]);

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    // Let the controls fade a few seconds after a film starts
    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => {
            const v = videoRef.current;
            if (v && !v.paused) setControlsVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [open, index]);

    // Progress is drawn straight from the playing film every frame, without re-rendering the theater
    useEffect(() => {
        if (!open || !playing) return;
        let frame = 0;
        const tick = () => {
            const v = videoRef.current;
            if (v && v.duration && !rewinding.current) {
                progress.set(v.currentTime / v.duration);
                upNextFill.set(Math.min(1, Math.max(0, 1 - (v.duration - v.currentTime) / UP_NEXT_LEAD)));
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [open, playing, progress, upNextFill]);

    // House light: colour sampled from the film spills into the hall. Each sample only partly covers
    // the last, so the light drifts between shots and between films instead of jumping. Phones skip
    // it: the film fills the screen there, and a full-screen 120px blur is costly.
    useEffect(() => {
        if (!open || !window.matchMedia('(min-width: 768px)').matches) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        canvas.width = 32;
        canvas.height = 18;
        let lit = false;
        const interval = setInterval(() => {
            const v = videoRef.current;
            if (!v || v.readyState < 2) return;
            ctx.globalAlpha = lit ? 0.22 : 1;
            try {
                ctx.drawImage(v, 0, 0, 32, 18);
                lit = true;
            } catch {
                // decoder hiccup: the light holds
            }
        }, 160);
        return () => clearInterval(interval);
    }, [open]);

    const prevFilm = open && count > 1 ? films[(index - 1 + count) % count] : null;
    const nextFilm = open && count > 1 ? films[(index + 1) % count] : null;

    // Neighbouring posters are fetched ahead, so a new film never opens on an empty gate
    const prevPoster = prevFilm?.poster;
    const nextPoster = nextFilm?.poster;
    useEffect(() => {
        for (const poster of [prevPoster, nextPoster]) {
            if (poster) new Image().src = poster;
        }
    }, [prevPoster, nextPoster]);

    const scrub = (e: React.PointerEvent<HTMLDivElement>) => {
        const bar = barRef.current;
        const v = videoRef.current;
        if (!bar || !v || !v.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
        v.currentTime = ratio * v.duration;
        rewinding.current = false;
        progress.set(ratio);
        setSeconds(Math.floor(v.currentTime));
        wakeControls();
    };

    const onTouchStart = (e: React.TouchEvent) => {
        wakeControls();
        const t = e.touches[0];
        const onControls = e.target instanceof Element && e.target.closest('[data-no-swipe]');
        touchStart.current = e.touches.length === 1 && !onControls ? { x: t.clientX, y: t.clientY } : null;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy)) advance(dx < 0 ? 1 : -1);
        else if (portrait && Math.abs(dy) >= 48) advance(dy < 0 ? 1 : -1);
    };

    const plateVisible = controlsVisible || paused;
    const upNext = nextFilm !== null && duration > UP_NEXT_LEAD * 2 && duration - seconds <= UP_NEXT_LEAD;

    if (!client) return null;

    return createPortal(
        <AnimatePresence>
            {open && current && (
                <motion.div
                    key="film-theater"
                    ref={rootRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={label}
                    tabIndex={-1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`fixed inset-0 z-[100] overflow-hidden bg-black outline-none touch-none select-none ${controlsVisible ? '' : 'cursor-none'}`}
                    onClick={onClose}
                    onPointerMove={wakeControls}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* House light and vignette */}
                    <canvas
                        ref={canvasRef}
                        aria-hidden
                        className="hidden md:block absolute inset-0 w-full h-full scale-125 blur-[120px] saturate-150 brightness-[0.4] opacity-70 pointer-events-none"
                    />
                    <div aria-hidden className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />

                    {/* Portrait catalog: the neighbouring films wait in the dark either side */}
                    {portrait && prevFilm && <Ghost film={prevFilm} side="left" onSelect={() => advance(-1)} />}
                    {portrait && nextFilm && count > 2 && <Ghost film={nextFilm} side="right" onSelect={() => advance(1)} />}

                    {/* The frame, with its marquee directly beneath */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 md:gap-6 p-3">
                        <motion.div
                            initial={{ opacity: 0, y: 18, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                            className={`relative rounded-lg overflow-hidden bg-[#0B0B0E] border border-white/10 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.95)] ${portrait ? '' : 'w-[min(calc(100vw-1.5rem),118vh)] md:w-[min(86vw,118vh)]'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Marking
                                left={<Roll value={`McPrime Digital · ${marking(current)}`} travel={travel} delay={0.2} />}
                                right={
                                    <>
                                        <span>Film&nbsp;</span>
                                        <Roll value={pad(index + 1)} travel={travel} delay={0.2} />
                                        <span>&nbsp;/ {pad(count)}</span>
                                    </>
                                }
                            />

                            <div className={portrait ? 'flex items-stretch' : ''}>
                                {portrait ? <Perforations axis="y" offset={strip} /> : <Perforations axis="x" offset={strip} />}

                                {/* The gate */}
                                <div
                                    ref={screenRef}
                                    className={`relative overflow-hidden bg-black ${portrait ? 'h-[62vh] md:h-[70vh] aspect-[9/16]' : 'aspect-video'}`}
                                >
                                    <AnimatePresence initial={false} custom={travel}>
                                        <Reel
                                            key={`${index}:${current.src}`}
                                            film={current}
                                            delay={advanced && !reduced ? ADVANCE * 0.8 : 0}
                                            travel={travel}
                                            timing={timing}
                                            muted={muted}
                                            register={register}
                                            onSoundBlocked={onSoundBlocked}
                                            onBlocked={onBlocked}
                                            events={{
                                                onToggle: togglePlay,
                                                onPlay: () => { setPlaying(true); setPaused(false); wakeControls(); },
                                                onPause: (v) => {
                                                    // A film that ran out is about to hand over to the next, not paused
                                                    if (v.ended) return;
                                                    setPlaying(false);
                                                    setPaused(true);
                                                    setControlsVisible(true);
                                                },
                                                onWaiting: () => setBuffering(true),
                                                onReady: () => setBuffering(false),
                                                onDuration: setDuration,
                                                onSecond: setSeconds,
                                                onEnded: () => advance(1),
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Waiting and paused states: the spinner only appears if the wait is noticeable */}
                                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                        <AnimatePresence>
                                            {buffering ? (
                                                <motion.span
                                                    key="waiting"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.3 } }}
                                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                    className="w-9 h-9 rounded-full border-[1.5px] border-white/15 border-t-white/80 animate-spin"
                                                />
                                            ) : paused ? (
                                                <motion.span
                                                    key="paused"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 1.06 }}
                                                    transition={{ duration: 0.3, ease: EASE_OUT }}
                                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center"
                                                >
                                                    <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" />
                                                </motion.span>
                                            ) : null}
                                        </AnimatePresence>
                                    </div>

                                    {/* Up next: announced in the last seconds, fills as the film runs out */}
                                    <AnimatePresence>
                                        {upNext && nextFilm && (
                                            <motion.button
                                                key="up-next"
                                                type="button"
                                                data-no-swipe
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 6 }}
                                                transition={{ duration: 0.45, ease: EASE_OUT }}
                                                onClick={(e) => { e.stopPropagation(); advance(1); }}
                                                aria-label={`Play next: ${nextFilm.title}`}
                                                className={`absolute z-20 bottom-[4.25rem] md:bottom-[4.75rem] flex items-center gap-3 overflow-hidden rounded-lg border border-white/10 bg-black/70 md:bg-black/55 md:backdrop-blur-xl p-2 pr-4 text-left transition-colors hover:border-white/25 ${portrait ? 'inset-x-3' : 'right-3 md:right-4 max-w-[calc(100%-1.5rem)] md:max-w-xs'}`}
                                            >
                                                <span className={`relative shrink-0 overflow-hidden rounded bg-[#0B0B0E] ${portrait ? 'w-9 aspect-[9/16]' : 'w-20 aspect-video'}`}>
                                                    {nextFilm.poster && (
                                                        // Posters are pre-sized JPEGs from the media CDN; the image optimizer would only spend quota
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={nextFilm.poster} alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
                                                    )}
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block text-[9px] font-mono tracking-[0.25em] uppercase text-white/45">Up next</span>
                                                    <span className="block truncate text-sm font-semibold text-white">{nextFilm.title}</span>
                                                </span>
                                                <motion.span style={{ scaleX: upNextFill }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#2D6BFF]" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {/* Transport */}
                                    <motion.div
                                        data-no-swipe
                                        animate={{ opacity: plateVisible ? 1 : 0, y: plateVisible ? 0 : 8 }}
                                        transition={{ duration: 0.35, ease: EASE_OUT }}
                                        className={`absolute bottom-0 inset-x-0 z-10 px-3 md:px-4 pb-2 md:pb-2.5 pt-14 bg-gradient-to-t from-black/90 to-transparent ${plateVisible ? '' : 'pointer-events-none'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            ref={barRef}
                                            className="group/bar relative h-5 flex items-center cursor-pointer touch-none"
                                            onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); scrub(e); }}
                                            onPointerMove={(e) => { if (e.buttons > 0) scrub(e); }}
                                        >
                                            <div className="relative w-full h-[3px] bg-white/15 rounded-full overflow-hidden transition-[height] group-hover/bar:h-[5px]">
                                                <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-[#2D6BFF]" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <button type="button" onClick={togglePlay} className="p-1.5 text-white hover:text-[#2D6BFF] transition-colors" aria-label={playing ? 'Pause' : 'Play'}>
                                                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                            </button>
                                            <button type="button" onClick={toggleMute} className="p-1.5 text-white/60 hover:text-white transition-colors" aria-label={muted ? 'Unmute' : 'Mute'}>
                                                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                            </button>
                                            <span className="text-[10px] md:text-[11px] font-mono text-white/50 tabular-nums">
                                                {formatTime(seconds)} / {formatTime(duration)}
                                            </span>
                                            <div className="flex-1" />
                                            <button type="button" onClick={toggleFullscreen} className="p-1.5 text-white/60 hover:text-white transition-colors" aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                                                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>

                                {portrait ? <Perforations axis="y" offset={strip} /> : <Perforations axis="x" offset={strip} />}
                            </div>

                            <Marking
                                left={<Roll value={current.title} travel={travel} delay={0.26} />}
                                right={<Roll value={duration > 0 ? `Runtime ${formatTime(duration)}` : ''} travel={travel} />}
                            />
                        </motion.div>

                        {/* Marquee */}
                        <motion.div
                            animate={{ opacity: plateVisible ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex w-full max-w-2xl flex-col items-center px-6 text-center pointer-events-none"
                        >
                            <Roll
                                value={`${kicker(current)} · ${pad(index + 1)}/${pad(count)}`}
                                travel={travel}
                                delay={0.18}
                                className="mb-1 text-[#2D6BFF] text-[10px] tracking-[0.25em] font-mono uppercase"
                            />
                            <h2 className="flex max-w-full justify-center text-white text-xl md:text-2xl font-black tracking-tight leading-tight">
                                <Roll value={current.title} travel={travel} delay={0.24} />
                            </h2>
                            <p className="mt-1 hidden md:flex max-w-full justify-center text-gray-500 text-sm">
                                <Roll value={current.subtitle ?? ''} travel={travel} delay={0.3} />
                            </p>
                        </motion.div>
                    </div>

                    {/* Prev / Next */}
                    {count > 1 && (
                        <>
                            <motion.button
                                type="button"
                                animate={{ opacity: controlsVisible ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => { e.stopPropagation(); advance(-1); }}
                                aria-label="Previous film"
                                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                type="button"
                                animate={{ opacity: controlsVisible ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => { e.stopPropagation(); advance(1); }}
                                aria-label="Next film"
                                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </>
                    )}

                    {/* Close */}
                    <motion.button
                        type="button"
                        animate={{ opacity: controlsVisible ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        aria-label="Close"
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
