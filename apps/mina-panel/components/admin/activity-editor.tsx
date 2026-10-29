"use client"

import { ArrowLeft2 } from "iconsax-react"
import { type FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ActivityFormCard } from "@/components/admin/activity-form-card"
import { DashboardPageSkeleton } from "@/components/admin/dashboard-page-skeleton"
import { PageHeading } from "@/components/admin/page-heading"
import { StatusBanner } from "@/components/admin/status-banner"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { Button } from "@/components/ui/button"
import { ACTIVITY_CATEGORY_OPTIONS, ACTIVITY_TYPE_OPTIONS, EMPTY_ACTIVITY_FORM } from "@/lib/admin-form-options"
import { apiRequest, uploadAdminImage } from "@/lib/api"
import type { Activity, ActivityFormValues } from "@/lib/types"

type ActivityEditorProps = {
  activityId?: string
}

function toActivityFormValues(activity: Activity): ActivityFormValues {
  return {
    title: activity.title,
    slug: activity.slug,
    description: activity.description,
    image: activity.image,
    goalAmount: activity.goalAmount === null || activity.goalAmount === undefined ? "" : String(activity.goalAmount),
    raisedAmount: String(activity.raisedAmount),
    isActive: activity.isActive,
    category: activity.category,
    priority: String(activity.priority),
    type: activity.type,
    price: activity.price === null || activity.price === undefined ? "" : String(activity.price),
  }
}

export function ActivityEditor({ activityId }: ActivityEditorProps) {
  const router = useRouter()
  const { token } = useAdminAuth()
  const [form, setForm] = useState<ActivityFormValues>(EMPTY_ACTIVITY_FORM)
  const [initialForm, setInitialForm] = useState<ActivityFormValues>(EMPTY_ACTIVITY_FORM)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFieldResetKey, setImageFieldResetKey] = useState(0)
  const [isLoadingRecord, setIsLoadingRecord] = useState(Boolean(activityId))
  const [isSaving, setIsSaving] = useState(false)

  const isEditing = Boolean(activityId)

  useEffect(() => {
    if (!token || !activityId) {
      return
    }

    async function loadActivity() {
      try {
        setError(null)
        setFeedback(null)
        setIsLoadingRecord(true)

        const activity = await apiRequest<Activity>(`/admin/activities/${activityId}`, { token: token ?? undefined })
        const nextForm = toActivityFormValues(activity)
        setForm(nextForm)
        setInitialForm(nextForm)
        setImageFieldResetKey((value) => value + 1)
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load this activity.")
      } finally {
        setIsLoadingRecord(false)
      }
    }

    void loadActivity()
  }, [activityId, token])

  function handleFieldChange<Key extends keyof ActivityFormValues>(key: Key, value: ActivityFormValues[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function resetForm() {
    setError(null)
    setFeedback(null)
    setForm(isEditing ? initialForm : EMPTY_ACTIVITY_FORM)
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

      let image = form.image.trim()

      if (imageFile) {
        const upload = await uploadAdminImage(token, imageFile)
        image = upload.url
      }

      if (!image) {
        throw new Error("Activity image is required.")
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || undefined,
        description: form.description.trim(),
        image,
        goalAmount: form.goalAmount.trim() ? Number.parseFloat(form.goalAmount) : null,
        raisedAmount: Number.parseFloat(form.raisedAmount || "0") || 0,
        isActive: form.isActive,
        category: form.category,
        priority: Number.parseInt(form.priority || "0", 10) || 0,
        type: form.type,
        price: form.price.trim() ? Number.parseFloat(form.price) : null,
      }

      if (activityId) {
        const updatedActivity = await apiRequest<Activity>(`/admin/activities/${activityId}`, {
          method: "PATCH",
          token,
          body: payload,
        })
        const nextForm = toActivityFormValues(updatedActivity)
        setForm(nextForm)
        setInitialForm(nextForm)
        setFeedback("Activity updated.")
      } else {
        const createdActivity = await apiRequest<Activity>("/admin/activities", {
          method: "POST",
          token,
          body: payload,
        })
        router.replace(`/dashboard/activities/${createdActivity.id}`)
        return
      }

      setImageFile(null)
      setImageFieldResetKey((value) => value + 1)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to save activity.")
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
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/activities")}>
            <ArrowLeft2 color="currentColor" size="16" variant="Linear" className="mr-2" />
            Back to activities
          </Button>
        }
        description={
          isEditing
            ? "Update the activity details here without squeezing the editor beside the list."
            : "Create a new activity on its own page so the form stays focused and compact."
        }
        title={isEditing ? "Edit activity" : "Create activity"}
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
      {!error && feedback ? <StatusBanner variant="success">{feedback}</StatusBanner> : null}

      <div className="min-w-0 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
        <ActivityFormCard
          activityCategoryOptions={ACTIVITY_CATEGORY_OPTIONS}
          activityTypeOptions={ACTIVITY_TYPE_OPTIONS}
          form={form}
          imageFieldResetKey={imageFieldResetKey}
          isSaving={isSaving}
          onFieldChange={handleFieldChange}
          onImageFileChange={setImageFile}
          onReset={resetForm}
          onSubmit={handleSubmit}
          selectedActivityId={activityId ?? null}
        />
      </div>
    </div>
  )
}
