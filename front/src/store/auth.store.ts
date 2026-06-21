import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            unreadNotificationsCount: 0,

            login: (user, accessToken) =>
                set({ user, accessToken, isAuthenticated: true }),

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                    unreadNotificationsCount: 0,
                }),

            setUnreadNotificationsCount: (count) =>
                set({ unreadNotificationsCount: count }),
        }),
        { name: "auth-storage" },
    ),
);
