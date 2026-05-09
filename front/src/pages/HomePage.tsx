import {
    FiArrowRight,
    FiAward,
    FiShield,
    FiTarget,
    FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HomePage() {
    return (
        <section className="space-y-28">
            {/* HERO */}
            <div
                className="
          relative overflow-hidden rounded-3xl
          border border-zinc-800
          bg-gradient-to-br from-red-950/40 via-black to-zinc-950
          px-8 py-24
        "
            >
                <div className="relative z-10 max-w-4xl">
                    <Badge variant="danger">Competitive Esports Platform</Badge>

                    <h1
                        className="
              mt-8 text-6xl font-extrabold
              leading-tight text-white
              lg:text-7xl
            "
                    >
                        Overkill Arena
                    </h1>

                    <p
                        className="
              mt-8 max-w-2xl text-xl
              leading-relaxed text-zinc-400
            "
                    >
                        Participez aux plus grands tournois compétitifs, gérez
                        votre équipe, grimpez dans le leaderboard et dominez
                        l’arène.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link to="/register">
                            <Button>Commencer</Button>
                        </Link>

                        <Link to="/login">
                            <Button variant="secondary">Connexion</Button>
                        </Link>
                    </div>
                </div>

                {/* GLOW */}
                <div
                    className="
            absolute -right-20 -top-20
            h-96 w-96 rounded-full
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
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <FiAward className="text-4xl text-red-500" />

                    <h3 className="mt-6 text-4xl font-extrabold text-white">
                        12+
                    </h3>

                    <p className="mt-3 text-zinc-400">Tournois actifs</p>
                </div>

                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <FiShield className="text-4xl text-red-500" />

                    <h3 className="mt-6 text-4xl font-extrabold text-white">
                        64
                    </h3>

                    <p className="mt-3 text-zinc-400">Teams compétitives</p>
                </div>

                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <FiUsers className="text-4xl text-red-500" />

                    <h3 className="mt-6 text-4xl font-extrabold text-white">
                        500+
                    </h3>

                    <p className="mt-3 text-zinc-400">Joueurs inscrits</p>
                </div>

                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-6
          "
                >
                    <FiTarget className="text-4xl text-red-500" />

                    <h3 className="mt-6 text-4xl font-extrabold text-white">
                        150+
                    </h3>

                    <p className="mt-3 text-zinc-400">Matchs joués</p>
                </div>
            </div>

            {/* FEATURES */}
            <div className="grid gap-8 xl:grid-cols-3">
                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-8
          "
                >
                    <FiAward className="text-5xl text-red-500" />

                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Tournois compétitifs
                    </h2>

                    <p className="mt-4 leading-relaxed text-zinc-400">
                        Créez et rejoignez des tournois esports avec brackets,
                        matchmaking et cashprize.
                    </p>
                </div>

                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-8
          "
                >
                    <FiShield className="text-5xl text-red-500" />

                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Gestion d’équipes
                    </h2>

                    <p className="mt-4 leading-relaxed text-zinc-400">
                        Gérez votre roster, recrutez des joueurs et améliorez
                        votre classement compétitif.
                    </p>
                </div>

                <div
                    className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/80 p-8
          "
                >
                    <FiTarget className="text-5xl text-red-500" />

                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Matchs live
                    </h2>

                    <p className="mt-4 leading-relaxed text-zinc-400">
                        Suivez les matchs en direct, les résultats et le
                        leaderboard temps réel.
                    </p>
                </div>
            </div>

            {/* LEADERBOARD PREVIEW */}
            <div
                className="
          rounded-3xl border border-zinc-800
          bg-zinc-900/80 p-8
        "
            >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Badge variant="danger">Top Teams</Badge>

                        <h2 className="mt-5 text-4xl font-extrabold text-white">
                            Leaderboard compétitif
                        </h2>

                        <p className="mt-4 max-w-2xl text-zinc-400">
                            Découvrez les meilleures équipes et les joueurs
                            dominants de la plateforme.
                        </p>
                    </div>

                    <Link to="/register">
                        <Button>
                            Rejoindre l’arène
                            <FiArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="mt-10 space-y-4">
                    {[
                        {
                            rank: 1,
                            name: "Team Phoenix",
                            elo: 2450,
                        },

                        {
                            rank: 2,
                            name: "Nova Squad",
                            elo: 2380,
                        },

                        {
                            rank: 3,
                            name: "Red Wolves",
                            elo: 2290,
                        },
                    ].map((team) => (
                        <div
                            key={team.rank}
                            className="
                flex items-center justify-between
                rounded-xl border border-zinc-800
                bg-black/30 p-5
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
                                    #{team.rank}
                                </div>

                                <h3 className="text-xl font-bold text-white">
                                    {team.name}
                                </h3>
                            </div>

                            <p className="text-2xl font-bold text-red-500">
                                {team.elo}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div
                className="
          rounded-3xl border border-red-900/30
          bg-gradient-to-br from-red-950/40 via-black to-zinc-950
          p-10 text-center
        "
            >
                <Badge variant="danger">Join the competition</Badge>

                <h2 className="mt-6 text-5xl font-extrabold text-white">
                    Prêt à entrer dans l’arène ?
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                    Rejoignez des centaines de joueurs compétitifs, participez à
                    des tournois et construisez votre légende.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link to="/register">
                        <Button>Créer un compte</Button>
                    </Link>

                    <Link to="/login">
                        <Button variant="secondary">Se connecter</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
