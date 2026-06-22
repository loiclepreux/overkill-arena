import type { ReactNode } from "react";

export type DashboardStatCardProps = {
    title: string;
    value: string | number;
    icon?: ReactNode;
    description?: string;
    rang?: string;
};
