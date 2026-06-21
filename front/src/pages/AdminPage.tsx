import { useState } from "react";
import {
    FiAlertTriangle,
    FiAward,
    FiCheckCircle,
    FiShield,
    FiUsers,
    FiPlus,
    FiSearch,
    FiX,
} from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { useApi, getErrorMessage } from "@/hooks/useApi";
import { tournamentsApi } from "@/services/tournaments.api";
import { matchesApi } from "@/services/matches.api";
import { rewardsApi } from "@/services/rewards.api";
import { teamsApi } from "@/services/teams.api";
import { usersApi } from "@/services/users.api";
import type { Tournament, TournamentStatus, TournamentFormat } from "@/services/tournaments.api";
import type { Match, MatchFormat } from "@/services/matches.api";
import type { RewardType, MedalRank } from "@/services/rewards.api";

type Tab = "tournaments" | "matches" | "rewards";

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

const NEXT_STATUSES: Partial<Record<TournamentStatus, TournamentStatus[]>> = {
    DRAFT: ["OPEN", "CANCELLED"],
    OPEN: ["IN_PROGRESS", "CANCELLED"],
    IN_PROGRESS: ["COMPLETED", "CANCELLED"],
};

const FORMAT_OPTIONS: TournamentFormat[] = [
    "SINGLE_ELIMINATION",
    "DOUBLE_ELIMINATION",
    "ROUND_ROBIN",
];

const FORMAT_LABELS: Record<TournamentFormat, string> = {
    SINGLE_ELIMINATION: "Élimination simple",
    DOUBLE_ELIMINATION: "Élimination double",
    ROUND_ROBIN: "Round Robin",
};

