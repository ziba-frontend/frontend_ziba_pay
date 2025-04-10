//@ts-nocheck
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-slate-100">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">
              {entry.name}: {new Intl.NumberFormat('en-NG', { 
                style: 'currency', 
                currency: 'NGN',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function TransactionBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        barGap={8}
        barSize={20}
      >
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
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
            return value;
          }}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          iconType="circle" 
          iconSize={8}
          wrapperStyle={{ paddingTop: 20 }}
        />
        <Bar 
          name="Cash In" 
          dataKey="cashIn" 
          fill="#4ade80" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
        <Bar 
          name="Cash Out" 
          dataKey="cashOut" 
          fill="#f97316" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}