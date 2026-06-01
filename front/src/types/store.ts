import type { UserRole } from "./features";

type AuthUser = {
    id: string;
    pseudo: string;
    email: string;
    role: UserRole;
};

export type AuthState = {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;

    login: (user: AuthUser, accessToken: string) => void;

    logout: () => void;
};