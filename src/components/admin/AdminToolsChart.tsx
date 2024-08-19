"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
import Image from "next/image"
import desktop from "../../../public/images/desktop.png"

// Updated chartData with laptop users
const chartData = [
  { month: "january", desktop: 1260, mobile: 570, laptop: 340 },
]

// Updated chartConfig to include laptop users
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  laptop: {
    label: "Laptop",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function AdminToolsChart() {
  const totalVisitors =
    chartData[0].desktop + chartData[0].mobile + chartData[0].laptop

  return (
    <Card className="flex flex-col border-none">

      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Users by device
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
            
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stackId="a"
            
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="laptop"
              fill="var(--color-laptop)"
              stackId="a"
            
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex justify-between border-b pb-2 w-full">
          <div><Image src={desktop} alt="users"/>Desktop users</div><h4>15,624</h4>
        </div>
        <div className="flex justify-between border-b pb-2 w-full">
          <div>Phone users</div><h4>5,546</h4>
        </div>
        <div className="flex justify-between border-b pb-2 w-full">
          <div>Laptop users</div><h4>2,478</h4>
        </div>
      </CardFooter>
    </Card>
  )
}
