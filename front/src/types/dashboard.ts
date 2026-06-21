import type { ReactNode } from "react";

export type Activity = {
    id: number;
    title: string;
    description: string;
    time: string;
};

export type DashboardStatCardProps = {
    title: string;
    value: string | number;
    icon?: ReactNode;
    description?: string;
    rang?: string;
};

export type Team = {
    id: number;
    name: string;
    elo: number;
    wins: number;
};

export type NotificationType = "EN DIRECT" | "SUCCÈS" | "AVERTISSEMENT";

export type Notification = {
    id: number;
    title: string;
    description: string;
    type: NotificationType;
    time: string;
};

export type MatchStatus = "VALIDÉ" | "EN DIRECT" | "EN ATTENTE";

export type Match = {
    id: number;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    format: string;
    status: MatchStatus;
    time: string;
};

export type TournamentStatus = "OUVERT" | "EN DIRECT" | "TERMINÉ";

export type Tournament = {
    id: number;
    name: string;
    game: string;
    teams: number;
    recompense: string;
    status: TournamentStatus;
    startDate: string;
};

export type ChartDataPoint = {
    day: string;
    matches: number;
};
