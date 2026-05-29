import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-bg px-4">
      <main className="flex flex-col items-center gap-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
          <span className="text-2xl font-bold text-primary">AQ</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text">
          Avatar Questions
        </h1>
        <p className="max-w-md text-lg text-text-secondary">
          Sign in or create an account to get started.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border-2 border-border-light bg-surface px-6 py-3 text-sm font-semibold text-text transition-all hover:border-primary/50 hover:bg-surface-hover active:scale-[0.98]"
          >
            Create Account
          </Link>
        </div>
      </main>
    </div>
  )
}
