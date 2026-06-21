import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiShield, FiTarget, FiUserPlus, FiUsers, FiX } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useAuthStore } from "@/store/auth.store";
import { useApi, getErrorMessage } from "@/hooks/useApi";
import { useUsernames } from "@/hooks/useUsernames";
import { teamsApi } from "@/services/teams.api";
import { matchesApi } from "@/services/matches.api";
import type { Team, JoinRequest } from "@/services/teams.api";
import type { Match } from "@/services/matches.api";

type View = "my-team" | "all-teams" | "create";

const ROLE_LABELS: Record<string, string> = {
    CAPTAIN: "Capitaine",
    CO_CAPTAIN: "Co-Capitaine",
    MEMBER: "Membre",
};

function matchResultLabel(match: Match, myTeamId: string) {
    if (match.status !== "COMPLETED") return match.status;
    if (!match.winnerId) return "NUL";
    return match.winnerId === myTeamId ? "VICTOIRE" : "DÉFAITE";
}

function teamName(allTeams: Team[] | null | undefined, id: string): string {
    return allTeams?.find((t) => t.id === id)?.name ?? id.slice(0, 8);
}

type ScoreModal = { matchId: string; teamId: string };

export function TeamsPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [view, setView] = useState<View>("my-team");
    const [teamSearch, setTeamSearch] = useState("");
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [joining, setJoining] = useState<string | null>(null);
    const [actionMsg, setActionMsg] = useState<string | null>(null);
    const [scoreModal, setScoreModal] = useState<ScoreModal | null>(null);
    const [scoreA, setScoreA] = useState("0");
    const [scoreB, setScoreB] = useState("0");
    const [submittingScore, setSubmittingScore] = useState(false);

    const {
        data: myTeam,
        loading: loadingMyTeam,
        error: errorMyTeam,
        refetch: refetchMyTeam,
    } = useApi(() => teamsApi.getMyTeam().catch(() => null));

    const {
        data: allTeams,
        loading: loadingAll,
        refetch: refetchAll,
    } = useApi(teamsApi.getAll);

    const {
        data: matches,
        loading: loadingMatches,
        refetch: refetchMatches,
    } = useApi(() =>
        myTeam ? matchesApi.getByTeam(myTeam.id) : Promise.resolve([])
    );

    const {
        data: joinRequests,
        refetch: refetchRequests,
    } = useApi(() =>
        myTeam && myTeam.captainId === user?.id
            ? teamsApi.getJoinRequests(myTeam.id)
            : Promise.resolve([] as JoinRequest[])
    );

    const memberIds = myTeam?.members.map((m) => m.userId) ?? [];
    const requestIds = joinRequests?.map((r) => r.userId) ?? [];
    const usernameMap = useUsernames([...memberIds, ...requestIds]);

    async function handleCreate() {
        setCreating(true);
        setCreateError(null);
        try {
            await teamsApi.create({ name, tag, description: description || undefined });
            setName("");
            setTag("");
            setDescription("");
            refetchMyTeam();
            setView("my-team");
        } catch (err) {
            setCreateError(getErrorMessage(err));
        } finally {
            setCreating(false);
        }
    }

    async function handleJoin(teamId: string) {
        setJoining(teamId);
        setActionMsg(null);
        try {
            await teamsApi.requestJoin(teamId);
            setActionMsg("Demande envoyée !");
            refetchAll();
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        } finally {
            setJoining(null);
        }
    }

    async function handleLeave() {
        if (!myTeam) return;
        if (!confirm("Quitter l'équipe ?")) return;
        try {
            await teamsApi.leave(myTeam.id);
            refetchMyTeam();
            setView("all-teams");
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        }
    }

    async function handleDeleteTeam() {
        if (!myTeam) return;
        if (!confirm(`Supprimer définitivement "${myTeam.name}" ?`)) return;
        try {
            await teamsApi.delete(myTeam.id);
            refetchMyTeam();
            setView("all-teams");
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        }
    }

    async function handleRespondRequest(requestId: string, accepted: boolean) {
        try {
            await teamsApi.respondRequest(requestId, accepted);
            refetchRequests();
            refetchMyTeam();
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        }
    }

    async function handleKick(userId: string) {
        if (!myTeam) return;
        if (!confirm("Exclure ce membre ?")) return;
        try {
            await teamsApi.kickMember(myTeam.id, userId);
            refetchMyTeam();
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        }
    }

    function openScoreModal(match: Match) {
        if (!myTeam) return;
        setScoreA("0");
        setScoreB("0");
        setScoreModal({ matchId: match.id, teamId: myTeam.id });
    }

    async function handleSubmitScore() {
        if (!scoreModal) return;
        setSubmittingScore(true);
        setActionMsg(null);
        try {
            await matchesApi.submitScore(
                scoreModal.matchId,
                scoreModal.teamId,
                parseInt(scoreA, 10),
                parseInt(scoreB, 10),
            );
            setScoreModal(null);
            setActionMsg("Score soumis avec succès !");
            refetchMatches();
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        } finally {
            setSubmittingScore(false);
        }
    }

    if (loadingMyTeam) return <LoadingSpinner message="Chargement de l'équipe..." />;

    const isCaptain = myTeam?.captainId === user?.id;

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                            {myTeam ? myTeam.name : "Équipes"}
                        </h1>
                        {myTeam && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Badge variant="danger">[{myTeam.tag}]</Badge>
                                <Badge variant="success">{myTeam.members.length} membres</Badge>
                            </div>
                        )}
                        {!myTeam && (
                            <p className="mt-3 text-zinc-400">
                                Créez ou rejoignez une équipe pour participer aux tournois.
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {myTeam && (
                            <Button
                                variant={view === "my-team" ? "primary" : "secondary"}
                                onClick={() => setView("my-team")}
                            >
                                Mon équipe
                            </Button>
                        )}
                        <Button
                            variant={view === "all-teams" ? "primary" : "secondary"}
                            onClick={() => { setView("all-teams"); refetchAll(); }}
                        >
                            Toutes les équipes
                        </Button>
                        {!myTeam && (
                            <Button
                                variant={view === "create" ? "primary" : "secondary"}
                                onClick={() => setView("create")}
                            >
                                Créer une équipe
                            </Button>
                        )}
                    </div>
                </div>
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {actionMsg && (
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-sm text-zinc-300">
                    {actionMsg}
                </div>
            )}
            {errorMyTeam && !myTeam && <ErrorMessage message={errorMyTeam} />}

            {/* STATS */}
            {myTeam && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardStatCard title="Membres" value={myTeam.members.length} icon={<FiUsers />} description="Effectifs" />
                    <DashboardStatCard title="Victoires" value={matches?.filter((m) => m.winnerId === myTeam.id).length ?? 0} icon={<FiTarget />} description="Matchs gagnés" />
                    <DashboardStatCard title="Défaites" value={matches?.filter((m) => m.status === "COMPLETED" && m.winnerId && m.winnerId !== myTeam.id).length ?? 0} icon={<FiShield />} description="Matchs perdus" />
                    <DashboardStatCard title="Matchs" value={matches?.length ?? 0} icon={<FiUserPlus />} description="Total disputés" />
                </div>
            )}

            {/* VUE MON ÉQUIPE */}
            {view === "my-team" && myTeam && (
                <div className="grid gap-8 xl:grid-cols-2">
                    {/* ROSTER */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FiUsers className="text-2xl text-red-500" />
                                <h2 className="text-2xl font-bold text-white">Effectifs</h2>
                            </div>
                            {isCaptain && (
                                <Button variant="secondary" onClick={handleDeleteTeam} className="text-sm">
                                    Supprimer
                                </Button>
                            )}
                        </div>
                        <div className="space-y-3">
                            {myTeam.members.map((member) => {
                                const pseudo = usernameMap[member.userId] ?? member.userId.slice(0, 8);
                                return (
                                    <div key={member.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white text-sm">
                                                {pseudo.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/dashboard/players/${member.userId}`)}
                                                    className="font-semibold text-white text-sm hover:text-red-400 text-left"
                                                >
                                                    {pseudo}
                                                </button>
                                                <Badge variant={member.role === "CAPTAIN" ? "danger" : "neutral"} className="mt-1">
                                                    {ROLE_LABELS[member.role]}
                                                </Badge>
                                            </div>
                                        </div>
                                        {isCaptain && member.userId !== user?.id && (
                                            <button
                                                type="button"
                                                onClick={() => handleKick(member.userId)}
                                                className="text-zinc-500 hover:text-red-400"
                                                title="Exclure"
                                            >
                                                <FiX />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {!isCaptain && (
                            <Button variant="secondary" className="mt-4 w-full" onClick={handleLeave}>
                                Quitter l'équipe
                            </Button>
                        )}
                    </div>

                    {/* DEMANDES + HISTORIQUE */}
                    <div className="space-y-6">
                        {isCaptain && joinRequests && joinRequests.length > 0 && (
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <FiUserPlus className="text-2xl text-red-500" />
                                    <h2 className="text-xl font-bold text-white">Demandes ({joinRequests.length})</h2>
                                </div>
                                <div className="space-y-3">
                                    {joinRequests.map((req) => {
                                        const pseudo = usernameMap[req.userId] ?? req.userId.slice(0, 8);
                                        return (
                                            <div key={req.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">
                                                <p className="text-sm font-semibold text-zinc-300">{pseudo}</p>
                                                <div className="flex gap-2">
                                                    <Button className="py-1 px-3 text-xs" onClick={() => handleRespondRequest(req.id, true)}>
                                                        Accepter
                                                    </Button>
                                                    <Button variant="secondary" className="py-1 px-3 text-xs" onClick={() => handleRespondRequest(req.id, false)}>
                                                        Refuser
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                            <h2 className="mb-4 text-xl font-bold text-white">Historique des matchs</h2>
                            {loadingMatches && <LoadingSpinner message="Chargement des matchs..." />}
                            {!loadingMatches && (!matches || matches.length === 0) && (
                                <p className="text-zinc-500 text-sm">Aucun match disputé pour le moment.</p>
                            )}
                            <div className="space-y-3">
                                {matches?.slice(0, 10).map((match) => {
                                    const label = matchResultLabel(match, myTeam.id);
                                    const nameA = teamName(allTeams, match.teamAId);
                                    const nameB = teamName(allTeams, match.teamBId);
                                    const isInProgress = match.status === "IN_PROGRESS";
                                    return (
                                        <div key={match.id} className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-white">
                                                        {nameA} vs {nameB}
                                                    </p>
                                                    <p className="mt-1 text-xs text-zinc-500">
                                                        {match.format}
                                                        {match.status === "COMPLETED" && ` • Score : ${match.scoreA} – ${match.scoreB}`}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {isInProgress && (
                                                        <button
                                                            type="button"
                                                            onClick={() => openScoreModal(match)}
                                                            className="rounded-lg border border-zinc-600 px-3 py-1 text-xs text-zinc-300 hover:border-red-500 hover:text-red-400"
                                                        >
                                                            Soumettre score
                                                        </button>
                                                    )}
                                                    <Badge
                                                        variant={label === "VICTOIRE" ? "success" : label === "DÉFAITE" ? "danger" : "neutral"}
                                                    >
                                                        {label}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* VUE TOUTES LES ÉQUIPES */}
            {view === "all-teams" && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-2xl font-bold text-white">Toutes les équipes ({allTeams?.length ?? 0})</h2>
                        <div className="flex gap-3">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    className="rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                    placeholder="Rechercher..."
                                    value={teamSearch}
                                    onChange={(e) => setTeamSearch(e.target.value)}
                                />
                            </div>
                            {!myTeam && (
                                <Button onClick={() => setView("create")}>Créer</Button>
                            )}
                        </div>
                    </div>
                    {loadingAll && <LoadingSpinner />}
                    {!loadingAll && (!allTeams || allTeams.length === 0) && (
                        <p className="text-zinc-500">Aucune équipe pour le moment.</p>
                    )}
                    <div className="space-y-4">
                        {allTeams?.filter((t) =>
                            !teamSearch.trim() ||
                            t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
                            t.tag.toLowerCase().includes(teamSearch.toLowerCase())
                        ).map((team) => (
                            <div key={team.id} className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-white">{team.name}</h3>
                                        <Badge variant="neutral">[{team.tag}]</Badge>
                                    </div>
                                    {team.description && <p className="mt-1 text-sm text-zinc-500">{team.description}</p>}
                                    <p className="mt-2 text-sm text-zinc-500">{team.members.length} membre{team.members.length > 1 ? "s" : ""}</p>
                                </div>
                                {!myTeam && (
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleJoin(team.id)}
                                        disabled={joining === team.id}
                                    >
                                        {joining === team.id ? "Envoi..." : "Rejoindre"}
                                    </Button>
                                )}
                                {myTeam?.id === team.id && (
                                    <Badge variant="success">Mon équipe</Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* VUE CRÉER UNE ÉQUIPE */}
            {view === "create" && !myTeam && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h2 className="mb-6 text-2xl font-bold text-white">Créer mon équipe</h2>
                    {createError && <ErrorMessage message={createError} />}
                    <div className="mt-4 space-y-4 max-w-lg">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Nom de l'équipe *</label>
                            <input
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                placeholder="Team Phoenix"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Tag (2-6 caractères) *</label>
                            <input
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                placeholder="PHX"
                                maxLength={6}
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Description</label>
                            <textarea
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                rows={3}
                                placeholder="Décrivez votre équipe..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button onClick={handleCreate} disabled={creating || !name || !tag}>
                                {creating ? "Création..." : "Créer l'équipe"}
                            </Button>
                            <Button variant="secondary" onClick={() => setView("all-teams")}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL SOUMISSION DE SCORE */}
            {scoreModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Soumettre le score</h3>
                            <button type="button" onClick={() => setScoreModal(null)} className="text-zinc-500 hover:text-white">
                                <FiX />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">
                                    Score équipe A
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                    value={scoreA}
                                    onChange={(e) => setScoreA(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">
                                    Score équipe B
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                    value={scoreB}
                                    onChange={(e) => setScoreB(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button
                                className="flex-1"
                                onClick={handleSubmitScore}
                                disabled={submittingScore}
                            >
                                {submittingScore ? "Envoi..." : "Confirmer"}
                            </Button>
                            <Button variant="secondary" onClick={() => setScoreModal(null)}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
