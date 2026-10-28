import { Add, Edit2 } from "iconsax-react"
import { ImageAssetField } from "@/components/admin/image-asset-field"
import { LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { PromotionFormValues, PromotionStatus } from "@/lib/types"
import { formatEnumLabel } from "@/lib/utils"

const selectClassName =
  "flex h-10 w-full rounded-[1rem] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[color:rgba(16,173,121,0.46)] focus:ring-4 focus:ring-[var(--ring)]"

type PromotionFormCardProps = {
  form: PromotionFormValues
  imageFieldResetKey: number
  isSaving: boolean
  onFieldChange: <Key extends keyof PromotionFormValues>(key: Key, value: PromotionFormValues[Key]) => void
  onImageFileChange: (file: File | null) => void
  onReset: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  selectedPromotionId: string | null
  statusOptions: PromotionStatus[]
}

function FieldLabel({ children }: { children: string }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">{children}</label>
}

export function PromotionFormCard({
  form,
  imageFieldResetKey,
  isSaving,
  onFieldChange,
  onImageFileChange,
  onReset,
  onSubmit,
  selectedPromotionId,
  statusOptions,
}: PromotionFormCardProps) {
  return (
    <form className="min-w-0 space-y-5 pb-3" onSubmit={onSubmit}>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Title</FieldLabel>
          <Input
            className="h-10"
            required
            placeholder="Ramadan banner"
            value={form.title}
            onChange={(event) => onFieldChange("title", event.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Slug</FieldLabel>
          <Input
            className="h-10"
            placeholder="Optional, generated from title"
            value={form.slug}
            onChange={(event) => onFieldChange("slug", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Summary</FieldLabel>
          <Textarea
            className="min-h-28"
            required
            rows={4}
            placeholder="Short copy for internal review and public placement."
            value={form.summary}
            onChange={(event) => onFieldChange("summary", event.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            className="min-h-28"
            rows={4}
            placeholder="Longer campaign copy."
            value={form.description}
            onChange={(event) => onFieldChange("description", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Status</FieldLabel>
          <select
            className={selectClassName}
            value={form.status}
            onChange={(event) => onFieldChange("status", event.target.value as PromotionStatus)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {formatEnumLabel(status)}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Sort order</FieldLabel>
          <Input
            className="h-10"
            min={0}
            type="number"
            value={form.sortOrder}
            onChange={(event) => onFieldChange("sortOrder", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>CTA label</FieldLabel>
          <Input
            className="h-10"
            placeholder="Donate now"
            value={form.ctaLabel}
            onChange={(event) => onFieldChange("ctaLabel", event.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>CTA link</FieldLabel>
          <Input
            className="h-10"
            placeholder="https://..."
            type="url"
            value={form.ctaHref}
            onChange={(event) => onFieldChange("ctaHref", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Starts at</FieldLabel>
          <Input
            className="h-10"
            type="datetime-local"
            value={form.startsAt}
            onChange={(event) => onFieldChange("startsAt", event.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Ends at</FieldLabel>
          <Input
            className="h-10"
            type="datetime-local"
            value={form.endsAt}
            onChange={(event) => onFieldChange("endsAt", event.target.value)}
          />
        </div>
        <label className="flex min-w-0 items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2.5 xl:mt-[1.55rem]">
          <input
            checked={form.featured}
            className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)]"
            type="checkbox"
            onChange={(event) => onFieldChange("featured", event.target.checked)}
          />
          <span className="text-sm text-[var(--foreground)]">Feature this promotion in admin ordering</span>
        </label>
      </div>

      <ImageAssetField
        currentUrl={form.imageUrl}
        description="Choose a local file, switch between prebuilt variants, and upload only the chosen result when the promotion saves."
        label="Promotion image"
        resetKey={imageFieldResetKey}
        onCurrentUrlChange={(value) => onFieldChange("imageUrl", value)}
        onSelectedFileChange={onImageFileChange}
      />

      <div className="flex flex-wrap gap-3 border-t border-[var(--border)] pt-4">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <LoadingSpinnerIcon className="mr-2" />
              {selectedPromotionId ? "Updating..." : "Creating..."}
            </>
          ) : selectedPromotionId ? (
            <>
              <Edit2 color="currentColor" size="18" variant="Linear" className="mr-2" />
              Update promotion
            </>
          ) : (
            <>
              <Add color="currentColor" size="18" variant="Linear" className="mr-2" />
              Create promotion
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Reset form
        </Button>
      </div>
    </form>
  )
}
