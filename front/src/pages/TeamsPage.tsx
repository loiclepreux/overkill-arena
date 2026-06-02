import {
    FiAward,
    FiShield,
    FiTarget,
    FiUserPlus,
    FiUsers,
} from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const players = [
    {
        id: 1,
        pseudo: "OverkillPlayer",
        role: "Captain",
        title: "Diamond",
        elo: 2450,
        status: "ONLINE",
    },

    {
        id: 2,
        pseudo: "NovaX",
        role: "Sniper",
        title: "Diamond",
        elo: 2310,
        status: "ONLINE",
    },

    {
        id: 3,
        pseudo: "Shadow",
        role: "Entry",
        title: "Rubis",
        elo: 2190,
        status: "OFFLINE",
    },

    {
        id: 4,
        pseudo: "Ghost",
        role: "Support",
        title: "Challenger",
        elo: 2080,
        status: "OFFLINE",
    },
];

export function TeamsPage() {
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
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    {/* TEAM IDENTITY */}
                    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                        {/* TEAM LOGO TEMPORAIRE */}
                        <div
                            className="
        flex h-24 w-24 shrink-0 items-center justify-center
        rounded-full border-4 border-red-600
        bg-black text-5xl
        sm:h-28 sm:w-28 sm:text-6xl
    "
                        >
                            🔥
                        </div>

                        {/* TEAM INFOS */}
                        <div>
                            <Badge variant="danger">◆ DIAMOND TEAM ◆</Badge>

                            <h1
                                className="
                        mt-4 break-words text-4xl font-extrabold
                        leading-tight text-white sm:text-6xl
                    "
                            >
                                Team Phoenix
                            </h1>

                            <p className="mt-3 max-w-2xl text-zinc-400">
                                Équipe compétitive classée TOP 3 Europe sur
                                Overkill Arena.
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                                <Badge variant="success">ACTIVE</Badge>

                                <Badge variant="warning">TOP 3 EUROPE</Badge>

                                <Badge variant="danger">2340 ELO</Badge>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <Button className="w-full sm:w-auto">
                            Inviter un joueur
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto"
                        >
                            Gérer l’équipe
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

            {/* TEAM STATS */}
            <div
                className="
          grid gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
            >
                <DashboardStatCard
                    title="Team ELO"
                    value={2340}
                    icon={<FiAward />}
                    description="Classement actuel"
                />

                <DashboardStatCard
                    title="Joueurs"
                    value={4}
                    icon={<FiUsers />}
                    description="Effectifs actif"
                />

                <DashboardStatCard
                    title="Victoires"
                    value={28}
                    icon={<FiTarget />}
                    description="Toutes saisons"
                />

                <DashboardStatCard
                    title="Titre moyen"
                    value="Diamond"
                    icon={<FiShield />}
                    description="Prestige de l'équipe"
                />
            </div>

            {/* TEAM REWARDS */}
            <div
                className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
    "
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Récompenses de l’équipe
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Résultats cumulés de Team Phoenix.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-4">
                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5 text-center">
                        <p className="text-4xl">🏆</p>

                        <p className="mt-3 text-3xl font-extrabold text-white">
                            12
                        </p>

                        <p className="text-zinc-500">Coupes</p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5 text-center">
                        <p className="text-4xl">🥇</p>

                        <p className="mt-3 text-3xl font-extrabold text-white">
                            34
                        </p>

                        <p className="text-zinc-500">Or</p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5 text-center">
                        <p className="text-4xl">🥈</p>

                        <p className="mt-3 text-3xl font-extrabold text-white">
                            21
                        </p>

                        <p className="text-zinc-500">Argent</p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-5 text-center">
                        <p className="text-4xl">🥉</p>

                        <p className="mt-3 text-3xl font-extrabold text-white">
                            15
                        </p>

                        <p className="text-zinc-500">Bronze</p>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div
                className="
          grid gap-8
          xl:grid-cols-2
        "
            >
                {/* ROSTER */}
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiUsers className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Effectifs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {players.map((player) => (
                            <div
                                key={player.id}
                                className="
                  flex items-center justify-between
                  rounded-xl border border-zinc-800
                  bg-black/30 p-4
                "
                            >
                                <div className="flex items-center gap-4">
                                    {/* AVATAR */}
                                    <div
                                        className="
                      flex h-12 w-12 items-center
                      justify-center rounded-full
                      bg-red-600 font-bold text-white
                    "
                                    >
                                        {player.pseudo.charAt(0)}
                                    </div>

                                    {/* INFOS */}
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            {player.pseudo}
                                        </h3>

                                        <p className="text-sm text-zinc-500">
                                            {player.role}
                                        </p>

                                        <Badge
                                            variant="danger"
                                            className="mt-2"
                                        >
                                            ◆ {player.title} ◆
                                        </Badge>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-red-500">
                                        {player.elo} ELO
                                    </p>

                                    <Badge
                                        variant={
                                            player.status === "ONLINE"
                                                ? "success"
                                                : "neutral"
                                        }
                                    >
                                        {player.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RECRUITMENT */}
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <div className="mb-6 flex items-center gap-3">
                        <FiUserPlus className="text-2xl text-red-500" />

                        <h2 className="text-2xl font-bold text-white">
                            Recrutement
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div
                            className="
                rounded-xl border border-zinc-800
                bg-black/30 p-5
              "
                        >
                            <h3 className="text-xl font-bold text-white">
                                Recherche Support
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                Team Phoenix recherche un joueur support avec
                                expérience tournoi.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Badge variant="danger">Diamond+</Badge>

                                <Badge variant="warning">
                                    Tournament Experience
                                </Badge>
                            </div>

                            <Button className="mt-6 w-full">
                                Voir les candidatures
                            </Button>
                        </div>

                        <div
                            className="
        rounded-xl border border-zinc-800
        bg-black/30 p-5
    "
                        >
                            <h3 className="text-xl font-bold text-white">
                                Recherche Support
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                Team Phoenix recherche un joueur support avec
                                expérience tournoi.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Badge variant="danger">Diamond+</Badge>

                                <Badge variant="warning">
                                    Tournament Experience
                                </Badge>
                            </div>

                            <Button className="mt-6 w-full">
                                Voir les candidatures
                            </Button>
                        </div>

                        <div
                            className="
        rounded-xl border border-zinc-800
        bg-black/30 p-5
    "
                        >
                            <h3 className="text-xl font-bold text-white">
                                Recherche Entry Fragger
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                Joueur agressif recherché pour renforcer les
                                performances en tournoi compétitif.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Badge variant="danger">Diamond+</Badge>

                                <Badge variant="warning">
                                    Disponibilité Week-End
                                </Badge>
                            </div>

                            <Button variant="secondary" className="mt-6 w-full">
                                Voir les candidatures
                            </Button>
                        </div>
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
                        Derniers résultats de l’équipe.
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
                                Team Phoenix 2 - 1 Nova Squad
                            </h3>

                            <p className="mt-2 text-zinc-500">
                                BO3 • Demi-finale
                            </p>
                        </div>

                        <Badge variant="success">VICTOIRE</Badge>
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
                                Team Phoenix 0 - 2 Red Wolves
                            </h3>

                            <p className="mt-2 text-zinc-500">BO3 • Finale</p>
                        </div>

                        <Badge variant="danger">DÉFAITE</Badge>
                    </div>
                </div>
            </div>
        </section>
    );
}
