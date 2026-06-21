import { api } from "@/lib/axios";

export type MatchStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "CONTESTED";
export type MatchFormat = "BO1" | "BO3" | "BO5";

export type Match = {
    id: string;
    tournamentId: string | null;
    teamAId: string;
    teamBId: string;
    format: MatchFormat;
    status: MatchStatus;
    scoreA: number;
    scoreB: number;
    winnerId: string | null;
    scheduledAt: string | null;
    playedAt: string | null;
    createdAt: string;
};

export type CreateMatchData = {
    tournamentId?: string;
    teamAId: string;
    teamBId: string;
    format?: MatchFormat;
    scheduledAt?: string;
};

export const matchesApi = {
    create: (data: CreateMatchData) => api.post<Match>("/matches", data).then((r) => r.data),
    getById: (id: string) => api.get<Match>(`/matches/${id}`).then((r) => r.data),
    getByTeam: (teamId: string) =>
        api.get<Match[]>(`/matches/team/${teamId}`).then((r) => r.data),
    getByTournament: (tournamentId: string) =>
        api.get<Match[]>(`/matches/tournament/${tournamentId}`).then((r) => r.data),
    submitScore: (id: string, teamId: string, scoreA: number, scoreB: number) =>
        api
            .patch<Match>(`/matches/${id}/score`, { teamId, scoreA, scoreB })
            .then((r) => r.data),
    validate: (id: string) =>
        api.patch<Match>(`/matches/${id}/validate`, {}).then((r) => r.data),
    contest: (id: string, teamId: string) =>
        api.post<Match>(`/matches/${id}/contest`, { teamId }).then((r) => r.data),
    updateStatus: (id: string, status: MatchStatus) =>
        api.patch<Match>(`/matches/${id}/status`, { status }).then((r) => r.data),
};
