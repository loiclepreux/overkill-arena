import { api } from "@/lib/axios";

export type UserProfile = {
    id: string;
    userId: string;
    pseudo: string;
    avatar: string | null;
    bio: string | null;
    country: string | null;
    favoriteGame: string | null;
};

export type UserStats = {
    id: string;
    userId: string;
    elo: number;
    xp: number;
    level: number;
    wins: number;
    losses: number;
    tournamentsPlayed: number;
    tournamentsWon: number;
    rank: string;
};

export type UserMe = {
    profile: UserProfile;
    stats: UserStats;
};

export type UpdateProfilePayload = {
    bio?: string;
    country?: string;
    favoriteGame?: string;
    avatar?: string;
};

export type UserBasic = { id: string; pseudo: string };
export type UserAdmin = { id: string; pseudo: string; email: string; role: string };

export const usersApi = {
    getMe: () => api.get<UserMe>("/users/me").then((r) => r.data),
    getById: (id: string) => api.get<UserMe>(`/users/${id}`).then((r) => r.data),
    getAll: () => api.get<UserAdmin[]>("/users").then((r) => r.data),
    updateProfile: (data: UpdateProfilePayload) =>
        api.patch<UserMe>("/users/profile", data).then((r) => r.data),
    getBulk: (ids: string[]) =>
        ids.length === 0
            ? Promise.resolve([] as UserBasic[])
            : api
                  .get<UserBasic[]>("/users/bulk", { params: { ids: ids.join(",") } })
                  .then((r) => r.data),
};
