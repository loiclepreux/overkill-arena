import { Badge } from "@/components/ui/Badge";

type BadgeVariant = "success" | "warning" | "danger" | "neutral";

type PageHeroProps = {
    badge?: string;
    badgeVariant?: BadgeVariant;
    title: string;
    description?: string;
    actions?: React.ReactNode;
};

export function PageHero({
    badge,
    badgeVariant = "danger",
    title,
    description,
    actions,
}: PageHeroProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
            <div className="relative z-10 max-w-4xl">
                {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
                <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        {description}
                    </p>
                )}
                {actions && <div className="mt-6">{actions}</div>}
            </div>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        </div>
    );
}
