import { api } from "@/lib/axios";

export type TeamRole = "CAPTAIN" | "CO_CAPTAIN" | "MEMBER";

export type TeamMember = {
    id: string;
    teamId: string;
    userId: string;
    role: TeamRole;
    joinedAt: string;
};

export type Team = {
    id: string;
    name: string;
    tag: string;
    logo: string | null;
    description: string | null;
    captainId: string;
    createdAt: string;
    members: TeamMember[];
    wins: number;
};

export type JoinRequest = {
    id: string;
    teamId: string;
    userId: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
};

export type CreateTeamPayload = {
    name: string;
    tag: string;
    logo?: string;
    description?: string;
};

export const teamsApi = {
    getAll: () => api.get<Team[]>("/teams").then((r) => r.data),
    getById: (id: string) => api.get<Team>(`/teams/${id}`).then((r) => r.data),
    getMyTeam: () => api.get<Team | null>("/teams/my").then((r) => r.data || null),
    create: (data: CreateTeamPayload) =>
        api.post<Team>("/teams", data).then((r) => r.data),
    update: (id: string, data: Partial<CreateTeamPayload>) =>
        api.patch<Team>(`/teams/${id}`, data).then((r) => r.data),
    delete: (id: string) => api.delete(`/teams/${id}`).then((r) => r.data),
    requestJoin: (teamId: string) =>
        api.post(`/teams/${teamId}/join`).then((r) => r.data),
    getJoinRequests: (teamId: string) =>
        api.get<JoinRequest[]>(`/teams/${teamId}/requests`).then((r) => r.data),
    respondRequest: (requestId: string, accepted: boolean) =>
        api
            .patch(`/teams/requests/${requestId}`, { accepted })
            .then((r) => r.data),
    leave: (teamId: string) =>
        api.delete(`/teams/${teamId}/leave`).then((r) => r.data),
    kickMember: (teamId: string, userId: string) =>
        api.delete(`/teams/${teamId}/members/${userId}`).then((r) => r.data),
};
