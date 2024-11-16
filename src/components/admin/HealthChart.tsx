//@ts-nocheck

"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Updated chartData with only two variables
const chartData = [
  { name: "Your Site", value: 84, fill: "var(--chart-1)" },
  { name: "Top 10% Websites", value: 16, fill: "var(--chart-2)" },
]

const chartConfig = {
  "your-site": {
    label: "Your Site",
    color: "var(--chart-1)",
  },
  "top-websites": {
    label: "Top 10% Websites",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function HealthChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col border-none shadow-none">
      
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy + 20} 
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 20}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 44}
                          className="fill-muted-foreground"
                        >
                         
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" gap-2 text-sm">
      <div className="flex items-center gap-2 text-gray-500"><div className="bg-main w-2 h-2 rounded "></div>Your site<span className="font-bold ml-4">100%</span></div>
      </CardFooter>
    </Card>
  )
}
