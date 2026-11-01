'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Apply scroll lock to body when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: "0%",
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <div className="md:hidden pointer-events-auto">
            <button onClick={toggleMenu} className="p-2 text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Menu className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-8"
                    >
                        <button onClick={toggleMenu} className="absolute top-6 right-6 p-2 text-white/70 hover:text-white">
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            <Link href="/" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                                HOME
                            </Link>
                            <Link href="/about" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                                ABOUT
                            </Link>
                            {/* The two departments; Add-ons extend Filmmaking, so they sit under it */}
                            <div className="flex items-center justify-center gap-3 pt-2 font-mono text-[10px] tracking-[0.35em] uppercase text-white/35">
                                <span className="h-px w-6 bg-white/20" /> Departments <span className="h-px w-6 bg-white/20" />
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <Link href="/filmmaking" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-[#2D6BFF] transition-colors">
                                    FILMMAKING
                                </Link>
                                <Link href="/add-ons" onClick={toggleMenu} className="text-base font-semibold tracking-[0.2em] text-white/55 hover:text-white transition-colors">
                                    ↳ ADD-ONS
                                </Link>
                            </div>
                            <Link href="/automations" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-[#22D3EE] transition-colors">
                                AUTOMATIONS
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
