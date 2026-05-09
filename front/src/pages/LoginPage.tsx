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

            <div className="mb-8 pr-12">
                <h1 className="text-3xl font-bold">Connexion</h1>

                <p className="mt-2 text-zinc-500">
                    Connecte-toi à ton compte Overkill Arena.
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
