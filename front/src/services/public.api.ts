import { api } from "@/lib/axios";

export type PublicStats = {
    teams: number;
    tournaments: number;
    rewards: number;
    users: number;
};

export type TopPlayer = {
    pseudo: string;
    elo: number;
    rank: string;
    wins: number;
} | null;

export const publicApi = {
    getStats: () => api.get<PublicStats>("/public/stats").then((r) => r.data),
    getTopPlayer: () => api.get<TopPlayer>("/public/top-player").then((r) => r.data),
};
