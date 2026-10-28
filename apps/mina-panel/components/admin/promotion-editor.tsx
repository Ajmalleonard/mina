"use client"

import { ArrowLeft2 } from "iconsax-react"
import { type FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardPageSkeleton } from "@/components/admin/dashboard-page-skeleton"
import { PageHeading } from "@/components/admin/page-heading"
import { PromotionFormCard } from "@/components/admin/promotion-form-card"
import { StatusBanner } from "@/components/admin/status-banner"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { Button } from "@/components/ui/button"
import { EMPTY_PROMOTION_FORM, PROMOTION_STATUS_OPTIONS } from "@/lib/admin-form-options"
import { apiRequest, uploadAdminImage } from "@/lib/api"
import type { Promotion, PromotionFormValues } from "@/lib/types"
import { toDatetimeLocalValue } from "@/lib/utils"

type PromotionEditorProps = {
  promotionId?: string
}

function toPromotionFormValues(promotion: Promotion): PromotionFormValues {
  return {
    title: promotion.title,
    slug: promotion.slug,
    summary: promotion.summary,
    description: promotion.description || "",
    imageUrl: promotion.imageUrl || "",
    ctaLabel: promotion.ctaLabel || "",
    ctaHref: promotion.ctaHref || "",
    status: promotion.status,
    featured: promotion.featured,
    sortOrder: String(promotion.sortOrder ?? 0),
    startsAt: toDatetimeLocalValue(promotion.startsAt),
    endsAt: toDatetimeLocalValue(promotion.endsAt),
  }
}

export function PromotionEditor({ promotionId }: PromotionEditorProps) {
  const router = useRouter()
  const { token } = useAdminAuth()
  const [form, setForm] = useState<PromotionFormValues>(EMPTY_PROMOTION_FORM)
  const [initialForm, setInitialForm] = useState<PromotionFormValues>(EMPTY_PROMOTION_FORM)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFieldResetKey, setImageFieldResetKey] = useState(0)
  const [isLoadingRecord, setIsLoadingRecord] = useState(Boolean(promotionId))
  const [isSaving, setIsSaving] = useState(false)

  const isEditing = Boolean(promotionId)

  useEffect(() => {
    if (!token || !promotionId) {
      return
    }

    async function loadPromotion() {
      try {
        setError(null)
        setFeedback(null)
        setIsLoadingRecord(true)

        const promotion = await apiRequest<Promotion>(`/admin/promotions/${promotionId}`, { token: token ?? undefined })
        const nextForm = toPromotionFormValues(promotion)
        setForm(nextForm)
        setInitialForm(nextForm)
        setImageFieldResetKey((value) => value + 1)
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load this promotion.")
      } finally {
        setIsLoadingRecord(false)
      }
    }

    void loadPromotion()
  }, [promotionId, token])

  function handleFieldChange<Key extends keyof PromotionFormValues>(key: Key, value: PromotionFormValues[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function resetForm() {
    setError(null)
    setFeedback(null)
    setForm(isEditing ? initialForm : EMPTY_PROMOTION_FORM)
    setImageFile(null)
    setImageFieldResetKey((value) => value + 1)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!token) {
      return
    }

    try {
      setError(null)
      setFeedback(null)
      setIsSaving(true)

      let imageUrl = form.imageUrl.trim()

      if (imageFile) {
        const upload = await uploadAdminImage(token, imageFile)
        imageUrl = upload.url
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || undefined,
        summary: form.summary.trim(),
        description: form.description.trim() || undefined,
        imageUrl: imageUrl || undefined,
        ctaLabel: form.ctaLabel.trim() || undefined,
        ctaHref: form.ctaHref.trim() || undefined,
        status: form.status,
        featured: form.featured,
        sortOrder: Number.parseInt(form.sortOrder || "0", 10) || 0,
        startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : undefined,
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : undefined,
      }

      if (promotionId) {
        const updatedPromotion = await apiRequest<Promotion>(`/admin/promotions/${promotionId}`, {
          method: "PATCH",
          token,
          body: payload,
        })
        const nextForm = toPromotionFormValues(updatedPromotion)
        setForm(nextForm)
        setInitialForm(nextForm)
        setFeedback("Promotion updated.")
      } else {
        const createdPromotion = await apiRequest<Promotion>("/admin/promotions", {
          method: "POST",
          token,
          body: payload,
        })
        router.replace(`/dashboard/promotions/${createdPromotion.id}`)
        return
      }

      setImageFile(null)
      setImageFieldResetKey((value) => value + 1)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to save promotion.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoadingRecord) {
    return <DashboardPageSkeleton variant="editor" />
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <PageHeading
        actions={
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/promotions")}>
            <ArrowLeft2 color="currentColor" size="16" variant="Linear" className="mr-2" />
            Back to promotions
          </Button>
        }
        description={
          isEditing
            ? "Update the promotion details here without stacking the editor beside the listing."
            : "Create a promotion on its own page so the workflow stays tighter and cleaner."
        }
        title={isEditing ? "Edit promotion" : "Create promotion"}
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
      {!error && feedback ? <StatusBanner variant="success">{feedback}</StatusBanner> : null}

      <div className="min-w-0 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
        <PromotionFormCard
          form={form}
          imageFieldResetKey={imageFieldResetKey}
          isSaving={isSaving}
          onFieldChange={handleFieldChange}
          onImageFileChange={setImageFile}
          onReset={resetForm}
          onSubmit={handleSubmit}
          selectedPromotionId={promotionId ?? null}
          statusOptions={PROMOTION_STATUS_OPTIONS}
        />
      </div>
    </div>
  )
}
