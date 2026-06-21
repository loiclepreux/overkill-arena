import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Tournament, TournamentStatus } from "@/types/dashboard";

const defaultTournaments: Tournament[] = [
    {
        id: 1,
        name: "Winter Clash",
        game: "Valorant",
        teams: 32,
        recompense: "15 🥇",
        status: "OUVERT",
        startDate: "12 Jan 2026",
    },
    {
        id: 2,
        name: "Arena Masters",
        game: "CS2",
        teams: 16,
        recompense: "10 🥇",
        status: "EN DIRECT",
        startDate: "En cours",
    },
    {
        id: 3,
        name: "Phoenix Cup",
        game: "League of Legends",
        teams: 64,
        recompense: "5 🥇",
        status: "TERMINÉ",
        startDate: "Terminé",
    },
];

function getBadgeVariant(
    status: TournamentStatus,
): "success" | "warning" | "danger" | "neutral" {
    switch (status) {
        case "OUVERT":
            return "success";
        case "EN DIRECT":
            return "danger";
        case "TERMINÉ":
            return "neutral";
        default:
            return "neutral";
    }
}

type TournamentWidgetProps = {
    tournaments?: Tournament[];
};

export function TournamentWidget({
    tournaments = defaultTournaments,
}: TournamentWidgetProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Tournois</h2>
                <p className="mt-2 text-sm text-zinc-500">Tournois actifs et compétitions.</p>
            </div>

            <div className="space-y-5">
                {tournaments.map((tournament) => (
                    <div
                        key={tournament.id}
                        className="rounded-xl border border-zinc-800 bg-black/30 p-5"
                    >
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                                <p className="mt-2 text-sm text-zinc-500">{tournament.game}</p>
                            </div>
                            <Badge variant={getBadgeVariant(tournament.status)}>
                                {tournament.status}
                            </Badge>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Équipes
                                </p>
                                <p className="mt-1 text-lg font-bold text-white">
                                    {tournament.teams}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Récompense
                                </p>
                                <p className="mt-1 text-lg font-bold text-red-500">
                                    {tournament.recompense}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Date
                                </p>
                                <p className="mt-1 text-lg font-bold text-white">
                                    {tournament.startDate}
                                </p>
                            </div>
                        </div>

                        <Button className="mt-5 w-full">Voir le tournoi</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
