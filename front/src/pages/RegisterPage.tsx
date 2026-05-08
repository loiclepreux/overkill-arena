import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterPage() {
    return (
        <section>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Inscription</h1>

                <p className="mt-2 text-zinc-500">
                    Rejoins Overkill Arena dès maintenant.
                </p>
            </div>

            <form className="space-y-5">
                <Input label="Pseudo" placeholder="OverkillPlayer" />

                <Input label="Email" type="email" placeholder="ton@email.com" />

                <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="••••••••"
                />

                <Button type="submit" className="w-full">
                    Créer un compte
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
                Déjà un compte ?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-red-500 hover:text-red-400"
                >
                    Connexion
                </Link>
            </p>
        </section>
    );
}
