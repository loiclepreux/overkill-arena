import {
    FiAward,
    FiShield,
    FiTarget,
    FiTrendingUp,
    FiUsers,
} from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const teams = [
    {
        id: 1,
        name: "Team Phoenix",
        elo: 2450,
        wins: 28,
        losses: 4,
        winrate: "87%",
    },

    {
        id: 2,
        name: "Nova Squad",
        elo: 2380,
        wins: 24,
        losses: 7,
        winrate: "77%",
    },

    {
        id: 3,
        name: "Red Wolves",
        elo: 2290,
        wins: 21,
        losses: 8,
        winrate: "72%",
    },
];

const players = [
    {
        id: 1,
        pseudo: "OverkillPlayer",
        elo: 2450,
        role: "Captain",
    },

    {
        id: 2,
        pseudo: "NovaX",
        elo: 2380,
        role: "Sniper",
    },

    {
        id: 3,
        pseudo: "Ghost",
        elo: 2280,
        role: "Support",
    },
];

export function LeaderboardPage() {
    return (
        <section className="space-y-10">
            {/* HERO */}
            <div
                className="
          relative overflow-hidden rounded-3xl
          border border-zinc-800
          bg-gradient-to-br from-red-950/40 via-black to-zinc-950
          p-8
        "
            >
                <div className="relative z-10 max-w-3xl">
                    <Badge variant="danger">Competitive Rankings</Badge>

                    <h1
                        className="
              mt-6 text-5xl font-extrabold
              leading-tight text-white
            "
                    >
                        Classement Overkill Arena
                    </h1>

                    <p
                        className="
              mt-6 text-lg leading-relaxed
              text-zinc-400
            "
                    >
                        Découvrez les meilleures équipes et les meilleurs
                        joueurs de la plateforme.
                    </p>
                </div>

                {/* GLOW */}
                <div
                    className="
            absolute -right-20 -top-20
            h-72 w-72 rounded-full
            bg-red-600/20 blur-3xl
          "
                />
            </div>

            {/* STATS */}
            <div
                className="
          grid gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
            >
                <DashboardStatCard
                    title="Top ELO"
                    value={2450}
                    icon={<FiAward />}
                    description="Meilleur classement"
                />

                <DashboardStatCard
                    title="Équipes"
                    value={64}
                    icon={<FiShield />}
                    description="Classées"
                />

                <DashboardStatCard
                    title="Joueurs"
                    value={542}
                    icon={<FiUsers />}
                    description="Compétitifs"
                />

                <DashboardStatCard
                    title="Winrate moyen"
                    value="74%"
                    icon={<FiTrendingUp />}
                    description="Toutes équipes"
                />
            </div>

            {/* GRID */}
            <div
                className="
          grid gap-8
          xl:grid-cols-2
        "
            >
                {/* TOP TEAMS */}
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiShield className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Top Teams
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {teams.map((team, index) => (
                            <div
                                key={team.id}
                                className="
                  flex items-center justify-between
                  rounded-xl border border-zinc-800
                  bg-black/30 p-5
                "
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="
                      flex h-12 w-12 items-center
                      justify-center rounded-full
                      bg-red-600 font-bold text-white
                    "
                                    >
                                        #{index + 1}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {team.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {team.wins}W / {team.losses}L
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-red-500">
                                        {team.elo}
                                    </p>

                                    <p className="text-sm text-zinc-500">
                                        {team.winrate} WR
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOP PLAYERS */}
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiTarget className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Top Players
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {players.map((player, index) => (
                            <div
                                key={player.id}
                                className="
                  flex items-center justify-between
                  rounded-xl border border-zinc-800
                  bg-black/30 p-5
                "
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="
                      flex h-12 w-12 items-center
                      justify-center rounded-full
                      bg-red-600 font-bold text-white
                    "
                                    >
                                        #{index + 1}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {player.pseudo}
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {player.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-red-500">
                                        {player.elo}
                                    </p>

                                    <p className="text-sm text-zinc-500">ELO</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
