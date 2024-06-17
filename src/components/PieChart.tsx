/** @format */
"use client";
import React from "react";
import {
   ResponsiveContainer,
   PieChart as RechartsPieChart,
   Pie,
   Cell,
   Tooltip,
   Legend,
} from "recharts";

const pieData = [
   { name: "Group A", value: 400 },
   { name: "Group B", value: 300 },
   { name: "Group C", value: 300 },
   { name: "Group D", value: 200 },
];

const COLORS = ["red", "yellow", "#FFBB28", "#3BD64A"];

const PieChart = () => {
   return (
      <ResponsiveContainer
         width={"100%"}
         height={350}
      >
         <RechartsPieChart>
            <Pie
               data={pieData}
               cx="50%"
               cy="50%"
               outerRadius={80}
               fill="#8884d8"
               dataKey="value"
               label
            >
               {pieData.map((entry, index) => (
                  <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                  />
               ))}
            </Pie>
            <Tooltip />
            <Legend />
         </RechartsPieChart>
      </ResponsiveContainer>
   );
};

export default PieChart;
