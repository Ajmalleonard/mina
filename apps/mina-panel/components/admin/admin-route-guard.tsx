"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { LoadingIndicator } from "@/components/admin/loading-indicator"

export function AdminRouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, loading, sessionExpired } = useAdminAuth()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }

    if (sessionExpired) {
      router.replace("/session-expired")
      return
    }

    router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [isAuthenticated, loading, pathname, router, sessionExpired])

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-6 py-5 shadow-[var(--shadow-soft)]">
          <LoadingIndicator label="Restoring admin session..." />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
