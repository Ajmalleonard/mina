import type { ApiRequestOptions, UploadResponse } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
export const SESSION_EXPIRED_EVENT = "mina-admin-session-expired"

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

function getHeaders({ body, token, headers }: ApiRequestOptions) {
  const nextHeaders = new Headers(headers)

  if (token) {
    nextHeaders.set("Authorization", `Bearer ${token}`)
  }

  if (!(body instanceof FormData) && !nextHeaders.has("Content-Type")) {
    nextHeaders.set("Content-Type", "application/json")
  }

  return nextHeaders
}

export async function apiRequest<T = unknown>(
  path: string,
  { method = "GET", body, token, headers }: ApiRequestOptions = {},
) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    headers: getHeaders({ body, token, headers }),
    cache: "no-store",
  })

  if (!response.ok) {
    let message = "Request failed."

    try {
      const payload = (await response.json()) as { message?: string | string[] }
      if (Array.isArray(payload.message)) {
        message = payload.message.join(", ")
      } else if (payload.message) {
        message = payload.message
      }
    } catch {
      message = response.statusText || message
    }

    if (token && (response.status === 401 || response.status === 403) && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail: { status: response.status } }))
    }

    throw new ApiError(message, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export async function uploadAdminImage(token: string, file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return apiRequest<UploadResponse>("/admin/uploads/image", {
    method: "POST",
    token,
    body: formData,
  })
}
