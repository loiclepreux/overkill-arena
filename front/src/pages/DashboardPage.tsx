import {
    FiAward,
    FiBell,
    FiRadio,
    FiShield,
    FiTarget,
    FiUsers,
} from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { MatchActivityChart } from "@/components/dashboard/MatchActivityChart";
import { playerRewards } from "@/data/rewards-mock";

export function DashboardPage() {
    const totalCups =
        playerRewards.bronzeCups +
        playerRewards.silverCups +
        playerRewards.goldCups;

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
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Badge variant="danger">Command Center</Badge>

                        <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
                            Bienvenue, OverkillPlayer
                        </h1>

                        <p className="mt-4 max-w-2xl text-zinc-400">
                            Suis ton équipe, tes matchs, ta progression et tes
                            prochaines compétitions depuis ton tableau de bord.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Badge variant="danger">
                                ◆ {playerRewards.currentTitle} ◆
                            </Badge>

                            <Badge variant="warning">
                                🏆 {totalCups} coupes
                            </Badge>

                            <Badge variant="success">Team Phoenix</Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button>Voir mes tournois</Button>

                        <Button variant="secondary">
                            Voir mes récompenses
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

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard
                    title="ELO"
                    value={2450}
                    icon={<FiAward />}
                    description="Classement joueur"
                />

                <DashboardStatCard
                    title="Victoires"
                    value={128}
                    icon={<FiTarget />}
                    description="Toutes saisons"
                />

                <DashboardStatCard
                    title="Équipe"
                    value="Phoenix"
                    icon={<FiShield />}
                    description="TOP 3 Europe"
                />

                <DashboardStatCard
                    title="Notifications"
                    value={3}
                    icon={<FiBell />}
                    description="Non lues"
                />
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                <div
                    className="
                        rounded-2xl border border-zinc-800
                        bg-zinc-900/80 p-6
                    "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiRadio className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Prochain match
                        </h2>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    Team Phoenix vs Nova Squad
                                </h3>

                                <p className="mt-2 text-zinc-500">
                                    Winter Clash • Demi-finale • BO3
                                </p>
                            </div>

                            <Badge variant="danger">Dans 2h</Badge>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Format
                                </p>

                                <p className="mt-1 font-bold text-white">BO3</p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Phase
                                </p>

                                <p className="mt-1 font-bold text-white">
                                    Demi-finale
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Récompense
                                </p>

                                <p className="mt-1 font-bold text-red-500">
                                    🥇 Or possible
                                </p>
                            </div>
                        </div>

                        <Button className="mt-6 w-full">Voir le match</Button>
                    </div>
                </div>

                <div
                    className="
                        rounded-2xl border border-zinc-800
                        bg-zinc-900/80 p-6
                    "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiUsers className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Progression rapide
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-white">
                                    {playerRewards.currentTitle} →{" "}
                                    {playerRewards.nextTitle}
                                </p>

                                <p className="text-sm text-zinc-500">
                                    {playerRewards.cupsToNextTitle}/
                                    {playerRewards.requiredCupsForNextTitle}
                                </p>
                            </div>

                            <div className="mt-3 h-4 overflow-hidden rounded-full bg-zinc-800">
                                <div
                                    className="h-full rounded-full bg-red-500"
                                    style={{
                                        width: `${
                                            (playerRewards.cupsToNextTitle /
                                                playerRewards.requiredCupsForNextTitle) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
                                <p className="text-3xl">🥇</p>
                                <p className="mt-2 text-2xl font-bold text-white">
                                    {playerRewards.goldMedals}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
                                <p className="text-3xl">🥈</p>
                                <p className="mt-2 text-2xl font-bold text-white">
                                    {playerRewards.silverMedals}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
                                <p className="text-3xl">🥉</p>
                                <p className="mt-2 text-2xl font-bold text-white">
                                    {playerRewards.bronzeMedals}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                <ActivityFeed />
                <MatchActivityChart />
            </div>
        </section>
    );
}
