"use client"

import { Gallery, Setting2, StatusUp, TaskSquare } from "iconsax-react"
import { useEffect, useMemo, useState } from "react"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { ContentTrendChart } from "@/components/admin/content-trend-chart"
import { DashboardPageSkeleton } from "@/components/admin/dashboard-page-skeleton"
import { MetricCard } from "@/components/admin/metric-card"
import { PageHeading } from "@/components/admin/page-heading"
import { PanelCard } from "@/components/admin/panel-card"
import { RecentItemsCard } from "@/components/admin/recent-items-card"
import { StatusBanner } from "@/components/admin/status-banner"
import { Badge } from "@/components/ui/badge"
import { apiRequest } from "@/lib/api"
import type { Activity, Promotion } from "@/lib/types"
import { formatDateTime, formatEnumLabel } from "@/lib/utils"

export default function OverviewPage() {
  const { admin, token } = useAdminAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      return
    }

    async function loadOverview() {
      try {
        setError(null)
        setIsLoading(true)

        const [nextActivities, nextPromotions] = await Promise.all([
          apiRequest<Activity[]>("/admin/activities", { token: token! }),
          apiRequest<Promotion[]>("/admin/promotions", { token: token! }),
        ])

        setActivities(nextActivities)
        setPromotions(nextPromotions)
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load overview.")
      } finally {
        setIsLoading(false)
      }
    }

    void loadOverview()
  }, [token])

  const recentActivities = useMemo(
    () =>
      [...activities]
        .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
        .slice(0, 3)
        .map((activity) => ({
          id: activity.id,
          title: activity.title,
          subtitle: activity.slug,
          meta: `Created ${formatDateTime(activity.createdAt)}`,
          badge: formatEnumLabel(activity.category),
        })),
    [activities],
  )

  const recentPromotions = useMemo(
    () =>
      [...promotions]
        .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
        .slice(0, 3)
        .map((promotion) => ({
          id: promotion.id,
          title: promotion.title,
          subtitle: promotion.slug,
          meta: `Created ${formatDateTime(promotion.createdAt)}`,
          badge: formatEnumLabel(promotion.status),
        })),
    [promotions],
  )

  if (isLoading && activities.length === 0 && promotions.length === 0) {
    return <DashboardPageSkeleton variant="overview" />
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <PageHeading
        description="A short operational snapshot of recent content creation, live admin counts, and the current session."
        title="Overview"
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}

      <div className="grid gap-2.5 xl:grid-cols-4">
        <MetricCard
          compact
          detail="All activity records currently managed in the admin."
          icon={TaskSquare}
          label="Activities"
          value={String(activities.length)}
        />
        <MetricCard
          compact
          detail="Activities currently visible on the public website."
          icon={StatusUp}
          label="Active activities"
          value={String(activities.filter((item) => item.isActive).length)}
        />
        <MetricCard
          compact
          detail="Promotions currently stored for banners and placements."
          icon={Gallery}
          label="Promotions"
          value={String(promotions.length)}
        />
        <MetricCard
          compact
          detail="Promotions that are either live or scheduled."
          icon={Setting2}
          label="Live + scheduled"
          value={String(promotions.filter((item) => item.status === "LIVE" || item.status === "SCHEDULED").length)}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <PanelCard
          contentClassName="space-y-4"
          description="Recharts view of created activities and promotions across the last six months."
          title="Publishing trend"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.05rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Activities</p>
              <p className="mt-1.5 text-lg font-semibold text-[var(--foreground)]">{activities.length}</p>
            </div>
            <div className="rounded-[1.05rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Promotions</p>
              <p className="mt-1.5 text-lg font-semibold text-[var(--foreground)]">{promotions.length}</p>
            </div>
            <div className="rounded-[1.05rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Live + active</p>
              <p className="mt-1.5 text-lg font-semibold text-[var(--foreground)]">
                {activities.filter((item) => item.isActive).length + promotions.filter((item) => item.status === "LIVE").length}
              </p>
            </div>
          </div>
          <ContentTrendChart activities={activities} promotions={promotions} />
        </PanelCard>

        <PanelCard
          contentClassName="space-y-3"
          description="Compact account and security information for this session."
          title="Session snapshot"
        >
          <div className="rounded-[1.15rem] border border-[var(--border)] bg-[var(--muted)]/42 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">Signed in as</p>
            <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
              {[admin?.firstName, admin?.lastName].filter(Boolean).join(" ").trim() || admin?.email}
            </p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{admin?.email}</p>
          </div>
          <div className="rounded-[1.15rem] border border-[var(--border)] bg-[var(--muted)]/42 px-4 py-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{admin?.mfaEnabled ? "Google Authenticator enabled" : "Authenticator pending"}</Badge>
              {admin?.lastLoginAt ? <Badge variant="outline">Last login {formatDateTime(admin.lastLoginAt)}</Badge> : null}
            </div>
          </div>
          <div className="rounded-[1.15rem] border border-[var(--border)] bg-[var(--muted)]/42 px-4 py-4 text-sm leading-6 text-[var(--muted-foreground)]">
            Use the tighter navigation to move into list pages, dedicated create pages, and account settings without turning the overview into a long admin dump.
          </div>
        </PanelCard>
      </div>

      <div className="grid gap-4 lg:min-h-0 xl:grid-cols-2">
        <RecentItemsCard
          description="The latest three activities created in the system."
          emptyLabel={isLoading ? "Loading activities..." : "No activities have been created yet."}
          items={recentActivities}
          title="Latest activities"
        />
        <RecentItemsCard
          description="The latest three promotions created in the system."
          emptyLabel={isLoading ? "Loading promotions..." : "No promotions have been created yet."}
          items={recentPromotions}
          title="Latest promotions"
        />
      </div>
    </div>
  )
}
