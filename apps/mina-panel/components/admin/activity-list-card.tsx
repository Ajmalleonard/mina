/* eslint-disable @next/next/no-img-element */
import { Edit2, Refresh2, SearchNormal1, Trash } from "iconsax-react"
import { EmptyState } from "@/components/admin/empty-state"
import { LoadingIndicator, LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { PanelCard } from "@/components/admin/panel-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Activity, ActivityCategory } from "@/lib/types"
import { cn, formatCompactNumber, formatDateTime, formatEnumLabel } from "@/lib/utils"

const selectClassName =
  "flex h-11 w-full rounded-[1.15rem] border border-[var(--border)] bg-[var(--input)] px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[color:rgba(16,173,121,0.46)] focus:ring-4 focus:ring-[var(--ring)]"

type ActivityListCardProps = {
  activities: Activity[]
  activityCategoryOptions: ActivityCategory[]
  categoryFilter: ActivityCategory | "ALL"
  isLoading: boolean
  isRefreshing: boolean
  search: string
  onCategoryFilterChange: (value: ActivityCategory | "ALL") => void
  onDelete: (id: string) => void
  onEdit: (activity: Activity) => void
  onRefresh: () => void
  onSearchChange: (value: string) => void
}

export function ActivityListCard({
  activities,
  activityCategoryOptions,
  categoryFilter,
  isLoading,
  isRefreshing,
  search,
  onCategoryFilterChange,
  onDelete,
  onEdit,
  onRefresh,
  onSearchChange,
}: ActivityListCardProps) {
  return (
    <PanelCard
      contentClassName="space-y-5 lg:min-h-0 lg:flex lg:flex-col"
      description="Search, filter, and open activities from this compact listing."
      title="Activities"
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_190px_auto]">
        <div className="relative">
          <SearchNormal1
            color="currentColor"
            size="18"
            variant="Linear"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
          />
          <Input
            className="pl-11"
            placeholder="Search activities"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <select
          className={selectClassName}
          value={categoryFilter}
          onChange={(event) => onCategoryFilterChange(event.target.value as ActivityCategory | "ALL")}
        >
          <option value="ALL">All categories</option>
          {activityCategoryOptions.map((category) => (
            <option key={category} value={category}>
              {formatEnumLabel(category)}
            </option>
          ))}
        </select>
        <Button type="button" variant="secondary" onClick={onRefresh}>
          {isRefreshing ? (
            <LoadingSpinnerIcon className="mr-2" />
          ) : (
            <Refresh2 color="currentColor" size="18" variant="Linear" className={cn("mr-2")} />
          )}
          Refresh
        </Button>
      </div>

      <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--muted)]/35 p-8">
            <LoadingIndicator label="Loading activities..." />
          </div>
        ) : activities.length === 0 ? (
          <EmptyState>No activities match the current filter.</EmptyState>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="grid gap-3 rounded-[1.35rem] border border-[var(--border)] bg-[var(--muted)]/34 p-3.5 xl:grid-cols-[104px_1fr_auto]"
              >
                <div className="overflow-hidden rounded-[1.05rem] border border-[var(--border)] bg-[var(--card)]">
                  <img alt={activity.title} className="h-full min-h-24 w-full object-cover" src={activity.image} />
                </div>

                <div className="min-w-0 space-y-2.5">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{formatEnumLabel(activity.category)}</Badge>
                    <Badge variant="secondary">{formatEnumLabel(activity.type)}</Badge>
                    <Badge variant="outline">Priority {activity.priority}</Badge>
                    <Badge variant={activity.isActive ? "default" : "outline"}>
                      {activity.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-[var(--foreground)]">{activity.title}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{activity.slug}</p>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-[var(--muted-foreground)]">{activity.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                    <span>Raised {formatCompactNumber(activity.raisedAmount || 0)}</span>
                    <span>
                      Goal{" "}
                      {activity.goalAmount === null || activity.goalAmount === undefined
                        ? "Not set"
                        : formatCompactNumber(activity.goalAmount)}
                    </span>
                    <span>
                      Price{" "}
                      {activity.price === null || activity.price === undefined
                        ? "Not set"
                        : formatCompactNumber(activity.price)}
                    </span>
                    <span>Updated {formatDateTime(activity.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2 xl:flex-col">
                  <Button type="button" variant="outline" onClick={() => onEdit(activity)}>
                    <Edit2 color="currentColor" size="18" variant="Linear" className="mr-2" />
                    Open
                  </Button>
                  <Button type="button" variant="destructive" onClick={() => onDelete(activity.id)}>
                    <Trash color="currentColor" size="18" variant="Linear" className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PanelCard>
  )
}
