import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function MainLayout() {
    const { isAuthenticated, user, logout } = useAuthStore();
    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
            {/* NAVBAR */}
            <header className="border-b border-zinc-800 bg-black">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link to="/">
                        <div className="group relative">
                            {/* GLOW */}
                            <div
                                className="
                absolute inset-0
                bg-red-600/20 blur-2xl
                transition duration-500
                group-hover:bg-red-600/30
            "
                            />

                            {/* LOGO */}
                            <h1
                                className="
                relative text-3xl font-black
                uppercase tracking-[0.18em]
                transition duration-300
            "
                            >
                                <span className="text-red-500">Overkill</span>{" "}
                                <span className="text-white">Arena</span>
                            </h1>

                            {/* SUBTITLE */}
                            <p
                                className="
                text-[10px] uppercase
                tracking-[0.35em]
                text-zinc-500
            "
                            >
                                ESPORT PLATFORM
                            </p>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-4 text-sm font-medium">
                        {isAuthenticated ? (
                            <>
                                <Badge variant="danger">{user?.role}</Badge>

                                <span className="text-zinc-400">
                                    {user?.pseudo}
                                </span>

                                <Button variant="secondary" onClick={logout}>
                                    Déconnexion
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="secondary">
                                        Connexion
                                    </Button>
                                </Link>

                                <Link to="/register">
                                    <Button>Inscription</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* CONTENU */}
            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
                <Outlet />
            </main>

            {/* FOOTER */}
            <footer className="border-t border-zinc-800 bg-black py-6 text-center text-sm text-zinc-500">
                Overkill Arena © 2026
            </footer>
        </div>
    );
}
