import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "danger" | "neutral";

type BadgeProps = {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
};

export function Badge({
    children,
    variant = "neutral",
    className = "",
}: BadgeProps) {
    const variants = {
        success: "border-green-500/40 bg-green-500/10 text-green-400",
        warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
        danger: "border-red-500/40 bg-red-500/10 text-red-400",
        neutral: "border-zinc-600 bg-zinc-800 text-zinc-300",
    };

    return (
        <span
            className={`
        inline-flex items-center rounded-full border px-3 py-1
        text-xs font-bold uppercase tracking-wide
        ${variants[variant]}
        ${className}
      `}
        >
            {children}
        </span>
    );
}
