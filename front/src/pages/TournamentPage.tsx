import {
    FiAlertTriangle,
    FiAward,
    FiRadio,
    FiShield,
    FiTarget,
    FiUsers,
} from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TournamentWidget } from "@/components/dashboard/TournamentWidget";
import { RecentMatches } from "@/components/dashboard/RecentMatches";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { playerRewards } from "@/data/rewards-mock";

export function TournamentPage() {
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
                    <Badge variant="danger">Competitive Arena</Badge>

                    <h1
                        className="
                            mt-6 text-4xl font-extrabold
                            leading-tight text-white
                            sm:text-5xl
                        "
                    >
                        Tournois compétitifs Overkill Arena
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Rejoins des compétitions esports, affronte les
                        meilleures équipes, gagne des médailles et fais évoluer
                        ton titre compétitif.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Badge variant="danger">
                            ◆ {playerRewards.currentTitle} ◆
                        </Badge>

                        <Badge variant="warning">
                            🏆{" "}
                            {playerRewards.bronzeCups +
                                playerRewards.silverCups +
                                playerRewards.goldCups}{" "}
                            coupes
                        </Badge>

                        <Badge variant="success">
                            🥇 {playerRewards.goldMedals} médailles or
                        </Badge>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <Button className="w-full sm:w-auto">
                            Rejoindre un tournoi
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto"
                        >
                            Créer un tournoi
                        </Button>
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
                    title="Tournois actifs"
                    value={12}
                    icon={<FiAward />}
                    description="Compétitions ouvertes"
                />

                <DashboardStatCard
                    title="Équipes inscrites"
                    value={64}
                    icon={<FiShield />}
                    description="Toutes compétitions"
                />

                <DashboardStatCard
                    title="Matchs live"
                    value={8}
                    icon={<FiRadio />}
                    description="En cours actuellement"
                />

                <DashboardStatCard
                    title="Récompenses"
                    value="245"
                    icon={<FiTarget />}
                    description="Médailles distribuées"
                />
            </div>

            {/* MY TOURNAMENTS */}
            <div
                className="
                    rounded-2xl border border-zinc-800
                    bg-zinc-900/80 p-6
                "
            >
                <div className="mb-6 flex items-center gap-3">
                    <FiAward className="text-2xl text-red-500" />

                    <h2 className="text-2xl font-bold text-white">
                        Mes tournois
                    </h2>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <h3 className="font-bold text-white">
                                Winter Clash
                            </h3>

                            <Badge variant="danger">LIVE</Badge>
                        </div>

                        <p className="text-sm text-zinc-500">
                            Valorant • Demi-finale • BO3
                        </p>

                        <Button className="mt-5 w-full">Voir mes matchs</Button>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <h3 className="font-bold text-white">
                                Arena Masters
                            </h3>

                            <Badge variant="success">INSCRIT</Badge>
                        </div>

                        <p className="text-sm text-zinc-500">
                            CS2 • Début dans 2 jours • 16 équipes
                        </p>

                        <Button variant="secondary" className="mt-5 w-full">
                            Détails
                        </Button>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <h3 className="font-bold text-white">
                                Phoenix Cup
                            </h3>

                            <Badge variant="warning">QUALIF</Badge>
                        </div>

                        <p className="text-sm text-zinc-500">
                            League of Legends • Qualification en attente
                        </p>

                        <Button variant="secondary" className="mt-5 w-full">
                            Suivre
                        </Button>
                    </div>
                </div>
            </div>

            {/* GRID CONTENT */}
            <div className="grid gap-8 xl:grid-cols-2">
                <TournamentWidget />

                <RecentMatches />
            </div>

            {/* REWARD RULES */}
            <div
                className="
                    rounded-2xl border border-zinc-800
                    bg-zinc-900/80 p-6
                "
            >
                <div className="mb-6 flex items-center gap-3">
                    <FiTarget className="text-2xl text-red-500" />

                    <h2 className="text-2xl font-bold text-white">
                        Récompenses de tournoi
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-center">
                        <p className="text-5xl">🥇</p>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            1ère place
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                            Médaille d’or + progression titre
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-400/20 bg-zinc-400/5 p-5 text-center">
                        <p className="text-5xl">🥈</p>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            2ème place
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                            Médaille d’argent + points compétitifs
                        </p>
                    </div>

                    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5 text-center">
                        <p className="text-5xl">🥉</p>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            3ème place
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                            Médaille de bronze + progression joueur
                        </p>
                    </div>
                </div>
            </div>

            {/* LIVE SECTION */}
            <div
                className="
                    rounded-2xl border border-zinc-800
                    bg-zinc-900/80 p-6
                "
            >
                <div className="mb-6 flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />

                    <h2 className="text-2xl font-bold text-white">
                        Matchs en direct
                    </h2>
                </div>

                <div className="space-y-4">
                    <div
                        className="
                            flex flex-col gap-4 rounded-xl
                            border border-zinc-800
                            bg-black/30 p-5
                            lg:flex-row lg:items-center lg:justify-between
                        "
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                Team Phoenix vs Nova Squad
                            </h3>

                            <p className="mt-2 text-zinc-500">
                                BO3 • Demi-finale
                            </p>
                        </div>

                        <Badge variant="danger">LIVE</Badge>
                    </div>
                </div>
            </div>

            {/* REGISTRATIONS + CONTESTATIONS */}
            <div className="grid gap-8 xl:grid-cols-2">
                <div
                    className="
                        rounded-2xl border border-zinc-800
                        bg-zinc-900/80 p-6
                    "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiUsers className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Inscriptions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <h3 className="font-semibold text-white">
                                Winter Clash
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500">
                                28/32 équipes inscrites
                            </p>

                            <Button className="mt-4 w-full">Rejoindre</Button>
                        </div>
                    </div>
                </div>

                <div
                    className="
                        rounded-2xl border border-zinc-800
                        bg-zinc-900/80 p-6
                    "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiAlertTriangle className="text-2xl text-yellow-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Contestations
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div
                            className="
                                rounded-xl border border-yellow-500/20
                                bg-yellow-500/5 p-4
                            "
                        >
                            <h3 className="font-semibold text-white">
                                Match Alpha vs Wolves
                            </h3>

                            <p className="mt-2 text-sm text-zinc-400">
                                Résultat contesté, vérification screenshots en
                                attente.
                            </p>

                            <Badge variant="warning" className="mt-4">
                                Pending Review
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
