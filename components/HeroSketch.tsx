'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/Button';
import InViewVideo from './media/InViewVideo';
import { usePauseOffscreen } from '@/lib/usePauseOffscreen';

export default function HeroSketch() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const loopsRef = usePauseOffscreen<HTMLDivElement>();

    // Video logic simplified - just standard HTML5 video tag


    const springConfig = { damping: 50, stiffness: 400 };
    // Reduced movement range for "classy" feel
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);


    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXPct = (e.clientX - rect.left) / width - 0.5;
            const mouseYPct = (e.clientY - rect.top) / height - 0.5;
            mouseX.set(mouseXPct);
            mouseY.set(mouseYPct);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[90vh] w-full flex flex-col items-center overflow-hidden" // Full width; spacing to the next section lives inside so the backdrop fades out seamlessly
        >
            {/* Background Video Layer - Full Width.
                The whole backdrop (base tone, video and tint) is masked so it dissolves into the page
                background along the bottom half. Nothing is drawn over the copy, and there is no hard
                edge where the hero ends: the next section starts on the same stage. */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 [mask-image:linear-gradient(to_bottom,black_52%,transparent_100%)]">
                {/* The blur is baked into this encode, so no GPU backdrop filter runs over a full-screen video */}
                <InViewVideo
                    src="/compressed_videos/homepage-hero-bg.mp4"
                    poster="/compressed_videos/homepage-hero-bg.jpg"
                    eager
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black/55 z-10" />
            </div>

            {/* Content Wrapper - Constrained Width */}
            <div ref={loopsRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center pt-10 pb-14 md:pb-20">
                {/* Top Row: Logo - AI - About */}
                <div className="flex justify-center items-center w-full mb-8 md:mb-12 relative z-20">
                    {/* Logo Image - Absolute Left (Hidden on Mobile, handled by Navbar) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:flex absolute left-0 items-center"
                    >
                        <Image src="/logo.png" alt="McPrime Digital" width={160} height={40} priority className="h-10 w-auto" />
                    </motion.div>

                    {/* Central AI Node - Video with Mask and Glass Effect */}
                    <motion.div
                        style={{ x, y }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative z-50 group mt-16 md:mt-0"
                    >
                        {/* Glass Circle Container - Reduced Size. Its fill is opaque, so a backdrop blur or a
                            screen blend over it would cost the GPU without changing a pixel. */}
                        <div
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center relative rounded-full border border-white/10 bg-[#0B0F19] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            style={{ isolation: 'isolate', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                        >
                            <InViewVideo
                                src="/compressed_videos/hero-robot.mp4"
                                poster="/compressed_videos/hero-robot.jpg"
                                eager
                                className="w-full h-full object-cover opacity-80 rounded-full"
                            />
                        </div>
                    </motion.div>

                    {/* About Button - Absolute Right (Hidden on Mobile, handled by Navbar) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block absolute right-0"
                    >
                        <Link href="/about">
                            <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">ABOUT</Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Connection Lines (Desktop) - Mathematically aligned to Grid fractions.
                    The two departments hang from the trunk; Add-ons is not on the main tree and is
                    reached only from Filmmaking, the department it extends. */}
                <div className="hidden md:block relative w-full h-32 mb-6 -mt-20 z-0 px-4 md:px-20">
                    <svg className="w-full h-full overflow-visible">
                        {/* Left Branch: Filmmaking */}
                        <motion.line
                            x1="16.67%" y1="93.75%" x2="16.67%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />
                        <motion.line
                            x1="16.67%" y1="80%" x2="50%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Right Branch: Automations */}
                        <motion.line
                            x1="83.33%" y1="93.75%" x2="83.33%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />
                        <motion.line
                            x1="83.33%" y1="80%" x2="50%" y2="80%"
                            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />

                        {/* Intersection to AI (Trunk) */}
                        <motion.line
                            x1="50%" y1="80%" x2="50%" y2="-20%"
                            stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                        />
                    </svg>
                </div>

                {/* Department nodes. Desktop: Filmmaking, Add-ons, Automations in one row. Phones: the two
                    departments side by side under the robot, with Add-ons beneath Filmmaking. */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 md:gap-0 w-full relative z-10 px-4 md:px-20 mb-20 mt-10 md:-mt-8">
                    {/* Phone lines: robot trunk, split to both departments (column centres sit at 25% and 75%) */}
                    <svg className="md:hidden absolute left-4 -top-[88px] h-[88px] w-[calc(100%-2rem)] overflow-visible" aria-hidden>
                        <motion.line x1="50%" y1="0" x2="50%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
                        <motion.line x1="50%" y1="50%" x2="25%" y2="50%" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                        <motion.line x1="50%" y1="50%" x2="75%" y2="50%" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                        <motion.line x1="25%" y1="50%" x2="25%" y2="100%" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.75 }} />
                        <motion.line x1="75%" y1="50%" x2="75%" y2="100%" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.75 }} />
                    </svg>

                    <div className="col-start-1 row-start-1 px-1.5 md:px-4 relative">
                        <ServiceBox title="FILMMAKING" kicker="Department" accent="#2D6BFF" delay={0.2} href="/filmmaking" />
                    </div>

                    <div className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 px-1.5 md:px-4 relative">
                        {/* Filmmaking to Add-ons: from above on phones, from the left on desktop */}
                        <div className="md:hidden absolute left-1/2 -translate-x-1/2 -top-8 h-8 w-[1.5px]">
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.3, delay: 1.1 }}
                                className="w-full h-full origin-top bg-white/30"
                            />
                        </div>
                        <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[1.5px] -translate-y-1/2">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.5, delay: 1.3 }}
                                className="w-full h-full origin-left bg-white/30"
                            />
                        </div>
                        <ServiceBox title="ADD-ONS" kicker="Extensions" accent="#2D6BFF" connect="left" delay={0.4} href="/add-ons" />
                    </div>

                    <div className="col-start-2 row-start-1 md:col-start-3 px-1.5 md:px-4 relative">
                        <ServiceBox title="AUTOMATIONS" kicker="Department" accent="#22D3EE" delay={0.3} href="/automations" />
                    </div>
                </div>

                {/* Hero Content Area: a CSS entrance, so the headline paints with the page instead of after JavaScript */}
                <div className="text-center max-w-6xl mx-auto relative z-20 md:-mt-8 animate-rise [animation-delay:500ms]">
                    {/* Headline: Responsive Wrap */}
                    <h1 className="mb-8 leading-tight tracking-tight font-serif uppercase max-w-7xl mx-auto flex flex-col gap-2">
                        {/* 3D lettering: perfectly straight, depth built as a straight-down extrusion */}
                        <span className="relative block mb-2 text-5xl md:text-7xl lg:text-8xl font-black !font-serif">
                            <style>{`@keyframes heroShine { 0% { background-position: 220% 0; } 55%, 100% { background-position: -120% 0; } }`}</style>
                            {/* Aura behind the letterforms */}
                            <span
                                aria-hidden
                                className="absolute inset-0 !font-serif text-transparent bg-clip-text bg-gradient-to-b from-cyan-300/70 via-white/35 to-blue-500/35 blur-[18px] opacity-70 select-none"
                            >
                                ARCHITECTS OF
                            </span>
                            {/* Extrusion: stacked layers stepping straight down, darkening into depth */}
                            {['#4d5c70', '#435063', '#3a4656', '#313c4a', '#28323f', '#202835', '#19202b', '#131922', '#0e131a', '#0a0d13'].map((color, i) => (
                                <span
                                    key={i}
                                    aria-hidden
                                    className="absolute inset-0 !font-serif select-none"
                                    style={{ color, transform: `translateY(${1.2 * (i + 1)}px)` }}
                                >
                                    ARCHITECTS OF
                                </span>
                            ))}
                            {/* Soft ground shadow beneath the extrusion */}
                            <span
                                aria-hidden
                                className="absolute inset-0 !font-serif select-none text-black/70 blur-[6px]"
                                style={{ transform: 'translateY(16px)' }}
                            >
                                ARCHITECTS OF
                            </span>
                            {/* Glass surface */}
                            <span
                                className="relative !font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100/95 to-slate-400/55"
                                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
                            >
                                ARCHITECTS OF
                            </span>
                            {/* Specular light sweep across the glass (desktop only: it repaints the headline every frame) */}
                            <span
                                aria-hidden
                                className="hidden md:block absolute inset-0 !font-serif text-transparent bg-clip-text select-none pointer-events-none animate-[heroShine_5.5s_ease-in-out_infinite]"
                                style={{
                                    backgroundImage: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.9) 50%, transparent 70%)',
                                    backgroundSize: '250% 100%',
                                }}
                            >
                                ARCHITECTS OF
                            </span>
                        </span>
                        <span className="block !font-serif text-2xl md:text-4xl lg:text-5xl font-bold">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 !font-serif block md:inline">
                                AI-NATIVE FILM
                            </span>
                            <span className="block md:inline mt-1 md:mt-0">
                                <span className="text-white/60 text-[0.6em] font-normal align-middle mx-3 md:mx-4">&</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 !font-serif">
                                    AUTOMATION SYSTEMS
                                </span>
                            </span>
                        </span>
                    </h1>

                    <p className="text-gray-200/90 text-base md:text-lg italic max-w-4xl mx-auto font-light leading-relaxed mt-6 mb-8">
                        From first treatment to final conform, every picture from our Filmmaking Department moves through a governed, AI-native and hybrid pipeline built to broadcast standard. Our Automations Department, a separate practice, builds the systems that carry scheduling, workflows, and delivery inside client operations. Two decades of set discipline, re-engineered as infrastructure: the work arrives faster, cleaner, and fully accountable.
                    </p>
                </div>
            </div>

        </section>
    );
}

