import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const data = [
    {
        day: "Mon",
        matches: 12,
    },

    {
        day: "Tue",
        matches: 18,
    },

    {
        day: "Wed",
        matches: 10,
    },

    {
        day: "Thu",
        matches: 25,
    },

    {
        day: "Fri",
        matches: 32,
    },

    {
        day: "Sat",
        matches: 41,
    },

    {
        day: "Sun",
        matches: 29,
    },
];

export function MatchActivityChart() {
    return (
        <div
            className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/80 p-6
        shadow-lg shadow-black/30
      "
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Match Activity
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Activité des matchs cette semaine.
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="day" stroke="#71717a" />

                        <YAxis stroke="#71717a" />

                        <Tooltip />

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
