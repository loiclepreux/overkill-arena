import { Link, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/auth.store";

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login(
            {
                id: "1",
                pseudo: "OverkillPlayer",
                email: "player@test.com",
                role: "ADMIN",
            },
            "fake-token",
        );

        navigate("/dashboard");
    };

    return (
        <section className="relative">
            <Link
                to="/"
                className="
        absolute right-4 top-4 z-20
        flex h-10 w-10 items-center
        justify-center rounded-full
        border border-zinc-700
        bg-black/60 text-zinc-400
        transition duration-300
        hover:border-red-500
        hover:bg-red-500/10
        hover:text-red-500
    "
            >
                <FiX className="text-xl" />
            </Link>

            <div className="mb-6">
                <span
                    className="
            inline-flex rounded-full
            border border-red-500/30
            bg-red-500/10
            px-3 py-1
            text-xs font-semibold
            uppercase tracking-wider
            text-red-500
        "
                >
                    Retour dans l'arène
                </span>
            </div>

            <div className="mb-8 pr-12">
                <h1 className="text-4xl font-extrabold text-white">
                    Reprendre le combat
                </h1>

                <p className="mt-3 text-zinc-400">
                    Accède à tes équipes, tes tournois, tes récompenses et
                    poursuis ta progression.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input label="Email" type="email" placeholder="ton@email.com" />

                <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="••••••••"
                />

                <Button type="submit" className="w-full">
                    Se connecter
                </Button>
            </form>

            <div
                className="
        mt-8 rounded-xl
        border border-zinc-800
        bg-zinc-900/50
        p-4
    "
            >
                <p className="text-sm text-zinc-400">🏆 42 titres débloqués</p>

                <p className="mt-2 text-sm text-zinc-400">
                    🥇 245 médailles attribuées
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                    ⚔️ 12 tournois actifs
                </p>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
                Pas encore de compte ?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-red-500 hover:text-red-400"
                >
                    Inscription
                </Link>
            </p>
        </section>
    );
}
