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
   Label
} from "recharts";

type Props = {
  data: { name: string; cashIn: number; cashOut: number }[];
};

const LineChartComponent: React.FC<Props> = ({ data }) => {
   const yTicks = [0,50, 100, 200, 500, 1000]; 

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
            <XAxis dataKey="name">
               <Label value="Months" position="insideBottom" offset={-5} />
            </XAxis>
            <YAxis ticks={yTicks}>
               <Label value="Amount in $" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line
               type="monotone"
               dataKey="cashIn"
               stroke="#3BD64A"
               activeDot={{ r: 8 }}
            />
            <Line
               type="monotone"
               dataKey="cashOut"
               stroke="#8884d8"
            />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default LineChartComponent;
