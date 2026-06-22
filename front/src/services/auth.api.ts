import { api } from "@/lib/axios";

type AuthUser = { id: string; pseudo: string; email: string; role: string };

export const authApi = {
    me: () => api.get<{ user: AuthUser }>("/auth/me").then((r) => r.data),
    changePassword: (currentPassword: string, newPassword: string) =>
        api.patch<{ message: string }>("/auth/change-password", { currentPassword, newPassword }).then((r) => r.data),
    promoteToAdmin: () =>
        api.post<{ message: string; user: AuthUser; accessToken: string }>("/setup/promote-admin").then((r) => r.data),
};
