import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-[1.15rem] border px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60",
          variant === "primary" &&
            "border-[color:rgba(16,173,121,0.34)] bg-[color:rgba(16,173,121,0.9)] text-[var(--primary-foreground)] shadow-[0_14px_24px_rgba(16,173,121,0.12)] hover:bg-[color:rgba(24,191,135,0.92)]",
          variant === "secondary" &&
            "border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:border-[color:rgba(16,173,121,0.28)] hover:bg-[var(--accent)]",
          variant === "ghost" &&
            "border-transparent bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]/85",
          variant === "outline" &&
            "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[color:rgba(16,173,121,0.36)] hover:bg-[var(--muted)]/82",
          variant === "destructive" &&
            "border-[color:rgba(208,91,76,0.6)] bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:brightness-110",
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"
