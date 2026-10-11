import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/auth.store";
import { register as registerApi, getApiErrorMessage } from "@/services/auth/auth.api";
import { useApi } from "@/hooks/useApi";
import { publicApi } from "@/services/public.api";

export function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { data: stats } = useApi(publicApi.getStats);

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validate = (): string | null => {
        if (!pseudo.trim()) return "Le pseudo est requis.";
        if (pseudo.trim().length < 3) return "Le pseudo doit contenir au moins 3 caractères.";
        if (!email.trim()) return "L'email est requis.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "L'email n'est pas valide.";
        if (!password) return "Le mot de passe est requis.";
        if (password.length < 6) return "Le mot de passe doit contenir au moins 6 caractères.";
        if (password !== confirmPassword) return "Les mots de passe ne correspondent pas.";
        return null;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        setLoading(true);

        try {
            const data = await registerApi({ pseudo, email, password });
            login(data.user, data.accessToken);
            navigate("/dashboard");
        } catch (err: unknown) {
            setError(getApiErrorMessage(err, "Erreur lors de l'inscription."));
        } finally {
            setLoading(false);
        }
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
                    Recrutement ouvert
                </span>
            </div>

            <div className="mb-8 pr-12">
                <h1 className="text-4xl font-extrabold text-white">
                    Rejoindre l'arène
                </h1>

                <p className="mt-3 text-zinc-400">
                    Crée ton profil, participe aux tournois, gagne des médailles
                    et débloque les plus hauts titres.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Pseudo"
                    placeholder="OverkillPlayer"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    required
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="ton@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Input
                    label="Confirmer le mot de passe"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Création..." : "Créer un compte"}
                </Button>
            </form>

            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm text-zinc-400">
                    🏆 {stats ? stats.rewards : "…"} récompenses attribuées
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                    👥 {stats ? stats.teams : "…"} équipes compétitives
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                    ⚔️ {stats ? stats.tournaments : "…"} tournois créés
                </p>
            </div>

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
