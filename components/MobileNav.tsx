'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Button from './ui/Button';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
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
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center p-8"
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
                            <Link href="/filmmaking" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                                FILMMAKING
                            </Link>
                            <Link href="/automations" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                                AUTOMATIONS
                            </Link>
                            <Link href="/add-ons" onClick={toggleMenu} className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                                ADD-ONS
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
