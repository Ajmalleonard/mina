"use client"

import { Moon, Sun1 } from "iconsax-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

type ThemeSwitcherProps = {
  className?: string
}

const OPTIONS = [
  {
    icon: Moon,
    label: "Dark",
    value: "dark" as const,
  },
  {
    icon: Sun1,
    label: "Light",
    value: "light" as const,
  },
]

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--muted)]/58 p-1",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = mounted && resolvedTheme === option.value

        return (
          <button
            key={option.value}
            type="button"
            aria-label={`Switch to ${option.label.toLowerCase()} mode`}
            aria-pressed={isActive}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]",
              isActive
                ? "bg-[var(--card)] text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
            onClick={() => setTheme(option.value)}
          >
            <Icon color="currentColor" size="15" variant={isActive ? "Bold" : "Linear"} />
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
