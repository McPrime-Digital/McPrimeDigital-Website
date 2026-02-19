import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'glass';
    className?: string;
}

export default function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {

    const baseStyles = "relative overflow-hidden uppercase tracking-[2px] font-bold text-sm py-4 px-8 rounded-md transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary))]/90 hover:shadow-[0_0_20px_rgba(118,77,240,0.4)]",
        outline: "border border-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary))]/10",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
