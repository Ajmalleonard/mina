import type { Icon as IconsaxIcon } from "iconsax-react"

type MetricCardProps = {
  icon: IconsaxIcon
  label: string
  value: string
  detail: string
  compact?: boolean
}

export function MetricCard({ icon: Icon, label, value, detail, compact = false }: MetricCardProps) {
  return (
    <div
      className={
        compact
          ? "flex h-full min-h-[100px] flex-col rounded-[1.2rem] border border-(--border) bg-(--muted)/52 px-4 py-2"
          : "rounded-[1.35rem] border border-(--border) bg-(--muted)/52 p-4"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={
            compact
              ? "text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-foreground)]"
              : "text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]"
          }
        >
          {label}
        </p>
        <div
          className={
            compact
              ? "flex h-8 w-8 items-center justify-center rounded-[0.85rem] border border-[var(--border)] bg-[var(--accent)] text-[var(--primary)]"
              : "flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-[var(--border)] bg-[var(--accent)] text-[var(--primary)]"
          }
        >
          <Icon color="currentColor" size={compact ? "15" : "17"} variant="Bulk" />
        </div>
      </div>
      <p
        className={
          compact
            ? "mt-2 text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]"
            : "mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]"
        }
      >
        {value}
      </p>
      <p
        className={
          compact
            ? "mt-1 line-clamp-2 text-[12px] leading-5 text-[var(--muted-foreground)]"
            : "mt-1.5 text-sm leading-6 text-[var(--muted-foreground)]"
        }
      >
        {detail}
      </p>
    </div>
  )
}
