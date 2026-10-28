"use client"

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { ApiError, SESSION_EXPIRED_EVENT, apiRequest } from "@/lib/api"
import type {
  AdminChallenge,
  AdminLoginResponse,
  AdminUser,
  VerifyAdminResponse,
} from "@/lib/types"

const STORAGE_KEY = "mina_admin_session_v1"

type StoredSession = {
  token: string
}

type AdminAuthContextValue = {
  admin: AdminUser | null
  challenge: AdminChallenge | null
  isAuthenticated: boolean
  loading: boolean
  sessionExpired: boolean
  token: string | null
  clearChallenge: () => void
  login: (email: string, password: string) => Promise<AdminLoginResponse>
  logout: () => void
  refreshAdmin: () => Promise<AdminUser | null>
  verifyChallenge: (code: string) => Promise<VerifyAdminResponse>
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [challenge, setChallenge] = useState<AdminChallenge | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)

  function clearStoredSession() {
    window.localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setAdmin(null)
    setChallenge(null)
  }

  const expireSession = useEffectEvent(() => {
    clearStoredSession()
    setSessionExpired(true)

    if (pathname !== "/session-expired") {
      router.replace("/session-expired")
    }
  })

  useEffect(() => {
    function handleSessionExpired() {
      expireSession()
    }

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    async function hydrateSession() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)

        if (!raw) {
          if (mounted) {
            setLoading(false)
          }
          return
        }

        const stored = JSON.parse(raw) as StoredSession

        if (!stored.token) {
          window.localStorage.removeItem(STORAGE_KEY)
          if (mounted) {
            setLoading(false)
          }
          return
        }

        const nextAdmin = await apiRequest<AdminUser>("/auth/admin/me", {
          token: stored.token,
        })

        if (!mounted) {
          return
        }

        setToken(stored.token)
        setAdmin(nextAdmin)
        setSessionExpired(false)
      } catch (error) {
        if (!mounted) {
          return
        }

        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          expireSession()
        } else {
          clearStoredSession()
          setSessionExpired(false)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void hydrateSession()

    return () => {
      mounted = false
    }
  }, [])

  function persistSession(nextToken: string, nextAdmin: AdminUser) {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: nextToken,
      } satisfies StoredSession),
    )
    setToken(nextToken)
    setAdmin(nextAdmin)
    setChallenge(null)
    setSessionExpired(false)
  }

  async function login(email: string, password: string) {
    const response = await apiRequest<AdminLoginResponse>("/auth/admin/login", {
      method: "POST",
      body: {
        email,
        password,
      },
    })

    if (response.status === "authenticated") {
      persistSession(response.access_token, response.user)
      return response
    }

    setChallenge({
      challengeToken: response.challengeToken,
      mfaSecret: response.status === "mfa_setup_required" ? response.mfaSecret : undefined,
      otpAuthUrl: response.status === "mfa_setup_required" ? response.otpAuthUrl : undefined,
      status: response.status,
      user: response.user,
    })

    return response
  }

  async function verifyChallenge(code: string) {
    if (!challenge) {
      throw new Error("No active verification challenge. Please sign in again.")
    }

    const response = await apiRequest<VerifyAdminResponse>("/auth/admin/verify", {
      method: "POST",
      body: {
        challengeToken: challenge.challengeToken,
        code,
      },
    })

    persistSession(response.access_token, response.user)
    return response
  }

  function logout() {
    clearStoredSession()
    setSessionExpired(false)
  }

  async function refreshAdmin() {
    if (!token) {
      return null
    }

    const nextAdmin = await apiRequest<AdminUser>("/auth/admin/me", {
      token,
    })

    setAdmin(nextAdmin)
    return nextAdmin
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        challenge,
        isAuthenticated: Boolean(admin && token),
        loading,
        sessionExpired,
        token,
        clearChallenge: () => setChallenge(null),
        login,
        logout,
        refreshAdmin,
        verifyChallenge,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider")
  }

  return context
}
