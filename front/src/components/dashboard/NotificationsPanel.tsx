import { Badge } from "@/components/ui/Badge";
import type { Notification, NotificationType } from "@/types/dashboard";

const defaultNotifications: Notification[] = [
    {
        id: 1,
        title: "Le match va bientôt commencer",
        description: "Votre match contre Nova Squad démarre dans 10 minutes.",
        type: "EN DIRECT",
        time: "maintenant",
    },
    {
        id: 2,
        title: "Inscription au tournoi validée",
        description: "Votre équipe a été validée pour le Winter Cup.",
        type: "SUCCÈS",
        time: "12 min",
    },
    {
        id: 3,
        title: "En attente de vérification",
        description: "Un administrateur doit vérifier une preuve de match.",
        type: "AVERTISSEMENT",
        time: "1 h",
    },
];

function getBadgeVariant(
    type: NotificationType,
): "success" | "warning" | "danger" | "neutral" {
    switch (type) {
        case "EN DIRECT":
            return "danger";
        case "SUCCÈS":
            return "success";
        case "AVERTISSEMENT":
            return "warning";
        default:
            return "neutral";
    }
}

type NotificationsPanelProps = {
    notifications?: Notification[];
};

export function NotificationsPanel({
    notifications = defaultNotifications,
}: NotificationsPanelProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Alertes importantes et événements live.
                </p>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="rounded-xl border border-zinc-800 bg-black/30 p-4"
                    >
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <h3 className="font-semibold text-white">
                                {notification.title}
                            </h3>
                            <Badge variant={getBadgeVariant(notification.type)}>
                                {notification.type}
                            </Badge>
                        </div>
                        <p className="text-sm text-zinc-400">{notification.description}</p>
                        <p className="mt-3 text-xs text-zinc-500">{notification.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
