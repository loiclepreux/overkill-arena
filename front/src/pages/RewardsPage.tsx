import { FiAward, FiTarget, FiShield } from "react-icons/fi";
import { playerRewards } from "@/data/rewards-mock";
import { Badge } from "@/components/ui/Badge";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

export function RewardsPage() {
    const progress =
        (playerRewards.cupsToNextTitle /
            playerRewards.requiredCupsForNextTitle) *
        100;

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
                <div className="relative z-10">
                    <Badge variant="danger">Progression</Badge>

                    <h1 className="mt-6 text-5xl font-extrabold text-white">
                        Récompenses
                    </h1>

                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Gagnez des médailles, débloquez des coupes et atteignez
                        les plus hauts titres de Overkill Arena.
                    </p>
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
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <DashboardStatCard
                    title="Médailles"
                    value={`🥇 ${playerRewards.goldMedals}`}
                    icon={<FiAward />}
                    description="Médailles d'or"
                />

                <DashboardStatCard
                    title="Coupes"
                    value={`🏆 ${
                        playerRewards.bronzeCups +
                        playerRewards.silverCups +
                        playerRewards.goldCups
                    }`}
                    icon={<FiTarget />}
                    description="Coupes obtenues"
                />

                <DashboardStatCard
                    title="Titre"
                    value={playerRewards.currentTitle}
                    icon={<FiShield />}
                    description="Rang actuel"
                />
            </div>

            {/* TITRE ACTUEL */}
            <div
                className="
                    rounded-2xl border border-zinc-800
                    bg-zinc-900/80 p-6
                "
            >
                <h2 className="text-3xl font-bold text-white">
                    Progression du titre
                </h2>

                <p className="mt-3 text-zinc-400">
                    {playerRewards.currentTitle} → {playerRewards.nextTitle}
                </p>

                <div className="mt-6">
                    <div
                        className="
                            h-4 overflow-hidden rounded-full
                            bg-zinc-800
                        "
                    >
                        <div
                            className="h-full rounded-full bg-red-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-3 text-sm text-zinc-500">
                        {playerRewards.cupsToNextTitle} /
                        {playerRewards.requiredCupsForNextTitle} coupes
                    </p>
                </div>
            </div>

            <div
                className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
    "
            >
                <h2 className="text-3xl font-bold text-white">
                    Parcours des titres
                </h2>

                <div className="mt-8 grid gap-4 lg:grid-cols-4">
                    {[
                        "Rookie",
                        "Challenger",
                        "Rubis",
                        "Diamond",
                        "Prestige",
                        "Master",
                        "Legend",
                        "Overkill",
                    ].map((title) => (
                        <div
                            key={title}
                            className="
                    rounded-xl border border-zinc-800
                    bg-black/30 p-4 text-center
                "
                        >
                            <p className="font-bold text-white">{title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* DETAIL */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h3 className="text-2xl font-bold text-white">🥉 Bronze</h3>

                    <p className="mt-4 text-4xl font-extrabold text-red-500">
                        {playerRewards.bronzeMedals}
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h3 className="text-2xl font-bold text-white">🥈 Argent</h3>

                    <p className="mt-4 text-4xl font-extrabold text-red-500">
                        {playerRewards.silverMedals}
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h3 className="text-2xl font-bold text-white">🥇 Or</h3>

                    <p className="mt-4 text-4xl font-extrabold text-red-500">
                        {playerRewards.goldMedals}
                    </p>
                </div>
            </div>
        </section>
    );
}
