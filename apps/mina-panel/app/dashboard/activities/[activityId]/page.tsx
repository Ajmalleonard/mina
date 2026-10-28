import { ActivityEditor } from "@/components/admin/activity-editor"

type EditActivityPageProps = {
  params: Promise<{
    activityId: string
  }>
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {
  const { activityId } = await params

  return <ActivityEditor activityId={activityId} />
}
