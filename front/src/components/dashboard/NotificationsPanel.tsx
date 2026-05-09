import { Badge } from "@/components/ui/Badge";

type Notification = {
    id: number;
    title: string;
    description: string;
    type: "LIVE" | "SUCCESS" | "WARNING";
    time: string;
};

const notifications: Notification[] = [
    {
        id: 1,
        title: "Match starts soon",
        description: "Votre match contre Nova Squad démarre dans 10 minutes.",
        type: "LIVE",
        time: "now",
    },

    {
        id: 2,
        title: "Tournament registration validated",
        description: "Votre équipe a été validée pour le Winter Cup.",
        type: "SUCCESS",
        time: "12 min ago",
    },

    {
        id: 3,
        title: "Pending screenshot review",
        description: "Un administrateur doit vérifier une preuve de match.",
        type: "WARNING",
        time: "1 hour ago",
    },
];

function getBadgeVariant(
    type: Notification["type"],
): "success" | "warning" | "danger" | "neutral" {
    switch (type) {
        case "LIVE":
            return "danger";

        case "SUCCESS":
            return "success";

        case "WARNING":
            return "warning";

        default:
            return "neutral";
    }
}

export function NotificationsPanel() {
    return (
        <div
            className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        shadow-lg shadow-black/30
      "
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Notifications</h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Activité importante et alertes live.
                </p>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="
              rounded-xl border border-zinc-800
              bg-black/30 p-4
            "
                    >
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <h3 className="font-semibold text-white">
                                {notification.title}
                            </h3>

                            <Badge variant={getBadgeVariant(notification.type)}>
                                {notification.type}
                            </Badge>
                        </div>

                        <p className="text-sm text-zinc-400">
                            {notification.description}
                        </p>

                        <p className="mt-3 text-xs text-zinc-500">
                            {notification.time}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
