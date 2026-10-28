import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Activity, Promotion } from "@/lib/types"

type ContentTrendChartProps = {
  activities: Activity[]
  promotions: Promotion[]
}

type ChartPoint = {
  activities: number
  label: string
  promotions: number
}

export function ContentTrendChart({ activities, promotions }: ContentTrendChartProps) {
  const chartData = useMemo(() => buildChartData(activities, promotions), [activities, promotions])

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="activities-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10ad79" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#10ad79" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="promotions-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#82c4ff" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#82c4ff" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            minTickGap={20}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              boxShadow: "var(--shadow-soft)",
              color: "var(--foreground)",
            }}
            cursor={{ stroke: "var(--chart-cursor)", strokeDasharray: "3 3" }}
            labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
          />
          <Area
            dataKey="activities"
            fill="url(#activities-fill)"
            name="Activities"
            stroke="#10ad79"
            strokeWidth={2.2}
            type="monotone"
          />
          <Area
            dataKey="promotions"
            fill="url(#promotions-fill)"
            name="Promotions"
            stroke="#82c4ff"
            strokeWidth={2.2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function buildChartData(activities: Activity[], promotions: Promotion[]): ChartPoint[] {
  const buckets = new Map<string, ChartPoint>()
  const now = new Date()

  for (let offset = 5; offset >= 0; offset -= 1) {
    const bucketDate = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    const key = bucketKey(bucketDate)

    buckets.set(key, {
      activities: 0,
      label: bucketDate.toLocaleDateString("en", { month: "short" }),
      promotions: 0,
    })
  }

  for (const activity of activities) {
    const key = bucketKey(new Date(activity.createdAt))
    const bucket = buckets.get(key)

    if (bucket) {
      bucket.activities += 1
    }
  }

  for (const promotion of promotions) {
    const key = bucketKey(new Date(promotion.createdAt))
    const bucket = buckets.get(key)

    if (bucket) {
      bucket.promotions += 1
    }
  }

  return [...buckets.values()]
}

function bucketKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`
}
