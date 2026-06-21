import { FiAward, FiTarget, FiShield } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useApi } from "@/hooks/useApi";
import { rewardsApi } from "@/services/rewards.api";
import type { Reward } from "@/services/rewards.api";

const TITLES = ["Rookie", "Challenger", "Rubis", "Diamond", "Prestige", "Master", "Legend", "Overkill"];

const TITLE_CUPS_REQUIRED: Record<string, number> = {
    Rookie: 0,
    Challenger: 2,
    Rubis: 5,
    Diamond: 10,
    Prestige: 18,
    Master: 28,
    Legend: 40,
    Overkill: 55,
};

function computeTitle(cups: number): { current: string; next: string; progress: number; required: number } {
    let current = "Rookie";
    let next = "Challenger";
    for (const title of TITLES) {
        if (cups >= TITLE_CUPS_REQUIRED[title]) current = title;
    }
    const nextIdx = TITLES.indexOf(current) + 1;
    next = nextIdx < TITLES.length ? TITLES[nextIdx] : current;
    const required = TITLE_CUPS_REQUIRED[next] ?? TITLE_CUPS_REQUIRED[current];
    const base = TITLE_CUPS_REQUIRED[current];
    const progress = required > base ? Math.min(((cups - base) / (required - base)) * 100, 100) : 100;
    return { current, next, progress: Math.round(progress), required };
}

function rewardLabel(r: Reward): string {
    if (r.type === "MEDAL") return r.medalRank === "GOLD" ? "🥇 Or" : r.medalRank === "SILVER" ? "🥈 Argent" : "🥉 Bronze";
    if (r.type === "CUP") return `🏆 ${r.cupName ?? "Coupe"}`;
    return `◆ ${r.titleName ?? "Titre"}`;
}

export function RewardsPage() {
    const { data: stats, loading: loadingStats, error: errorStats } = useApi(rewardsApi.getMyStats);
    const { data: rewards, loading: loadingRewards } = useApi(rewardsApi.getMyRewards);

    if (loadingStats) return <LoadingSpinner message="Chargement des récompenses..." />;
    if (errorStats) return <ErrorMessage message={errorStats} />;

    const totalCups = (stats?.cups ?? 0);
    const { current, next, progress, required } = computeTitle(totalCups);

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10">
                    <Badge variant="danger">Progression</Badge>
                    <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">Récompenses</h1>
                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Gagnez des médailles, débloquez des coupes et atteignez les plus hauts titres de Overkill Arena.
                    </p>
                </div>
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <DashboardStatCard
                    title="Médailles d'or"
                    value={`🥇 ${stats?.medals.gold ?? 0}`}
                    icon={<FiAward />}
                    description="Premières places"
                />
                <DashboardStatCard
                    title="Coupes"
                    value={`🏆 ${stats?.cups ?? 0}`}
                    icon={<FiTarget />}
                    description="Coupes obtenues"
                />
                <DashboardStatCard
                    title="Titre"
                    value={current}
                    icon={<FiShield />}
                    description="Rang actuel"
                />
            </div>

            {/* PROGRESSION */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <h2 className="text-3xl font-bold text-white">Progression du titre</h2>
                <p className="mt-3 text-zinc-400">{current} → {next}</p>
                <div className="mt-6">
                    <div className="h-4 overflow-hidden rounded-full bg-zinc-800">
                        <div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-3 text-sm text-zinc-500">{totalCups} / {required} coupes</p>
                </div>
            </div>

            {/* PARCOURS DES TITRES */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <h2 className="text-3xl font-bold text-white">Parcours des titres</h2>
                <div className="mt-8 grid gap-4 lg:grid-cols-4">
                    {TITLES.map((title) => (
                        <div
                            key={title}
                            className={`rounded-xl border p-4 text-center ${
                                title === current
                                    ? "border-red-600 bg-red-900/20"
                                    : "border-zinc-800 bg-black/30"
                            }`}
                        >
                            <p className="font-bold text-white">{title}</p>
                            {title === current && (
                                <Badge variant="danger" className="mt-2">Actuel</Badge>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* MÉDAILLES */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h3 className="text-2xl font-bold text-white">🥉 Bronze</h3>
                    <p className="mt-4 text-4xl font-extrabold text-red-500">{stats?.medals.bronze ?? 0}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h3 className="text-2xl font-bold text-white">🥈 Argent</h3>
                    <p className="mt-4 text-4xl font-extrabold text-red-500">{stats?.medals.silver ?? 0}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h3 className="text-2xl font-bold text-white">🥇 Or</h3>
                    <p className="mt-4 text-4xl font-extrabold text-red-500">{stats?.medals.gold ?? 0}</p>
                </div>
            </div>

            {/* HISTORIQUE */}
            {!loadingRewards && rewards && rewards.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h2 className="mb-6 text-2xl font-bold text-white">Historique des récompenses</h2>
                    <div className="space-y-3">
                        {rewards.map((r) => (
                            <div key={r.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 px-5 py-4">
                                <div>
                                    <p className="font-semibold text-white">{rewardLabel(r)}</p>
                                    {r.description && <p className="mt-1 text-sm text-zinc-500">{r.description}</p>}
                                </div>
                                <span className="text-xs text-zinc-600">
                                    {new Date(r.awardedAt).toLocaleDateString("fr-FR")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loadingRewards && (!rewards || rewards.length === 0) && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 text-center text-zinc-500">
                    Aucune récompense pour le moment. Participez à des tournois !
                </div>
            )}
        </section>
    );
}
