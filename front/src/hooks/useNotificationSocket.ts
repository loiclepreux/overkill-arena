import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "@/store/auth.store";

const WS_URL = import.meta.env.VITE_AUTH_API_URL ?? "http://localhost:3000";

export function useNotificationSocket() {
    const accessToken = useAuthStore((s) => s.accessToken);
    const increment = useAuthStore((s) => s.incrementUnreadNotificationsCount);

    useEffect(() => {
        if (!accessToken) return;

        const socket = io(`${WS_URL}/ws`, {
            auth: { token: accessToken },
            reconnectionAttempts: 5,
        });

        socket.on("notification", () => {
            increment();
        });

        return () => {
            socket.disconnect();
        };
    }, [accessToken, increment]);
}
