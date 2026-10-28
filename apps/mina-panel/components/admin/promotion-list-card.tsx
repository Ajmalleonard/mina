/* eslint-disable @next/next/no-img-element */
import { Edit2, Refresh2, SearchNormal1, Trash } from "iconsax-react"
import { EmptyState } from "@/components/admin/empty-state"
import { LoadingIndicator, LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { PanelCard } from "@/components/admin/panel-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Promotion } from "@/lib/types"
import { cn, formatDateTime, formatEnumLabel } from "@/lib/utils"

type PromotionListCardProps = {
  isLoading: boolean
  isRefreshing: boolean
  onDelete: (id: string) => void
  onEdit: (promotion: Promotion) => void
  onRefresh: () => void
  onSearchChange: (value: string) => void
  promotions: Promotion[]
  search: string
}

export function PromotionListCard({
  isLoading,
  isRefreshing,
  onDelete,
  onEdit,
  onRefresh,
  onSearchChange,
  promotions,
  search,
}: PromotionListCardProps) {
  return (
    <PanelCard
      contentClassName="space-y-5 lg:min-h-0 lg:flex lg:flex-col"
      description="Search, review, and open promotions from this compact listing."
      title="Promotions"
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <SearchNormal1
            color="currentColor"
            size="18"
            variant="Linear"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
          />
          <Input
            className="pl-11"
            placeholder="Search promotions"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
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
            <LoadingIndicator label="Loading promotions..." />
          </div>
        ) : promotions.length === 0 ? (
          <EmptyState>No promotions match your current search.</EmptyState>
        ) : (
          <div className="space-y-4">
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="grid gap-3 rounded-[1.35rem] border border-[var(--border)] bg-[var(--muted)]/34 p-3.5 xl:grid-cols-[104px_1fr_auto]"
              >
                <div className="overflow-hidden rounded-[1.05rem] border border-[var(--border)] bg-[var(--card)]">
                  {promotion.imageUrl ? (
                    <img alt={promotion.title} className="h-full min-h-24 w-full object-cover" src={promotion.imageUrl} />
                  ) : (
                    <div className="flex h-full min-h-24 items-center justify-center text-sm text-[var(--muted-foreground)]">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0 space-y-2.5">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{formatEnumLabel(promotion.status)}</Badge>
                    {promotion.featured ? <Badge variant="secondary">Featured</Badge> : null}
                    <Badge variant="outline">Sort {promotion.sortOrder}</Badge>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-[var(--foreground)]">{promotion.title}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{promotion.slug}</p>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-[var(--muted-foreground)]">{promotion.summary}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                    <span>Updated {formatDateTime(promotion.updatedAt)}</span>
                    <span>Starts {promotion.startsAt ? formatDateTime(promotion.startsAt) : "Not set"}</span>
                    <span>Ends {promotion.endsAt ? formatDateTime(promotion.endsAt) : "Not set"}</span>
                  </div>
                </div>

                <div className="flex gap-2 xl:flex-col">
                  <Button type="button" variant="outline" onClick={() => onEdit(promotion)}>
                    <Edit2 color="currentColor" size="18" variant="Linear" className="mr-2" />
                    Open
                  </Button>
                  <Button type="button" variant="destructive" onClick={() => onDelete(promotion.id)}>
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
