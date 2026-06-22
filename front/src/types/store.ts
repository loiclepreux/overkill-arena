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
    unreadNotificationsCount: number;

    login: (user: AuthUser, accessToken: string) => void;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
    setUnreadNotificationsCount: (count: number) => void;
    incrementUnreadNotificationsCount: () => void;
};
