import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "@/types/store";

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
