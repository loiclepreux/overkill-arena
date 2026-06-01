import { Badge } from "@/components/ui/Badge";
import type { Match } from "@/types/dashboard";

const matches: Match[] = [
    {
        id: 1,
        teamA: "Team Phoenix",
        teamB: "Nova Squad",
        scoreA: 2,
        scoreB: 1,
        format: "BO3",
        status: "VALIDÉ",
        time: "15 min ago",
    },

    {
        id: 2,
        teamA: "Red Wolves",
        teamB: "Cyber Titans",
        scoreA: 1,
        scoreB: 1,
        format: "BO3",
        status: "LIVE",
        time: "Live now",
    },

    {
        id: 3,
        teamA: "Shadow Reapers",
        teamB: "Night Hunters",
        scoreA: 0,
        scoreB: 0,
        format: "BO5",
        status: "PENDING",
        time: "Starts in 30 min",
    },
];

function getBadgeVariant(
    status: Match["status"],
): "success" | "warning" | "danger" | "neutral" {
    switch (status) {
        case "VALIDÉ":
            return "success";

        case "LIVE":
            return "danger";

        case "PENDING":
            return "warning";

        default:
            return "neutral";
    }
}

export function RecentMatches() {
    return (
        <div
            className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        shadow-lg shadow-black/30
      "
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Matchs récents
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Derniers matchs et résultats.
                </p>
            </div>

            <div className="space-y-4">
                {matches.map((match) => (
                    <div
                        key={match.id}
                        className="
              rounded-xl border border-zinc-800
              bg-black/30 p-5
            "
                    >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            {/* TEAMS */}
                            <div>
                                <div className="flex items-center gap-3 text-lg font-bold">
                                    <span className="text-white">
                                        {match.teamA}
                                    </span>

                                    <span className="text-red-500">
                                        {match.scoreA}
                                    </span>

                                    <span className="text-zinc-500">-</span>

                                    <span className="text-red-500">
                                        {match.scoreB}
                                    </span>

                                    <span className="text-white">
                                        {match.teamB}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-zinc-500">
                                    {match.format}
                                </p>
                            </div>

                            {/* STATUS */}
                            <div className="flex items-center gap-4">
                                <Badge variant={getBadgeVariant(match.status)}>
                                    {match.status}
                                </Badge>

                                <span className="text-sm text-zinc-500">
                                    {match.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
