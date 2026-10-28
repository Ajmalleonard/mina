import { Badge } from "@/components/ui/badge"
import { PanelCard } from "@/components/admin/panel-card"

type RecentItem = {
  id: string
  title: string
  subtitle: string
  meta: string
  badge?: string
}

type RecentItemsCardProps = {
  title: string
  description: string
  emptyLabel: string
  items: RecentItem[]
}

export function RecentItemsCard({ title, description, emptyLabel, items }: RecentItemsCardProps) {
  return (
    <PanelCard
      contentClassName="space-y-1.5 overflow-hidden lg:min-h-0"
      description={description}
      title={title}
    >
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-(--border) bg-(--muted)/35 px-3.5 py-3 text-xs text-(--muted-foreground)">
          {emptyLabel}
        </div>
      ) : (
        <div className="space-y-1.5 overflow-hidden max-h-64 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[1rem] border border-(--border) bg-(--muted)/42 px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-1.5">
                <p className="truncate text-[13px] font-semibold text-(--foreground)">{item.title}</p>
                {item.badge ? (
                  <Badge className="max-w-full truncate px-2 py-0.5 text-[10px]" variant="outline">
                    {item.badge}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-0.5 truncate text-[12px] text-(--muted-foreground)">{item.subtitle}</p>
              <p className="mt-1 truncate text-[12px] leading-4 text-(--muted-foreground)">{item.meta}</p>
            </div>
          ))}
        </div>
      )}
    </PanelCard>
  )
}
