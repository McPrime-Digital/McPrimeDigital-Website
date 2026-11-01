'use client';

import { AnimatePresence, animate, motion, useMotionValue, type AnimationPlaybackControls } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useSyncExternalStore,
    type CSSProperties,
    type ReactNode,
    type Ref,
} from 'react';
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

/** A film in the gate. One that is leaving keeps playing under the change and is dropped once it has left. */
interface Shot {
    id: number;
    film: TheaterFilm;
    leaving: boolean;
    /** Seconds the poster holds before the film rolls */
    delay: number;
}

/**
 * A lightly damped spring baked into a CSS linear() curve, so the compositor can run it: a quick
 * departure, a long soft arrival and a barely visible settle (about 1.5% overshoot).
 */
function springCurve(damping: number, samples = 60) {
    const w = 6.9 / damping; // the envelope has decayed to 0.1% by the end
    const wd = w * Math.sqrt(1 - damping * damping);
    const points: string[] = [];
    for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const v = i === samples ? 1 : 1 - Math.exp(-damping * w * t) * (Math.cos(wd * t) + ((damping * w) / wd) * Math.sin(wd * t));
        points.push(v.toFixed(4));
    }
    return `linear(${points.join(', ')})`;
}

// The change of film is one gesture, run entirely on the compositor so nothing the page is doing can
// stall it: the picture pulls back from the gate, the strip glides to the next film on a spring with
// the perforations travelling alongside, and the picture settles back into the gate.
const LIFT = 0.9;
const LIFT_MS = 1000;
const SLIDE = { delay: 80, duration: 820 };
const SPRING = springCurve(0.8);
/** Dark leader between two films on the strip, in px */
const LEADER = 28;
/** When the new film starts rolling, once it has landed */
const START_DELAY = 0.85;
/** Reduced motion: a plain crossfade */
const FADE_MS = 350;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Seconds before the end that the next film is announced */
const UP_NEXT_LEAD = 6;
/** Perforation pitch in px, and how far the perforated strip runs past the gate at each end */
const PITCH = { x: 36, y: 44 } as const;
const STRIP_RUN = 4000;

const perforation = (w: number, h: number, x: number, y: number, size: number, height: number) =>
    `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
            `<rect x='${x}' y='${y}' width='${size}' height='${height}' rx='3' fill='#000' stroke='#fff' stroke-opacity='.13'/>` +
            `<path d='M${x + 3} ${y + 1.2}h${size - 6}' stroke='#fff' stroke-opacity='.08'/></svg>`
    )}")`;
const HOLES_X = perforation(36, 28, 10.5, 8.5, 15, 11);
const HOLES_Y = perforation(36, 44, 10.5, 14.5, 15, 15);

