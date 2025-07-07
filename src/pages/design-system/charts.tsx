"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export function ChartArea({ config, data, title, subtitle, footnote, description }: { config: ChartConfig, data: any[] | undefined, title: string; subtitle: string, footnote: string, description: string | null }) {

  return (
    <Card>
      <ChartHeader
        title={title}
        subtitle={subtitle}
      />

      <CardContent>
        <ChartBody config={config} data={data} />
      </CardContent>

      <ChartFooter
        footnote={footnote}
        description={description} />
    </Card>
  )
}

function ChartHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{subtitle}</CardDescription>
    </CardHeader>
  )
}

function ChartBody({
  config,
  data,
  xAxis = true,
  gradient = true,
  area = true,
}: {
  config: ChartConfig
  data: any[] | undefined
  xAxis?: boolean
  gradient?: boolean
  area?: boolean
}) {
  return (
    <ChartContainer config={config}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 0, right: 0 }}
      >

        <CartesianGrid vertical={false} />
        {xAxis && <ChartXAxis />}

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        {gradient && <ChartGradient />}

        {area && <ChartAreaSeries />}

      </AreaChart>
    </ChartContainer>
  )
}

function ChartXAxis() {
  return (
    <XAxis
      dataKey="month"
      tickLine={false}
      axisLine={false}
      tickMargin={10}
      tickFormatter={(value) => value.slice(0, 3)}
    />
  )
}

function ChartGradient() {
  return (
    <defs>
      <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor="var(--color-desktop)"
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor="var(--color-desktop)"
          stopOpacity={0.1}
        />
      </linearGradient>
    </defs>
  )
}

function ChartAreaSeries() {
  return (
    <Area
      dataKey="desktop"
      type="natural"
      fill="url(#fillDesktop)"
      fillOpacity={0.4}
      stroke="var(--color-desktop)"
      isAnimationActive={false}
    />
  )
}

function ChartFooter({ footnote, description }: { footnote: string, description: string | null }) {
  return (
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 leading-none font-medium">
            {footnote} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            {description}
          </div>
        </div>
      </div>
    </CardFooter>
  )
}
