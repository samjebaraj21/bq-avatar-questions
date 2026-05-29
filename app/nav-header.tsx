'use client'

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAuth } from "./auth-context"

export default function NavHeader() {
  const { username, setUsername } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuOpen])

  const handleLogout = useCallback(() => {
    setUsername(null)
    setMenuOpen(false)
  }, [setUsername])

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border-light bg-surface/80 backdrop-blur-sm">
      <Link href="/" className="text-lg font-semibold text-text">
        Avatar Questions
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        {username && <span className="text-text">Hello, {username}</span>}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-alt transition-colors"
            aria-label="Menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border-light bg-surface shadow-lg py-2 z-50">
              {username ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt transition-colors">
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt transition-colors">
                    Create Account
                  </Link>
                </>
              )}
              <div className="mx-3 my-1.5 h-px bg-border-light" />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                FAQ
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
