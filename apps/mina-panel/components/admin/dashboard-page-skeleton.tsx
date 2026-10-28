import { cn } from "@/lib/utils"

type DashboardPageSkeletonProps = {
  variant: "overview" | "list" | "editor"
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[0.95rem] bg-[var(--muted)]/72", className)} />
}

function Surface({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[1.55rem] border border-[var(--border)] bg-[var(--card)] p-5", className)}>
      {children}
    </div>
  )
}

function MetricsRow({ count }: { count: number }) {
  return (
    <div className={cn("grid gap-2.5", count === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3")}>
      {Array.from({ length: count }).map((_, index) => (
        <Surface key={index} className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-8 w-8 rounded-[0.85rem]" />
          </div>
          <SkeletonBlock className="h-8 w-16" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-3/4" />
        </Surface>
      ))}
    </div>
  )
}

function ListPanelSkeleton() {
  return (
    <Surface className="space-y-4 lg:min-h-0 lg:flex-1">
      <div className="flex flex-col gap-3 lg:flex-row">
        <SkeletonBlock className="h-10 flex-1" />
        <SkeletonBlock className="h-10 w-full lg:w-44" />
        <SkeletonBlock className="h-10 w-full lg:w-28" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="grid gap-3 rounded-[1.2rem] border border-[var(--border)] bg-[var(--muted)]/38 p-3 md:grid-cols-[92px_1fr_120px]">
            <SkeletonBlock className="h-24 w-full rounded-[0.95rem]" />
            <div className="space-y-2.5">
              <div className="flex flex-wrap gap-2">
                <SkeletonBlock className="h-6 w-20 rounded-full" />
                <SkeletonBlock className="h-6 w-24 rounded-full" />
              </div>
              <SkeletonBlock className="h-4 w-2/5" />
              <SkeletonBlock className="h-3 w-1/4" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-4/5" />
            </div>
            <div className="space-y-2">
              <SkeletonBlock className="h-10 w-full" />
              <SkeletonBlock className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </Surface>
  )
}

function OverviewPanelsSkeleton() {
  return (
    <>
      <Surface className="space-y-4">
        <div className="space-y-2">
          <SkeletonBlock className="h-5 w-36" />
          <SkeletonBlock className="h-3 w-64" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2 rounded-[1.05rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-5 w-12" />
            </div>
          ))}
        </div>
        <SkeletonBlock className="h-[280px] w-full rounded-[1.2rem]" />
      </Surface>
      <Surface className="space-y-3">
        <div className="space-y-2">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="h-3 w-60" />
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2 rounded-[1.1rem] border border-[var(--border)] bg-[var(--muted)]/40 px-4 py-4">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-1/2" />
          </div>
        ))}
      </Surface>
    </>
  )
}

function RecentPanelsSkeleton() {
  return Array.from({ length: 2 }).map((_, index) => (
    <Surface key={index} className="space-y-4">
      <div className="space-y-2">
        <SkeletonBlock className="h-5 w-36" />
        <SkeletonBlock className="h-3 w-52" />
      </div>
      <div className="space-y-2.5">
        {Array.from({ length: 3 }).map((__, itemIndex) => (
          <div key={itemIndex} className="space-y-2 rounded-[1rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-5 w-20 rounded-full" />
            </div>
            <SkeletonBlock className="h-3 w-32" />
            <SkeletonBlock className="h-3 w-40" />
          </div>
        ))}
      </div>
    </Surface>
  ))
}

function EditorSurfaceSkeleton() {
  return (
    <Surface className="space-y-5">
      <div className="space-y-2">
        <SkeletonBlock className="h-5 w-36" />
        <SkeletonBlock className="h-3 w-80" />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
      <SkeletonBlock className="h-32 w-full" />
      <div className="grid gap-4 xl:grid-cols-2">
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
      <SkeletonBlock className="h-52 w-full rounded-[1.25rem]" />
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-36" />
        <SkeletonBlock className="h-10 w-28" />
      </div>
    </Surface>
  )
}

export function DashboardPageSkeleton({ variant }: DashboardPageSkeletonProps) {
  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-9 w-40" />
          <SkeletonBlock className="h-4 w-[420px] max-w-full" />
        </div>
        <SkeletonBlock className="h-10 w-full xl:w-40" />
      </div>

      {variant === "overview" ? (
        <>
          <MetricsRow count={4} />
          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <OverviewPanelsSkeleton />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">{RecentPanelsSkeleton()}</div>
        </>
      ) : null}

      {variant === "list" ? (
        <>
          <MetricsRow count={3} />
          <div className="lg:min-h-0 lg:flex-1">
            <ListPanelSkeleton />
          </div>
        </>
      ) : null}

      {variant === "editor" ? <EditorSurfaceSkeleton /> : null}
    </div>
  )
}
