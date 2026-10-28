"use client"

import { ArrowLeft2, LogoutCurve, ShieldTick } from "iconsax-react"
import { useRouter } from "next/navigation"
import { ThemeSwitcher } from "@/components/admin/theme-switcher"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { Button } from "@/components/ui/button"

export default function SessionExpiredPage() {
  const router = useRouter()
  const { logout } = useAdminAuth()

  function handleReturnToLogin() {
    logout()
    router.replace("/login")
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(15,141,99,0.14),transparent_22%),radial-gradient(circle_at_80%_22%,rgba(15,141,99,0.09),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
      <div className="absolute right-6 top-6 z-10">
        <ThemeSwitcher />
      </div>

      <div className="relative w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow-soft)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[color:rgba(16,173,121,0.22)] bg-[color:rgba(16,173,121,0.08)] text-[var(--primary)]">
          <ShieldTick color="currentColor" size="22" variant="Bulk" />
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            Session expired
          </p>
          <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Your admin session has expired.
          </h1>
          <p className="text-sm leading-7 text-[var(--muted-foreground)] sm:text-[15px]">
            For security, we signed you out after the session became unauthorized. Use the button below to go back to the login page and start a fresh session.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={handleReturnToLogin}>
            <LogoutCurve color="currentColor" size="17" variant="Linear" className="mr-2" />
            Get back to login
          </Button>
          <Button type="button" variant="outline" onClick={() => router.replace("/login")}>
            <ArrowLeft2 color="currentColor" size="17" variant="Linear" className="mr-2" />
            Open login
          </Button>
        </div>
      </div>
    </div>
  )
}
