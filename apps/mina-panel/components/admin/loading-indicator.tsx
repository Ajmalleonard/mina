import Image from "next/image"
import { cn } from "@/lib/utils"

type LoadingIndicatorProps = {
  className?: string
  label?: string
  size?: "sm" | "md"
}

type LoadingSpinnerIconProps = {
  className?: string
  size?: number
}

export function LoadingSpinnerIcon({
  className,
  size = 18,
}: LoadingSpinnerIconProps) {
  return (
    <Image
      src="/loading.png"
      alt="Loading"
      width={size}
      height={size}
      className={cn("animate-spin dark:invert", className)}
    />
  )
}

export function LoadingIndicator({
  className,
  label = "Loading...",
  size = "md",
}: LoadingIndicatorProps) {
  const iconSize = size === "sm" ? 16 : 18

  return (
    <div className={cn("flex items-center justify-center gap-3 text-[var(--muted-foreground)]", className)}>
      <LoadingSpinnerIcon size={iconSize} />
      <span className={cn(size === "sm" ? "text-sm" : "text-[15px]")}>{label}</span>
    </div>
  )
}
