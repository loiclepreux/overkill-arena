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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,

        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "tournaments",
                element: (
                    <ProtectedRoute>
                        <TournamentPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "teams",
                element: (
                    <ProtectedRoute>
                        <TeamsPage />
                    </ProtectedRoute>
                ),
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
                path: "profile",
                element: <ProfilePage />,
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
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
