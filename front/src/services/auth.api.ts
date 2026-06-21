import { api } from "@/lib/axios";

export const authApi = {
    me: () => api.get<{ user: { id: string; pseudo: string; email: string; role: string } }>("/auth/me").then((r) => r.data),
    changePassword: (currentPassword: string, newPassword: string) =>
        api.patch<{ message: string }>("/auth/change-password", { currentPassword, newPassword }).then((r) => r.data),
};
