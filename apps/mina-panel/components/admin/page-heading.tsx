import type { ReactNode } from "react"

type PageHeadingProps = {
  title: string
  description: string
  actions?: ReactNode
}

export function PageHeading({ title, description, actions }: PageHeadingProps) {
  return (
    <div className="flex shrink-0 flex-col gap-1 xl:flex-row xl:items-end xl:justify-between">
      <div className="space-y-1.5">
        <h2 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-(--foreground)">{title}</h2>
        <p className="max-w-3xl text-sm leading-6 text-(--muted-foreground)">{description}</p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  )
}
