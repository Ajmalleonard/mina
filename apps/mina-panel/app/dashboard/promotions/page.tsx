"use client"

import { Add, Gallery, StatusUp } from "iconsax-react"
import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useConfirmDialog } from "@/components/admin/confirm-dialog-provider"
import { DashboardPageSkeleton } from "@/components/admin/dashboard-page-skeleton"
import { PageHeading } from "@/components/admin/page-heading"
import { PromotionListCard } from "@/components/admin/promotion-list-card"
import { MetricCard } from "@/components/admin/metric-card"
import { StatusBanner } from "@/components/admin/status-banner"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { Button } from "@/components/ui/button"
import { apiRequest } from "@/lib/api"
import type { Promotion } from "@/lib/types"

export default function PromotionsPage() {
  const router = useRouter()
  const confirm = useConfirmDialog()
  const { token } = useAdminAuth()
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [search, setSearch] = useState("")
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
        const nextPromotions = await apiRequest<Promotion[]>("/admin/promotions", { token })
        setPromotions(nextPromotions)
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load promotions.")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [token])

  const filteredPromotions = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase()

    return promotions.filter((promotion) => {
      if (!query) {
        return true
      }

      return [promotion.title, promotion.slug, promotion.summary, promotion.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    })
  }, [deferredSearch, promotions])

  async function loadPromotions(withLoader: boolean) {
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

      const nextPromotions = await apiRequest<Promotion[]>("/admin/promotions", { token })
      setPromotions(nextPromotions)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to load promotions.")
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
      title: "Delete this promotion?",
      description: "This action cannot be undone. The promotion will be permanently removed from the admin.",
      confirmLabel: "Delete promotion",
      cancelLabel: "Keep promotion",
      variant: "destructive",
    })

    if (!confirmed) {
      return
    }

    try {
      setError(null)
      setFeedback(null)
      await apiRequest(`/admin/promotions/${id}`, {
        method: "DELETE",
        token,
      })
      setFeedback("Promotion deleted.")
      await loadPromotions(false)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to delete promotion.")
    }
  }

  if (isLoading && promotions.length === 0) {
    return <DashboardPageSkeleton variant="list" />
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <PageHeading
        actions={
          <Button type="button" onClick={() => router.push("/dashboard/promotions/new")}>
            <Add color="currentColor" size="18" variant="Linear" className="mr-2" />
            New promotion
          </Button>
        }
        description="Review, search, and sort promotions here. Creating and editing now live on their own dedicated pages."
        title="Promotions"
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
      {!error && feedback ? <StatusBanner variant="success">{feedback}</StatusBanner> : null}

      <div className="grid gap-3 xl:grid-cols-3">
        <MetricCard
          detail="All promotions currently managed in the admin."
          icon={Gallery}
          label="Total promotions"
          value={String(promotions.length)}
        />
        <MetricCard
          detail="Promotions currently visible on the public surface."
          icon={StatusUp}
          label="Live promotions"
          value={String(promotions.filter((item) => item.status === "LIVE").length)}
        />
        <MetricCard
          detail="Upcoming promotions waiting for launch."
          icon={StatusUp}
          label="Scheduled promotions"
          value={String(promotions.filter((item) => item.status === "SCHEDULED").length)}
        />
      </div>

      <div className="lg:min-h-0 lg:flex-1">
        <PromotionListCard
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onDelete={(id) => void handleDelete(id)}
          onEdit={(promotion) => router.push(`/dashboard/promotions/${promotion.id}`)}
          onRefresh={() => void loadPromotions(false)}
          onSearchChange={setSearch}
          promotions={filteredPromotions}
          search={search}
        />
      </div>
    </div>
  )
}
