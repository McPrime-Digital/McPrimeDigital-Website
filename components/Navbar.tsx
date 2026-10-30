'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none animate-[fade-in_0.8s_ease-out_both]">
            <div className={`pointer-events-auto rounded-full px-4 md:px-6 py-2 bg-slate-950/70 backdrop-blur-md ring-1 ring-inset ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${isHome ? 'md:hidden' : ''}`}>
                <Link href="/">
                    <Image src="/logo.png" alt="McP DIGITAL" width={200} height={40} priority className="h-7 md:h-10 w-auto max-w-[200px]" />
                </Link>
            </div>

            <div className="pointer-events-auto flex gap-4 items-center">
                {isFilmmaking ? (
                    <>
                        {/* Filmmaking Page: Show HOME and ABOUT on desktop, Burger Menu on mobile */}
                        <div className="hidden md:flex gap-4">
                            <Link href="/">
                                <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">HOME</Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm">ABOUT</Button>
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </>
                ) : isHome ? (
                    <>
                        {/* Homepage: HeroSketch handles Desktop Nav entirely. Only show ABOUT on mobile. */}
                        <div className="md:hidden">
                            <Link href="/about">
                                <Button variant="outline" className="text-xs px-4 py-2 border-white/15 bg-slate-950/70 hover:bg-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]">ABOUT</Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Other Pages: Standard Desktop Links + Mobile Nav */}
                        <div className="hidden md:flex gap-4">
                            <Link href="/">
                                <Button variant="glass" className="text-white hover:text-indigo-400">Home</Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="glass" className="text-white hover:text-indigo-400">About</Button>
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
