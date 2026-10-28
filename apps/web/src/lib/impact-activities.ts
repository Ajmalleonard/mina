export type PublicImpactActivity = {
  id: string
  title: string
  description: string
  image: string
  category: string
  impactLat: number
  impactLng: number
}

function isPublicImpactActivity(value: unknown): value is PublicImpactActivity {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const activity = value as Record<string, unknown>

  return (
    typeof activity.id === "string" &&
    typeof activity.title === "string" &&
    typeof activity.description === "string" &&
    typeof activity.image === "string" &&
    typeof activity.category === "string" &&
    typeof activity.impactLat === "number" &&
    Number.isFinite(activity.impactLat) &&
    activity.impactLat >= -90 &&
    activity.impactLat <= 90 &&
    typeof activity.impactLng === "number" &&
    Number.isFinite(activity.impactLng) &&
    activity.impactLng >= -180 &&
    activity.impactLng <= 180
  )
}

export async function fetchPublicImpactActivities(): Promise<PublicImpactActivity[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.minafoundationtz.org"
  const response = await fetch(`${apiUrl}/activities`, { cache: "no-store" })

  if (!response.ok) {
    throw new Error(`Unable to load public activities (${response.status}).`)
  }

  const payload: unknown = await response.json()

  if (!Array.isArray(payload)) {
    throw new Error("The public activities response was not a list.")
  }

  return payload.filter(isPublicImpactActivity)
}
