import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "@/store/auth.store";
import {
    FiBell,
    FiGrid,
    FiShield,
    FiAward,
    FiUser,
    FiSettings,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function DashboardLayout() {
    const { user, logout } = useAuthStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `
    rounded-lg px-4 py-3 transition

    ${isActive ? "bg-red-600 text-white" : "hover:bg-zinc-900 text-zinc-300"}
  `;

    const handleLogout = () => {
        logout();
        closeSidebar();
        window.location.replace("/");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white lg:flex">
            {/* MOBILE TOPBAR */}
            <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-zinc-800 bg-black px-4 py-4 lg:hidden">
                <Link
                    to="/dashboard"
                    onClick={closeSidebar}
                    className="text-2xl font-bold text-red-500"
                >
                    Overkill Arena
                </Link>

                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-3xl text-white"
                    aria-label="Ouvrir le menu"
                >
                    <FiMenu />
                </button>
            </div>

            {/* OVERLAY MOBILE */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
          fixed left-0 top-0 z-50 flex min-h-screen w-72 flex-col
          border-r border-zinc-800 bg-black
          transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
            >
                {/* CLOSE MOBILE */}
                <button
                    type="button"
                    onClick={closeSidebar}
                    className="absolute right-4 top-4 text-3xl text-white lg:hidden"
                    aria-label="Fermer le menu"
                >
                    <FiX />
                </button>

                {/* LOGO */}
                <div className="border-b border-zinc-800 p-6">
                    <Link
                        to="/dashboard"
                        onClick={closeSidebar}
                        className="text-3xl font-extrabold text-red-500"
                    >
                        Overkill Arena
                    </Link>
                </div>

                {/* NAVIGATION */}
                <nav className="flex flex-1 flex-col gap-2 p-4">
                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={navLinkClass}
                    >
                        <span className="flex items-center gap-3">
                            <FiGrid className="text-lg" />
                            Tableau de bord
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/tournaments"
                        onClick={closeSidebar}
                        className={navLinkClass}
                    >
                        <span className="flex items-center gap-3">
                            <FiAward className="text-lg" />
                            Tournois
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/teams"
                        onClick={closeSidebar}
                        className={navLinkClass}
                    >
                        <span className="flex items-center gap-3">
                            <FiShield className="text-lg" />
                            Équipes
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/leaderboard"
                        onClick={closeSidebar}
                        className={navLinkClass}
                    >
                        <span className="flex items-center gap-3">
                            <FiAward className="text-lg" />
                            Classement
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/notifications"
                        onClick={closeSidebar}
                        className={navLinkClass}
                    >
                        <span className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-3">
                                <FiBell className="text-lg" />
                                Notifications
                            </span>

                            <span
                                className="
      rounded-full bg-red-600
      px-2 py-0.5 text-xs
      font-bold text-white
    "
                            >
                                3
                            </span>
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/profile"
                        onClick={closeSidebar}
                        className={navLinkClass}
                    >
                        <span className="flex items-center gap-3">
                            <FiUser className="text-lg" />
                            Profil
                        </span>
                    </NavLink>

                    {user?.role === "ADMIN" && (
                        <NavLink
                            to="/dashboard/admin"
                            onClick={closeSidebar}
                            className={navLinkClass}
                        >
                            <span className="flex items-center gap-3">
                                <FiSettings className="text-lg" />
                                Admin
                            </span>
                        </NavLink>
                    )}
                </nav>

                {/* USER AREA */}
                <div className="border-t border-zinc-800 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="truncate font-semibold">
                                {user?.pseudo}
                            </p>

                            <p className="truncate text-sm text-zinc-500">
                                {user?.email}
                            </p>
                        </div>

                        <Badge variant="danger">{user?.role}</Badge>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </Button>
                </div>
            </aside>

            {/* CONTENT */}
            <main className="flex-1 p-6 pt-24 lg:p-8">
                <Outlet />
            </main>
        </div>
    );
}
