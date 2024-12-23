"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns/format";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DailyWeather } from "@/types/weather";

const chartConfig = {
  generatedEnergy: {
    label: "Wygenerowana enegia",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface EnergyChartProps {
  dailyWeather: DailyWeather[];
}

function EnergyChart({ dailyWeather }: EnergyChartProps) {
  const isScreenXl = useMediaQuery("(min-width: 1280px)");
  const isScreenSm = useMediaQuery("(min-width: 640px)");

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Szacowana ilość wygenerowanej energii</CardTitle>
        <CardDescription>
          Wykres przedstawia 7 następnych dni (łącznie z dzisiejszym)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[30vh] w-full">
          <AreaChart
            accessibilityLayer
            data={dailyWeather?.map((weather) => ({
              ...weather,
              day: format(weather.date, "dd/LL/yyyy"),
            }))}
            margin={{
              left: 40,
              right: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval={isScreenXl ? 0 : isScreenSm ? 1 : 2}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-56"
                  indicator="line"
                  suffix={<span> kWh</span>}
                />
              }
            />
            <defs>
              <linearGradient
                id="fillGeneratedEnergy"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-generatedEnergy)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-generatedEnergy)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="generatedEnergy"
              type="monotone"
              fill="url(#fillGeneratedEnergy)"
              fillOpacity={0.4}
              stroke="var(--color-generatedEnergy)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export { EnergyChart };
