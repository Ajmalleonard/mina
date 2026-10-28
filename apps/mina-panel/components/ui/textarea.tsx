import * as React from "react"
import { cn } from "@/lib/utils"

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-[1.15rem] border border-[var(--border)] bg-[var(--input)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[color:rgba(16,173,121,0.46)] focus:ring-4 focus:ring-[var(--ring)]",
        className,
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"
