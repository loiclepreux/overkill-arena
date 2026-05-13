import {
    FiAlertTriangle,
    FiShield,
    FiTarget,
    FiUsers,
    FiAward,
} from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

export function AdminPage() {
    return (
        <section className="space-y-10">
            {/* HERO */}
            <div
                className="
          relative overflow-hidden rounded-3xl
          border border-red-900/40
          bg-gradient-to-br from-red-950/50 via-black to-zinc-950
          p-8
        "
            >
                <div className="relative z-10 max-w-3xl">
                    <Badge variant="danger">ADMIN CONTROL CENTER</Badge>

                    <h1 className="mt-6 text-5xl font-extrabold text-white">
                        Tableau de bord administrateur
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                        Supervision complète de la plateforme : utilisateurs,
                        tournois, équipes, paiements, contestations et sécurité.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button>Créer un tournoi</Button>

                        <Button variant="secondary">
                            Voir les signalements
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
                    title="Utilisateurs"
                    value={542}
                    icon={<FiUsers />}
                    description="Comptes actifs"
                />

                <DashboardStatCard
                    title="Tournois"
                    value={12}
                    icon={<FiAward />}
                    description="En cours"
                />

                <DashboardStatCard
                    title="Contestations"
                    value={7}
                    icon={<FiAlertTriangle />}
                    description="À traiter"
                />

                <DashboardStatCard
                    title="recompense"
                    value="25 🥇"
                    icon={<FiTarget />}
                    description="recompense géré"
                />
            </div>

            {/* ADMIN GRID */}
            <div className="grid gap-8 xl:grid-cols-2">
                {/* USERS MANAGEMENT */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiUsers className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Gestion utilisateurs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-white">
                                        OverkillPlayer
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        player@test.com
                                    </p>
                                </div>

                                <Badge variant="success">PLAYER</Badge>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Button variant="secondary">Voir</Button>

                                <Button variant="danger">Suspendre</Button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-white">
                                        NovaAdmin
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        admin@overkill.com
                                    </p>
                                </div>

                                <Badge variant="danger">ADMIN</Badge>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Button variant="secondary">Voir</Button>

                                <Button variant="danger">Révoquer</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TOURNAMENT VALIDATION */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiTarget className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Validation tournois
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-white">
                                        Winter Clash
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        Valorant • 32 équipes • 5 000€
                                    </p>
                                </div>

                                <Badge variant="warning">EN ATTENTE</Badge>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Button>Valider</Button>

                                <Button variant="secondary">Modifier</Button>

                                <Button variant="danger">Refuser</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DISPUTES */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiAlertTriangle className="text-2xl text-yellow-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Contestations matchs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                            <h3 className="font-semibold text-white">
                                Alpha Team vs Red Wolves
                            </h3>

                            <p className="mt-2 text-sm text-zinc-400">
                                Résultat contesté. Screenshot en attente de
                                vérification.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Button>Vérifier preuve</Button>

                                <Button variant="secondary">
                                    Valider score
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECURITY */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiShield className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Sécurité plateforme
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-white">
                                    Tentatives suspectes
                                </h3>

                                <Badge variant="danger">4 ALERTES</Badge>
                            </div>

                            <p className="mt-2 text-sm text-zinc-400">
                                Plusieurs connexions échouées détectées sur des
                                comptes admin.
                            </p>

                            <Button className="mt-4 w-full">
                                Voir le journal de sécurité
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
