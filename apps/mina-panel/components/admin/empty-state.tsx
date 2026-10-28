export function EmptyState({ children }: { children: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--muted)]/35 p-8 text-center text-sm leading-6 text-[var(--muted-foreground)]">
      {children}
    </div>
  )
}
