import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FiAward,
    FiBell,
    FiRadio,
    FiShield,
    FiTarget,
} from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { MatchActivityChart } from "@/components/dashboard/MatchActivityChart";
import { useAuthStore } from "@/store/auth.store";
import { useApi } from "@/hooks/useApi";
import { usersApi } from "@/services/users.api";
import { rewardsApi } from "@/services/rewards.api";
import { teamsApi } from "@/services/teams.api";
import { matchesApi } from "@/services/matches.api";
import { notificationsApi } from "@/services/notifications.api";

export function DashboardPage() {
    const { user, setUnreadNotificationsCount } = useAuthStore();

    const { data: me } = useApi(usersApi.getMe);
    const { data: rewardStats } = useApi(rewardsApi.getMyStats);
    const { data: team } = useApi(() => teamsApi.getMyTeam().catch(() => null));
    const { data: unreadData } = useApi(notificationsApi.getUnreadCount);
    const { data: matches } = useApi(() =>
        team ? matchesApi.getByTeam(team.id) : Promise.resolve([])
    );

    useEffect(() => {
        if (unreadData) setUnreadNotificationsCount(unreadData.count);
    }, [unreadData, setUnreadNotificationsCount]);

    const totalCups = (rewardStats?.cups ?? 0);
    const upcomingMatch = matches?.find((m) => m.status === "PENDING");

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Badge variant="danger">Command Center</Badge>
                        <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
                            Bienvenue, {user?.pseudo}
                        </h1>
                        <p className="mt-4 max-w-2xl text-zinc-400">
                            Suis ton équipe, tes matchs, ta progression et tes prochaines compétitions depuis ton tableau de bord.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Badge variant="danger">◆ {me?.stats.rank ?? "Bronze"} ◆</Badge>
                            <Badge variant="warning">🏆 {totalCups} coupes</Badge>
                            {team && <Badge variant="success">{team.name}</Badge>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link to="/dashboard/tournaments">
                            <Button>Voir mes tournois</Button>
                        </Link>
                        <Link to="/dashboard/rewards">
                            <Button variant="secondary">Voir mes récompenses</Button>
                        </Link>
                    </div>
                </div>

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="ELO" value={me?.stats.elo ?? "—"} icon={<FiAward />} description="Classement joueur" />
                <DashboardStatCard title="Victoires" value={me?.stats.wins ?? "—"} icon={<FiTarget />} description="Toutes saisons" />
                <DashboardStatCard
                    title="Équipe"
                    value={team?.name ?? "Aucune"}
                    icon={<FiShield />}
                    description={team ? `${team.members.length} membres` : "Rejoindre une équipe"}
                />
                <DashboardStatCard
                    title="Notifications"
                    value={unreadData?.count ?? 0}
                    icon={<FiBell />}
                    description="Non lues"
                />
            </div>

            {/* PROCHAIN MATCH + PROGRESSION */}
            <div className="grid gap-8 xl:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiRadio className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Prochain match</h2>
                    </div>
                    {upcomingMatch ? (
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {upcomingMatch.teamAId} vs {upcomingMatch.teamBId}
                                    </h3>
                                    <p className="mt-2 text-zinc-500">
                                        {upcomingMatch.format}
                                        {upcomingMatch.scheduledAt && ` • ${new Date(upcomingMatch.scheduledAt).toLocaleString("fr-FR")}`}
                                    </p>
                                </div>
                                <Badge variant="warning">À venir</Badge>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-zinc-700 bg-black/30 p-5 text-center text-zinc-500">
                            {team ? "Aucun match à venir." : "Rejoignez une équipe pour voir vos matchs."}
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiAward className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Progression</h2>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-white">Rang : {me?.stats.rank ?? "Bronze"}</p>
                                <p className="text-sm text-zinc-500">Niveau {me?.stats.level ?? 1}</p>
                            </div>
                            <div className="mt-3 h-4 overflow-hidden rounded-full bg-zinc-800">
                                <div
                                    className="h-full rounded-full bg-red-500"
                                    style={{ width: `${Math.min((me?.stats.xp ?? 0) % 1000 / 10, 100)}%` }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-zinc-500">{me?.stats.xp ?? 0} XP</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
                                <p className="text-3xl">🥇</p>
                                <p className="mt-2 text-2xl font-bold text-white">{rewardStats?.medals.gold ?? 0}</p>
                            </div>
                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
                                <p className="text-3xl">🥈</p>
                                <p className="mt-2 text-2xl font-bold text-white">{rewardStats?.medals.silver ?? 0}</p>
                            </div>
                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
                                <p className="text-3xl">🥉</p>
                                <p className="mt-2 text-2xl font-bold text-white">{rewardStats?.medals.bronze ?? 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                <ActivityFeed />
                <MatchActivityChart />
            </div>
        </section>
    );
}
