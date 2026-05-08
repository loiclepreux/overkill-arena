import { api } from "@/lib/axios";

export async function getHealth() {
    const response = await api.get("/health");

    return response.data;
}
