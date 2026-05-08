import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

type UserRole = "PLAYER" | "SPECTATOR" | "ADMIN";

type RoleGuardProps = {
    children: ReactNode;
    allowedRoles: UserRole[];
};

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const hasAccess = user && allowedRoles.includes(user.role);

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return children;
}
