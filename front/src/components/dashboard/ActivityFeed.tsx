import type { Activity } from "@/types/dashboard";

const defaultActivities: Activity[] = [
    {
        id: 1,
        title: "Team Phoenix inscrit à la Winter Cup",
        description: "Nouvelle équipe inscrite au tournoi.",
        time: "2 min",
    },
    {
        id: 2,
        title: "Match Alpha vs Nova terminé",
        description: "Résultat validé par les arbitres.",
        time: "18 min",
    },
    {
        id: 3,
        title: "Nouveau joueur inscrit",
        description: "Un nouveau joueur a créé un compte.",
        time: "1 h",
    },
    {
        id: 4,
        title: "Le tournoi commence bientôt",
        description: "Le tournoi Spring Clash démarre dans 2 heures.",
        time: "2 h",
    },
];

type ActivityFeedProps = {
    activities?: Activity[];
};

export function ActivityFeed({ activities = defaultActivities }: ActivityFeedProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Activité récente</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Dernières actions sur la plateforme.
                </p>
            </div>

            <div className="space-y-5">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="rounded-xl border border-zinc-800 bg-black/30 p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-white">
                                    {activity.title}
                                </h3>
                                <p className="mt-2 text-sm text-zinc-400">
                                    {activity.description}
                                </p>
                            </div>
                            <span className="shrink-0 text-xs text-zinc-500">
                                {activity.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
