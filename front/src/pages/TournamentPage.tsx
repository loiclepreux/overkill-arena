import { useState } from "react";
import { FiAward, FiRadio, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useApi, getErrorMessage } from "@/hooks/useApi";
import { tournamentsApi } from "@/services/tournaments.api";
import { teamsApi } from "@/services/teams.api";
import { matchesApi } from "@/services/matches.api";
import type { TournamentStatus } from "@/services/tournaments.api";
import type { Team } from "@/services/teams.api";

const STATUS_LABELS: Record<TournamentStatus, string> = {
    DRAFT: "Brouillon",
    OPEN: "Ouvert",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminé",
    CANCELLED: "Annulé",
};

const STATUS_VARIANTS: Record<TournamentStatus, "danger" | "success" | "warning" | "neutral"> = {
    DRAFT: "neutral",
    OPEN: "success",
    IN_PROGRESS: "danger",
    COMPLETED: "neutral",
    CANCELLED: "neutral",
};

function teamName(allTeams: Team[] | null | undefined, id: string): string {
    return allTeams?.find((t) => t.id === id)?.name ?? id.slice(0, 8);
}

export function TournamentPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<TournamentStatus | undefined>(undefined);
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [actionMsg, setActionMsg] = useState<string | null>(null);

    const { data: tournaments, loading, error, refetch } = useApi(() => tournamentsApi.getAll(filter));
    const { data: myTeam } = useApi(() => teamsApi.getMyTeam().catch(() => null));
    const { data: allTeams } = useApi(teamsApi.getAll);
    const { data: myMatches } = useApi(() =>
        myTeam ? matchesApi.getByTeam(myTeam.id) : Promise.resolve([])
    );

    async function handleRegister(tournamentId: string) {
        if (!myTeam) {
            setActionMsg("Vous devez être dans une équipe pour vous inscrire.");
            return;
        }
        setRegisteringId(tournamentId);
        setActionMsg(null);
        try {
            await tournamentsApi.register(tournamentId, myTeam.id);
            setActionMsg("Équipe inscrite au tournoi !");
            refetch();
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        } finally {
            setRegisteringId(null);
        }
    }

    const openCount = tournaments?.filter((t) => t.status === "OPEN").length ?? 0;
    const activeCount = tournaments?.filter((t) => t.status === "IN_PROGRESS").length ?? 0;
    const myUpcomingMatches = myMatches?.filter((m) => m.status === "PENDING") ?? [];

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">Competitive Arena</Badge>
                    <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                        Tournois compétitifs Overkill Arena
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Rejoins des compétitions esports, affronte les meilleures équipes et gagne des médailles.
                    </p>
                </div>
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {actionMsg && (
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-sm text-zinc-300">
                    {actionMsg}
                </div>
            )}

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="Tournois ouverts" value={openCount} icon={<FiAward />} description="Inscriptions ouvertes" />
                <DashboardStatCard title="En cours" value={activeCount} icon={<FiRadio />} description="Actuellement actifs" />
                <DashboardStatCard title="Total" value={tournaments?.length ?? 0} icon={<FiAward />} description="Tous les tournois" />
                <DashboardStatCard title="Mes matchs" value={myUpcomingMatches.length} icon={<FiUsers />} description="À venir" />
            </div>

            {/* FILTRES */}
            <div className="flex flex-wrap gap-3">
                {([undefined, "OPEN", "IN_PROGRESS", "COMPLETED"] as (TournamentStatus | undefined)[]).map((s) => (
                    <button
                        key={s ?? "all"}
                        type="button"
                        onClick={() => { setFilter(s); setTimeout(refetch, 50); }}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            filter === s
                                ? "bg-red-600 text-white"
                                : "border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-red-600"
                        }`}
                    >
                        {s ? STATUS_LABELS[s] : "Tous"}
                    </button>
                ))}
            </div>

            {/* LISTE DES TOURNOIS */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <div className="mb-6 flex items-center gap-3">
                    <FiAward className="text-2xl text-red-500" />
                    <h2 className="text-2xl font-bold text-white">Tournois</h2>
                </div>

                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}

                {!loading && (!tournaments || tournaments.length === 0) && (
                    <p className="text-zinc-500">Aucun tournoi disponible pour le moment.</p>
                )}

                <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {tournaments?.map((t) => (
                        <div key={t.id} className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <h3 className="font-bold text-white">{t.name}</h3>
                                <Badge variant={STATUS_VARIANTS[t.status]}>{STATUS_LABELS[t.status]}</Badge>
                            </div>
                            <p className="text-sm text-zinc-500">{t.game}</p>
                            <p className="mt-1 text-sm text-zinc-500">
                                {t.format.replace("_", " ")} •{" "}
                                {t._count?.participants ?? 0}/{t.maxTeams} équipes
                            </p>
                            {t.startDate && (
                                <p className="mt-1 text-sm text-zinc-600">
                                    Début : {new Date(t.startDate).toLocaleDateString("fr-FR")}
                                </p>
                            )}
                            {t.description && (
                                <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{t.description}</p>
                            )}
                            {t.status === "OPEN" && (
                                <Button
                                    className="mt-5 w-full"
                                    onClick={() => handleRegister(t.id)}
                                    disabled={registeringId === t.id}
                                >
                                    {registeringId === t.id ? "Inscription..." : "Rejoindre"}
                                </Button>
                            )}
                            {t.status === "IN_PROGRESS" && (
                                <Button
                                    variant="secondary"
                                    className="mt-5 w-full"
                                    onClick={() => navigate(`/dashboard/tournaments/${t.id}`)}
                                >
                                    Voir les matchs
                                </Button>
                            )}
                            <button
                                type="button"
                                onClick={() => navigate(`/dashboard/tournaments/${t.id}`)}
                                className="mt-2 w-full text-xs text-zinc-500 hover:text-zinc-300"
                            >
                                Détails du tournoi →
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* MES MATCHS À VENIR */}
            {myUpcomingMatches.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                        <h2 className="text-2xl font-bold text-white">Mes prochains matchs</h2>
                    </div>
                    <div className="space-y-4">
                        {myUpcomingMatches.map((match) => (
                            <div key={match.id} className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-black/30 p-5 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {teamName(allTeams, match.teamAId)} vs {teamName(allTeams, match.teamBId)}
                                    </h3>
                                    <p className="mt-2 text-zinc-500">
                                        {match.format}
                                        {match.scheduledAt && ` • ${new Date(match.scheduledAt).toLocaleString("fr-FR")}`}
                                    </p>
                                </div>
                                <Badge variant="warning">À venir</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* RÈGLES DE RÉCOMPENSES */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <div className="mb-6 flex items-center gap-3">
                    <FiAward className="text-2xl text-red-500" />
                    <h2 className="text-2xl font-bold text-white">Récompenses de tournoi</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-center">
                        <p className="text-5xl">🥇</p>
                        <h3 className="mt-4 text-xl font-bold text-white">1ère place</h3>
                        <p className="mt-2 text-sm text-zinc-400">Médaille d'or + progression titre</p>
                    </div>
                    <div className="rounded-xl border border-zinc-400/20 bg-zinc-400/5 p-5 text-center">
                        <p className="text-5xl">🥈</p>
                        <h3 className="mt-4 text-xl font-bold text-white">2ème place</h3>
                        <p className="mt-2 text-sm text-zinc-400">Médaille d'argent + points compétitifs</p>
                    </div>
                    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5 text-center">
                        <p className="text-5xl">🥉</p>
                        <h3 className="mt-4 text-xl font-bold text-white">3ème place</h3>
                        <p className="mt-2 text-sm text-zinc-400">Médaille de bronze + progression joueur</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
