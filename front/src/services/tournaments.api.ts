import { api } from "@/lib/axios";

export type TournamentStatus = "DRAFT" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type TournamentFormat = "SINGLE_ELIMINATION" | "DOUBLE_ELIMINATION" | "ROUND_ROBIN";

export type Tournament = {
    id: string;
    name: string;
    game: string;
    format: TournamentFormat;
    status: TournamentStatus;
    maxTeams: number;
    description: string | null;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    _count?: { participants: number };
};

export type CreateTournamentData = {
    name: string;
    game: string;
    format?: TournamentFormat;
    maxTeams: number;
    description?: string;
    startDate?: string;
    endDate?: string;
};

export const tournamentsApi = {
    getAll: (status?: TournamentStatus) =>
        api
            .get<Tournament[]>("/tournaments", { params: status ? { status } : {} })
            .then((r) => r.data),
    getById: (id: string) =>
        api.get<Tournament>(`/tournaments/${id}`).then((r) => r.data),
    create: (data: CreateTournamentData) =>
        api.post<Tournament>("/tournaments", data).then((r) => r.data),
    updateStatus: (id: string, status: TournamentStatus) =>
        api.patch<Tournament>(`/tournaments/${id}/status`, { status }).then((r) => r.data),
    register: (tournamentId: string, teamId: string) =>
        api
            .post(`/tournaments/${tournamentId}/register`, { teamId })
            .then((r) => r.data),
    unregister: (tournamentId: string, teamId: string) =>
        api
            .delete(`/tournaments/${tournamentId}/register`, { data: { teamId } })
            .then((r) => r.data),
    getParticipants: (tournamentId: string) =>
        api
            .get(`/tournaments/${tournamentId}/participants`)
            .then((r) => r.data),
};
