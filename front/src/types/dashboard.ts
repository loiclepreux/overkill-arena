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

export type Notification = {
    id: number;
    title: string;
    description: string;
    type: "LIVE" | "SUCCESS" | "WARNING";
    time: string;
};

export type Match = {
    id: number;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    format: string;
    status: "VALIDÉ" | "LIVE" | "PENDING";
    time: string;
};

export type Tournament = {
    id: number;
    name: string;
    game: string;
    teams: number;
    recompense: string;
    status: "OPEN" | "LIVE" | "CLOSED";
    startDate: string;
};