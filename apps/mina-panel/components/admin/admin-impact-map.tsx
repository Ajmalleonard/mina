"use client"

import { useEffect, useMemo, useState } from "react"
import { Location, Refresh2 } from "iconsax-react"
import { EmptyState } from "@/components/admin/empty-state"
import { ImpactLocationPicker } from "@/components/admin/impact-location-picker"
import {
  LoadingIndicator,
  LoadingSpinnerIcon,
} from "@/components/admin/loading-indicator"
import { PageHeading } from "@/components/admin/page-heading"
import { PanelCard } from "@/components/admin/panel-card"
import { StatusBanner } from "@/components/admin/status-banner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { apiRequest } from "@/lib/api"
import type { Activity } from "@/lib/types"
import { formatEnumLabel } from "@/lib/utils"

function hasLocation(activity: Activity) {
  return (
    typeof activity.impactLat === "number" &&
    typeof activity.impactLng === "number"
  )
}

export function AdminImpactMap() {
  const { token } = useAdminAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  async function loadActivities(refresh = false) {
    if (!token) return

    setError(null)
    setFeedback(null)
    refresh ? setIsRefreshing(true) : setIsLoading(true)

    try {
      const result = await apiRequest<Activity[]>("/admin/activities", {
        token,
      })
      const ordered = [...result].sort((left, right) =>
        left.title.localeCompare(right.title)
      )
      setActivities(ordered)
      setSelectedId((current) =>
        current && ordered.some((activity) => activity.id === current)
          ? current
          : ((ordered.find((activity) => !hasLocation(activity)) ?? ordered[0])
              ?.id ?? null)
      )
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Unable to load activities."
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    void loadActivities()
    // loadActivities intentionally follows the admin token lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const selectedActivity =
    activities.find((activity) => activity.id === selectedId) ?? null
  const mappedCount = activities.filter(hasLocation).length
  const selectedCoordinates = useMemo(
    () => ({
      latitude: selectedActivity?.impactLat ?? null,
      longitude: selectedActivity?.impactLng ?? null,
    }),
    [selectedActivity?.impactLat, selectedActivity?.impactLng]
  )

  async function saveLocation(
    latitude: number | null,
    longitude: number | null
  ) {
    if (!token || !selectedActivity || isSaving) return

    const previousActivity = selectedActivity
    setError(null)
    setFeedback(null)
    setIsSaving(true)
    setActivities((current) =>
      current.map((activity) =>
        activity.id === previousActivity.id
          ? { ...activity, impactLat: latitude, impactLng: longitude }
          : activity
      )
    )

    try {
      const updated = await apiRequest<Activity>(
        `/admin/activities/${previousActivity.id}`,
        {
          method: "PATCH",
          token,
          body: { impactLat: latitude, impactLng: longitude },
        }
      )
      setActivities((current) =>
        current.map((activity) =>
          activity.id === updated.id ? updated : activity
        )
      )
      setFeedback(
        updated.isActive
          ? `Location saved for “${updated.title}”. It will appear on the public Impact Map on its next load.`
          : `Location saved for “${updated.title}”. Activate this activity for it to appear publicly.`
      )
    } catch (nextError) {
      setActivities((current) =>
        current.map((activity) =>
          activity.id === previousActivity.id ? previousActivity : activity
        )
      )
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Unable to save this location."
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function clearLocation() {
    await saveLocation(null, null)
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <PageHeading
        actions={
          <Button
            type="button"
            variant="secondary"
            disabled={isRefreshing || isLoading}
            onClick={() => void loadActivities(true)}
          >
            {isRefreshing ? (
              <LoadingSpinnerIcon className="mr-2" />
            ) : (
              <Refresh2 color="currentColor" size="18" className="mr-2" />
            )}
            Refresh activities
          </Button>
        }
        title="Impact map"
        description="Choose a completed contribution, click its location in Tanzania, and it is saved to the public map."
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
      {!error && feedback ? (
        <StatusBanner variant="success">{feedback}</StatusBanner>
      ) : null}

      <div className="grid min-h-0 gap-4 lg:flex-1 lg:grid-cols-[minmax(220px,300px)_minmax(0,1fr)]">
        <PanelCard
          contentClassName="flex min-h-0 flex-col"
          description={`${mappedCount} of ${activities.length} activities currently have a map location.`}
          title="Contributions"
        >
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="flex min-h-52 items-center justify-center">
                <LoadingIndicator label="Loading activities..." />
              </div>
            ) : activities.length === 0 ? (
              <EmptyState>
                Create an activity before placing it on the impact map.
              </EmptyState>
            ) : (
              activities.map((activity) => {
                const isSelected = activity.id === selectedId
                const isMapped = hasLocation(activity)

                return (
                  <button
                    key={activity.id}
                    type="button"
                    aria-pressed={isSelected}
                  disabled={isSaving}
                    className={`flex w-full items-center gap-3 rounded-[1.1rem] px-3 py-3 text-left transition ${
                      isSelected
                        ? "bg-[color:rgba(16,173,121,0.13)] text-[var(--foreground)]"
                        : "bg-[var(--muted)]/50 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                    }`}
                    onClick={() => {
                      setSelectedId(activity.id)
                      setError(null)
                      setFeedback(null)
                    }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--card)] text-[var(--primary)]">
                      <Location
                        color="currentColor"
                        size="18"
                        variant={isMapped ? "Bold" : "Linear"}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-[var(--foreground)]">
                        {activity.title}
                      </span>
                      <span className="mt-1 flex flex-wrap gap-1.5">
                        <Badge variant={isMapped ? "default" : "outline"}>
                          {isMapped ? "Location set" : "Place on map"}
                        </Badge>
                        {!activity.isActive ? (
                          <Badge variant="secondary">Inactive</Badge>
                        ) : null}
                      </span>
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </PanelCard>

        <PanelCard
          className="min-h-[520px]"
          contentClassName="flex min-h-0 flex-col"
          description={
            selectedActivity
              ? `${formatEnumLabel(selectedActivity.category)} · ${selectedActivity.isActive ? "Visible publicly" : "Inactive activity"}`
              : "Select an activity to place it on the map."
          }
          title={selectedActivity?.title ?? "Place a contribution"}
          action={
            selectedActivity && hasLocation(selectedActivity) ? (
              <Button
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={() => void clearLocation()}
              >
                Clear location
              </Button>
            ) : null
          }
        >
          {selectedActivity ? (
            <>
              <p className="mb-3 text-sm text-[var(--muted-foreground)]">
                Click the map to save a pin for this contribution.{" "}
                {isSaving
                  ? "Saving location…"
                  : "Each click saves automatically."}
              </p>
              <div
                className={`relative min-h-[420px] flex-1 overflow-hidden rounded-[1rem] ${isSaving ? "pointer-events-none opacity-75" : ""}`}
              >
                <ImpactLocationPicker
                  key={selectedActivity.id}
                  className="h-full min-h-[420px] w-full"
                  latitude={selectedCoordinates.latitude}
                  longitude={selectedCoordinates.longitude}
                  onLocationSelect={(latitude, longitude) =>
                    void saveLocation(latitude, longitude)
                  }
                />
                {isSaving ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-[var(--card)]/20"
                    aria-live="polite"
                  >
                    <LoadingIndicator label="Saving map location..." />
                  </div>
                ) : null}
              </div>
              <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                {selectedCoordinates.latitude !== null &&
                selectedCoordinates.longitude !== null
                  ? `Pinned at ${selectedCoordinates.latitude.toFixed(5)}, ${selectedCoordinates.longitude.toFixed(5)}`
                  : "No location yet. Click anywhere on the map to place this contribution."}
              </p>
            </>
          ) : (
            <EmptyState>
              Select an activity from the list to place it on the public map.
            </EmptyState>
          )}
        </PanelCard>
      </div>
    </div>
  )
}
