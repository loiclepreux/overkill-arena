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

export function TournamentPage() {
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
                    <Badge variant="danger">Competitive Arena</Badge>

                    <h1
                        className="
              mt-6 text-5xl font-extrabold
              leading-tight text-white
            "
                    >
                        Tournois compétitifs Overkill Arena
                    </h1>

                    <p
                        className="
              mt-6 text-lg leading-relaxed
              text-zinc-400
            "
                    >
                        Rejoins des compétitions esports, affronte les
                        meilleures équipes et grimpe dans le leaderboard.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button>Rejoindre un tournoi</Button>

                        <Button variant="secondary">Créer un tournoi</Button>
                    </div>
                </div>

                {/* BACKGROUND GLOW */}
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
                    title="CashPrize total"
                    value="50K€"
                    icon={<FiTarget />}
                    description="Récompenses disponibles"
                />
            </div>

            {/* GRID CONTENT */}
            <div
                className="
          grid gap-8
          xl:grid-cols-2
        "
            >
                {/* TOURNAMENTS */}
                <TournamentWidget />

                {/* RECENT MATCHES */}
                <RecentMatches />
            </div>

            {/* LIVE SECTION */}
            <div
                className="
          rounded-2xl border border-zinc-800
          bg-zinc-900/80 p-6
        "
            >
                <div className="mb-6 flex items-center gap-3">
                    <div
                        className="
              h-3 w-3 rounded-full
              bg-red-500 animate-pulse
            "
                    />

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
            <div
                className="
          grid gap-8
          xl:grid-cols-2
        "
            >
                {/* INSCRIPTIONS */}
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
                        <div
                            className="
                rounded-xl border border-zinc-800
                bg-black/30 p-4
              "
                        >
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

                {/* CONTESTATIONS */}
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