export function AdminPage() {
    const [tab, setTab] = useState<Tab>("tournaments");

    // ─── Tournaments ──────────────────────────────────────────────────────────
    const { data: tournaments, loading: loadingT, error: errorT, refetch: refetchT } = useApi(
        () => tournamentsApi.getAll()
    );

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [tName, setTName] = useState("");
    const [tGame, setTGame] = useState("");
    const [tFormat, setTFormat] = useState<TournamentFormat>("SINGLE_ELIMINATION");
    const [tMaxTeams, setTMaxTeams] = useState("8");
    const [tDescription, setTDescription] = useState("");
    const [tStartDate, setTStartDate] = useState("");
    const [tEndDate, setTEndDate] = useState("");
    const [creating, setCreating] = useState(false);
    const [createMsg, setCreateMsg] = useState<string | null>(null);

    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);

    // ─── Matches ──────────────────────────────────────────────────────────────
    const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
    const { data: allTeams } = useApi(teamsApi.getAll);

    const { data: tournamentMatches, loading: loadingM, refetch: refetchM } = useApi(() =>
        selectedTournamentId
            ? matchesApi.getByTournament(selectedTournamentId)
            : Promise.resolve([] as Match[])
    );

    const [validating, setValidating] = useState<string | null>(null);
    const [matchMsg, setMatchMsg] = useState<string | null>(null);

    const [showMatchForm, setShowMatchForm] = useState(false);
    const [matchTeamA, setMatchTeamA] = useState("");
    const [matchTeamB, setMatchTeamB] = useState("");
    const [matchFormat, setMatchFormat] = useState<MatchFormat>("BO1");
    const [matchScheduledAt, setMatchScheduledAt] = useState("");
    const [creatingMatch, setCreatingMatch] = useState(false);

    // ─── Rewards ──────────────────────────────────────────────────────────────
    const { data: allUsers } = useApi(usersApi.getAll);
    const [rewardUserId, setRewardUserId] = useState("");
    const [rewardUserSearch, setRewardUserSearch] = useState("");
    const [rewardType, setRewardType] = useState<RewardType>("MEDAL");
    const [medalRank, setMedalRank] = useState<MedalRank>("GOLD");
    const [cupName, setCupName] = useState("");
    const [titleName, setTitleName] = useState("");
    const [rewardDesc, setRewardDesc] = useState("");
    const [awarding, setAwarding] = useState(false);
    const [rewardMsg, setRewardMsg] = useState<string | null>(null);

    const openCount = tournaments?.filter((t) => t.status === "OPEN").length ?? 0;
    const activeCount = tournaments?.filter((t) => t.status === "IN_PROGRESS").length ?? 0;
    const contestedCount = tournamentMatches?.filter((m) => m.status === "CONTESTED").length ?? 0;

    async function handleCreate() {
        setCreating(true);
        setCreateMsg(null);
        try {
            await tournamentsApi.create({
                name: tName,
                game: tGame,
                format: tFormat,
                maxTeams: parseInt(tMaxTeams, 10),
                description: tDescription || undefined,
                startDate: tStartDate || undefined,
                endDate: tEndDate || undefined,
            });
            setCreateMsg("Tournoi créé avec succès !");
            setShowCreateForm(false);
            setTName("");
            setTGame("");
            setTDescription("");
            setTStartDate("");
            setTEndDate("");
            refetchT();
        } catch (err) {
            setCreateMsg(getErrorMessage(err));
        } finally {
            setCreating(false);
        }
    }

    async function handleUpdateStatus(id: string, status: TournamentStatus) {
        setUpdatingStatus(id + status);
        setStatusMsg(null);
        try {
            await tournamentsApi.updateStatus(id, status);
            setStatusMsg(`Statut changé en "${STATUS_LABELS[status]}".`);
            refetchT();
        } catch (err) {
            setStatusMsg(getErrorMessage(err));
        } finally {
            setUpdatingStatus(null);
        }
    }

    async function handleCreateMatch() {
        if (!selectedTournamentId || !matchTeamA || !matchTeamB) {
            setMatchMsg("Sélectionnez un tournoi et deux équipes différentes.");
            return;
        }
        if (matchTeamA === matchTeamB) {
            setMatchMsg("Les deux équipes doivent être différentes.");
            return;
        }
        setCreatingMatch(true);
        setMatchMsg(null);
        try {
            await matchesApi.create({
                tournamentId: selectedTournamentId,
                teamAId: matchTeamA,
                teamBId: matchTeamB,
                format: matchFormat,
                scheduledAt: matchScheduledAt || undefined,
            });
            setMatchMsg("Match créé avec succès !");
            setShowMatchForm(false);
            setMatchTeamA("");
            setMatchTeamB("");
            refetchM();
        } catch (err) {
            setMatchMsg(getErrorMessage(err));
        } finally {
            setCreatingMatch(false);
        }
    }

    async function handleValidateMatch(id: string) {
        setValidating(id);
        setMatchMsg(null);
        try {
            await matchesApi.validate(id);
            setMatchMsg("Match validé !");
            refetchM();
        } catch (err) {
            setMatchMsg(getErrorMessage(err));
        } finally {
            setValidating(null);
        }
    }

    async function handleAwardReward() {
        if (!rewardUserId.trim()) {
            setRewardMsg("L'ID utilisateur est requis.");
            return;
        }
        setAwarding(true);
        setRewardMsg(null);
        try {
            await rewardsApi.award({
                userId: rewardUserId.trim(),
                type: rewardType,
                medalRank: rewardType === "MEDAL" ? medalRank : undefined,
                cupName: rewardType === "CUP" ? cupName || undefined : undefined,
                titleName: rewardType === "TITLE" ? titleName || undefined : undefined,
                description: rewardDesc || undefined,
            });
            setRewardMsg("Récompense attribuée avec succès !");
            setRewardUserId("");
            setRewardDesc("");
            setCupName("");
            setTitleName("");
        } catch (err) {
            setRewardMsg(getErrorMessage(err));
        } finally {
            setAwarding(false);
        }
    }

    return (
        <section className="space-y-8">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-red-900/40 bg-gradient-to-br from-red-950/50 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">ADMIN CONTROL CENTER</Badge>
                    <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
                        Tableau de bord administrateur
                    </h1>
                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Gérez les tournois, validez les matchs contestés et attribuez des récompenses.
                    </p>
                </div>
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="Tournois" value={tournaments?.length ?? 0} icon={<FiAward />} description="Total créés" />
                <DashboardStatCard title="Ouverts" value={openCount} icon={<FiShield />} description="Inscriptions ouvertes" />
                <DashboardStatCard title="En cours" value={activeCount} icon={<FiUsers />} description="Compétitions actives" />
                <DashboardStatCard title="Contestations" value={contestedCount} icon={<FiAlertTriangle />} description="Matchs à vérifier" />
            </div>

            {/* TABS */}
            <div className="flex gap-2 border-b border-zinc-800">
                {(["tournaments", "matches", "rewards"] as Tab[]).map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        className={`px-5 py-3 text-sm font-semibold transition border-b-2 ${
                            tab === t
                                ? "border-red-500 text-white"
                                : "border-transparent text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        {t === "tournaments" && "Tournois"}
                        {t === "matches" && "Matchs"}
                        {t === "rewards" && "Récompenses"}
                    </button>
                ))}
            </div>

            {/* ─── TAB : TOURNAMENTS ─── */}
            {tab === "tournaments" && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Gestion des tournois</h2>
                        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                            <span className="flex items-center gap-2">
                                <FiPlus />
                                Créer un tournoi
                            </span>
                        </Button>
                    </div>

                    {(createMsg || statusMsg) && (
                        <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-sm text-zinc-300">
                            {createMsg || statusMsg}
                        </div>
                    )}

                    {/* FORMULAIRE CRÉATION */}
                    {showCreateForm && (
                        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-6">
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">Nouveau tournoi</h3>
                                <button type="button" onClick={() => setShowCreateForm(false)} className="text-zinc-500 hover:text-white">
                                    <FiX />
                                </button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Nom *</label>
                                    <input
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                        placeholder="Winter Clash 2026"
                                        value={tName}
                                        onChange={(e) => setTName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Jeu *</label>
                                    <input
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                        placeholder="Valorant"
                                        value={tGame}
                                        onChange={(e) => setTGame(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Format</label>
                                    <select
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                        value={tFormat}
                                        onChange={(e) => setTFormat(e.target.value as TournamentFormat)}
                                    >
                                        {FORMAT_OPTIONS.map((f) => (
                                            <option key={f} value={f}>{FORMAT_LABELS[f]}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Max équipes *</label>
                                    <input
                                        type="number"
                                        min="2"
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                        value={tMaxTeams}
                                        onChange={(e) => setTMaxTeams(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Date de début</label>
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                        value={tStartDate}
                                        onChange={(e) => setTStartDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Date de fin</label>
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                        value={tEndDate}
                                        onChange={(e) => setTEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm text-zinc-400">Description</label>
                                    <textarea
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                        rows={2}
                                        placeholder="Description du tournoi..."
                                        value={tDescription}
                                        onChange={(e) => setTDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 flex gap-3">
                                <Button
                                    onClick={handleCreate}
                                    disabled={creating || !tName || !tGame || !tMaxTeams}
                                >
                                    {creating ? "Création..." : "Créer le tournoi"}
                                </Button>
                                <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    )}

                    {loadingT && <LoadingSpinner />}
                    {errorT && <ErrorMessage message={errorT} />}

                    <div className="space-y-4">
                        {tournaments?.map((t: Tournament) => {
                            const nextStatuses = NEXT_STATUSES[t.status] ?? [];
                            return (
                                <div key={t.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                                                <Badge variant={STATUS_VARIANTS[t.status]}>
                                                    {STATUS_LABELS[t.status]}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                {t.game} • {FORMAT_LABELS[t.format]} •{" "}
                                                {t._count?.participants ?? 0}/{t.maxTeams} équipes
                                            </p>
                                            {t.startDate && (
                                                <p className="mt-1 text-xs text-zinc-600">
                                                    Début : {new Date(t.startDate).toLocaleDateString("fr-FR")}
                                                </p>
                                            )}
                                        </div>
                                        {nextStatuses.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {nextStatuses.map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => handleUpdateStatus(t.id, s)}
                                                        disabled={updatingStatus === t.id + s}
                                                        className={`rounded-lg border px-3 py-1 text-xs font-semibold transition disabled:opacity-50 ${
                                                            s === "CANCELLED"
                                                                ? "border-red-800 text-red-400 hover:bg-red-950"
                                                                : "border-zinc-600 text-zinc-300 hover:border-red-500 hover:text-white"
                                                        }`}
                                                    >
                                                        {updatingStatus === t.id + s
                                                            ? "..."
                                                            : `→ ${STATUS_LABELS[s]}`}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {!loadingT && (!tournaments || tournaments.length === 0) && (
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center text-zinc-500">
                                Aucun tournoi créé pour le moment.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── TAB : MATCHES ─── */}
            {tab === "matches" && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Validation des matchs</h2>

                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">Sélectionner un tournoi</label>
                            <select
                                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                value={selectedTournamentId ?? ""}
                                onChange={(e) => {
                                    setSelectedTournamentId(e.target.value || null);
                                    setMatchMsg(null);
                                    setShowMatchForm(false);
                                }}
                            >
                                <option value="">-- Choisir un tournoi --</option>
                                {tournaments?.map((t) => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                        {selectedTournamentId && (
                            <Button onClick={() => setShowMatchForm(!showMatchForm)}>
                                <span className="flex items-center gap-2"><FiPlus /> Créer un match</span>
                            </Button>
                        )}
                    </div>

                    {showMatchForm && selectedTournamentId && (
                        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Nouveau match</h3>
                                <button type="button" onClick={() => setShowMatchForm(false)} className="text-zinc-500 hover:text-white"><FiX /></button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Équipe A *</label>
                                    <select className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none" value={matchTeamA} onChange={(e) => setMatchTeamA(e.target.value)}>
                                        <option value="">-- Choisir --</option>
                                        {allTeams?.map((t) => <option key={t.id} value={t.id}>{t.name} [{t.tag}]</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Équipe B *</label>
                                    <select className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none" value={matchTeamB} onChange={(e) => setMatchTeamB(e.target.value)}>
                                        <option value="">-- Choisir --</option>
                                        {allTeams?.filter((t) => t.id !== matchTeamA).map((t) => <option key={t.id} value={t.id}>{t.name} [{t.tag}]</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Format</label>
                                    <select className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none" value={matchFormat} onChange={(e) => setMatchFormat(e.target.value as MatchFormat)}>
                                        {(["BO1", "BO3", "BO5"] as MatchFormat[]).map((f) => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Date prévue</label>
                                    <input type="datetime-local" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none" value={matchScheduledAt} onChange={(e) => setMatchScheduledAt(e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <Button onClick={handleCreateMatch} disabled={creatingMatch || !matchTeamA || !matchTeamB}>
                                    {creatingMatch ? "Création..." : "Créer le match"}
                                </Button>
                                <Button variant="secondary" onClick={() => setShowMatchForm(false)}>Annuler</Button>
                            </div>
                        </div>
                    )}

                    {matchMsg && (
                        <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-sm text-zinc-300">
                            {matchMsg}
                        </div>
                    )}

                    {selectedTournamentId && loadingM && <LoadingSpinner />}

                    {selectedTournamentId && !loadingM && (
                        <>
                            {(!tournamentMatches || tournamentMatches.length === 0) && (
                                <p className="text-zinc-500">Aucun match dans ce tournoi.</p>
                            )}

                            <div className="space-y-4">
                                {tournamentMatches?.map((match: Match) => (
                                    <div
                                        key={match.id}
                                        className={`rounded-2xl border p-5 ${
                                            match.status === "CONTESTED"
                                                ? "border-yellow-500/30 bg-yellow-500/5"
                                                : "border-zinc-800 bg-zinc-900/80"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-white">
                                                        Match {match.format}
                                                    </h3>
                                                    <Badge
                                                        variant={
                                                            match.status === "CONTESTED"
                                                                ? "warning"
                                                                : match.status === "COMPLETED"
                                                                ? "success"
                                                                : "neutral"
                                                        }
                                                    >
                                                        {match.status}
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    Score : {match.scoreA} – {match.scoreB}
                                                </p>
                                                <p className="mt-1 text-xs text-zinc-600 font-mono">
                                                    {match.id.slice(0, 18)}…
                                                </p>
                                            </div>
                                            {(match.status === "CONTESTED" ||
                                                match.status === "IN_PROGRESS") && (
                                                <Button
                                                    onClick={() => handleValidateMatch(match.id)}
                                                    disabled={validating === match.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <FiCheckCircle />
                                                    {validating === match.id ? "Validation..." : "Valider le score"}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {!selectedTournamentId && (
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center text-zinc-500">
                            Sélectionnez un tournoi pour voir ses matchs.
                        </div>
                    )}
                </div>
            )}

            {/* ─── TAB : REWARDS ─── */}
            {tab === "rewards" && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Attribuer une récompense</h2>

                    {rewardMsg && (
                        <div className={`rounded-xl border px-5 py-4 text-sm ${
                            rewardMsg.includes("succès")
                                ? "border-green-800 bg-green-950/20 text-green-300"
                                : "border-zinc-700 bg-zinc-900 text-zinc-300"
                        }`}>
                            {rewardMsg}
                        </div>
                    )}

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                        <div className="grid gap-4 max-w-lg">
                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">
                                    Joueur *
                                </label>
                                {rewardUserId ? (
                                    <div className="flex items-center gap-3 rounded-lg border border-red-700 bg-red-950/20 px-4 py-2">
                                        <span className="flex-1 text-white">
                                            {allUsers?.find((u) => u.id === rewardUserId)?.pseudo ?? rewardUserId}
                                        </span>
                                        <button type="button" onClick={() => { setRewardUserId(""); setRewardUserSearch(""); }} className="text-zinc-400 hover:text-red-400">
                                            <FiX />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                        <input
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-4 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                            placeholder="Rechercher un joueur..."
                                            value={rewardUserSearch}
                                            onChange={(e) => setRewardUserSearch(e.target.value)}
                                        />
                                        {rewardUserSearch.trim() && (
                                            <div className="absolute z-10 mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg max-h-48 overflow-y-auto">
                                                {(allUsers ?? [])
                                                    .filter((u) =>
                                                        u.pseudo.toLowerCase().includes(rewardUserSearch.toLowerCase()) ||
                                                        u.email.toLowerCase().includes(rewardUserSearch.toLowerCase())
                                                    )
                                                    .slice(0, 8)
                                                    .map((u) => (
                                                        <button
                                                            key={u.id}
                                                            type="button"
                                                            onClick={() => { setRewardUserId(u.id); setRewardUserSearch(""); }}
                                                            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-zinc-800"
                                                        >
                                                            <span className="font-semibold text-white">{u.pseudo}</span>
                                                            <span className="text-xs text-zinc-500">{u.email}</span>
                                                        </button>
                                                    ))
                                                }
                                                {(allUsers ?? []).filter((u) =>
                                                    u.pseudo.toLowerCase().includes(rewardUserSearch.toLowerCase()) ||
                                                    u.email.toLowerCase().includes(rewardUserSearch.toLowerCase())
                                                ).length === 0 && (
                                                    <p className="px-4 py-3 text-sm text-zinc-500">Aucun joueur trouvé.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">Type de récompense</label>
                                <div className="flex flex-wrap gap-3">
                                    {(["MEDAL", "CUP", "TITLE"] as RewardType[]).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setRewardType(t)}
                                            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                                                rewardType === t
                                                    ? "border-red-500 bg-red-950/30 text-white"
                                                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                                            }`}
                                        >
                                            {t === "MEDAL" ? "🥇 Médaille" : t === "CUP" ? "🏆 Coupe" : "🎖 Titre"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {rewardType === "MEDAL" && (
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Rang</label>
                                    <div className="flex flex-wrap gap-3">
                                        {(["GOLD", "SILVER", "BRONZE"] as MedalRank[]).map((r) => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setMedalRank(r)}
                                                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                                                    medalRank === r
                                                        ? "border-red-500 bg-red-950/30 text-white"
                                                        : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                                                }`}
                                            >
                                                {r === "GOLD" ? "🥇 Or" : r === "SILVER" ? "🥈 Argent" : "🥉 Bronze"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {rewardType === "CUP" && (
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Nom de la coupe</label>
                                    <input
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                        placeholder="Coupe Winter Clash"
                                        value={cupName}
                                        onChange={(e) => setCupName(e.target.value)}
                                    />
                                </div>
                            )}

                            {rewardType === "TITLE" && (
                                <div>
                                    <label className="mb-1 block text-sm text-zinc-400">Nom du titre</label>
                                    <input
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                        placeholder="Champion de la Saison"
                                        value={titleName}
                                        onChange={(e) => setTitleName(e.target.value)}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">Description (optionnel)</label>
                                <input
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                    placeholder="Description de la récompense"
                                    value={rewardDesc}
                                    onChange={(e) => setRewardDesc(e.target.value)}
                                />
                            </div>

                            <div className="pt-2">
                                <Button
                                    onClick={handleAwardReward}
                                    disabled={awarding || !rewardUserId.trim()}
                                    className="flex items-center gap-2"
                                >
                                    <FiAward />
                                    {awarding ? "Attribution..." : "Attribuer la récompense"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
