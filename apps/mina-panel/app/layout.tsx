import type { Metadata } from "next"
import type { ReactNode } from "react"

import "./globals.css"
import { AdminAuthProvider } from "@/components/admin/admin-auth-provider"
import { ConfirmDialogProvider } from "@/components/admin/confirm-dialog-provider"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Mina Foundation | Square Experience Client Portal (SECP)",
  description: "Enterprise private portal for managing business and operations.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
      nosnippet: true,
      notranslate: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body>
        <ThemeProvider>
          <AdminAuthProvider>
            <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
          </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
