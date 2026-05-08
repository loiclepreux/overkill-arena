import { Link, useNavigate } from "react-router-dom";

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
        <section>
            <div className="mb-8">
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
