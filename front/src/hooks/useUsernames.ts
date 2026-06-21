import { useState, useEffect } from "react";
import { usersApi } from "@/services/users.api";

export type UsernameMap = Record<string, string>;

export function useUsernames(ids: string[]): UsernameMap {
    const [map, setMap] = useState<UsernameMap>({});
    const key = [...new Set(ids)].sort().join(",");

    useEffect(() => {
        if (!key) return;
        const unique = key.split(",");
        usersApi.getBulk(unique).then((users) => {
            setMap(Object.fromEntries(users.map((u) => [u.id, u.pseudo])));
        }).catch(() => {});
    }, [key]);

    return map;
}
