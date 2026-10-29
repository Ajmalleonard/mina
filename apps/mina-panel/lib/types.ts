export type PromotionStatus = "DRAFT" | "SCHEDULED" | "LIVE" | "ARCHIVED"
export type ActivityType = "DONATION" | "FIXED_PRICE"
export type ActivityCategory =
  | "PROMOTIONS"
  | "EMERGENCY_AID"
  | "RAMADAN_CAMPAIGN"
  | "NAFL_OFFERING"
  | "MINA_MEAL"
  | "ORPHAN"
  | "WE_ARE_TOGETHER_WITH_OUR_ORPHANS"
  | "WATER_WELL_PROJECT"
  | "ZAKAT_AND_SADAKA"
  | "EDUCATION_AID"
  | "HEALTH"
  | "TANZANIA_AIDS"
  | "INCOME_SUPPORT"
  | "GENERAL_HELPS"
  | "CONSTRUCTION_PROJECTS"

export type AdminUser = {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  role: "ADMIN" | "USER"
  mfaEnabled: boolean
  lastLoginAt?: string | null
  createdAt: string
  updatedAt: string
}

export type AdminChallenge = {
  challengeToken: string
  mfaSecret?: string
  otpAuthUrl?: string
  status: "mfa_code_required" | "mfa_setup_required"
  user: AdminUser
}

export type AdminLoginResponse =
  | {
      status: "authenticated"
      access_token: string
      user: AdminUser
    }
  | {
      status: "mfa_code_required"
      challengeToken: string
      user: AdminUser
    }
  | {
      status: "mfa_setup_required"
      challengeToken: string
      user: AdminUser
      mfaSecret: string
      otpAuthUrl: string
    }

export type VerifyAdminResponse = {
  status: "authenticated"
  access_token: string
  user: AdminUser
  justConfiguredMfa: boolean
}

export type Promotion = {
  id: string
  title: string
  slug: string
  summary: string
  description?: string | null
  imageUrl?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  status: PromotionStatus
  featured: boolean
  sortOrder: number
  startsAt?: string | null
  endsAt?: string | null
  createdAt: string
  updatedAt: string
}

export type Activity = {
  id: string
  title: string
  slug: string
  description: string
  image: string
  goalAmount?: number | null
  raisedAmount: number
  isActive: boolean
  category: ActivityCategory
  priority: number
  type: ActivityType
  price?: number | null
  impactLat?: number | null
  impactLng?: number | null
  createdAt: string
  updatedAt: string
}

export type PromotionFormValues = {
  title: string
  slug: string
  summary: string
  description: string
  imageUrl: string
  ctaLabel: string
  ctaHref: string
  status: PromotionStatus
  featured: boolean
  sortOrder: string
  startsAt: string
  endsAt: string
}

export type ActivityFormValues = {
  title: string
  slug: string
  description: string
  image: string
  goalAmount: string
  raisedAmount: string
  isActive: boolean
  category: ActivityCategory
  priority: string
  type: ActivityType
  price: string
}

export type ActivityMeta = {
  totals: {
    total: number
    active: number
    inactive: number
  }
  categories: Array<{
    value: ActivityCategory
    count: number
  }>
  types: Array<{
    value: ActivityType
    count: number
  }>
}

export type UploadResponse = {
  key: string
  url: string
}

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: BodyInit | FormData | Record<string, unknown>
  headers?: HeadersInit
  token?: string
}
