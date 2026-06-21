import axios from "axios";
import { api } from "@/lib/axios";
import type { UserRole } from "@/types/features";

type LoginPayload = {
    email: string;
    password: string;
};

type RegisterPayload = {
    pseudo: string;
    email: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    user: {
        id: string;
        pseudo: string;
        email: string;
        role: UserRole;
        createdAt: string;
    };
    accessToken: string;
};

export async function login(data: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
}

export async function register(data: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
}

export function getApiErrorMessage(err: unknown, fallback: string): string {
    if (axios.isAxiosError(err)) {
        return (err.response?.data as { message?: string })?.message ?? fallback;
    }
    return fallback;
}
