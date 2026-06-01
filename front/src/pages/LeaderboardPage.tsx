import {
    FiAward,
    FiFilter,
    FiShield,
    FiStar,
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
        title: "Diamond Team",
        elo: 2450,
        wins: 28,
        losses: 4,
        winrate: "87%",
        cups: 12,
    },
    {
        id: 2,
        name: "Nova Squad",
        title: "Prestige Team",
        elo: 2380,
        wins: 24,
        losses: 7,
        winrate: "77%",
        cups: 9,
    },
    {
        id: 3,
        name: "Red Wolves",
        title: "Rubis Team",
        elo: 2290,
        wins: 21,
        losses: 8,
        winrate: "72%",
        cups: 7,
    },
];

const players = [
    {
        id: 1,
        pseudo: "NovaX",
        elo: 2850,
        role: "Sniper",
        title: "Master",
        medals: "🥇 12",
    },
    {
        id: 2,
        pseudo: "OverkillPlayer",
        elo: 2450,
        role: "Captain",
        title: "Diamond",
        medals: "🥇 4",
    },
    {
        id: 3,
        pseudo: "Shadow",
        elo: 2280,
        role: "Entry",
        title: "Rubis",
        medals: "🥇 2",
    },
    {
        id: 4,
        pseudo: "Ghost",
        elo: 2180,
        role: "Support",
        title: "Challenger",
        medals: "🥈 8",
    },
];

const podium = [
    {
        place: 2,
        pseudo: "OverkillPlayer",
        title: "Diamond",
        elo: 2450,
        medal: "🥈",
        height: "lg:mt-16",
    },
    {
        place: 1,
        pseudo: "NovaX",
        title: "Master",
        elo: 2850,
        medal: "🥇",
        height: "",
    },
    {
        place: 3,
        pseudo: "Shadow",
        title: "Rubis",
        elo: 2280,
        medal: "🥉",
        height: "lg:mt-24",
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
                    p-5 sm:p-8
                "
            >
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">Competitive Rankings</Badge>

                    <h1
                        className="
                            mt-6 text-4xl font-extrabold
                            leading-tight text-white sm:text-5xl
                        "
                    >
                        Classement Overkill Arena
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Suivez les meilleurs joueurs, les meilleures équipes,
                        les titres les plus prestigieux et les performances
                        dominantes de la plateforme.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Badge variant="warning">Saison 1</Badge>

                        <Badge variant="danger">Classement ELO</Badge>

                        <Badge variant="success">Récompenses actives</Badge>
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

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard
                    title="Top ELO"
                    value={2850}
                    icon={<FiAward />}
                    description="NovaX"
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

            {/* PODIUM */}
            <div
                className="
                    rounded-3xl border border-zinc-800
                    bg-zinc-900/80 p-6
                    lg:p-8
                "
            >
                <div className="mb-8 flex items-center gap-3">
                    <FiStar className="text-2xl text-red-500" />

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Podium de la saison
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Les trois joueurs les plus dominants actuellement.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
                    {podium.map((player) => (
                        <div
                            key={player.place}
                            className={`
                                ${player.height}
                                relative overflow-hidden rounded-2xl
                                border border-zinc-800 bg-black/30 p-6
                                text-center
                            `}
                        >
                            <div
                                className="
                                    absolute -right-10 -top-10
                                    h-32 w-32 rounded-full
                                    bg-red-500/10 blur-3xl
                                "
                            />

                            <div className="relative z-10">
                                <p className="text-6xl">{player.medal}</p>

                                <div
                                    className="
                                        mx-auto mt-5 flex h-16 w-16
                                        items-center justify-center rounded-full
                                        bg-red-600 text-xl font-black text-white
                                    "
                                >
                                    #{player.place}
                                </div>

                                <h3 className="mt-5 text-2xl font-extrabold text-white">
                                    {player.pseudo}
                                </h3>

                                <Badge variant="danger" className="mt-3">
                                    ◆ {player.title} ◆
                                </Badge>

                                <p className="mt-4 text-3xl font-black text-red-500">
                                    {player.elo}
                                </p>

                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    ELO
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FILTERS */}
            <div
                className="
                    rounded-2xl border border-zinc-800
                    bg-zinc-900/80 p-5
                "
            >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                        <FiFilter className="text-xl text-red-500" />

                        <h2 className="text-xl font-bold text-white">
                            Filtres de classement
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Badge variant="danger">Top ELO</Badge>

                        <Badge variant="neutral">Top Titres</Badge>

                        <Badge variant="neutral">Top Médailles</Badge>

                        <Badge variant="neutral">Top Coupes</Badge>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="grid gap-8 xl:grid-cols-2">
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
                            Meilleures équipes
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {teams.map((team, index) => (
                            <div
                                key={team.id}
                                className="
                                    flex flex-col gap-4 rounded-xl
                                    border border-zinc-800 bg-black/30 p-5
                                    sm:flex-row sm:items-center sm:justify-between
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

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <Badge variant="danger">
                                                ◆ {team.title} ◆
                                            </Badge>

                                            <Badge variant="warning">
                                                🏆 {team.cups}
                                            </Badge>
                                        </div>

                                        <p className="mt-2 text-sm text-zinc-500">
                                            {team.wins}W / {team.losses}L
                                        </p>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right">
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
                            Meilleurs joueurs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {players.map((player, index) => (
                            <div
                                key={player.id}
                                className="
                                    flex flex-col gap-4 rounded-xl
                                    border border-zinc-800 bg-black/30 p-5
                                    sm:flex-row sm:items-center sm:justify-between
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

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <Badge variant="danger">
                                                ◆ {player.title} ◆
                                            </Badge>

                                            <Badge variant="warning">
                                                {player.medals}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right">
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

            {/* HALL OF FAME */}
            <div
                className="
                    rounded-2xl border border-zinc-800
                    bg-zinc-900/80 p-6
                "
            >
                <div className="mb-6 flex items-center gap-3">
                    <FiAward className="text-2xl text-red-500" />

                    <h2 className="text-2xl font-bold text-white">
                        Hall of Fame
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <Badge variant="danger">Saison 1</Badge>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            NovaX
                        </h3>

                        <p className="mt-2 text-zinc-500">
                            Joueur le plus dominant.
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <Badge variant="warning">Meilleure équipe</Badge>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            Team Phoenix
                        </h3>

                        <p className="mt-2 text-zinc-500">
                            Plus grand nombre de victoires.
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <Badge variant="success">Récompenses</Badge>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            OverkillPlayer
                        </h3>

                        <p className="mt-2 text-zinc-500">
                            Meilleure progression de titre.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
