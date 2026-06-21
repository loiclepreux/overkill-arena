import { useParams, useNavigate } from "react-router-dom";
import { FiAward, FiArrowLeft, FiShield, FiTarget, FiUser } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useApi } from "@/hooks/useApi";
import { usersApi } from "@/services/users.api";
import { rewardsApi } from "@/services/rewards.api";
import { teamsApi } from "@/services/teams.api";
import { useAuthStore } from "@/store/auth.store";

export function PlayerPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user: currentUser } = useAuthStore();

    const { data: me, loading, error } = useApi(() => usersApi.getById(id!));
    const { data: rewardStats } = useApi(() => rewardsApi.getStatsByUser(id!));
    const { data: allTeams } = useApi(teamsApi.getAll);

    const team = allTeams?.find((t) => t.members.some((m) => m.userId === id));
    const isMe = id === currentUser?.id;

    if (loading) return <LoadingSpinner message="Chargement du profil..." />;
    if (error || !me) return <ErrorMessage message={error ?? "Joueur introuvable."} />;

    const { profile, stats } = me;

    return (
        <section className="space-y-8">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
                >
                    <FiArrowLeft /> Retour
                </button>

                <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-red-600 bg-black text-4xl font-bold text-white">
                        {profile.pseudo.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="danger">{profile.pseudo}</Badge>
                            {isMe && <Badge variant="success">Vous</Badge>}
                            {team && <Badge variant="warning">[{team.tag}] {team.name}</Badge>}
                        </div>

                        <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                            {profile.pseudo}
                        </h1>

                        {profile.bio && (
                            <p className="mt-3 max-w-xl text-zinc-400">{profile.bio}</p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-500">
                            {profile.country && <span>🌍 {profile.country}</span>}
                            {profile.favoriteGame && <span>🎮 {profile.favoriteGame}</span>}
                            <span>◆ {stats.rank} ◆</span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-300">
                            <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                🥇 {rewardStats?.medals.gold ?? 0} or
                            </span>
                            <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                🥈 {rewardStats?.medals.silver ?? 0} argent
                            </span>
                            <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                🥉 {rewardStats?.medals.bronze ?? 0} bronze
                            </span>
                            <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                🏆 {rewardStats?.cups ?? 0} coupes
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="ELO" value={stats.elo} icon={<FiAward />} description="Classement actuel" />
                <DashboardStatCard title="Victoires" value={stats.wins} icon={<FiTarget />} description="Toutes saisons" />
                <DashboardStatCard title="Défaites" value={stats.losses} icon={<FiShield />} description="Matchs perdus" />
                <DashboardStatCard title="Tournois" value={stats.tournamentsPlayed} icon={<FiAward />} description="Participations" />
            </div>

            {/* INFOS + ÉQUIPE */}
            <div className="grid gap-8 xl:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <FiUser className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Statistiques</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            ["Niveau", `${stats.level}`],
                            ["XP", `${stats.xp}`],
                            ["W/L", `${stats.wins}/${stats.losses}`],
                            ["Tournois gagnés", `${stats.tournamentsWon}`],
                        ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                                <p className="text-xs text-zinc-500">{label}</p>
                                <p className="mt-2 text-xl font-bold text-white">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {team && (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <FiShield className="text-2xl text-red-500" />
                            <h2 className="text-2xl font-bold text-white">Équipe</h2>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                            <h3 className="text-2xl font-bold text-white">{team.name}</h3>
                            <p className="mt-2 text-zinc-500">Tag : [{team.tag}]</p>
                            {team.description && (
                                <p className="mt-3 text-sm text-zinc-400">{team.description}</p>
                            )}
                            <div className="mt-4 flex items-center gap-3">
                                <Badge variant="danger">{team.members.length} membres</Badge>
                                <Badge variant="neutral">
                                    {team.members.find((m) => m.userId === id)?.role ?? "MEMBER"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
