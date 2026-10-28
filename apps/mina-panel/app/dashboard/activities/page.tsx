"use client"

import { Add, StatusUp, TaskSquare } from "iconsax-react"
import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ActivityListCard } from "@/components/admin/activity-list-card"
import { useConfirmDialog } from "@/components/admin/confirm-dialog-provider"
import { DashboardPageSkeleton } from "@/components/admin/dashboard-page-skeleton"
import { MetricCard } from "@/components/admin/metric-card"
import { PageHeading } from "@/components/admin/page-heading"
import { StatusBanner } from "@/components/admin/status-banner"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { Button } from "@/components/ui/button"
import { ACTIVITY_CATEGORY_OPTIONS } from "@/lib/admin-form-options"
import { apiRequest } from "@/lib/api"
import type { Activity, ActivityCategory } from "@/lib/types"

export default function ActivitiesPage() {
  const router = useRouter()
  const confirm = useConfirmDialog()
  const { token } = useAdminAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<ActivityCategory | "ALL">("ALL")
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    if (!token) {
      return
    }

    void (async () => {
      try {
        setError(null)
        setIsLoading(true)
        const nextActivities = await apiRequest<Activity[]>("/admin/activities", { token })
        setActivities(nextActivities)
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load activities.")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [token])

  const filteredActivities = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase()

    return activities.filter((activity) => {
      const matchesCategory = categoryFilter === "ALL" || activity.category === categoryFilter

      if (!matchesCategory) {
        return false
      }

      if (!query) {
        return true
      }

      return [activity.title, activity.slug, activity.description, activity.category, activity.type]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    })
  }, [activities, categoryFilter, deferredSearch])

  async function loadActivities(withLoader: boolean) {
    if (!token) {
      return
    }

    try {
      setError(null)

      if (withLoader) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }

      const nextActivities = await apiRequest<Activity[]>("/admin/activities", { token })
      setActivities(nextActivities)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to load activities.")
    } finally {
      if (withLoader) {
        setIsLoading(false)
      } else {
        setIsRefreshing(false)
      }
    }
  }

  async function handleDelete(id: string) {
    if (!token) {
      return
    }

    const confirmed = await confirm({
      title: "Delete this activity?",
      description: "This action cannot be undone. The activity will be permanently removed from the admin.",
      confirmLabel: "Delete activity",
      cancelLabel: "Keep activity",
      variant: "destructive",
    })

    if (!confirmed) {
      return
    }

    try {
      setError(null)
      setFeedback(null)
      await apiRequest(`/admin/activities/${id}`, {
        method: "DELETE",
        token,
      })
      setFeedback("Activity deleted.")
      await loadActivities(false)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to delete activity.")
    }
  }

  if (isLoading && activities.length === 0) {
    return <DashboardPageSkeleton variant="list" />
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <PageHeading
        actions={
          <Button type="button" onClick={() => router.push("/dashboard/activities/new")}>
            <Add color="currentColor" size="18" variant="Linear" className="mr-2" />
            New activity
          </Button>
        }
        description="Review, search, and filter activities here. Creating and editing now happen on their own dedicated pages."
        title="Activities"
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
      {!error && feedback ? <StatusBanner variant="success">{feedback}</StatusBanner> : null}

      <div className="grid gap-3 xl:grid-cols-3">
        <MetricCard
          detail="Total activity records in the admin."
          icon={TaskSquare}
          label="Total activities"
          value={String(activities.length)}
        />
        <MetricCard
          detail="Activities currently visible to donors."
          icon={StatusUp}
          label="Active items"
          value={String(activities.filter((item) => item.isActive).length)}
        />
        <MetricCard
          detail="Activities hidden from the public site."
          icon={StatusUp}
          label="Inactive items"
          value={String(activities.filter((item) => !item.isActive).length)}
        />
      </div>

      <div className="lg:min-h-0 lg:flex-1">
        <ActivityListCard
          activities={filteredActivities}
          activityCategoryOptions={ACTIVITY_CATEGORY_OPTIONS}
          categoryFilter={categoryFilter}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          search={search}
          onCategoryFilterChange={setCategoryFilter}
          onDelete={(id) => void handleDelete(id)}
          onEdit={(activity) => router.push(`/dashboard/activities/${activity.id}`)}
          onRefresh={() => void loadActivities(false)}
          onSearchChange={setSearch}
        />
      </div>
    </div>
  )
}
