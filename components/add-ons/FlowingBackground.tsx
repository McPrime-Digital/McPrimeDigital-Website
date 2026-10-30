import type { CSSProperties } from 'react';

// Orbs are gradient glows (no GPU blur or blend) and every loop is CSS that runs on desktop only:
// on phones the hero holds still, which is what keeps them cool.
export default function FlowingBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#020408]">
            <style>{`@keyframes thread { 0%, 100% { transform: translate(-200px, 0); } 50% { transform: translate(0, 30px); } }`}</style>
            {/* Deep Base Layer - Slightly Brighter */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black to-black opacity-90" />

            {/* Wavy Threads Layer - Faint Undulating Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    {[...Array(5)].map((_, i) => (
                        <path
                            key={i}
                            d={`M-100,${100 + i * 150} C300,${50 + i * 150} 600,${200 + i * 150} 1200,${100 + i * 150} S1800,${i * 200} 2200,${100 + i * 150}`}
                            fill="none"
                            stroke="url(#threadGradient)"
                            strokeWidth="1"
                            className="md:animate-[thread_var(--thread-duration)_ease-in-out_infinite]"
                            style={{ '--thread-duration': `${15 + i * 5}s` } as CSSProperties}
                        />
                    ))}
                </svg>
            </div>


            {/* Organic Flowing Orbs */}
            <div className="absolute top-[-10%] left-[-10%] -ml-[10vw] -mt-[10vw] w-[80vw] h-[80vw] bg-radial from-blue-600/30 to-transparent to-70% opacity-50 md:animate-[orb-drift_15s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-10%] right-[-10%] -mr-[12vw] -mb-[12vw] w-[94vw] h-[94vw] bg-radial from-purple-600/25 to-transparent to-70% opacity-40 md:animate-[orb-drift_20s_ease-in-out_2s_infinite_reverse]" />
            <div className="absolute top-[20%] left-[20%] -ml-[8vw] -mt-[8vw] w-[56vw] h-[56vw] bg-radial from-cyan-600/25 to-transparent to-70% opacity-30 md:animate-[orb-drift_10s_ease-in-out_infinite]" />

            {/* Texture Noise Overlay - Kept subtle (desktop: a blend layer over the whole hero) */}
            <div className="hidden md:block absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        </div>
    );
}
