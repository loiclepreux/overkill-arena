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
import Video from "@/assets/video-callof.mp4";

export function HomePage() {
    return (
        <section className="space-y-28">
            {/* HERO */}
            <div
                className="
          relative overflow-hidden rounded-3xl
          border border-zinc-800
          bg-gradient-to-br from-red-950/40 via-black to-zinc-950
          px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-32
        "
            >
                {/* VIDEO BACKGROUND */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="
        absolute inset-0
        h-full w-full
        object-cover
        opacity-30
    "
                >
                    <source src={Video} type="video/mp4" />
                </video>

                {/* OVERLAY */}
                    <div
                        className="
        absolute inset-0
        bg-gradient-to-br
        from-black/40
        via-black/20
        to-red-950/20
    "
                    />

                <div className="relative z-10 max-w-6xl">
                    <Badge variant="danger">Competitive Esports Platform</Badge>

                    <h1
                        className="
        mt-8 text-4xl font-extrabold
        leading-tight text-white
        sm:text-5xl
        lg:text-7xl
        xl:text-8xl
    "
                    >
                        Overkill Arena
                    </h1>

                    <p
                        className="
    mt-6 max-w-2xl text-base
    leading-relaxed text-zinc-400
    sm:text-lg
    lg:text-xl
"
                    >
                        Participez aux plus grands tournois compétitifs, gérez
                        votre équipe, grimpez dans le classement et dominez
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
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        transition duration-500
        hover:border-red-500/40
    "
                >
                    <div
                        className="
            absolute inset-0
            bg-gradient-to-br
            from-red-600/5
            via-transparent
            to-red-500/5
            opacity-0 blur-2xl
            transition duration-700
            group-hover:opacity-100
        "
                    />

                    <div
                        className="
            absolute -right-10 -top-10
            h-32 w-32 rounded-full
            bg-red-500/10 blur-3xl
            animate-pulse
        "
                    />

                    <div className="relative z-10">
                        <FiAward className="text-4xl text-red-500" />

                        <h3 className="mt-6 text-4xl font-extrabold text-white">
                            12+
                        </h3>

                        <p className="mt-3 text-zinc-400">Tournois actifs</p>
                    </div>
                </div>

                <div
                    className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        transition duration-500
        hover:border-red-500/40
    "
                >
                    <div
                        className="
            absolute inset-0
            bg-gradient-to-br
            from-red-600/5
            via-transparent
            to-red-500/5
            opacity-0 blur-2xl
            transition duration-700
            group-hover:opacity-100
        "
                    />

                    <div
                        className="
            absolute -right-10 -top-10
            h-32 w-32 rounded-full
            bg-red-500/10 blur-3xl
            animate-pulse
        "
                    />

                    <div className="relative z-10">
                        <FiShield className="text-4xl text-red-500" />

                        <h3 className="mt-6 text-4xl font-extrabold text-white">
                            64
                        </h3>

                        <p className="mt-3 text-zinc-400">Teams compétitives</p>
                    </div>
                </div>

                <div
                    className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        transition duration-500
        hover:border-red-500/40
    "
                >
                    <div
                        className="
            absolute inset-0
            bg-gradient-to-br
            from-red-600/5
            via-transparent
            to-red-500/5
            opacity-0 blur-2xl
            transition duration-700
            group-hover:opacity-100
        "
                    />

                    <div
                        className="
            absolute -right-10 -top-10
            h-32 w-32 rounded-full
            bg-red-500/10 blur-3xl
            animate-pulse
        "
                    />

                    <div className="relative z-10">
                        <FiUsers className="text-4xl text-red-500" />

                        <h3 className="mt-6 text-4xl font-extrabold text-white">
                            500+
                        </h3>

                        <p className="mt-3 text-zinc-400">Joueurs inscrits</p>
                    </div>
                </div>

                <div
                    className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        transition duration-500
        hover:border-red-500/40
    "
                >
                    <div
                        className="
            absolute inset-0
            bg-gradient-to-br
            from-red-600/5
            via-transparent
            to-red-500/5
            opacity-0 blur-2xl
            transition duration-700
            group-hover:opacity-100
        "
                    />

                    <div
                        className="
            absolute -right-10 -top-10
            h-32 w-32 rounded-full
            bg-red-500/10 blur-3xl
            animate-pulse
        "
                    />

                    <div className="relative z-10">
                        <FiTarget className="text-4xl text-red-500" />

                        <h3 className="mt-6 text-4xl font-extrabold text-white">
                            150+
                        </h3>

                        <p className="mt-3 text-zinc-400">Matchs joués</p>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="grid gap-8 xl:grid-cols-3">
                <div
                    className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-8
        transition-all duration-500
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-2xl hover:shadow-red-500/10
    "
                >
                    {/* TOP LIGHT */}
                    <div
                        className="
            absolute left-0 top-0 h-1 w-full
            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent
            opacity-0 transition duration-500
            group-hover:opacity-100
        "
                    />

                    {/* BACKGROUND GLOW */}
                    <div
                        className="
            absolute -right-20 -top-20
            h-56 w-56 rounded-full
            bg-red-500/10 blur-3xl
            transition duration-700
            group-hover:scale-125
        "
                    />

                    {/* CONTENT */}
                    <div className="relative z-10">
                        {/* ICON */}
                        <div
                            className="
                flex h-20 w-20 items-center
                justify-center rounded-2xl
                bg-red-500/10
                text-red-500
                transition duration-500
                group-hover:bg-red-500/20
                group-hover:scale-110
            "
                        >
                            <FiAward className="text-5xl" />
                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-white">
                            Tournois compétitifs
                        </h2>

                        <p className="mt-5 leading-relaxed text-zinc-400">
                            Créez et rejoignez des tournois esports avec
                            tableaux de compétitions, systéme de matchmaking et prime de récompense.
                        </p>
                    </div>
                </div>

                <div
                    className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-8
        transition-all duration-500
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-2xl hover:shadow-red-500/10
    "
                >
                    <div
                        className="
            absolute left-0 top-0 h-1 w-full
            bg-gradient-to-r from-transparent via-red-500/70 to-transparent
            opacity-0 transition duration-500
            group-hover:opacity-100
        "
                    />

                    <div
                        className="
            absolute -right-20 -top-20
            h-56 w-56 rounded-full
            bg-red-500/10 blur-3xl
            transition duration-700
            group-hover:scale-125
        "
                    />

                    <div className="relative z-10">
                        <div
                            className="
                flex h-20 w-20 items-center justify-center
                rounded-2xl bg-red-500/10 text-red-500
                transition duration-500
                group-hover:bg-red-500/20
                group-hover:scale-110
            "
                        >
                            <FiShield className="text-5xl" />
                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-white">
                            Gestion d’équipes
                        </h2>

                        <p className="mt-5 leading-relaxed text-zinc-400">
                            Gérez votre équipe, recrutez des joueurs et
                            améliorez votre classement compétitif.
                        </p>
                    </div>
                </div>

                <div
                    className="
        group relative overflow-hidden
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-8
        transition-all duration-500
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-2xl hover:shadow-red-500/10
    "
                >
                    <div
                        className="
            absolute left-0 top-0 h-1 w-full
            bg-gradient-to-r from-transparent via-red-500/70 to-transparent
            opacity-0 transition duration-500
            group-hover:opacity-100
        "
                    />

                    <div
                        className="
            absolute -right-20 -top-20
            h-56 w-56 rounded-full
            bg-red-500/10 blur-3xl
            transition duration-700
            group-hover:scale-125
        "
                    />

                    <div className="relative z-10">
                        <div
                            className="
                flex h-20 w-20 items-center justify-center
                rounded-2xl bg-red-500/10 text-red-500
                transition duration-500
                group-hover:bg-red-500/20
                group-hover:scale-110
            "
                        >
                            <FiTarget className="text-5xl" />
                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-white">
                            Matchs live
                        </h2>

                        <p className="mt-5 leading-relaxed text-zinc-400">
                            Suivez les matchs en direct, les résultats et le
                            classement temps réel.
                        </p>
                    </div>
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
                        <Badge variant="danger">Meilleurs Equipes</Badge>

                        <h2 className="mt-5 text-4xl font-extrabold text-white">
                            Classement compétitif
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
                <Badge variant="danger">Participez a la compétition</Badge>

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
