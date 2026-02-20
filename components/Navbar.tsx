'use client';

import { usePathname } from 'next/navigation';

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
                <a href="/">
                    <img src="/logo.png" alt="McP DIGITAL" className="h-8 md:h-10 w-auto max-w-[200px]" />
                </a>
            </div>

            <div className="pointer-events-auto flex gap-4">
                {/* On Filmmaking page, only show Home button to keep it distraction-free */}
                {isFilmmaking ? (
                    <a href="/">
                        <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">HOME</Button>
                    </a>
                ) : (
                    <>
                        <div className={`gap-4 ${isHome ? 'hidden' : 'hidden md:flex'}`}>
                            <a href="/">
                                <Button variant="glass" className="text-white hover:text-indigo-400">Home</Button>
                            </a>
                            {/* Add more standard links here for other pages in the future */}
                            <a href="/about">
                                <Button variant="glass" className="text-white hover:text-indigo-400">About</Button>
                            </a>
                        </div>
                        {/* Mobile Nav Toggle */}
                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </>
                )}
            </div>
        </motion.nav>
    );
}
