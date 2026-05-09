import { FiUsers, FiShield, FiTarget, FiAward } from "react-icons/fi";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { MatchActivityChart } from "@/components/dashboard/MatchActivityChart";

export function DashboardPage() {
    return (
        <section className="space-y-10">
            <div>
                <h1 className="text-5xl font-bold text-red-500">Tableau de bord</h1>

                <p className="mt-4 text-zinc-400">
                    Vue d’ensemble de ton activité Overkill Arena.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard
                    title="Tournois actifs"
                    value={12}
                    icon={<FiAward />}
                    description="Voir tous les tournois"
                />

                <DashboardStatCard
                    title="Équipes"
                    value={32}
                    icon={<FiShield />}
                    description="Teams enregistrées"
                />

                <DashboardStatCard
                    title="Matchs joués"
                    value={148}
                    icon={<FiTarget />}
                    description="Résultats récents"
                />

                <DashboardStatCard
                    title="Joueurs"
                    value={542}
                    icon={<FiUsers />}
                    description="Joueurs inscrits"
                />
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                <ActivityFeed />
                <MatchActivityChart />
            </div>
        </section>
    );
}
