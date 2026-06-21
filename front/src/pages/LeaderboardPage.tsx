import { useState } from "react";
import { FiAward, FiSearch, FiShield, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useApi } from "@/hooks/useApi";
import { teamsApi } from "@/services/teams.api";
import type { Team } from "@/services/teams.api";

export function LeaderboardPage() {
    const { data: teams, loading, error } = useApi(teamsApi.getAll);
    const [search, setSearch] = useState("");

    const sorted = [...(teams ?? [])].sort((a, b) => b.members.length - a.members.length);
    const filtered = search.trim()
        ? sorted.filter((t) =>
              t.name.toLowerCase().includes(search.toLowerCase()) ||
              t.tag.toLowerCase().includes(search.toLowerCase())
          )
        : sorted;
    const podium = sorted.slice(0, 3);

    const MEDALS = ["🥇", "🥈", "🥉"];
    const HEIGHTS = ["", "lg:mt-16", "lg:mt-24"];

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">Competitive Rankings</Badge>
                    <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                        Classement Overkill Arena
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Suivez les meilleures équipes et les performances dominantes de la plateforme.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Badge variant="warning">Saison 1</Badge>
                        <Badge variant="danger">Classement ELO</Badge>
                        <Badge variant="success">Récompenses actives</Badge>
                    </div>
                </div>
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="Équipes" value={teams?.length ?? 0} icon={<FiShield />} description="Classées" />
                <DashboardStatCard title="Top équipe" value={sorted[0]?.name ?? "—"} icon={<FiAward />} description="1ère place" />
                <DashboardStatCard title="Total membres" value={teams?.reduce((acc, t) => acc + t.members.length, 0) ?? 0} icon={<FiUsers />} description="Joueurs inscrits" />
                <DashboardStatCard title="Actives" value={teams?.length ?? 0} icon={<FiTrendingUp />} description="Cette saison" />
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}

            {/* PODIUM */}
            {!loading && podium.length > 0 && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 lg:p-8">
                    <h2 className="mb-8 text-3xl font-bold text-white">Podium</h2>
                    <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
                        {[podium[1], podium[0], podium[2]].filter(Boolean).map((team: Team, i) => {
                            const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
                            return (
                                <div
                                    key={team.id}
                                    className={`${HEIGHTS[rank - 1]} relative overflow-hidden rounded-2xl border border-zinc-800 bg-black/30 p-6 text-center`}
                                >
                                    <p className="text-6xl">{MEDALS[rank - 1]}</p>
                                    <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-xl font-black text-white">
                                        #{rank}
                                    </div>
                                    <h3 className="mt-5 text-2xl font-extrabold text-white">{team.name}</h3>
                                    <Badge variant="danger" className="mt-3">[{team.tag}]</Badge>
                                    <p className="mt-4 text-xl font-bold text-red-500">{team.members.length} membres</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* CLASSEMENT COMPLET */}
            {!loading && sorted.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <FiTarget className="text-2xl text-red-500" />
                            <h2 className="text-2xl font-bold text-white">
                                Toutes les équipes
                                {search && <span className="ml-2 text-lg font-normal text-zinc-500">({filtered.length} résultats)</span>}
                            </h2>
                        </div>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                className="rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                placeholder="Rechercher une équipe..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {filtered.map((team, index) => (
                            <div
                                key={team.id}
                                className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{team.name}</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <Badge variant="danger">[{team.tag}]</Badge>
                                        </div>
                                        <p className="mt-2 text-sm text-zinc-500">{team.members.length} membre{team.members.length > 1 ? "s" : ""}</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-sm text-zinc-500">
                                        Créée le {new Date(team.createdAt).toLocaleDateString("fr-FR")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && filtered.length === 0 && sorted.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center text-zinc-500">
                    Aucune équipe ne correspond à "{search}".
                </div>
            )}

            {!loading && sorted.length === 0 && !error && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center text-zinc-500">
                    Aucune équipe n'a encore été créée. Soyez le premier !
                </div>
            )}
        </section>
    );
}
