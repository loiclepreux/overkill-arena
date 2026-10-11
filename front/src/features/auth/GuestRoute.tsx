import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import type { ProtectedRouteProps } from "@/types/features";

export function GuestRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
