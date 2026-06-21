import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import type { ChartDataPoint } from "@/types/dashboard";

const defaultData: ChartDataPoint[] = [
    { day: "Lun", matches: 12 },
    { day: "Mar", matches: 18 },
    { day: "Mer", matches: 10 },
    { day: "Jeu", matches: 25 },
    { day: "Ven", matches: 32 },
    { day: "Sam", matches: 41 },
    { day: "Dim", matches: 29 },
];

type MatchActivityChartProps = {
    data?: ChartDataPoint[];
};

export function MatchActivityChart({ data = defaultData }: MatchActivityChartProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Activité des matchs</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Nombre de matchs joués cette semaine.
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="day" stroke="#71717a" />
                        <YAxis stroke="#71717a" />
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
