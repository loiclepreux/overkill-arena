import {
    FiAward,
    FiBell,
    FiCheckCircle,
    FiSettings,
    FiShield,
    FiUsers,
} from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

export function NotificationsPage() {
    return (
        <section className="space-y-10">
            <div
                className="
                    relative overflow-hidden rounded-3xl
                    border border-zinc-800
                    bg-gradient-to-br from-red-950/40 via-black to-zinc-950
                    p-5 sm:p-8
                "
            >
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">Notification Center</Badge>

                    <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
                        Notifications
                    </h1>

                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Suis tes invitations, récompenses, matchs à venir et
                        alertes importantes.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Badge variant="danger">3 non lues</Badge>
                        <Badge variant="warning">Tournois</Badge>
                        <Badge variant="success">Récompenses</Badge>
                    </div>
                </div>

                <div
                    className="
                        absolute -right-20 -top-20
                        h-72 w-72 rounded-full
                        bg-red-600/20 blur-3xl
                    "
                />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard
                    title="Non lues"
                    value={3}
                    icon={<FiBell />}
                    description="À consulter"
                />

                <DashboardStatCard
                    title="Lues"
                    value={18}
                    icon={<FiCheckCircle />}
                    description="Déjà traitées"
                />

                <DashboardStatCard
                    title="Récompenses"
                    value={5}
                    icon={<FiAward />}
                    description="Médailles et titres"
                />

                <DashboardStatCard
                    title="Invitations"
                    value={2}
                    icon={<FiUsers />}
                    description="Équipes et tournois"
                />
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiBell className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Aujourd’hui
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <NotificationItem
                            badge="Récompense"
                            variant="success"
                            title="Médaille d’or obtenue"
                            description="Vous avez terminé 1er du Winter Clash."
                            time="Il y a 15 min"
                        />

                        <NotificationItem
                            badge="Match"
                            variant="danger"
                            title="Winter Clash commence bientôt"
                            description="Votre demi-finale démarre dans 2 heures."
                            time="Il y a 32 min"
                        />

                        <NotificationItem
                            badge="Invitation"
                            variant="warning"
                            title="Invitation reçue"
                            description="NovaX vous a invité dans Team Phoenix."
                            time="Il y a 1h"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiShield className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Cette semaine
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <NotificationItem
                            badge="Titre"
                            variant="danger"
                            title="Titre amélioré"
                            description="Votre progression vous rapproche du rang Prestige."
                            time="Hier"
                        />

                        <NotificationItem
                            badge="Coupe"
                            variant="success"
                            title="Nouvelle coupe débloquée"
                            description="Vous avez obtenu une coupe supplémentaire."
                            time="Il y a 2 jours"
                        />

                        <NotificationItem
                            badge="Admin"
                            variant="warning"
                            title="Contestation validée"
                            description="Un résultat contesté a été vérifié par un administrateur."
                            time="Il y a 4 jours"
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                <div className="mb-6 flex items-center gap-3">
                    <FiSettings className="text-2xl text-red-500" />

                    <h2 className="text-2xl font-bold text-white">
                        Actions rapides
                    </h2>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Button>Tout marquer comme lu</Button>
                    <Button variant="secondary">
                        Paramètres notifications
                    </Button>
                    <Button variant="secondary">Voir l’historique</Button>
                </div>
            </div>
        </section>
    );
}

type NotificationVariant = "success" | "warning" | "danger" | "neutral";

type NotificationItemProps = {
    badge: string;
    variant: NotificationVariant;
    title: string;
    description: string;
    time: string;
};

function NotificationItem({
    badge,
    variant,
    title,
    description,
    time,
}: NotificationItemProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="mb-3">
                        <Badge variant={variant}>{badge}</Badge>
                    </div>

                    <h3 className="font-bold text-white">{title}</h3>

                    <p className="mt-2 text-sm text-zinc-400">{description}</p>
                </div>

                <span className="text-sm text-zinc-500">{time}</span>
            </div>
        </div>
    );
}
