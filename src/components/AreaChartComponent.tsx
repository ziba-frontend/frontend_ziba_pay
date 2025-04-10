//@ts-nocheck
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-slate-100">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm my-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">
              {entry.name}: {entry.value} transactions
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityAreaChart({ data }) {
  // Add count property if it doesn't exist
  const chartData = data.map(item => ({
    ...item,
    count: item.count || Math.floor((item.cashIn + item.cashOut) / 100) // Fallback calculation if count is missing
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={8}
        />
        <Area
          name="Transaction Count"
          type="monotone"
          dataKey="count"
          stroke="#f97316"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorCount)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#f97316" }}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}