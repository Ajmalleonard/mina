"use client"

import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { CloseCircle, InfoCircle, Trash } from "iconsax-react"
import { Button } from "@/components/ui/button"

type ConfirmDialogVariant = "default" | "destructive"

export type ConfirmDialogOptions = {
  cancelLabel?: string
  confirmLabel?: string
  description?: string
  title: string
  variant?: ConfirmDialogVariant
}

type ConfirmDialogContextValue = {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>
}

type ConfirmDialogRequest = Required<Pick<ConfirmDialogOptions, "cancelLabel" | "confirmLabel" | "title" | "variant">> &
  Pick<ConfirmDialogOptions, "description">

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | undefined>(undefined)

const DEFAULT_OPTIONS = {
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  variant: "default" as const,
}

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ConfirmDialogRequest | null>(null)
  const resolverRef = useRef<((value: boolean) => void) | null>(null)

  const closeDialog = useCallback((value: boolean) => {
    resolverRef.current?.(value)
    resolverRef.current = null
    setRequest(null)
  }, [])

  const confirm = useCallback((options: ConfirmDialogOptions) => {
    if (resolverRef.current) {
      resolverRef.current(false)
      resolverRef.current = null
    }

    setRequest({
      ...DEFAULT_OPTIONS,
      ...options,
    })

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  useEffect(() => {
    if (!request) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        closeDialog(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [closeDialog, request])

  useEffect(() => {
    return () => {
      resolverRef.current?.(false)
      resolverRef.current = null
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      confirm,
    }),
    [confirm],
  )

  const Icon = request?.variant === "destructive" ? Trash : InfoCircle

  return (
    <ConfirmDialogContext.Provider value={contextValue}>
      {children}

      {request ? (
        <div
          aria-hidden={false}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(6,10,8,0.52)] px-4 backdrop-blur-sm"
          onClick={() => closeDialog(false)}
        >
          <div
            aria-describedby="confirm-dialog-description"
            aria-labelledby="confirm-dialog-title"
            aria-modal="true"
            className="w-full max-w-md rounded-[1.65rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-soft)]"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div
                className={
                  request.variant === "destructive"
                    ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-[color:rgba(203,90,72,0.24)] bg-[color:rgba(203,90,72,0.1)] text-[var(--destructive)]"
                    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-[var(--border)] bg-[var(--accent)] text-[var(--primary)]"
                }
              >
                <Icon color="currentColor" size="19" variant="Bulk" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 id="confirm-dialog-title" className="text-lg font-semibold text-[var(--foreground)]">
                      {request.title}
                    </h2>
                    {request.description ? (
                      <p
                        id="confirm-dialog-description"
                        className="mt-1.5 text-sm leading-6 text-[var(--muted-foreground)]"
                      >
                        {request.description}
                      </p>
                    ) : null}
                  </div>

                  <button
                    aria-label="Close confirmation dialog"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[var(--muted-foreground)] transition hover:border-[var(--border)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
                    type="button"
                    onClick={() => closeDialog(false)}
                  >
                    <CloseCircle color="currentColor" size="18" variant="Linear" />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => closeDialog(false)}>
                    {request.cancelLabel}
                  </Button>
                  <Button
                    autoFocus
                    type="button"
                    variant={request.variant === "destructive" ? "destructive" : "primary"}
                    onClick={() => closeDialog(true)}
                  >
                    {request.confirmLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </ConfirmDialogContext.Provider>
  )
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext)

  if (!context) {
    throw new Error("useConfirmDialog must be used within ConfirmDialogProvider")
  }

  return context.confirm
}
