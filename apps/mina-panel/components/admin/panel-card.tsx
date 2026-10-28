import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PanelCardProps = {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function PanelCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: PanelCardProps) {
  return (
    <Card className={cn("h-full lg:min-h-0 lg:flex lg:flex-col", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-5 pb-4">
        <div className="space-y-2">
          <CardTitle className="text-lg text-[var(--foreground)]">{title}</CardTitle>
          {description ? <CardDescription className="text-xs leading-6 sm:text-sm">{description}</CardDescription> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent className={cn("p-5 pt-0 lg:min-h-0 lg:flex-1", contentClassName)}>{children}</CardContent>
    </Card>
  )
}
