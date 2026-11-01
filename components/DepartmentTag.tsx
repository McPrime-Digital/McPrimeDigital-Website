import { DEPARTMENTS, type Department } from '@/lib/departments';

/** Small label naming the department a piece of work belongs to, in that department's colour. */
export default function DepartmentTag({ department, className = '' }: { department: Department; className?: string }) {
    const d = DEPARTMENTS[department];
    return (
        <span className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/55 ${className}`}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: d.accent, boxShadow: `0 0 8px ${d.accent}` }} />
            {d.name}
        </span>
    );
}
