import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import type { RoleGuardProps } from "@/types/features";

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const hasAccess = user && allowedRoles.includes(user.role);

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
