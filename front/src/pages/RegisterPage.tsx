import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterPage() {
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
