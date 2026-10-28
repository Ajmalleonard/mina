"use client"

import { type FormEvent, useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Copy, CloudUpload, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { LoadingSpinnerIcon } from "@/components/admin/loading-indicator"
import { StatusBanner } from "@/components/admin/status-banner"
import { ThemeSwitcher } from "@/components/admin/theme-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const { challenge, clearChallenge, isAuthenticated, loading, login, verifyChallenge } = useAdminAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<"secret" | "uri" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      startTransition(() => {
        router.replace("/dashboard")
      })
    }
  }, [isAuthenticated, loading, router])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await login(email, password)

      if (response.status === "authenticated") {
        startTransition(() => {
          router.replace("/dashboard")
        })
      }
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to sign in.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await verifyChallenge(code)
      startTransition(() => {
        router.replace("/dashboard")
      })
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Verification failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function copyValue(type: "secret" | "uri", value?: string) {
    if (!value) {
      return
    }

    await navigator.clipboard.writeText(value)
    setCopied(type)
    window.setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(15,141,99,0.14),transparent_22%),radial-gradient(circle_at_80%_22%,rgba(15,141,99,0.09),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
      <div className="absolute right-6 top-6 z-10">
        <ThemeSwitcher />
      </div>
      <div className="relative grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_460px]">
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow-soft)]">
          <div className="absolute inset-x-8 top-0 h-40 rounded-full bg-[radial-gradient(circle,rgba(15,141,99,0.18),transparent_68%)] blur-3xl" />
          <div className="relative flex h-full flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(15,141,99,0.25)] bg-[color:rgba(15,141,99,0.08)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
                b1K71jUimo preset direction
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1.5 text-xs text-[var(--muted-foreground)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
                Mina Connect operations console
              </div>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl">
                Manage Mina campaigns from a focused admin workspace.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                Independent deployment, promotion CRUD, S3 media routing, and Google Authenticator verification in the same operational flow.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--muted)]/62 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">Promotion workflow</p>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">From asset upload to launch state</p>
                  </div>
                  <div className="rounded-full border border-[var(--border)] bg-[var(--accent)] px-3 py-1 text-xs text-[var(--muted-foreground)]">
                    admin.mina
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Upload to S3", "Send campaign imagery once and persist the returned asset URL."],
                    ["Draft promotion", "Control title, CTA, status, schedule, and featured order."],
                    ["Go live safely", "Keep access behind password + authenticator verification."],
                  ].map(([title, description], index) => (
                    <div
                      key={title}
                      className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/55 px-4 py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[color:rgba(15,141,99,0.24)] bg-[color:rgba(15,141,99,0.1)] text-sm font-semibold text-[var(--foreground)]">
                        0{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[color:rgba(15,141,99,0.08)] p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-[color:rgba(15,141,99,0.34)] bg-[color:rgba(15,141,99,0.1)] p-2 text-[var(--primary)]">
                      <CloudUpload className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">S3 image flow</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                        Upload, receive URL, store in Prisma-backed records.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--muted)]/62 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-[color:rgba(15,141,99,0.34)] bg-[color:rgba(15,141,99,0.1)] p-2 text-[var(--primary)]">
                      <LockKeyhole className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">Authenticator protected</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                        TOTP setup on first login, code verification on every admin session.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--muted)]/62 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Deployment</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">apps/admin</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                    Standalone Next app so the public website and admin surface can ship independently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Card className="border-[var(--border)] bg-[var(--card)]">
          <CardHeader>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:rgba(15,141,99,0.25)] bg-[color:rgba(15,141,99,0.08)] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
              <ArrowRight className="h-3.5 w-3.5 text-[var(--primary)]" />
              Secure access
            </div>
            <CardTitle className="pt-3 text-2xl font-semibold text-[var(--foreground)]">
              {challenge ? "Verify admin session" : "Admin sign in"}
            </CardTitle>
            <CardDescription className="leading-6 text-[var(--muted-foreground)]">
              {challenge?.status === "mfa_setup_required"
                ? "Open Google Authenticator, add this Mina admin account, then confirm the current 6-digit code."
                : challenge?.status === "mfa_code_required"
                  ? "Enter the 6-digit code from Google Authenticator to finish signing in."
                  : "Use an administrator account from the Mina API to enter the dashboard."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {!challenge ? (
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="email">
                    Admin email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mina.org"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your admin password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isSubmitting || isPending}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinnerIcon className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Continue to verification"
                  )}
                </Button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleVerification}>
                {challenge.status === "mfa_setup_required" ? (
                  <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/45 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-[var(--accent)] p-2 text-[var(--accent-foreground)]">
                        <LockKeyhole className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-[var(--foreground)]">Connect Google Authenticator</p>
                        <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                          Add a new account manually if you do not want to scan a QR code.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                        Setup secret
                      </p>
                      <p className="mt-2 break-all font-mono text-lg text-[var(--foreground)]">
                        {challenge.mfaSecret}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => copyValue("secret", challenge.mfaSecret)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          {copied === "secret" ? "Secret copied" : "Copy secret"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => copyValue("uri", challenge.otpAuthUrl)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          {copied === "uri" ? "Link copied" : "Copy setup link"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="code">
                    6-digit code
                  </label>
                  <Input
                    id="code"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="123456"
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D+/g, "").slice(0, 6))}
                    autoComplete="one-time-code"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" disabled={isSubmitting || isPending || code.length !== 6}>
                    {isSubmitting ? (
                      <>
                        <LoadingSpinnerIcon className="mr-2" />
                        Verifying...
                      </>
                    ) : (
                      "Enter dashboard"
                    )}
                  </Button>
                  <Button type="button" variant="ghost" onClick={clearChallenge}>
                    Start over
                  </Button>
                </div>
              </form>
            )}

            {error ? <StatusBanner variant="error">{error}</StatusBanner> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
