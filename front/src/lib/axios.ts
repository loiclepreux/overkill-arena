import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

export const api = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.replace("/login");
        }
        return Promise.reject(error);
    },
);
