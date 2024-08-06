/** @format */
"use client";
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
} from "recharts";

type Props = {
  data: { name: string; cashIn: number; cashOut: number }[];
};

const LineChartComponent: React.FC<Props> = ({ data }) => {
   const yTicks = [0, 10, 50, 100, 1000];

   return (
      <ResponsiveContainer width="100%" height={350}>
         <LineChart
            data={data}
            margin={{
               top: 5,
               right: 30,
               left: 20,
               bottom: 5,
            }}
         >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis ticks={yTicks} />
            <Tooltip />
            <Legend />
            <Line
               type="monotone"
               dataKey="cashIn"
               stroke="#8884d8"
               activeDot={{ r: 8 }}
            />
            <Line
               type="monotone"
               dataKey="cashOut"
               stroke="#82ca9d"
            />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default LineChartComponent;
