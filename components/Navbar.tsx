'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import Button from './ui/Button';
import MobileNav from './MobileNav';

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isFilmmaking = pathname === '/filmmaking';

    // If on Home, we rely on HeroSketch's built-in nav for now to avoid duplication/clutter.
    // Use 'false' if you want to enforce Navbar overlay on Home.
    // if (isHome) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none"
        >
            <div className={`pointer-events-auto backdrop-blur-md px-6 py-2 rounded-full ${isHome ? 'md:hidden' : ''}`}>
                <Link href="/">
                    <Image src="/logo.png" alt="McP DIGITAL" width={200} height={40} priority className="h-8 md:h-10 w-auto max-w-[200px]" />
                </Link>
            </div>

            <div className="pointer-events-auto flex gap-4 items-center">
                {isFilmmaking ? (
                    <>
                        {/* Filmmaking Page: Show HOME and ABOUT on desktop, Burger Menu on mobile */}
                        <div className="hidden md:flex gap-4">
                            <a href="/">
                                <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">HOME</Button>
                            </a>
                            <a href="/about">
                                <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">ABOUT</Button>
                            </a>
                        </div>
                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </>
                ) : isHome ? (
                    <>
                        {/* Homepage: HeroSketch handles Desktop Nav entirely. Only show ABOUT on mobile. */}
                        <div className="md:hidden">
                            <a href="/about">
                                <Button variant="outline" className="text-xs px-4 py-2 border-white/20 hover:bg-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">ABOUT</Button>
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Other Pages: Standard Desktop Links + Mobile Nav */}
                        <div className="hidden md:flex gap-4">
                            <a href="/">
                                <Button variant="glass" className="text-white hover:text-indigo-400">Home</Button>
                            </a>
                            <a href="/about">
                                <Button variant="glass" className="text-white hover:text-indigo-400">About</Button>
                            </a>
                        </div>
                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </>
                )}
            </div>
        </motion.nav>
    );
}
