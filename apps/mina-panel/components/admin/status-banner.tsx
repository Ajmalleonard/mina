import type { ReactNode } from "react"
import { CloseCircle, InfoCircle, TickCircle } from "iconsax-react"
import { cn } from "@/lib/utils"

type StatusBannerProps = {
  children: ReactNode
  className?: string
  variant?: "error" | "success" | "info"
}

export function StatusBanner({
  children,
  className,
  variant = "info",
}: StatusBannerProps) {
  const Icon = variant === "error" ? CloseCircle : variant === "success" ? TickCircle : InfoCircle

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[1.15rem] border px-4 py-3 text-sm",
        variant === "error" &&
          "border-[color:rgba(203,90,72,0.26)] bg-[color:rgba(203,90,72,0.08)] text-[var(--destructive)]",
        variant === "success" &&
          "border-[color:rgba(16,173,121,0.24)] bg-[color:rgba(16,173,121,0.08)] text-[var(--foreground)]",
        variant === "info" &&
          "border-[var(--border)] bg-[var(--muted)]/52 text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mt-0.5 shrink-0">
        <Icon color="currentColor" size="18" variant={variant === "error" ? "Bulk" : "Linear"} />
      </div>
      <div className="min-w-0 leading-6">{children}</div>
    </div>
  )
}
