"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type StatusDistributionProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

export default function StatusDistribution({ data }: StatusDistributionProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col gap-1 py-2 px-4">
        <h2>Issue Status Distribution</h2>
        <p className="text-sm text-muted-foreground">
          Current distribution of issues by status
        </p>
      </div>
      <div className="w-full h-[250px] pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
