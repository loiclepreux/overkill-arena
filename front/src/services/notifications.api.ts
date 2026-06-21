import { api } from "@/lib/axios";

export type NotificationKind =
    | "MATCH_START"
    | "MATCH_RESULT"
    | "TEAM_INVITATION"
    | "TOURNAMENT_UPDATE"
    | "REWARD_EARNED"
    | "SYSTEM";

export type Notification = {
    id: string;
    userId: string;
    kind: NotificationKind;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
};

export type NotificationsResponse = {
    notifications: Notification[];
    total: number;
    page: number;
    limit: number;
};

export const notificationsApi = {
    getAll: (page = 1, limit = 20) =>
        api
            .get<NotificationsResponse>("/notifications", {
                params: { page, limit },
            })
            .then((r) => r.data),
    getUnreadCount: () =>
        api
            .get<{ count: number }>("/notifications/unread-count")
            .then((r) => r.data),
    markRead: (id: string) =>
        api.patch(`/notifications/${id}/read`).then((r) => r.data),
    markAllRead: () =>
        api.patch("/notifications/read-all").then((r) => r.data),
};
