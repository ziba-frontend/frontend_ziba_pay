"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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

const trafficData = [
  { source: "Organic", visitors: 450, fill: "var(--color-organic)" },
  { source: "Social", visitors: 300, fill: "var(--color-social)" },
  { source: "Direct", visitors: 250, fill: "var(--color-direct)" },
]

const chartConfig = {
  organic: {
    label: "Organic",
    color: "var(--chart-1)",
  },
  social: {
    label: "Social",
    color: "var(--chart-2)",
  },
  direct: {
    label: "Direct",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function AdminVisitorsChart() {
  return (
    <Card data-chart="pie-chart" className="flex flex-col border-none shadow-none">
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
              data={trafficData}
              dataKey="visitors"
              nameKey="source"
              innerRadius={60}
              outerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {trafficData
                            .reduce((acc, item) => acc + item.visitors, 0)
                            .toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex justify-between border-b pb-2 w-full">
          <div className="flex items-center gap-2 "><div className="bg-orange-500 w-2 h-2 rounded-full "></div> Social</div><h4>60%</h4>
        </div>
        <div className="flex justify-between border-b pb-2 w-full">
        <div className="flex items-center gap-2 "><div className="bg-main w-2 h-2 rounded-full "></div>Organic</div><h4>15%</h4>
        </div>
        <div className="flex justify-between border-b pb-2 w-full">
        <div className="flex items-center gap-2 "><div className="bg-black w-2 h-2 rounded-full "></div>Direct</div><h4>25%</h4>
        </div>
      </CardFooter>
    </Card>
  )
}
