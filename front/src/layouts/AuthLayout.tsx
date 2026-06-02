import { Outlet, Link } from "react-router-dom";
import logo from "@/assets/logo-overkill.png";

export function AuthLayout() {
    return (
        <div
            className="
                relative flex min-h-screen
                items-center justify-center
                overflow-hidden bg-black
                px-6 py-10 text-white
            "
        >
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_42%)]" />

            <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

            {/* CARD */}
            <div
                className="
                    relative w-full max-w-md
                    rounded-3xl border border-zinc-800
                    bg-zinc-950/90 p-8
                    shadow-2xl shadow-red-950/20
                    backdrop-blur
                "
            >
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-flex flex-col items-center">
                        <img
                            src={logo}
                            alt="Overkill Arena"
                            className="
                                h-24 w-24 object-contain
                                drop-shadow-[0_0_25px_rgba(239,68,68,0.45)]
                            "
                        />

                        <span
                            className="
                                mt-3 text-3xl font-black
                                uppercase tracking-[0.16em]
                            "
                        >
                            <span className="text-red-500">Overkill</span>{" "}
                            <span className="text-white">Arena</span>
                        </span>
                    </Link>

                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
                        Competitive Esports Platform
                    </p>
                </div>

                <Outlet />
            </div>
        </div>
    );
}
