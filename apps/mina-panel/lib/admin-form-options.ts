import type { ActivityCategory, ActivityFormValues, ActivityType, PromotionFormValues, PromotionStatus } from "@/lib/types"

export const ACTIVITY_TYPE_OPTIONS: ActivityType[] = ["DONATION", "FIXED_PRICE"]

export const ACTIVITY_CATEGORY_OPTIONS: ActivityCategory[] = [
  "PROMOTIONS",
  "EMERGENCY_AID",
  "RAMADAN_CAMPAIGN",
  "NAFL_OFFERING",
  "MINA_MEAL",
  "ORPHAN",
  "WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
  "WATER_WELL_PROJECT",
  "ZAKAT_AND_SADAKA",
  "EDUCATION_AID",
  "HEALTH",
  "TANZANIA_AIDS",
  "INCOME_SUPPORT",
  "GENERAL_HELPS",
  "CONSTRUCTION_PROJECTS",
]

export const PROMOTION_STATUS_OPTIONS: PromotionStatus[] = ["DRAFT", "SCHEDULED", "LIVE", "ARCHIVED"]

export const EMPTY_ACTIVITY_FORM: ActivityFormValues = {
  title: "",
  slug: "",
  description: "",
  image: "",
  goalAmount: "",
  raisedAmount: "0",
  isActive: true,
  category: "GENERAL_HELPS",
  priority: "0",
  type: "DONATION",
  price: "",
}

export const EMPTY_PROMOTION_FORM: PromotionFormValues = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  imageUrl: "",
  ctaLabel: "",
  ctaHref: "",
  status: "DRAFT",
  featured: false,
  sortOrder: "0",
  startsAt: "",
  endsAt: "",
}
