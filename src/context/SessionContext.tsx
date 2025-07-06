"use client"
import React, { createContext, useContext, useState } from "react"

type SessionContextType = {
  get: <T = string>(key: string) => T | null
  set: <T = string>(key: string, value: T) => void
  remove: (key: string) => void
  clear: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [, forceUpdate] = useState(0) // Used to re-render on updates

  const get = <T = string>(key: string): T | null => {
    const value = sessionStorage.getItem(key)
    try {
      return value ? (JSON.parse(value) as T) : null
    } catch {
      return value as unknown as T
    }
  }

  const set = <T = string>(key: string, value: T) => {
    const stringified = JSON.stringify(value)
    sessionStorage.setItem(key, stringified)

    if (typeof window !== "undefined") {
      document.cookie = `${key}=${encodeURIComponent(stringified)}; path=/; max-age=86400; samesite=strict`
      console.log(`Cookie: ${encodeURIComponent(stringified)}`)
    }

    forceUpdate(n => n + 1)
  }

  const remove = (key: string) => {
    sessionStorage.removeItem(key)
    forceUpdate(n => n + 1)
  }

  const clear = () => {
    sessionStorage.clear()
    forceUpdate(n => n + 1)
  }

  return (
    <SessionContext.Provider value={{ get, set, remove, clear }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext)
  if (!context) throw new Error("useSession must be used within a SessionProvider")
  return context
}