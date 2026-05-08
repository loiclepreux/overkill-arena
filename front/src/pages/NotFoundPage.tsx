import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
            <h1 className="text-7xl font-extrabold text-red-500">404</h1>

            <p className="mt-4 text-2xl font-bold">Page introuvable</p>

            <p className="mt-2 text-zinc-400">
                Cette page n’existe pas ou a été déplacée.
            </p>

            <Link to="/" className="mt-8">
                <Button>Retour à l’accueil</Button>
            </Link>
        </main>
    );
}
