import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import type { Match } from "@/services/matches.api";

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function buildWeeklyData(matches: Match[] | null | undefined) {
    const counts: Record<string, number> = { Lun: 0, Mar: 0, Mer: 0, Jeu: 0, Ven: 0, Sam: 0, Dim: 0 };
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    (matches ?? []).forEach((m) => {
        const date = m.playedAt ? new Date(m.playedAt) : null;
        if (!date || date.getTime() < oneWeekAgo) return;
        const day = DAYS[date.getDay()];
        counts[day] = (counts[day] ?? 0) + 1;
    });
    return ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => ({
        day,
        matches: counts[day],
    }));
}

type MatchActivityChartProps = {
    matches?: Match[] | null;
};

export function MatchActivityChart({ matches }: MatchActivityChartProps) {
    const data = buildWeeklyData(matches);
    const hasData = data.some((d) => d.matches > 0);

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Activité des matchs</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Matchs joués par votre équipe cette semaine.
                </p>
            </div>

            {!hasData && (
                <p className="text-sm text-zinc-500 mb-4">Aucun match joué cette semaine.</p>
            )}

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="day" stroke="#71717a" />
                        <YAxis stroke="#71717a" allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#18181b",
                                border: "1px solid #3f3f46",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="matches"
                            stroke="#dc2626"
                            fill="#dc2626"
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
