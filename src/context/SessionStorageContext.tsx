"use client"
import React, { createContext, useContext, useState } from "react"

type SessionStorageContextType = {
  getItem: <T = string>(key: string) => T | null
  setItem: <T = string>(key: string, value: T) => void
  removeItem: (key: string) => void
  clear: () => void
}

const SessionContext = createContext<SessionStorageContextType | undefined>(undefined)

export const SessionStorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [, forceUpdate] = useState(0) // Used to re-render on updates

  const getItem = <T = string>(key: string): T | null => {
    const value = sessionStorage.getItem(key)
    try {
      return value ? (JSON.parse(value) as T) : null
    } catch {
      return value as unknown as T
    }
  }

  const setItem = <T = string>(key: string, value: T) => {
    const stringified = JSON.stringify(value)
    sessionStorage.setItem(key, stringified)
    forceUpdate(n => n + 1)
  }

  const removeItem = (key: string) => {
    sessionStorage.removeItem(key)
    forceUpdate(n => n + 1)
  }

  const clear = () => {
    sessionStorage.clear()
    forceUpdate(n => n + 1)
  }

  return (
    <SessionContext.Provider value={{ getItem, setItem, removeItem, clear }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = (): SessionStorageContextType => {
  const context = useContext(SessionContext)
  if (!context) throw new Error("useSession must be used within a SessionStorageProvider")
  return context
}