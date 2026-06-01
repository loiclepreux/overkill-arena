import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import logo from "@/assets/logo-overkill.png";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function NotFoundPage() {
    return (
        <section
            className="
            relative flex min-h-screen
            items-center justify-center
            overflow-hidden bg-zinc-950
            px-6 py-16 text-white
        "
        >
            {/* BACKGROUND */}
            <div
                className="
                absolute inset-0
                bg-gradient-to-br
                from-black
                via-zinc-950
                to-red-950/30
            "
            />

            {/* BACKGROUND GLOW */}
            <div
                className="
                absolute left-1/2 top-1/2
                h-[500px] w-[500px]
                -translate-x-1/2 -translate-y-1/2
                rounded-full
                bg-red-600/5 blur-3xl
            "
            />

            {/* CONTENT */}
            <div
                className="
                relative z-10 max-w-3xl
                rounded-3xl border border-zinc-800
                bg-black/70 p-10
                text-center backdrop-blur-sm
            "
            >
                <Badge variant="danger">ERROR 404</Badge>

                <div className="mt-8 flex justify-center">
                    <img
                        src={logo}
                        alt="Overkill Arena"
                        className="
            h-40 w-40
            object-contain
            drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]
        "
                    />
                </div>

                <h1
                    className="
                        mt-6 text-7xl
                        font-extrabold
                        tracking-wider
                        text-white
                        sm:text-8xl
                    "
                >
                    404
                </h1>

                <h2
                    className="
                        mt-6 text-3xl
                        font-bold
                        text-white
                    "
                >
                    Vous vous êtes perdu dans l’arène
                </h2>

                <p
                    className="
                        mx-auto mt-5 max-w-xl
                        text-lg text-zinc-400
                    "
                >
                    Cette zone d’Overkill Arena n’existe pas ou a été déplacée.
                    Retournez à l’accueil et reprenez le combat.
                </p>

                <div
                    className="
                        mt-10 flex flex-col
                        items-center justify-center gap-4
                        sm:flex-row
                    "
                >
                    <Link to="/">
                        <Button>
                            <FiHome className="mr-2" />
                            Retour à l’accueil
                        </Button>
                    </Link>

                    <Link to="/dashboard">
                        <Button variant="secondary">Tableau de bord</Button>
                    </Link>
                </div>

                <p
                    className="
                        mt-10 text-xs
                        uppercase tracking-[0.3em]
                        text-zinc-600
                    "
                >
                    OVERKILL ARENA • LOST CONNECTION
                </p>
            </div>
        </section>
    );
}