function formatTime(seconds: number) {
    if (!isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Fades a film's sound rather than cutting it. Browsers that fix the volume (iOS) simply ignore it. */
function fadeVolume(video: HTMLVideoElement, to: number, duration: number, then?: () => void): AnimationPlaybackControls {
    return animate(video.volume, to, {
        duration,
        ease: 'easeInOut',
        onUpdate: (level) => { video.volume = level; },
        onComplete: then,
    });
}

/** Where an element currently is, including any animation in flight */
function liveMatrix(el: HTMLElement) {
    const t = getComputedStyle(el).transform;
    return t === 'none' ? new DOMMatrixReadOnly() : new DOMMatrixReadOnly(t);
}

const subscribeNever = () => () => undefined;

/** Text that rolls to its next value like a split-flap marking. Runs as CSS animation (globals.css: .roll). */
function Roll({ value, dir, delay = 0, className = '' }: { value: string; dir: Step; delay?: number; className?: string }) {
    const [items, setItems] = useState(() => [{ key: 0, value, leaving: false, fresh: false }]);
    const [shown, setShown] = useState(value);
    if (value !== shown) {
        setShown(value);
        setItems((prev) => [
            ...prev.filter((i) => !i.leaving).map((i) => ({ ...i, leaving: true })),
            { key: prev[prev.length - 1].key + 1, value, leaving: false, fresh: true },
        ]);
    }
    const style = { '--roll-dir': dir, '--roll-delay': `${delay}ms` } as CSSProperties;
    return (
        <span className={`roll grid min-w-0 overflow-hidden ${className}`} style={style}>
            {items.map((i) => (
                <span
                    key={i.key}
                    aria-hidden={i.leaving || undefined}
                    className={`col-start-1 row-start-1 truncate ${i.leaving ? 'roll-out' : i.fresh ? 'roll-in' : ''}`}
                    onAnimationEnd={i.leaving ? () => setItems((p) => p.filter((x) => x.key !== i.key)) : undefined}
                >
                    {i.value || ' '}
                </span>
            ))}
        </span>
    );
}

/** Perforated film edge. A long strip drawn as a repeating image, so it can travel with the picture at no cost. */
function Perforations({ axis, stripRef }: { axis: 'x' | 'y'; stripRef: Ref<HTMLDivElement> }) {
    return axis === 'x' ? (
        <div aria-hidden className="relative h-6 md:h-7 overflow-hidden bg-[#0B0B0E]">
            <div
                ref={stripRef}
                className="absolute inset-y-0 will-change-transform"
                style={{ left: -STRIP_RUN, right: -STRIP_RUN, backgroundImage: HOLES_X, backgroundSize: `${PITCH.x}px 100%`, backgroundRepeat: 'repeat-x' }}
            />
        </div>
    ) : (
        <div aria-hidden className="relative w-7 md:w-9 shrink-0 overflow-hidden bg-[#0B0B0E] border-x border-black">
            <div
                ref={stripRef}
                className="absolute inset-x-0 will-change-transform"
                style={{ top: -STRIP_RUN, bottom: -STRIP_RUN, backgroundImage: HOLES_Y, backgroundSize: `100% ${PITCH.y}px`, backgroundRepeat: 'repeat-y' }}
            />
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
    /** False once the film is leaving the gate: it stops reporting to the controls and its sound fades */
    live: boolean;
    delay: number;
    muted: boolean;
    register: (video: HTMLVideoElement) => void;
    onSoundBlocked: () => void;
    onBlocked: () => void;
    events: ReelEvents;
}

/**
 * The film itself. Its poster holds until the film has landed in the gate and then dissolves into
 * the moving picture; its sound rises as it starts and fades as it leaves.
 */
function Reel({ film, live, delay, muted, register, onSoundBlocked, onBlocked, events }: ReelProps) {
    const video = useRef<HTMLVideoElement | null>(null);
    const rise = useRef<AnimationPlaybackControls | null>(null);
    const [startDelay] = useState(delay);
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
        const v = video.current;
        if (!v) return;
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
        if (live || !v) return;
        rise.current?.stop();
        const fall = fadeVolume(v, 0, 0.45, () => v.pause());
        return () => {
            fall.stop();
            v.pause();
        };
    }, [live]);

    const on = live ? events : undefined;

    return (
        <>
            <video
                ref={(el) => {
                    video.current = el;
                    if (el && live) register(el);
                }}
                src={film.src}
                poster={film.poster ?? undefined}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                playsInline
                preload="auto"
                muted={muted}
                onClick={on?.onToggle}
                onPlay={on?.onPlay}
                onPause={on ? (e) => on.onPause(e.currentTarget) : undefined}
                onWaiting={on?.onWaiting}
                onPlaying={() => { setRolling(true); on?.onReady(); }}
                onCanPlay={on?.onReady}
                onLoadedMetadata={on ? (e) => on.onDuration(e.currentTarget.duration) : undefined}
                onTimeUpdate={on ? (e) => on.onSecond(Math.floor(e.currentTarget.currentTime)) : undefined}
                onEnded={on?.onEnded}
            />
            {film.poster && (
                // Posters are pre-sized JPEGs from the media CDN; the image optimizer would only spend quota
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={film.poster}
                    alt=""
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-contain bg-black pointer-events-none transition-opacity duration-700 ease-in-out ${rolling ? 'opacity-0' : 'opacity-100'}`}
                />
            )}
        </>
    );
}

/**
 * The film theater: house lights down, the film in a 35mm frame whose perforations and markings
 * travel with it. Changing film, by arrow, key, swipe or at the end of a film, advances the strip:
 * the picture pulls back from the gate, the next film glides in beside the last with the
 * perforations moving alongside, and settles into the gate while the markings roll over and the
 * sound crossfades. The final seconds of each film announce what plays next.
 */
export default function FilmTheater({ films, index, onClose, onNavigate, orientation, label, marking, kicker }: FilmTheaterProps) {
    const client = useSyncExternalStore(subscribeNever, () => true, () => false);
    const reduced = usePrefersReducedMotion();
    const portrait = orientation === 'portrait';

    const rootRef = useRef<HTMLDivElement>(null);
    const gateRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rewinding = useRef(false);
    const lastAdvance = useRef(0);
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const shotEls = useRef(new Map<number, HTMLDivElement>());
    const strips = useRef(new Set<HTMLDivElement>());
    const choreographed = useRef(0);

    const progress = useMotionValue(0);
    const upNextFill = useMotionValue(0);

    const [dir, setDir] = useState<Step>(1);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [buffering, setBuffering] = useState(true);
    const [duration, setDuration] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [shots, setShots] = useState<Shot[]>([]);
    const [serial, setSerial] = useState(0);

    const open = index !== null;
    const count = films.length;
    const current = open ? films[index] : null;

    // A new film enters the gate: state is adjusted during render when the selected film changes
    const [shownIndex, setShownIndex] = useState<number | null>(null);
    if (index !== shownIndex) {
        setShownIndex(index);
        setBuffering(true);
        setDuration(0);
        setSeconds(0);
        setPaused(false);
        setControlsVisible(true);
        if (index === null) {
            setShots([]);
        } else {
            const id = serial + 1;
            const changing = shownIndex !== null;
            setSerial(id);
            setShots((prev) => [
                ...(changing ? prev.map((s) => ({ ...s, leaving: true })) : []),
                { id, film: films[index], leaving: false, delay: changing && !reduced ? START_DELAY : 0 },
            ]);
        }
    }

    const trackShot = useCallback((id: number, el: HTMLDivElement | null) => {
        if (el) shotEls.current.set(id, el);
        else shotEls.current.delete(id);
    }, []);
    const trackStrip = useCallback((el: HTMLDivElement | null) => {
        if (!el) return;
        const set = strips.current;
        set.add(el);
        return () => { set.delete(el); };
    }, []);
    const dropShot = useCallback((id: number) => setShots((prev) => prev.filter((s) => s.id !== id)), []);

    // The choreography of a change of film
    useLayoutEffect(() => {
        const incoming = shots[shots.length - 1];
        if (!incoming || incoming.id <= choreographed.current) return;
        choreographed.current = incoming.id;
        const leaving = shots.filter((s) => s.leaving);
        if (!leaving.length) return; // the first film rides in with the frame itself

        const inEl = shotEls.current.get(incoming.id);
        // The film that was in the gate (or still arriving) is the one that now leaves
        const outShot = leaving[leaving.length - 1];
        const outEl = shotEls.current.get(outShot.id);
        if (!inEl || !outEl) return;

        const outFrom = liveMatrix(outEl);
        const outOpacity = getComputedStyle(outEl).opacity;
        outEl.getAnimations().forEach((a) => a.cancel());
        const leave = (keyframes: Keyframe[], options: KeyframeAnimationOptions) =>
            outEl.animate(keyframes, options).finished.then(() => dropShot(outShot.id), () => undefined);

        if (reduced) {
            inEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: FADE_MS, easing: 'ease-out', fill: 'backwards' });
            leave([{ opacity: outOpacity }, { opacity: outOpacity }], { duration: FADE_MS, fill: 'forwards' });
            return;
        }

        const axis = portrait ? 'Y' : 'X';
        const along = (k: number) => `translate${axis}(calc(${k * 100}% + ${k * LEADER}px))`;
        const slide: KeyframeAnimationOptions = { delay: SLIDE.delay, duration: SLIDE.duration, easing: SPRING };

        inEl.animate([{ transform: along(dir), opacity: 0.55 }, { transform: 'none', opacity: 1 }], { ...slide, fill: 'backwards' });
        leave([{ transform: outFrom.toString(), opacity: outOpacity }, { transform: along(-dir), opacity: 0.35 }], { ...slide, fill: 'forwards' });

        // The picture pulls back from the gate for the journey and settles back in as it lands
        const stage = stageRef.current;
        if (stage) {
            const from = liveMatrix(stage).a;
            stage.getAnimations().forEach((a) => a.cancel());
            stage.animate(
                [
                    { transform: `scale(${from})`, easing: 'cubic-bezier(0.3, 0, 0.2, 1)' },
                    { transform: `scale(${LIFT})`, offset: 0.3 },
                    { transform: `scale(${LIFT})`, offset: 0.56, easing: 'cubic-bezier(0.45, 0, 0.15, 1)' },
                    { transform: 'scale(1)' },
                ],
                { duration: LIFT_MS }
            );
        }

        // The perforations travel as far as the picture appears to, in whole pitches so the strip never jumps
        const gate = gateRef.current;
        if (gate) {
            const pitch = portrait ? PITCH.y : PITCH.x;
            const size = portrait ? gate.offsetHeight : gate.offsetWidth;
            const travel = Math.round((LIFT * (size + LEADER)) / pitch) * pitch;
            for (const strip of strips.current) {
                const m = liveMatrix(strip);
                strip.getAnimations().forEach((a) => a.cancel());
                let from = (portrait ? m.f : m.e) + dir * travel;
                while (Math.abs(from) > STRIP_RUN) from -= Math.sign(from) * pitch;
                strip.animate([{ transform: `translate${axis}(${from}px)` }, { transform: 'none' }], { ...slide, fill: 'backwards' });
            }
        }
    }, [shots, dir, reduced, portrait, dropShot]);

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
        // A held key or a double click is one change, not a queue of them
        const now = performance.now();
        if (now - lastAdvance.current < 300) return;
        lastAdvance.current = now;
        setDir(step);
        wakeControls();
        // The progress line glides back to the start rather than snapping
        rewinding.current = true;
        animate(progress, 0, { duration: 0.6, ease: EASE_OUT, onComplete: () => { rewinding.current = false; } });
        upNextFill.set(0);
        onNavigate((((index + step) % count) + count) % count);
    }, [index, count, progress, upNextFill, onNavigate, wakeControls]);

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
            if (e.repeat && e.key.startsWith('Arrow')) return;
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
    // finger on iOS, and it takes no focus and no screen-reader attention. Once the house lights are
    // down it is not drawn either, so its blurs and loops cost nothing while films play.
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
        const visibility = behind.map((el) => el.style.visibility);
        const lightsDown = setTimeout(() => behind.forEach((el) => { el.style.visibility = 'hidden'; }), 600);
        const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        root?.focus({ preventScroll: true });
        progress.set(0);
        upNextFill.set(0);
        return () => {
            html.style.overflow = saved.html;
            body.style.overflow = saved.body;
            body.style.paddingRight = saved.padding;
            root?.removeEventListener('touchmove', holdStill);
            clearTimeout(lightsDown);
            behind.forEach((el, i) => {
                el.inert = false;
                el.style.visibility = visibility[i];
            });
            returnFocus?.focus({ preventScroll: true });
            // The sound fades with the house lights instead of cutting off
            const v = videoRef.current;
            if (v && !v.paused) fadeVolume(v, 0, 0.4, () => v.pause());
            if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
        };
    }, [open, progress, upNextFill]);

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

    // House light: the film's colours spill into the hall. The film is sampled into a 16x9 canvas that
    // the browser stretches across the screen, which is soft enough by itself, so no full-screen blur
    // has to be redrawn. Each sample only partly covers the last, so the light drifts between shots
    // and between films instead of jumping. Phones skip it: the film fills the screen there.
    useEffect(() => {
        if (!open || !window.matchMedia('(min-width: 768px)').matches) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        canvas.width = 16;
        canvas.height = 9;
        let lit = false;
        const interval = setInterval(() => {
            const v = videoRef.current;
            if (!v || v.readyState < 2) return;
            ctx.globalAlpha = lit ? 0.25 : 1;
            try {
                ctx.drawImage(v, 0, 0, 16, 9);
                lit = true;
            } catch {
                // decoder hiccup: the light holds
            }
        }, 200);
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
    const events: ReelEvents = {
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
    };

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
                        className="hidden md:block absolute -inset-[8%] w-[116%] h-[116%] saturate-150 brightness-[0.45] opacity-70 pointer-events-none"
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
                                left={<Roll value={`McPrime Digital · ${marking(current)}`} dir={dir} delay={120} />}
                                right={
                                    <>
                                        <span>Film&nbsp;</span>
                                        <Roll value={pad(index + 1)} dir={dir} delay={120} />
                                        <span>&nbsp;/ {pad(count)}</span>
                                    </>
                                }
                            />

                            <div className={portrait ? 'flex items-stretch' : ''}>
                                <Perforations axis={portrait ? 'y' : 'x'} stripRef={trackStrip} />

                                {/* The gate */}
                                <div
                                    ref={gateRef}
                                    className={`relative overflow-hidden bg-black ${portrait ? 'h-[62vh] md:h-[70vh] aspect-[9/16]' : 'aspect-video'}`}
                                >
                                    <div ref={stageRef} className="absolute inset-0 will-change-transform">
                                        {shots.map((shot) => (
                                            <div
                                                key={shot.id}
                                                ref={(el) => trackShot(shot.id, el)}
                                                className="absolute inset-0 will-change-transform"
                                                style={{ zIndex: shot.leaving ? 1 : 2 }}
                                            >
                                                <Reel
                                                    film={shot.film}
                                                    live={!shot.leaving}
                                                    delay={shot.delay}
                                                    muted={muted}
                                                    register={register}
                                                    onSoundBlocked={onSoundBlocked}
                                                    onBlocked={onBlocked}
                                                    events={events}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Waiting and paused states: the spinner only appears if the wait is noticeable */}
                                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                        <AnimatePresence>
                                            {buffering ? (
                                                <motion.span
                                                    key="waiting"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, transition: { delay: 1, duration: 0.3 } }}
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

                                <Perforations axis={portrait ? 'y' : 'x'} stripRef={trackStrip} />
                            </div>

                            <Marking
                                left={<Roll value={current.title} dir={dir} delay={180} />}
                                right={<Roll value={duration > 0 ? `Runtime ${formatTime(duration)}` : ''} dir={dir} />}
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
                                dir={dir}
                                delay={100}
                                className="mb-1 text-[#2D6BFF] text-[10px] tracking-[0.25em] font-mono uppercase"
                            />
                            <h2 className="flex max-w-full justify-center text-white text-xl md:text-2xl font-black tracking-tight leading-tight">
                                <Roll value={current.title} dir={dir} delay={160} />
                            </h2>
                            <p className="mt-1 hidden md:flex max-w-full justify-center text-gray-500 text-sm">
                                <Roll value={current.subtitle ?? ''} dir={dir} delay={220} />
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
                                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-[background-color,color,scale] active:scale-90"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                type="button"
                                animate={{ opacity: controlsVisible ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => { e.stopPropagation(); advance(1); }}
                                aria-label="Next film"
                                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-[background-color,color,scale] active:scale-90"
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
