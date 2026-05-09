import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import logo from "@/assets/logo-overkill.png";

export function MainLayout() {
    const { isAuthenticated, user, logout } = useAuthStore();
    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
            {/* NAVBAR */}
            <header className="border-b border-zinc-800 bg-black">
                <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center">
                        {/* LOGO */}
                        <div
                            className="
            relative sm:-ml-6 flex h-30 w-30
            items-center justify-center
        "
                        >
                            {/* GLOW */}
                            <div
                                className="
                absolute inset-0
                rounded-full bg-red-600/20
                blur-2xl
            "
                            />

                            {/* IMAGE */}
                            <img
                                src={logo}
                                alt="Overkill Arena Logo"
                                className="
                relative h-full w-full
                object-contain
                drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
            "
                            />
                        </div>

                        {/* TEXT */}
                        <div>
                            <h1
                                className="
                text-2xl sm:text-4xl font-black uppercase
                tracking-[0.18em]
            "
                            >
                                <span className="text-red-500">Overkill</span>{" "}
                                <span className="text-white">Arena</span>
                            </h1>

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
                    </div>

                    <nav className="flex w-full justify-center gap-3 text-sm font-medium sm:w-auto sm:justify-end">
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
            <main className="mx-auto w-full max-w-[1600px] flex-1 px-10 py-12">
                <Outlet />
            </main>

            {/* FOOTER */}
            <footer className="border-t border-zinc-800 bg-black py-6 text-center text-sm text-zinc-500">
                Overkill Arena © 2026 by Lepreux Loïc
            </footer>
        </div>
    );
}
