//@ts-nocheck
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

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
              {entry.name}: {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueLineChart({ data }) {
  // Calculate average line
  const averageTotal = data.reduce((sum, item) => sum + item.total, 0) / data.length;

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((item) => item.total));
    const dataMin = Math.min(...data.map((item) => item.total));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="gradientTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="splitColorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#8b5cf6" stopOpacity={1} />
            <stop offset={off} stopColor="#f97316" stopOpacity={1} />
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
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
            return value;
          }}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={8}
        />
        <ReferenceLine 
          y={averageTotal} 
          label={{ 
            value: "Avg", 
            position: "insideTopLeft", 
            fill: "#64748b",
            fontSize: 12
          }} 
          stroke="#64748b" 
          strokeDasharray="3 3" 
        />
        <Line
          name="Total Revenue"
          type="monotone"
          dataKey="total"
          stroke="url(#gradientTotal)"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#8b5cf6" }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#8b5cf6" }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}