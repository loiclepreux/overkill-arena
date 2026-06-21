import type { Team } from "@/types/dashboard";

const defaultTeams: Team[] = [
    { id: 1, name: "Team Phoenix", elo: 2450, wins: 28 },
    { id: 2, name: "Nova Squad", elo: 2380, wins: 24 },
    { id: 3, name: "Red Wolves", elo: 2290, wins: 21 },
    { id: 4, name: "Shadow Reapers", elo: 2170, wins: 19 },
    { id: 5, name: "Cyber Titans", elo: 2105, wins: 16 },
];

type LeaderboardProps = {
    teams?: Team[];
};

export function Leaderboard({ teams = defaultTeams }: LeaderboardProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Classement</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Meilleures équipes par ELO.
                </p>
            </div>

            <div className="space-y-4">
                {teams.map((team, index) => (
                    <div
                        key={team.id}
                        className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                                #{index + 1}
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{team.name}</h3>
                                <p className="text-sm text-zinc-500">{team.wins} victoires</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-red-500">{team.elo}</p>
                            <p className="text-xs uppercase tracking-wide text-zinc-500">ELO</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
