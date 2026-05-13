import type { ReactNode } from "react";

type DashboardStatCardProps = {
    title: string;
    value: string | number;
    icon?: ReactNode;
    description?: string;
    rang?: string;
};

export function DashboardStatCard({
    title,
    value,
    icon,
    description,
    rang,
}: DashboardStatCardProps) {
    return (
        <div
            className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        shadow-lg shadow-black/30
      "
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                    {title}
                </h3>

                {icon && <div className="text-2xl text-red-500">{icon}</div>}
            </div>

            <p className="text-4xl font-extrabold text-white">{value}</p>

            {description && (
                <p className="mt-3 text-sm text-zinc-500">{description}</p>
            )}

            {rang && (
                <p className="mt-3 text-sm text-zinc-500">{rang}</p>
            )}
        </div>
    );
}
