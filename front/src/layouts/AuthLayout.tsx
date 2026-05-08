import { Outlet, Link } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_40%)]" />

            <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/90 p-8 shadow-2xl shadow-red-950/20 backdrop-blur">
                <div className="mb-8 text-center">
                    <Link
                        to="/"
                        className="text-4xl font-extrabold text-red-500"
                    >
                        Overkill Arena
                    </Link>

                    <p className="mt-3 text-sm text-zinc-500">
                        Competitive Esports Platform
                    </p>
                </div>

                <Outlet />
            </div>
        </div>
    );
}
