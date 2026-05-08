import { FiUsers, FiShield, FiTarget, FiAward } from "react-icons/fi";

import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

export function DashboardPage() {
    return (
        <section className="space-y-10">
            {/* HEADER */}
            <div>
                <h1 className="text-5xl font-bold text-red-500">Dashboard</h1>

                <p className="mt-4 text-zinc-400">
                    Bienvenue sur ton espace Overkill Arena.
                </p>
            </div>

            {/* GRID STATS */}
            <div
                className="
          grid gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
            >
                <DashboardStatCard
                    title="Tournois"
                    value={12}
                    icon={<FiAward />}
                    description="Tournois actifs"
                />

                <DashboardStatCard
                    title="Équipes"
                    value={32}
                    icon={<FiShield />}
                    description="Teams enregistrées"
                />

                <DashboardStatCard
                    title="Matchs"
                    value={148}
                    icon={<FiTarget />}
                    description="Matchs joués"
                />

                <DashboardStatCard
                    title="Joueurs"
                    value={542}
                    icon={<FiUsers />}
                    description="Joueurs inscrits"
                />
            </div>
        </section>
    );
}
