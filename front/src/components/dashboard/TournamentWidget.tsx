import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Tournament = {
    id: number;
    name: string;
    game: string;
    teams: number;
    cashPrize: string;
    status: "OPEN" | "LIVE" | "CLOSED";
    startDate: string;
};

const tournaments: Tournament[] = [
    {
        id: 1,
        name: "Winter Clash",
        game: "Valorant",
        teams: 32,
        cashPrize: "5 000€",
        status: "OPEN",
        startDate: "12 Jan 2026",
    },

    {
        id: 2,
        name: "Arena Masters",
        game: "CS2",
        teams: 16,
        cashPrize: "10 000€",
        status: "LIVE",
        startDate: "Live now",
    },

    {
        id: 3,
        name: "Phoenix Cup",
        game: "League of Legends",
        teams: 64,
        cashPrize: "25 000€",
        status: "CLOSED",
        startDate: "Finished",
    },
];

function getBadgeVariant(
    status: Tournament["status"],
): "success" | "warning" | "danger" | "neutral" {
    switch (status) {
        case "OPEN":
            return "success";

        case "LIVE":
            return "danger";

        case "CLOSED":
            return "neutral";

        default:
            return "neutral";
    }
}

export function TournamentWidget() {
    return (
        <div
            className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        shadow-lg shadow-black/30
      "
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Tournois</h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Tournois actifs et compétitions.
                </p>
            </div>

            <div className="space-y-5">
                {tournaments.map((tournament) => (
                    <div
                        key={tournament.id}
                        className="
              rounded-xl border border-zinc-800
              bg-black/30 p-5
            "
                    >
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    {tournament.name}
                                </h3>

                                <p className="mt-2 text-sm text-zinc-500">
                                    {tournament.game}
                                </p>
                            </div>

                            <Badge variant={getBadgeVariant(tournament.status)}>
                                {tournament.status}
                            </Badge>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Teams
                                </p>

                                <p className="mt-1 text-lg font-bold text-white">
                                    {tournament.teams}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    CashPrize
                                </p>

                                <p className="mt-1 text-lg font-bold text-red-500">
                                    {tournament.cashPrize}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Start
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
