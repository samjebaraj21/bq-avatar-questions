'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/auth-context"
import { apiSignup } from "@/app/api"

const securityQuestions = [
  "What was the name of your first pet?",
  "What city were you born in?",
  "What was your childhood nickname?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favorite book?",
]

export default function SignupPage() {
  const router = useRouter()
  const { setUsername } = useAuth()
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    securityQuestion1: securityQuestions[0],
    securityAnswer1: "",
    securityQuestion2: securityQuestions[1],
    securityAnswer2: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    try {
      const data = await apiSignup({
        username: form.username,
        password: form.password,
        securityQuestion1: form.securityQuestion1,
        securityAnswer1: form.securityAnswer1,
        securityQuestion2: form.securityQuestion2,
        securityAnswer2: form.securityAnswer2,
      })
      if (data.success) {
        setUsername(data.username)
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

  return (
    <div className="flex flex-1 items-center justify-center bg-bg px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl border border-border-light bg-surface p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
            <span className="text-lg font-bold text-primary">AQ</span>
          </div>
          <h1 className="text-xl font-semibold text-text">Create account</h1>
          <p className="mt-1 text-sm text-text-muted">Fill in your details below</p>
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
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Choose a username"
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
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-secondary"
            >
              Re-enter Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="securityQuestion1"
              className="block text-sm font-medium text-text-secondary"
            >
              Security Question 1
            </label>
            <select
              id="securityQuestion1"
              name="securityQuestion1"
              value={form.securityQuestion1}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {securityQuestions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="securityAnswer1"
              className="block text-sm font-medium text-text-secondary"
            >
              Answer
            </label>
            <input
              id="securityAnswer1"
              name="securityAnswer1"
              type="text"
              value={form.securityAnswer1}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Your answer"
              required
            />
          </div>

          <div>
            <label
              htmlFor="securityQuestion2"
              className="block text-sm font-medium text-text-secondary"
            >
              Security Question 2
            </label>
            <select
              id="securityQuestion2"
              name="securityQuestion2"
              value={form.securityQuestion2}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {securityQuestions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="securityAnswer2"
              className="block text-sm font-medium text-text-secondary"
            >
              Answer
            </label>
            <input
              id="securityAnswer2"
              name="securityAnswer2"
              type="text"
              value={form.securityAnswer2}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-border-light bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Your answer"
              required
            />
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
