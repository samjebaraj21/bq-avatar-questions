'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/auth-context"
import { apiLogin, apiGoogleLogin } from "@/app/api"
import { GoogleLogin } from "@react-oauth/google"
import type { CredentialResponse } from "@react-oauth/google"

export default function LoginPage() {
  const router = useRouter()
  const { setUsername: setAuthUsername } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [googleError, setGoogleError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await apiLogin(username, password)
      if (data.success) {
        setAuthUsername(data.username)
        router.push("/dashboard")
      } else {
        setError(data.message)
      }
    } catch {
      setError("Unable to connect to server")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSuccess(response: CredentialResponse) {
    if (!response.credential) {
      setGoogleError("No credential returned from Google")
      return
    }
    setGoogleError("")
    try {
      const data = await apiGoogleLogin(response.credential)
      if (data.success) {
        setAuthUsername(data.username)
        router.push("/dashboard")
      } else {
        setGoogleError(data.message)
      }
    } catch {
      setGoogleError("Unable to connect to server")
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border-light bg-surface p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
            <span className="text-lg font-bold text-primary">AQ</span>
          </div>
          <h1 className="text-xl font-semibold text-text">Welcome back</h1>
          <p className="mt-1 text-sm text-text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-text-secondary"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-secondary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right text-sm">
            <button
              type="button"
              className="font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border-light" />
          <span className="text-xs text-text-secondary whitespace-nowrap">or continue with</span>
          <div className="h-px flex-1 bg-border-light" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setGoogleError("Google sign-in failed. Please try again.")}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="300"
          />
        </div>

        {googleError && (
          <p className="mt-3 text-center text-xs text-red-500">{googleError}</p>
        )}

        <p className="mt-6 text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
