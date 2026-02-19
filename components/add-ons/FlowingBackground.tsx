'use client';

import { motion } from 'framer-motion';

export default function FlowingBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#020408]">
            {/* Deep Base Layer - Slightly Brighter */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black to-black opacity-90" />

            {/* Wavy Threads Layer - NEW - Faint Undulating Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    {/* Multiple animated paths */}
                    {[...Array(5)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M-100,${100 + i * 150} C300,${50 + i * 150} 600,${200 + i * 150} 1200,${100 + i * 150} S1800,${i * 200} 2200,${100 + i * 150}`}
                            fill="none"
                            stroke="url(#threadGradient)"
                            strokeWidth="1"
                            initial={{ x: 0 }}
                            animate={{
                                x: [-200, 0, -200],
                                y: [0, 30, 0],
                            }}
                            transition={{
                                duration: 15 + i * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </svg>
            </div>


            {/* Organic Flowing Orbs - ENHANCED BRIGHTNESS/POP */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4], // Increased Opacity
                    rotate: [0, 45, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/30 blur-[100px] mix-blend-screen" // Brighter Blue
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3], // Increased Opacity
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/25 blur-[120px] mix-blend-screen" // Brighter Purple
            />

            <motion.div
                animate={{
                    scale: [0.8, 1, 0.8],
                    opacity: [0.2, 0.4, 0.2], // Increased Opacity
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/25 blur-[90px] mix-blend-screen" // Brighter Cyan
            />

            {/* Texture Noise Overlay - Kept subtle */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        </div>
    );
}
