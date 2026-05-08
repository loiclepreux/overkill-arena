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
                    <Link to="/" className="text-2xl font-bold text-red-500">
                        Overkill Arena
                    </Link>

                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <Link to="/" className="transition hover:text-red-500">
                            Home
                        </Link>

                        <Link
                            to="/dashboard/tournaments"
                            className="transition hover:text-red-500"
                        >
                            Tournois
                        </Link>

                        <Link
                            to="/dashboard/teams"
                            className="transition hover:text-red-500"
                        >
                            Équipes
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard/profile"
                                    className="transition hover:text-red-500"
                                >
                                    Profil
                                </Link>

                                <Badge variant="danger">{user?.role}</Badge>

                                <span className="text-zinc-400">
                                    {user?.pseudo}
                                </span>

                                <Button variant="secondary" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="secondary">Login</Button>
                                </Link>

                                <Link to="/register">
                                    <Button>Register</Button>
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
