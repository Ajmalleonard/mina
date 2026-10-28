import { PromotionEditor } from "@/components/admin/promotion-editor"

type EditPromotionPageProps = {
  params: Promise<{
    promotionId: string
  }>
}

export default async function EditPromotionPage({ params }: EditPromotionPageProps) {
  const { promotionId } = await params

  return <PromotionEditor promotionId={promotionId} />
}
