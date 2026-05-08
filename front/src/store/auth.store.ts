import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserRole = "PLAYER" | "SPECTATOR" | "ADMIN";

type AuthUser = {
    id: string;
    pseudo: string;
    email: string;
    role: UserRole;
};

type AuthState = {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;

    login: (user: AuthUser, accessToken: string) => void;

    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,

            accessToken: null,

            isAuthenticated: false,

            login: (user, accessToken) =>
                set({
                    user,
                    accessToken,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                }),
        }),

        {
            name: "auth-storage",
        },
    ),
);
