import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { RoleGuard } from "@/features/auth/RoleGuard";

import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import { AdminPage } from "@/pages/AdminPage";
import { HomePage } from "@/pages/HomePage";
import { TournamentPage } from "@/pages/TournamentPage";
import { TeamsPage } from "@/pages/TeamsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { RewardsPage } from "@/pages/RewardsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,

        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },

    {
        path: "/",
        element: <AuthLayout />,

        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
        ],
    },

    {
        path: "/dashboard",

        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),

        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "tournaments",
                element: <TournamentPage />,
            },
            {
                path: "teams",
                element: <TeamsPage />,
            },
            {
                path: "leaderboard",
                element: <LeaderboardPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "rewards",
                element: <RewardsPage />,
            },
            {
                path: "admin",
                element: (
                    <RoleGuard allowedRoles={["ADMIN"]}>
                        <AdminPage />
                    </RoleGuard>
                ),
            },
            {
                path: "notifications",
                element: <NotificationsPage />,
            },
        ],
    },

    {
        path: "/404",
        element: <NotFoundPage />,
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
