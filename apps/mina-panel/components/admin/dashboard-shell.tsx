"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gallery, Home2, Map1, Profile2User, Setting2, TaskSquare } from "iconsax-react"
import { AdminRouteGuard } from "@/components/admin/admin-route-guard"
import { useAdminAuth } from "@/components/admin/admin-auth-provider"
import { ThemeSwitcher } from "@/components/admin/theme-switcher"
import { Badge } from "@/components/ui/badge"
import { cn, formatDateTime } from "@/lib/utils"

const PRIMARY_NAV_ITEMS = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    description: "Stats and latest created items.",
    icon: Home2,
  },
  {
    href: "/dashboard/activities",
    label: "Activities",
    description: "Manage donation activities and campaign records.",
    icon: TaskSquare,
  },
  {
    href: "/dashboard/impact-map",
    label: "Impact map",
    description: "Place completed contributions on the public impact map.",
    icon: Map1,
  },
  {
    href: "/dashboard/promotions",
    label: "Promotions",
    description: "Manage banners, placements, and calls to action.",
    icon: Gallery,
  },
]

const SECONDARY_NAV_ITEMS = [
  {
    href: "/dashboard/settings",
    label: "Settings",
    description: "Account, login, and security details.",
    icon: Setting2,
  },
]

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { admin } = useAdminAuth()
  const navItems = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS]

  const currentItem =
    navItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) || navItems[0]

  const adminName =
    [admin?.firstName, admin?.lastName].filter(Boolean).join(" ").trim() || admin?.email || "Admin"

  return (
    <AdminRouteGuard>
      <div className="min-h-svh px-3 py-3 lg:px-5">
        <div className="mx-auto flex max-w-[1720px] flex-col gap-3 lg:h-[calc(100svh-1.5rem)] lg:flex-row">
          <aside className="hidden w-[84px] shrink-0 rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--shadow-soft)] lg:flex lg:flex-col lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] border border-[color:rgba(16,173,121,0.24)] bg-[linear-gradient(180deg,rgba(16,173,121,0.14),rgba(16,173,121,0.06))] text-[var(--primary)] shadow-[0_16px_30px_rgba(16,173,121,0.12)]">
                <Home2 color="currentColor" size="24" variant="Bold" />
              </div>

              <nav className="flex flex-col gap-2.5">
                {PRIMARY_NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = currentItem.href === item.href

                  return (
                    <Link
                      key={item.href}
                      aria-label={item.label}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-[1.1rem] border transition",
                        isActive
                          ? "border-[color:rgba(16,173,121,0.3)] bg-[color:rgba(16,173,121,0.12)] text-[var(--foreground)]"
                          : "border-transparent bg-transparent text-[var(--muted-foreground)] hover:border-[var(--border)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                      )}
                      href={item.href}
                      title={item.label}
                    >
                      <Icon color="currentColor" size="20" variant={isActive ? "Bold" : "Linear"} />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex flex-col items-center gap-2.5">
              {SECONDARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = currentItem.href === item.href

                return (
                  <Link
                    key={item.href}
                    aria-label={item.label}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-[1.1rem] border transition",
                      isActive
                        ? "border-[color:rgba(16,173,121,0.3)] bg-[color:rgba(16,173,121,0.12)] text-[var(--foreground)]"
                        : "border-transparent bg-transparent text-[var(--muted-foreground)] hover:border-[var(--border)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                    )}
                    href={item.href}
                    title={item.label}
                  >
                    <Icon color="currentColor" size="20" variant={isActive ? "Bold" : "Linear"} />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </aside>

          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <header className="shrink-0 rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-[var(--shadow-soft)] lg:px-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="space-y-2.5">
                  <div className="inline-flex w-fit items-center rounded-full border border-[color:rgba(16,173,121,0.22)] bg-[color:rgba(16,173,121,0.08)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--foreground)]">
                    Mina Admin
                  </div>
                  <div className="space-y-1.5">
                    <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.15rem]">
                      {currentItem.label}
                    </h1>
                    <p className="max-w-3xl text-sm leading-6 text-[var(--muted-foreground)] sm:text-[15px]">
                      {currentItem.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-start justify-end gap-3">
                  <ThemeSwitcher />

                  <div className="rounded-[1.2rem] border border-[var(--border)] bg-[var(--muted)]/74 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-[var(--border)] bg-[var(--accent)] text-[var(--primary)]">
                        <Profile2User color="currentColor" size="18" variant="Bulk" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--foreground)]">{adminName}</p>
                        <p className="truncate text-xs text-[var(--muted-foreground)]">{admin?.email}</p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          <Badge>{admin?.mfaEnabled ? "Authenticator ready" : "Setup pending"}</Badge>
                          {admin?.lastLoginAt ? (
                            <Badge variant="outline">Last login {formatDateTime(admin.lastLoginAt)}</Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <nav className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-3.5">
                {navItems.map((item) => {
                  const isActive = currentItem.href === item.href

                  return (
                    <Link
                      key={item.href}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                        isActive
                          ? "bg-[rgba(16,173,121,0.14)] text-[var(--foreground)]"
                          : "bg-[var(--muted)]/78 text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </header>

            <main className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--muted)]/42 p-5 shadow-[var(--shadow-soft)] lg:min-h-0 lg:flex-1 lg:overflow-hidden xl:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  )
}
