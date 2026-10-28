type ReadonlyFieldProps = {
  label: string
  value: string
}

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <div className="space-y-2 rounded-[1.25rem] border border-[var(--border)] bg-[var(--muted)]/42 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{label}</p>
      <p className="text-sm font-medium text-[var(--foreground)]">{value}</p>
    </div>
  )
}
