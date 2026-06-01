import type { ReactNode } from "react";

export type ProtectedRouteProps = {
    children: ReactNode;
};

type UserRole = "PLAYER" | "SPECTATOR" | "ADMIN";

export type RoleGuardProps = {
    children: ReactNode;
    allowedRoles: UserRole[];
};