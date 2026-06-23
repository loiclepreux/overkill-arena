import { useParams, useNavigate } from "react-router-dom";
import { FiAward, FiArrowLeft, FiUsers, FiRadio } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useApi, getErrorMessage } from "@/hooks/useApi";
import { tournamentsApi } from "@/services/tournaments.api";
import { matchesApi } from "@/services/matches.api";
import { teamsApi } from "@/services/teams.api";
import type { TournamentStatus } from "@/services/tournaments.api";
import type { Team } from "@/services/teams.api";
import type { Match } from "@/services/matches.api";
import { useState } from "react";
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

function matchStatusLabel(status: Match["status"]): string {
    const labels: Record<Match["status"], string> = {
        PENDING: "À venir",
        IN_PROGRESS: "En cours",
        COMPLETED: "Terminé",
        CANCELLED: "Annulé",
        CONTESTED: "Contesté",
    };
    return labels[status];
}

function matchStatusVariant(status: Match["status"]): "danger" | "success" | "warning" | "neutral" {
    if (status === "COMPLETED") return "success";
    if (status === "IN_PROGRESS") return "danger";
    if (status === "CONTESTED") return "warning";
    return "neutral";
}

export function TournamentDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [registerMsg, setRegisterMsg] = useState<string | null>(null);
    const [registering, setRegistering] = useState(false);
    const [unregistering, setUnregistering] = useState(false);

    const { data: tournament, loading: loadingT, error: errorT } = useApi(() =>
        tournamentsApi.getById(id!)
    );
    const { data: matches, loading: loadingM } = useApi(() =>
        matchesApi.getByTournament(id!)
    );
    const { data: participants, loading: loadingP, refetch: refetchParticipants } = useApi(() =>
        tournamentsApi.getParticipants(id!)
    );
    const { data: allTeams } = useApi(teamsApi.getAll);
    const { data: myTeam } = useApi(() => teamsApi.getMyTeam().catch(() => null));

    const isAlreadyRegistered = participants?.some(
        (p: { teamId: string }) => p.teamId === myTeam?.id
    );

    async function handleUnregister() {
        if (!myTeam) return;
        setUnregistering(true);
        setRegisterMsg(null);
        try {
            await tournamentsApi.unregister(id!, myTeam.id);
            setRegisterMsg("Équipe désinscrite.");
            refetchParticipants();
        } catch (err) {
            setRegisterMsg(getErrorMessage(err));
        } finally {
            setUnregistering(false);
        }
    }

    async function handleRegister() {
        if (!myTeam) {
            setRegisterMsg("Vous devez être dans une équipe pour vous inscrire.");
            return;
        }
        setRegistering(true);
        setRegisterMsg(null);
        try {
            await tournamentsApi.register(id!, myTeam.id);
            setRegisterMsg("Équipe inscrite avec succès !");
            refetchParticipants();
        } catch (err) {
            setRegisterMsg(getErrorMessage(err));
        } finally {
            setRegistering(false);
        }
    }

    if (loadingT) return <LoadingSpinner message="Chargement du tournoi..." />;
    if (errorT || !tournament) return <ErrorMessage message={errorT ?? "Tournoi introuvable."} />;

    return (
        <section className="space-y-8">
            {/* HEADER */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard/tournaments")}
                    className="mb-4 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
                >
                    <FiArrowLeft /> Retour aux tournois
                </button>

                <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant={STATUS_VARIANTS[tournament.status]}>
                            {STATUS_LABELS[tournament.status]}
                        </Badge>
                        <Badge variant="neutral">{tournament.format.replace(/_/g, " ")}</Badge>
                    </div>

                    <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
                        {tournament.name}
                    </h1>

                    <p className="mt-3 text-zinc-400">{tournament.game}</p>

                    {tournament.description && (
                        <p className="mt-4 max-w-2xl text-zinc-400">{tournament.description}</p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
                        {tournament.startDate && (
                            <span>Début : {new Date(tournament.startDate).toLocaleDateString("fr-FR")}</span>
                        )}
                        {tournament.endDate && (
                            <span>Fin : {new Date(tournament.endDate).toLocaleDateString("fr-FR")}</span>
                        )}
                        <span>Max : {tournament.maxTeams} équipes</span>
                    </div>

                    {tournament.status === "OPEN" && !isAlreadyRegistered && (
                        <div className="mt-6">
                            <Button onClick={handleRegister} disabled={registering}>
                                {registering ? "Inscription..." : "Inscrire mon équipe"}
                            </Button>
                        </div>
                    )}
                    {isAlreadyRegistered && (
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Badge variant="success">Votre équipe est inscrite</Badge>
                            {tournament.status === "OPEN" && (
                                <button
                                    type="button"
                                    onClick={handleUnregister}
                                    disabled={unregistering}
                                    className="text-sm text-zinc-400 underline hover:text-red-400 disabled:opacity-50"
                                >
                                    {unregistering ? "Désinscription..." : "Se désinscrire"}
                                </button>
                            )}
                        </div>
                    )}

                    {registerMsg && (
                        <p className="mt-3 text-sm text-zinc-300">{registerMsg}</p>
                    )}
                </div>

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                {/* PARTICIPANTS */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <FiUsers className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">
                            Équipes inscrites ({participants?.length ?? 0})
                        </h2>
                    </div>

                    {loadingP && <LoadingSpinner />}

                    {!loadingP && (!participants || participants.length === 0) && (
                        <p className="text-zinc-500">Aucune équipe inscrite pour le moment.</p>
                    )}

                    <div className="space-y-3">
                        {participants?.map((p: { id: string; teamId: string; registeredAt: string }) => {
                            const name = teamName(allTeams, p.teamId);
                            const isMyTeam = p.teamId === myTeam?.id;
                            return (
                                <div
                                    key={p.id}
                                    className={`flex items-center justify-between rounded-xl border p-4 ${
                                        isMyTeam
                                            ? "border-red-900/40 bg-red-950/10"
                                            : "border-zinc-800 bg-black/30"
                                    }`}
                                >
                                    <span className="font-semibold text-white">{name}</span>
                                    {isMyTeam && <Badge variant="danger">Mon équipe</Badge>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MATCHS */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <FiRadio className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">
                            Matchs ({matches?.length ?? 0})
                        </h2>
                    </div>

                    {loadingM && <LoadingSpinner />}

                    {!loadingM && (!matches || matches.length === 0) && (
                        <p className="text-zinc-500">Aucun match programmé pour le moment.</p>
                    )}

                    <div className="space-y-3">
                        {matches?.map((match: Match) => {
                            const nameA = teamName(allTeams, match.teamAId);
                            const nameB = teamName(allTeams, match.teamBId);
                            const isMyMatch =
                                match.teamAId === myTeam?.id || match.teamBId === myTeam?.id;
                            return (
                                <div
                                    key={match.id}
                                    className={`rounded-xl border p-4 ${
                                        isMyMatch
                                            ? "border-red-900/40 bg-red-950/10"
                                            : "border-zinc-800 bg-black/30"
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-white">
                                                {nameA} vs {nameB}
                                            </p>
                                            <p className="mt-1 text-xs text-zinc-500">
                                                {match.format}
                                                {match.status === "COMPLETED" &&
                                                    ` • ${match.scoreA} – ${match.scoreB}`}
                                                {match.scheduledAt &&
                                                    ` • ${new Date(match.scheduledAt).toLocaleDateString("fr-FR")}`}
                                            </p>
                                        </div>
                                        <Badge variant={matchStatusVariant(match.status)}>
                                            {matchStatusLabel(match.status)}
                                        </Badge>
                                    </div>
                                    {match.status === "COMPLETED" && match.winnerId && (
                                        <p className="mt-2 text-xs text-zinc-400">
                                            Vainqueur : {teamName(allTeams, match.winnerId)}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* RÉCOMPENSES */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <div className="mb-5 flex items-center gap-3">
                    <FiAward className="text-2xl text-red-500" />
                    <h2 className="text-2xl font-bold text-white">Récompenses</h2>
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
                        <p className="mt-2 text-sm text-zinc-400">Médaille de bronze</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
