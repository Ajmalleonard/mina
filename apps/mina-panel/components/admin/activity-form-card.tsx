import { Add, Edit2 } from "iconsax-react"
import { ImageAssetField } from "@/components/admin/image-asset-field"
import { LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { ActivityCategory, ActivityFormValues, ActivityType } from "@/lib/types"
import { formatEnumLabel } from "@/lib/utils"

const selectClassName =
  "flex h-10 w-full rounded-[1rem] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[color:rgba(16,173,121,0.46)] focus:ring-4 focus:ring-[var(--ring)]"

type ActivityFormCardProps = {
  activityCategoryOptions: ActivityCategory[]
  activityTypeOptions: ActivityType[]
  form: ActivityFormValues
  imageFieldResetKey: number
  isSaving: boolean
  onFieldChange: <Key extends keyof ActivityFormValues>(key: Key, value: ActivityFormValues[Key]) => void
  onImageFileChange: (file: File | null) => void
  onReset: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  selectedActivityId: string | null
}

function FieldLabel({ children }: { children: string }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">{children}</label>
}

export function ActivityFormCard({
  activityCategoryOptions,
  activityTypeOptions,
  form,
  imageFieldResetKey,
  isSaving,
  onFieldChange,
  onImageFileChange,
  onReset,
  onSubmit,
  selectedActivityId,
}: ActivityFormCardProps) {
  return (
    <form className="min-w-0 space-y-5 pb-3" onSubmit={onSubmit}>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Title</FieldLabel>
          <Input
            className="h-10"
            required
            placeholder="Water well in Kibaha"
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

      <div className="min-w-0 space-y-2">
        <FieldLabel>Description</FieldLabel>
        <Textarea
          className="min-h-32"
          required
          placeholder="Operational description for the public donation activity."
          rows={4}
          value={form.description}
          onChange={(event) => onFieldChange("description", event.target.value)}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Category</FieldLabel>
          <select
            className={selectClassName}
            value={form.category}
            onChange={(event) => onFieldChange("category", event.target.value as ActivityCategory)}
          >
            {activityCategoryOptions.map((category) => (
              <option key={category} value={category}>
                {formatEnumLabel(category)}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Type</FieldLabel>
          <select
            className={selectClassName}
            value={form.type}
            onChange={(event) => onFieldChange("type", event.target.value as ActivityType)}
          >
            {activityTypeOptions.map((type) => (
              <option key={type} value={type}>
                {formatEnumLabel(type)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Priority</FieldLabel>
          <Input
            className="h-10"
            min={0}
            type="number"
            value={form.priority}
            onChange={(event) => onFieldChange("priority", event.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Goal amount</FieldLabel>
          <Input
            className="h-10"
            min={0}
            step="0.01"
            type="number"
            value={form.goalAmount}
            onChange={(event) => onFieldChange("goalAmount", event.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Raised amount</FieldLabel>
          <Input
            className="h-10"
            min={0}
            step="0.01"
            type="number"
            value={form.raisedAmount}
            onChange={(event) => onFieldChange("raisedAmount", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Fixed price</FieldLabel>
          <Input
            className="h-10"
            min={0}
            step="0.01"
            type="number"
            value={form.price}
            onChange={(event) => onFieldChange("price", event.target.value)}
          />
        </div>
        <label className="flex min-w-0 items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[var(--muted)]/40 px-3 py-2.5">
          <input
            checked={form.isActive}
            className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)]"
            type="checkbox"
            onChange={(event) => onFieldChange("isActive", event.target.checked)}
          />
          <span className="text-sm text-[var(--foreground)]">Visible on the public site</span>
        </label>
      </div>

      <ImageAssetField
        currentUrl={form.image}
        description="Choose a file, compare prepared output sizes instantly, and upload the selected variant only when you save."
        label="Activity image"
        resetKey={imageFieldResetKey}
        onCurrentUrlChange={(value) => onFieldChange("image", value)}
        onSelectedFileChange={onImageFileChange}
      />

      <div className="flex flex-wrap gap-3 border-t border-[var(--border)] pt-4">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <LoadingSpinnerIcon className="mr-2" />
              {selectedActivityId ? "Updating..." : "Creating..."}
            </>
          ) : selectedActivityId ? (
            <>
              <Edit2 color="currentColor" size="18" variant="Linear" className="mr-2" />
              Update activity
            </>
          ) : (
            <>
              <Add color="currentColor" size="18" variant="Linear" className="mr-2" />
              Create activity
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
