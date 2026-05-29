'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type AuthContext = {
  username: string | null
  setUsername: (name: string | null) => void
}

const AuthCtx = createContext<AuthContext>({ username: null, setUsername: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(null)

  useEffect(() => {
    setUsernameState(localStorage.getItem("username"))
  }, [])

  const setUsername = useCallback((name: string | null) => {
    if (name) localStorage.setItem("username", name)
    else localStorage.removeItem("username")
    setUsernameState(name)
  }, [])

  return <AuthCtx.Provider value={{ username, setUsername }}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  return useContext(AuthCtx)
}
