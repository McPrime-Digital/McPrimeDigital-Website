'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';
import { GENRELINE } from '@/lib/site';
import { warmOrigins } from '@/lib/warmOrigins';

const warmGenreline = () => warmOrigins(GENRELINE.url, GENRELINE.login);

/**
 * Homepage pointer to the client portal. The full Genreline story lives on the filmmaking
 * page, where the portal is used; this row keeps the login one tap away for clients and
 * carries the ownership line wherever Genreline is named.
 */
export default function PlatformStrip() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={warmGenreline}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 p-6 md:p-8 rounded-3xl border border-[#CBA54D]/15 bg-gradient-to-r from-[#1a1508]/50 via-black/40 to-black/50 overflow-hidden"
        >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CBA54D]/50 to-transparent pointer-events-none" />
            <div className="absolute -top-[200px] -left-[120px] w-[520px] h-[520px] bg-radial from-[#CBA54D]/[0.08] to-transparent to-70% pointer-events-none" />

            <div className="relative flex items-start gap-4 flex-1">
                <Image src="/platform/genreline-mark-gold.png" alt="" width={512} height={407} className="h-7 md:h-8 w-auto mt-1 shrink-0" />
                <div>
                    <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#CBA54D]/80 mb-2">Client portal</p>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                        The McPrime client portal runs on Genreline.
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed mt-2 max-w-2xl">
                        Film and content clients review, approve and sign off in one place. Genreline is separately managed infrastructure, developed and operated by our sister software company under common ownership.
                    </p>
                </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-3 shrink-0 lg:pl-0 pl-11">
                <a
                    href={GENRELINE.login}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerEnter={warmGenreline}
                    onFocus={warmGenreline}
                    onTouchStart={warmGenreline}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold tracking-wide text-black bg-gradient-to-r from-[#E6CB7C] to-[#CBA54D] hover:from-[#F0D98F] hover:to-[#D6B15C] transition-colors"
                >
                    <LogIn className="w-4 h-4" />
                    Client login
                </a>
                <Link
                    href="/filmmaking#platform"
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold tracking-wide text-white/90 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-colors"
                >
                    How it works
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </motion.section>
    );
}