interface ServiceBoxProps {
    title: string;
    /** Small label above the title */
    kicker: string;
    /** Department colour, used for the connector dot and the hover light */
    accent: string;
    delay: number;
    href: string;
    /** Where the line from the tree meets the box: the top, or (Add-ons on desktop) the left side */
    connect?: 'top' | 'left';
}

function ServiceBoxContent({ title, kicker, accent, connect = 'top' }: Omit<ServiceBoxProps, 'delay' | 'href'>) {
    const dot = { background: accent, boxShadow: `0 0 12px ${accent}` };
    return (
        <>
            {/* Connector dot where the line meets the box */}
            <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-80 z-10 animate-[node-pulse_2s_ease-in-out_infinite] ${connect === 'left' ? 'md:hidden' : ''}`}
                style={dot}
            />
            {connect === 'left' && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-80 z-10 animate-[node-pulse_2s_ease-in-out_infinite]" style={dot} />
            )}
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{ background: `${accent}33` }} />
            <div className="relative px-3 py-4 md:p-8 rounded-xl text-center border transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white">
                <span className="block font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-1.5 md:mb-2" style={{ color: accent }}>{kicker}</span>
                <span className="block text-[13px] md:text-base font-black tracking-[0.14em] md:tracking-[0.2em]">{title}</span>
            </div>
        </>
    );
}

function ServiceBox({ delay, href, ...content }: ServiceBoxProps) {
    return (
        <div className="group relative animate-rise" style={{ animationDelay: `${delay}s` }}>
            <Link href={href} className="block h-full">
                <ServiceBoxContent {...content} />
            </Link>
        </div>
    );
}
