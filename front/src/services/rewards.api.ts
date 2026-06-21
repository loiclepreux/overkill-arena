import { api } from "@/lib/axios";

export type RewardType = "MEDAL" | "CUP" | "TITLE";
export type MedalRank = "BRONZE" | "SILVER" | "GOLD";

export type Reward = {
    id: string;
    userId: string;
    type: RewardType;
    medalRank: MedalRank | null;
    cupName: string | null;
    titleName: string | null;
    description: string | null;
    tournamentId: string | null;
    matchId: string | null;
    awardedAt: string;
};

export type RewardStats = {
    total: number;
    medals: { total: number; gold: number; silver: number; bronze: number };
    cups: number;
    titles: number;
};

export type AwardRewardData = {
    userId: string;
    type: RewardType;
    medalRank?: MedalRank;
    cupName?: string;
    titleName?: string;
    description?: string;
    tournamentId?: string;
};

export const rewardsApi = {
    getMyRewards: () => api.get<Reward[]>("/rewards/me").then((r) => r.data),
    getMyStats: () =>
        api.get<RewardStats>("/rewards/me/stats").then((r) => r.data),
    getByUser: (userId: string) =>
        api.get<Reward[]>(`/rewards/user/${userId}`).then((r) => r.data),
    getStatsByUser: (userId: string) =>
        api
            .get<RewardStats>(`/rewards/user/${userId}/stats`)
            .then((r) => r.data),
    award: (data: AwardRewardData) =>
        api.post<Reward>("/rewards", data).then((r) => r.data),
};
