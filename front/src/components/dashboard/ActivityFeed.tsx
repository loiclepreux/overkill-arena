import type { Match } from "@/services/matches.api";
import type { Team } from "@/services/teams.api";

function teamName(allTeams: Team[] | null | undefined, id: string): string {
    return allTeams?.find((t) => t.id === id)?.name ?? id.slice(0, 8);
}

function relativeTime(dateStr: string | null | undefined): string {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.floor(hours / 24)} j`;
}

type ActivityFeedProps = {
    matches?: Match[] | null;
    allTeams?: Team[] | null;
};

export function ActivityFeed({ matches, allTeams }: ActivityFeedProps) {
    const activities = (matches ?? [])
        .slice(0, 5)
        .map((m) => {
            const nameA = teamName(allTeams, m.teamAId);
            const nameB = teamName(allTeams, m.teamBId);
            const description =
                m.status === "COMPLETED"
                    ? `Résultat : ${m.scoreA} – ${m.scoreB}`
                    : m.status === "IN_PROGRESS"
                    ? "En cours"
                    : m.status === "CONTESTED"
                    ? "Résultat contesté"
                    : "Match programmé";
            const time = relativeTime(m.playedAt ?? m.scheduledAt ?? m.createdAt);
            return { id: m.id, title: `${nameA} vs ${nameB}`, description, time };
        });

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Activité récente</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Derniers matchs de votre équipe.
                </p>
            </div>

            {activities.length === 0 && (
                <p className="text-sm text-zinc-500">Aucun match à afficher pour le moment.</p>
            )}

            <div className="space-y-5">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="rounded-xl border border-zinc-800 bg-black/30 p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-white">{activity.title}</h3>
                                <p className="mt-2 text-sm text-zinc-400">{activity.description}</p>
                            </div>
                            {activity.time && (
                                <span className="shrink-0 text-xs text-zinc-500">{activity.time}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
