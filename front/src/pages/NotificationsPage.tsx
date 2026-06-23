import { useState, useEffect, useCallback } from "react";
import { FiBell, FiCheckCircle, FiAward, FiUsers } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useAuthStore } from "@/store/auth.store";
import { useApi, getErrorMessage } from "@/hooks/useApi";
import { notificationsApi } from "@/services/notifications.api";
import type { Notification, NotificationKind } from "@/services/notifications.api";

const KIND_LABEL: Record<NotificationKind, string> = {
    MATCH_START: "Match",
    MATCH_RESULT: "Résultat",
    TEAM_INVITATION: "Invitation",
    TOURNAMENT_UPDATE: "Tournoi",
    REWARD_EARNED: "Récompense",
    SYSTEM: "Système",
};

const KIND_VARIANT: Record<NotificationKind, "danger" | "success" | "warning" | "neutral"> = {
    MATCH_START: "danger",
    MATCH_RESULT: "success",
    TEAM_INVITATION: "warning",
    TOURNAMENT_UPDATE: "warning",
    REWARD_EARNED: "success",
    SYSTEM: "neutral",
};

const LIMIT = 15;

function timeAgo(date: string): string {
    const diff = Date.now() - new Date(date).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "À l'instant";
    if (min < 60) return `Il y a ${min} min`;
    const h = Math.floor(min / 60);
    if (h < 24) return `Il y a ${h}h`;
    return `Il y a ${Math.floor(h / 24)} jour(s)`;
}

export function NotificationsPage() {
    const { setUnreadNotificationsCount, unreadNotificationsCount } = useAuthStore();
    const [markingAll, setMarkingAll] = useState(false);
    const [actionMsg, setActionMsg] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [total, setTotal] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadingFirst, setLoadingFirst] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const { data: unreadData, refetch: refetchCount } = useApi(notificationsApi.getUnreadCount);
    const unread = unreadData?.count ?? 0;

    useEffect(() => {
        notificationsApi.getAll(1, LIMIT)
            .then((res) => {
                setTotal(res.total);
                setNotifications(res.notifications);
            })
            .catch((err: unknown) => { setFetchError(getErrorMessage(err)); })
            .finally(() => setLoadingFirst(false));
    }, []);

    const fetchMore = useCallback(async (p: number) => {
        try {
            const res = await notificationsApi.getAll(p, LIMIT);
            setFetchError(null);
            setTotal(res.total);
            setNotifications((prev) => [...prev, ...res.notifications]);
        } catch (err) {
            setFetchError(getErrorMessage(err));
        } finally {
            setLoadingMore(false);
        }
    }, []);

    function handleLoadMore() {
        const nextPage = page + 1;
        setPage(nextPage);
        setLoadingMore(true);
        void fetchMore(nextPage);
    }

    async function handleMarkRead(id: string) {
        try {
            await notificationsApi.markRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            );
            refetchCount();
            setUnreadNotificationsCount(Math.max(0, unreadNotificationsCount - 1));
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        }
    }

    async function handleMarkAllRead() {
        setMarkingAll(true);
        setActionMsg(null);
        try {
            await notificationsApi.markAllRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            setUnreadNotificationsCount(0);
            refetchCount();
            setActionMsg("Toutes les notifications marquées comme lues.");
        } catch (err) {
            setActionMsg(getErrorMessage(err));
        } finally {
            setMarkingAll(false);
        }
    }

    const rewardCount = notifications.filter((n) => n.kind === "REWARD_EARNED").length;
    const invitationCount = notifications.filter((n) => n.kind === "TEAM_INVITATION").length;
    const hasMore = notifications.length < total;

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">Notification Center</Badge>
                    <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">Notifications</h1>
                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Suis tes invitations, récompenses, matchs à venir et alertes importantes.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {unread > 0 && <Badge variant="danger">{unread} non lue{unread > 1 ? "s" : ""}</Badge>}
                        {rewardCount > 0 && <Badge variant="success">{rewardCount} récompense{rewardCount > 1 ? "s" : ""}</Badge>}
                        {invitationCount > 0 && <Badge variant="warning">{invitationCount} invitation{invitationCount > 1 ? "s" : ""}</Badge>}
                    </div>
                </div>
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="Non lues" value={unread} icon={<FiBell />} description="À consulter" />
                <DashboardStatCard title="Total" value={total} icon={<FiCheckCircle />} description="Toutes notifications" />
                <DashboardStatCard title="Récompenses" value={rewardCount} icon={<FiAward />} description="Médailles et titres" />
                <DashboardStatCard title="Invitations" value={invitationCount} icon={<FiUsers />} description="Équipes et tournois" />
            </div>

            {actionMsg && (
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-sm text-zinc-300">
                    {actionMsg}
                </div>
            )}

            {/* LISTE */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FiBell className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">
                            Mes notifications
                            {total > 0 && <span className="ml-2 text-lg font-normal text-zinc-500">({total})</span>}
                        </h2>
                    </div>
                    {unread > 0 && (
                        <Button variant="secondary" onClick={handleMarkAllRead} disabled={markingAll}>
                            {markingAll ? "En cours..." : "Tout marquer comme lu"}
                        </Button>
                    )}
                </div>

                {loadingFirst && <LoadingSpinner />}
                {fetchError && <ErrorMessage message={fetchError} />}

                {!loadingFirst && notifications.length === 0 && (
                    <div className="py-12 text-center text-zinc-500">
                        <FiBell className="mx-auto mb-4 text-4xl text-zinc-700" />
                        <p>Aucune notification pour le moment.</p>
                    </div>
                )}

                <div className="space-y-3">
                    {notifications.map((n: Notification) => (
                        <div
                            key={n.id}
                            className={`rounded-xl border p-5 transition ${
                                n.read
                                    ? "border-zinc-800 bg-black/30"
                                    : "border-red-900/40 bg-red-950/10"
                            }`}
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Badge variant={KIND_VARIANT[n.kind]}>{KIND_LABEL[n.kind]}</Badge>
                                        {!n.read && <span className="h-2 w-2 rounded-full bg-red-500" />}
                                    </div>
                                    <h3 className="font-bold text-white">{n.title}</h3>
                                    <p className="mt-2 text-sm text-zinc-400">{n.message}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xs text-zinc-500">{timeAgo(n.createdAt)}</span>
                                    {!n.read && (
                                        <button
                                            type="button"
                                            onClick={() => handleMarkRead(n.id)}
                                            className="text-xs text-red-400 hover:text-red-300"
                                        >
                                            Marquer lu
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-6 text-center">
                        <Button
                            variant="secondary"
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? "Chargement..." : `Charger plus (${total - notifications.length} restantes)`}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
