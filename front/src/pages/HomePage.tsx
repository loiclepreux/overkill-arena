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
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="
                        absolute inset-0
                        h-full w-full object-cover
                        opacity-30
                    "
                >
                    <source src={Video} type="video/mp4" />
                </video>

                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-br
                        from-black/40 via-black/20 to-red-950/20
                    "
                />

                <div className="relative z-10 max-w-6xl">
                    <Badge variant="danger">Competitive Esports Platform</Badge>

                    <h1
                        className="
                            mt-8 text-4xl font-extrabold
                            leading-tight text-white
                            sm:text-5xl lg:text-7xl xl:text-8xl
                        "
                    >
                        Overkill Arena
                    </h1>

                    <p
                        className="
                            mt-6 max-w-2xl text-base
                            leading-relaxed text-zinc-400
                            sm:text-lg lg:text-xl
                        "
                    >
                        Participez aux tournois compétitifs, gérez votre équipe,
                        gagnez des médailles, débloquez des titres et dominez
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

                <div
                    className="
                        absolute -right-20 -top-20
                        h-96 w-96 rounded-full
                        bg-red-600/20 blur-3xl
                    "
                />
            </div>

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <HomeStatCard
                    icon={<FiAward className="text-4xl text-red-500" />}
                    value="12+"
                    label="Tournois actifs"
                />

                <HomeStatCard
                    icon={<FiShield className="text-4xl text-red-500" />}
                    value="64"
                    label="Teams compétitives"
                />

                <HomeStatCard
                    icon={<FiTarget className="text-4xl text-red-500" />}
                    value="245"
                    label="Médailles attribuées"
                />

                <HomeStatCard
                    icon={<FiUsers className="text-4xl text-red-500" />}
                    value="42"
                    label="Titres débloqués"
                />
            </div>

            {/* FEATURES */}
            <div className="grid gap-8 xl:grid-cols-3">
                <FeatureCard
                    icon={<FiAward className="text-5xl" />}
                    title="Tournois compétitifs"
                    description="Créez et rejoignez des tournois esports avec tableaux de compétition, matchmaking, médailles, coupes et titres exclusifs."
                />

                <FeatureCard
                    icon={<FiShield className="text-5xl" />}
                    title="Gestion d’équipes"
                    description="Gérez votre équipe, recrutez des joueurs, suivez les performances et construisez une vraie identité compétitive."
                />

                <FeatureCard
                    icon={<FiTarget className="text-5xl" />}
                    title="Progression joueur"
                    description="Gagnez des médailles, débloquez des coupes, améliorez votre titre et grimpez dans le classement Overkill Arena."
                />
            </div>

            {/* SEASON CHAMPION */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8">
                <Badge variant="warning">Champion de la saison</Badge>

                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white">
                            🥇 OverkillPlayer
                        </h2>

                        <p className="mt-4 text-zinc-400">
                            Leader actuel du classement compétitif.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <MiniStat title="Titre" value="Diamond" red />
                        <MiniStat title="Coupes" value="3 🏆" />
                        <MiniStat title="ELO" value="2450" />
                    </div>
                </div>
            </div>

            {/* FEATURED TOURNAMENT */}
            <div
                className="
                    rounded-3xl border border-zinc-800
                    bg-zinc-900/80 p-8
                "
            >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Badge variant="danger">Tournoi vedette</Badge>

                        <h2 className="mt-5 text-4xl font-extrabold text-white">
                            Winter Clash
                        </h2>

                        <p className="mt-4 max-w-2xl text-zinc-400">
                            32 équipes, bracket compétitif, récompenses Prestige
                            et médailles pour les meilleurs joueurs.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Badge variant="warning">Diamond League</Badge>
                            <Badge variant="success">28/32 équipes</Badge>
                            <Badge variant="danger">Début dans 3 jours</Badge>
                        </div>
                    </div>

                    <Link to="/register">
                        <Button>
                            Rejoindre le tournoi
                            <FiArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* PROGRESSION SYSTEM */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8">
                <Badge variant="warning">Système de progression</Badge>

                <h2 className="mt-5 text-4xl font-extrabold text-white">
                    Gravissez les rangs
                </h2>

                <p className="mt-4 max-w-3xl text-zinc-400">
                    Chaque tournoi alimente votre progression : médailles,
                    coupes, titres et prestige.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <ProgressCard
                        icon="🥉"
                        title="Médailles"
                        text="Bronze, argent et or"
                    />
                    <ProgressCard
                        icon="🏆"
                        title="Coupes"
                        text="Débloquées avec vos médailles"
                    />
                    <ProgressCard
                        icon="💎"
                        title="Titres"
                        text="Rubis, Diamond, Master..."
                    />
                    <ProgressCard
                        icon="🔥"
                        title="Prestige"
                        text="Dominez le classement"
                    />
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
                <Badge variant="danger">Participez à la compétition</Badge>

                <h2 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
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

type HomeStatCardProps = {
    icon: React.ReactNode;
    value: string;
    label: string;
};

function HomeStatCard({ icon, value, label }: HomeStatCardProps) {
    return (
        <div
            className="
                group relative overflow-hidden rounded-2xl
                border border-zinc-800 bg-zinc-900/80 p-6
                transition duration-500 hover:border-red-500/40
            "
        >
            <div
                className="
                    absolute inset-0 bg-gradient-to-br
                    from-red-600/5 via-transparent to-red-500/5
                    opacity-0 blur-2xl transition duration-700
                    group-hover:opacity-100
                "
            />

            <div
                className="
                    absolute -right-10 -top-10 h-32 w-32
                    rounded-full bg-red-500/10 blur-3xl animate-pulse
                "
            />

            <div className="relative z-10">
                {icon}

                <h3 className="mt-6 text-4xl font-extrabold text-white">
                    {value}
                </h3>

                <p className="mt-3 text-zinc-400">{label}</p>
            </div>
        </div>
    );
}

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div
            className="
                group relative overflow-hidden rounded-2xl
                border border-zinc-800 bg-zinc-900/80 p-8
                transition-all duration-500 hover:-translate-y-2
                hover:border-red-500/40 hover:shadow-2xl
                hover:shadow-red-500/10
            "
        >
            <div
                className="
                    absolute left-0 top-0 h-1 w-full
                    bg-gradient-to-r from-transparent via-red-500/70 to-transparent
                    opacity-0 transition duration-500 group-hover:opacity-100
                "
            />

            <div
                className="
                    absolute -right-20 -top-20 h-56 w-56
                    rounded-full bg-red-500/10 blur-3xl
                    transition duration-700 group-hover:scale-125
                "
            />

            <div className="relative z-10">
                <div
                    className="
                        flex h-20 w-20 items-center justify-center
                        rounded-2xl bg-red-500/10 text-red-500
                        transition duration-500 group-hover:bg-red-500/20
                        group-hover:scale-110
                    "
                >
                    {icon}
                </div>

                <h2 className="mt-8 text-3xl font-bold text-white">{title}</h2>

                <p className="mt-5 leading-relaxed text-zinc-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

type MiniStatProps = {
    title: string;
    value: string;
    red?: boolean;
};

function MiniStat({ title, value, red = false }: MiniStatProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-center">
            <p className="text-zinc-500">{title}</p>
            <p
                className={`mt-2 text-xl font-bold ${
                    red ? "text-red-500" : "text-white"
                }`}
            >
                {value}
            </p>
        </div>
    );
}

type ProgressCardProps = {
    icon: string;
    title: string;
    text: string;
};

function ProgressCard({ icon, title, text }: ProgressCardProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-black/30 p-5 text-center">
            <p className="text-4xl">{icon}</p>
            <h3 className="mt-3 font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm text-zinc-500">{text}</p>
        </div>
    );
}
