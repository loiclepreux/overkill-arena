import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export type ApiState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
};

export function useApi<T>(fetcher: () => Promise<T>): ApiState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rev, setRev] = useState(0);

    useEffect(() => {
        fetcher()
            .then((result) => {
                setData(result);
                setError(null);
            })
            .catch((err: unknown) => {
                if (axios.isAxiosError(err)) {
                    setError(
                        (err.response?.data as { message?: string })?.message ??
                            "Erreur serveur"
                    );
                } else {
                    setError("Erreur inconnue");
                }
            })
            .finally(() => setLoading(false));
    }, [rev]); // eslint-disable-line react-hooks/exhaustive-deps

    const refetch = useCallback(() => {
        setLoading(true);
        setRev((r) => r + 1);
    }, []);

    return { data, loading, error, refetch };
}

export function getErrorMessage(err: unknown): string {
    if (axios.isAxiosError(err)) {
        return (
            (err.response?.data as { message?: string })?.message ??
            "Erreur serveur"
        );
    }
    return "Erreur inconnue";
}
