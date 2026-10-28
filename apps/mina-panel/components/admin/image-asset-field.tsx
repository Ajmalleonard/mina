"use client"
/* eslint-disable @next/next/no-img-element */

import { CloseCircle, Image as ImageIcon } from "iconsax-react"
import { startTransition, useEffect, useMemo, useState } from "react"
import { LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  IMAGE_FORMAT_OPTIONS,
  IMAGE_PRESET_OPTIONS,
  prepareImageVariants,
  revokePreparedImageVariants,
  type ImageCompressionPreset,
  type ImageOutputFormat,
  type PreparedImageVariant,
} from "@/lib/image-upload"
import { cn, formatFileSize } from "@/lib/utils"

const selectClassName =
  "flex h-10 w-full rounded-[1rem] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[color:rgba(16,173,121,0.46)] focus:ring-4 focus:ring-[var(--ring)]"

type ImageAssetFieldProps = {
  currentUrl: string
  description: string
  label: string
  onCurrentUrlChange: (value: string) => void
  onSelectedFileChange: (file: File | null) => void
  resetKey: number
}

function FieldLabel({ children }: { children: string }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">{children}</label>
}

export function ImageAssetField({
  currentUrl,
  description,
  label,
  onCurrentUrlChange,
  onSelectedFileChange,
  resetKey,
}: ImageAssetFieldProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPreparing, setIsPreparing] = useState(false)
  const [preparedVariants, setPreparedVariants] = useState<PreparedImageVariant[]>([])
  const [selectedFormat, setSelectedFormat] = useState<ImageOutputFormat>("webp")
  const [selectedPreset, setSelectedPreset] = useState<ImageCompressionPreset>("standard")

  useEffect(() => {
    return () => {
      revokePreparedImageVariants(preparedVariants)
    }
  }, [preparedVariants])

  useEffect(() => {
    revokePreparedImageVariants(preparedVariants)
    setPreparedVariants([])
    setSelectedFormat("webp")
    setSelectedPreset("standard")
    setError(null)
    setIsPreparing(false)
    onSelectedFileChange(null)
    // The reset key is an explicit external signal to clear the prepared variants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const selectedVariant = useMemo(
    () => preparedVariants.find((variant) => variant.format === selectedFormat && variant.preset === selectedPreset) ?? null,
    [preparedVariants, selectedFormat, selectedPreset],
  )

  useEffect(() => {
    onSelectedFileChange(selectedVariant?.file ?? null)
  }, [onSelectedFileChange, selectedVariant])

  async function handleFileSelect(file: File | null) {
    if (!file) {
      clearPreparedVariants()
      return
    }

    try {
      setError(null)
      setIsPreparing(true)

      const variants = await prepareImageVariants(file)

      startTransition(() => {
        setPreparedVariants((current) => {
          revokePreparedImageVariants(current)
          return variants
        })
        setSelectedFormat("webp")
        setSelectedPreset("standard")
      })
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to prepare image variants.")
      clearPreparedVariants()
    } finally {
      setIsPreparing(false)
    }
  }

  function clearPreparedVariants() {
    setPreparedVariants((current) => {
      revokePreparedImageVariants(current)
      return []
    })
    setSelectedFormat("webp")
    setSelectedPreset("standard")
    setError(null)
    setIsPreparing(false)
    onSelectedFileChange(null)
  }

  function handleUrlChange(value: string) {
    if (preparedVariants.length > 0) {
      clearPreparedVariants()
    }

    onCurrentUrlChange(value)
  }

  const previewUrl = selectedVariant?.previewUrl || currentUrl

  return (
    <div className="min-w-0 space-y-4 rounded-[1.2rem] border border-[var(--border)] bg-[var(--muted)]/28 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-[color:rgba(16,173,121,0.22)] bg-[color:rgba(16,173,121,0.08)] text-[var(--primary)]">
          <ImageIcon color="currentColor" size="17" variant="Bulk" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
          <p className="mt-1 text-xs leading-6 text-[var(--muted-foreground)]">{description}</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <FieldLabel>Upload file</FieldLabel>
          <Input
            accept="image/*"
            className="h-10"
            type="file"
            onChange={(event) => void handleFileSelect(event.target.files?.[0] || null)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <FieldLabel>Current image URL</FieldLabel>
          <Input
            className="h-10"
            placeholder="https://..."
            type="url"
            value={currentUrl}
            onChange={(event) => handleUrlChange(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-[1.2rem] border border-[var(--border)] bg-[var(--card)]/66 p-3">
        {isPreparing ? (
          <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <LoadingSpinnerIcon size={16} />
            Preparing `webp`, `jpg`, and `png` variants in compressed, standard, and original sizes before upload.
          </div>
        ) : preparedVariants.length > 0 && selectedVariant ? (
          <div className="space-y-3">
            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
              <div className="min-w-0 space-y-2">
                <FieldLabel>Format</FieldLabel>
                <select
                  className={selectClassName}
                  value={selectedFormat}
                  onChange={(event) => setSelectedFormat(event.target.value as ImageOutputFormat)}
                >
                  {IMAGE_FORMAT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-w-0 space-y-2">
                <FieldLabel>Compression</FieldLabel>
                <select
                  className={selectClassName}
                  value={selectedPreset}
                  onChange={(event) => setSelectedPreset(event.target.value as ImageCompressionPreset)}
                >
                  {IMAGE_PRESET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button className="h-10 w-full px-3 lg:w-auto" type="button" variant="ghost" onClick={clearPreparedVariants}>
                  <CloseCircle color="currentColor" size="16" variant="Linear" className="mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-2">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Prepared size</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{formatFileSize(selectedVariant.file.size)}</p>
              </div>
              <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-2">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Resolution</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                  {selectedVariant.width} x {selectedVariant.height}
                </p>
              </div>
              <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-2">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Upload flow</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">Prepared locally, uploads on save</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-6 text-[var(--muted-foreground)]">
            Select an image to prebuild all format and compression variants locally before anything is sent to AWS.
          </p>
        )}
      </div>

      {error ? (
        <div className="rounded-[1rem] border border-[color:rgba(203,90,72,0.26)] bg-[color:rgba(203,90,72,0.08)] px-3 py-2 text-sm text-[var(--destructive)]">
          {error}
        </div>
      ) : null}

      {previewUrl ? (
        <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--card)]">
          <img alt={`${label} preview`} className={cn("h-48 w-full object-cover", isPreparing && "opacity-70")} src={previewUrl} />
        </div>
      ) : null}
    </div>
  )
}
