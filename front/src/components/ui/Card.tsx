import type { CardProps } from "@/types/ui";

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`
        rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6
        shadow-lg shadow-black/30 transition
        hover:border-red-500/50 hover:shadow-red-950/30
        ${className}
      `}
        >
            {children}
        </div>
    );
}
