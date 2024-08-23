"use client";

import { Bar, BarChart, XAxis, YAxis, Legend, CartesianGrid } from "recharts";

import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
   { month: "JAN", users: 4500, subscribers: 3000, newCustomers: 2000 },
   { month: "FEB", users: 3800, subscribers: 4200, newCustomers: 1500 },
   { month: "MAR", users: 5200, subscribers: 1200, newCustomers: 1800 },
   { month: "APR", users: 1400, subscribers: 5500, newCustomers: 3000 },
   { month: "MAY", users: 6000, subscribers: 3500, newCustomers: 4000 },
   { month: "JUN", users: 4800, subscribers: 4000, newCustomers: 2200 },
   { month: "JUL", users: 5000, subscribers: 3700, newCustomers: 2500 },
   { month: "AUG", users: 5100, subscribers: 3600, newCustomers: 2700 },
   { month: "SEP", users: 5300, subscribers: 3400, newCustomers: 2900 },
   { month: "OCT", users: 5400, subscribers: 3300, newCustomers: 3100 },
   { month: "NOV", users: 5500, subscribers: 3200, newCustomers: 3300 },
   { month: "DEC", users: 5600, subscribers: 3100, newCustomers: 3500 },
];

const chartConfig = {
   users: {
      label: "Users",
      color: "var(--chart-1)",
   },
   subscribers: {
      label: "Subscribers",
      color: "var(--chart-2)",
   },
   newCustomers: {
      label: "New Customers",
      color: "var(--chart-3)",
   },
} satisfies ChartConfig;

export function AdminBarChart() {
   return (
      <ChartContainer config={chartConfig}>
         <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
         >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
               dataKey="month"
               tickLine={false}
               tickMargin={10}
               axisLine={true}
            />
            <YAxis
               tickLine={false}
               axisLine={false}
               tickFormatter={(value) => `${value / 1000}K`}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
               dataKey="users"
               fill="var(--chart-1)" 
               barSize={7}
               stackId="a"
            />
            <Bar
               dataKey="subscribers"
               fill="var(--chart-2)"
               barSize={7}
               stackId="a"
            />
            <Bar
               dataKey="newCustomers"
               fill="var(--chart-3)"
               barSize={7}
               stackId="a"
            />
            <ChartTooltip
               content={<ChartTooltipContent indicator="line" />}
               cursor={{ fill: "rgba(0, 0, 0, 0.05)", fillOpacity: 0.1 }} 
            />
         </BarChart>
      </ChartContainer>
   );
}
