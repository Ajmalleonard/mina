"use client"

import { Lock, LogoutCurve, Profile2User, ShieldTick } from "iconsax-react"
import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { PageHeading } from "@/components/admin/page-heading"
import { PanelCard } from "@/components/admin/panel-card"
import { StatusBanner } from "@/components/admin/status-banner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiRequest } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--muted)]/34 px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const { admin, logout, token } = useAdminAuth()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!token) {
      return
    }

    try {
      setError(null)
      setFeedback(null)

      if (newPassword !== confirmPassword) {
        throw new Error("The new password and confirmation must match.")
      }

      if (newPassword === currentPassword) {
        throw new Error("Use a different value for the new password.")
      }

      setIsSaving(true)
      await apiRequest<{ message: string }>("/auth/admin/password", {
        method: "PATCH",
        token,
        body: {
          currentPassword,
          newPassword,
        },
      })

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setFeedback("Password updated successfully.")
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to update the password.")
    } finally {
      setIsSaving(false)
    }
  }

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <PageHeading
        description="Account details, security state, password changes, and logout all live here in one tighter settings view."
        title="Settings"
      />

      {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
      {!error && feedback ? <StatusBanner variant="success">{feedback}</StatusBanner> : null}

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <PanelCard
          contentClassName="grid gap-3 sm:grid-cols-2"
          description="Compact account and session information for the signed-in admin."
          title="Account snapshot"
        >
          <MetaItem label="Name" value={[admin?.firstName, admin?.lastName].filter(Boolean).join(" ").trim() || "Not set"} />
          <MetaItem label="Email" value={admin?.email || "Not available"} />
          <MetaItem label="Role" value={admin?.role || "Not available"} />
          <MetaItem label="Created" value={formatDateTime(admin?.createdAt)} />
          <MetaItem label="Last login" value={formatDateTime(admin?.lastLoginAt)} />
          <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--muted)]/34 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Security</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{admin?.mfaEnabled ? "Authenticator enabled" : "Authenticator pending"}</Badge>
              <Badge variant="outline">{admin?.phone || "No phone saved"}</Badge>
            </div>
          </div>
        </PanelCard>

        <PanelCard
          contentClassName="space-y-3"
          description="Keep the session controls in settings instead of floating in the dashboard shell."
          title="Session controls"
        >
          <div className="rounded-[1.15rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-[var(--border)] bg-[var(--accent)] text-[var(--primary)]">
                <Profile2User color="currentColor" size="17" variant="Bulk" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Current account</p>
                <p className="text-xs text-[var(--muted-foreground)]">{admin?.email}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.15rem] border border-[var(--border)] bg-[var(--muted)]/36 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-[var(--border)] bg-[var(--accent)] text-[var(--primary)]">
                <ShieldTick color="currentColor" size="17" variant="Bulk" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Verification flow</p>
                <p className="text-xs leading-5 text-[var(--muted-foreground)]">
                  Password sign-in happens first, then the Google Authenticator step protects access to the admin.
                </p>
              </div>
            </div>
          </div>

          <Button className="w-full" type="button" variant="outline" onClick={handleLogout}>
            <LogoutCurve color="currentColor" size="17" variant="Linear" className="mr-2" />
            Log out
          </Button>
        </PanelCard>
      </div>

      <div className="max-w-[980px]">
        <PanelCard
          contentClassName="space-y-4"
          description="Change the admin password here. The update is applied immediately after the current password is verified."
          title="Change password"
        >
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]" htmlFor="current-password">
                  Current password
                </label>
                <Input
                  id="current-password"
                  className="h-10"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]" htmlFor="new-password">
                  New password
                </label>
                <Input
                  id="new-password"
                  className="h-10"
                  minLength={8}
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]" htmlFor="confirm-password">
                  Confirm password
                </label>
                <Input
                  id="confirm-password"
                  className="h-10"
                  minLength={8}
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <LoadingSpinnerIcon className="mr-2" />
                ) : (
                  <Lock color="currentColor" size="17" variant="Linear" className="mr-2" />
                )}
                {isSaving ? "Updating..." : "Update password"}
              </Button>
              <p className="self-center text-xs text-[var(--muted-foreground)]">Minimum length is 8 characters.</p>
            </div>
          </form>
        </PanelCard>
      </div>
    </div>
  )
}
