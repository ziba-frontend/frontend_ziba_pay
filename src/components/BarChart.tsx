/** @format */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

type Props = {
  data: { name: string; total: number }[];
};

const BarChartComponent: React.FC<Props> = ({ data }) => {
  const yTicks = [0,50, 100, 200, 500, 1000]; 
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name">
          <Label value="Months" position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis ticks={yTicks}>
          <Label value="Amount in $" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3BD64A" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
