import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';

const IMAGE_SRC = '/ai-hero-image.jpg';

export const HeroLoop = () => {
    const frame = useCurrentFrame();
    const { width, height, durationInFrames } = useVideoConfig();

    // 1. Breathing "Neon Halo" Glow
    // Oscillates smoothly using a sine wave
    const breath = Math.sin(frame / 20); // -1 to 1
    const glowOpacity = 0.4 + (breath + 1) * 0.15; // Maps to ~0.4 - 0.7
    const glowSpread = 20 + (breath + 1) * 10; // Maps to ~20px - 40px

    // 2. Waveform Particles
    // Generate static random starting positions, then animate them
    const particles = useMemo(() => {
        return new Array(40).fill(0).map((_, i) => ({
            id: i,
            angleOffset: (Math.PI * 2 * i) / 40,
            radiusBase: 180 + Math.random() * 50,
            speed: 0.02 + Math.random() * 0.02,
            size: 2 + Math.random() * 3,
            yOffset: Math.random() * 20
        }));
    }, []);

    return (
        <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>

            {/* Particles Layer (Behind) */}
            <div style={{ position: 'absolute' }}>
                <svg width={800} height={800} viewBox="-400 -400 800 800">
                    {particles.map((p) => {
                        // Orbit animation
                        const angle = p.angleOffset + frame * p.speed;
                        // Waveform motion (up/down sine wave added to orbit)
                        const r = p.radiusBase + Math.sin(frame * 0.05 + p.id) * 10;
                        const x = Math.cos(angle) * r;
                        const y = Math.sin(angle) * r + Math.sin(frame * 0.1 + p.id) * 10;

                        // Dimming effect based on position (faking 3D depth)
                        const zScale = Math.sin(angle) > 0 ? 1 : 0.6;
                        const zOpacity = Math.sin(angle) > 0 ? 0.8 : 0.3;

                        return (
                            <circle
                                key={p.id}
                                cx={x}
                                cy={y}
                                r={p.size * zScale}
                                fill="#22d3ee" // Cyan particles
                                opacity={zOpacity}
                                style={{ filter: 'blur(1px)' }}
                            />
                        );
                    })}
                </svg>
            </div>

            {/* AI Image Container with Halo */}
            <div
                style={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 10,
                    // The "Halo Neon" effect
                    boxShadow: `0 0 ${glowSpread}px rgba(6, 182, 212, ${glowOpacity}), 0 0 ${glowSpread * 2}px rgba(124, 58, 237, ${glowOpacity * 0.5})`,
                    transform: 'scale(1)', // Stable scale, no glitch jitter
                }}
            >
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                    <Img
                        src={IMAGE_SRC}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {/* Subtle rim light overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                }} />
            </div>

            {/* Particles Layer (Front - sparse) */}
            {/* Optional: Add a few foreground particles if needed, but keeping it simple for "Cinematic" focus */}

        </AbsoluteFill>
    );
};
