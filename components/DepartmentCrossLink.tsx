import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DEPARTMENTS, type Department } from '@/lib/departments';

const COPY: Record<Department, { question: string; line: string }> = {
    filmmaking: {
        question: 'Looking for films?',
        line: 'Commercials, brand films and AI ambassadors are made by our Filmmaking Department, a separate practice with its own team.',
    },
    automations: {
        question: 'Looking for automation systems?',
        line: 'Automation systems for your operations are built by our Automations Department, a separate practice with its own team.',
    },
};

/** Closing band on a department page that points to the other department, so it is clear they are separate. */
export default function DepartmentCrossLink({ to }: { to: Department }) {
    const d = DEPARTMENTS[to];
    const { question, line } = COPY[to];
    return (
        <section className="relative px-6 md:px-12 py-14 md:py-16 border-t border-white/5 overflow-hidden">
            <div
                aria-hidden
                className="absolute -bottom-64 right-0 w-[720px] h-[520px] pointer-events-none opacity-[0.12]"
                style={{ background: `radial-gradient(closest-side, ${d.accent}, transparent)` }}
            />
            <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <p className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: d.accent }}>
                        <span className="h-px w-6" style={{ background: d.accent }} />
                        Department {d.index} · {d.short}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-3">{question}</p>
                    <p className="text-gray-400 font-light leading-relaxed">{line}</p>
                </div>
                <Link
                    href={d.href}
                    className="group inline-flex shrink-0 items-center gap-3 self-start md:self-auto rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-white hover:border-white/35 hover:bg-white/[0.06] transition-colors"
                >
                    Visit {d.short}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: d.accent }} />
                </Link>
            </div>
        </section>
    );
}
