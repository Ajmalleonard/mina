import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variant === "default" && "bg-[var(--primary)] text-[var(--primary-foreground)]",
        variant === "secondary" && "bg-[var(--accent)] text-[var(--accent-foreground)]",
        variant === "outline" &&
          "border border-[var(--border)] bg-transparent text-[var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  )
}
