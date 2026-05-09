import { FiAward, FiClock, FiShield, FiTarget, FiUser } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

export function ProfilePage() {
    return (
        <section className="space-y-10">
            {/* HERO PROFILE */}
            <div
                className="
        relative overflow-hidden rounded-3xl
        border border-zinc-800
        bg-gradient-to-br from-red-950/40 via-black to-zinc-950
        p-5 sm:p-8
    "
            >
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    {/* LEFT */}
                    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                        {/* AVATAR */}
                        <div
                            className="
        flex h-24 w-24 shrink-0 items-center
        justify-center rounded-full
        border-4 border-red-600
        bg-black text-4xl font-bold text-white
        sm:h-28 sm:w-28 sm:text-5xl
    "
                        >
                            O
                        </div>

                        {/* INFOS */}
                        <div>
                            <Badge variant="danger">PLAYER</Badge>

                            <h1
                                className="
        mt-4 break-words text-3xl font-extrabold
        text-white sm:text-5xl
    "
                            >
                                OverkillPlayer
                            </h1>

                            <p className="mt-3 text-zinc-400">
                                Joueur compétitif Overkill Arena
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Badge variant="success">ONLINE</Badge>

                                <Badge variant="warning">Team Phoenix</Badge>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <Button className="w-full sm:w-auto">
                            Modifier profil
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto"
                        >
                            Paramètres
                        </Button>
                    </div>
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
                    title="ELO"
                    value={2450}
                    icon={<FiAward />}
                    description="Classement actuel"
                />

                <DashboardStatCard
                    title="Victoires"
                    value={128}
                    icon={<FiTarget />}
                    description="Toutes saisons"
                />

                <DashboardStatCard
                    title="Tournois"
                    value={34}
                    icon={<FiShield />}
                    description="Participations"
                />

                <DashboardStatCard
                    title="Heures jouées"
                    value={920}
                    icon={<FiClock />}
                    description="Temps total"
                />
            </div>

            {/* GRID */}
            <div
                className="
          grid gap-8
          xl:grid-cols-2
        "
            >
                {/* ACCOUNT INFO */}
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiUser className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Informations compte
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-zinc-500">Email</p>

                            <p className="mt-2 font-semibold text-white">
                                player@test.com
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">Rôle</p>

                            <p className="mt-2 font-semibold text-white">
                                PLAYER
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Équipe actuelle
                            </p>

                            <p className="mt-2 font-semibold text-white">
                                Team Phoenix
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">Région</p>

                            <p className="mt-2 font-semibold text-white">
                                Europe
                            </p>
                        </div>
                    </div>
                </div>

                {/* CURRENT TEAM */}
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiShield className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Équipe actuelle
                        </h2>
                    </div>

                    <div
                        className="
              rounded-xl border border-zinc-800
              bg-black/30 p-5
            "
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Team Phoenix
                                </h3>

                                <p className="mt-2 text-zinc-500">
                                    Capitaine : NovaX
                                </p>
                            </div>

                            <Badge variant="danger">TOP 3</Badge>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    ELO
                                </p>

                                <p className="mt-2 text-xl font-bold text-red-500">
                                    2340
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Victoires
                                </p>

                                <p className="mt-2 text-xl font-bold text-white">
                                    28
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-zinc-500">
                                    Joueurs
                                </p>

                                <p className="mt-2 text-xl font-bold text-white">
                                    4
                                </p>
                            </div>
                        </div>

                        <Button className="mt-6 w-full">Voir l’équipe</Button>
                    </div>
                </div>
            </div>

            {/* HISTORY */}
            <div
                className="
          rounded-2xl border border-zinc-800
          bg-zinc-900/80 p-6
        "
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Historique récent
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Dernières performances du joueur.
                    </p>
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
                                Victory vs Nova Squad
                            </h3>

                            <p className="mt-2 text-zinc-500">+25 ELO • BO3</p>
                        </div>

                        <Badge variant="success">WIN</Badge>
                    </div>

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
                                Defeat vs Red Wolves
                            </h3>

                            <p className="mt-2 text-zinc-500">-12 ELO • BO3</p>
                        </div>

                        <Badge variant="danger">LOSS</Badge>
                    </div>
                </div>
            </div>
        </section>
    );
}
