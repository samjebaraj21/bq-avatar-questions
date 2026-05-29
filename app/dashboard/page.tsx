'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState<"JBQ" | "TBQ" | null>(null)

  return (
    <div className="flex flex-1 items-center justify-center bg-bg px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Welcome back!
          </h1>
          <p className="mt-2 text-text-secondary">
            Choose your question mode to get started
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <button
            onClick={() => setSelectedMode("JBQ")}
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-200 ${
              selectedMode === "JBQ"
                ? "border-primary bg-primary-light shadow-lg shadow-primary/20"
                : "border-border-light bg-surface hover:border-primary/50 hover:bg-surface-hover hover:shadow-md"
            }`}
          >
            <div className="relative z-10">
              <span
                className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold transition-colors ${
                  selectedMode === "JBQ"
                    ? "bg-primary text-white"
                    : "bg-surface-alt text-primary"
                }`}
              >
                JBQ
              </span>
              <h2
                className={`mt-4 text-xl font-semibold ${
                  selectedMode === "JBQ" ? "text-primary" : "text-text"
                }`}
              >
                JBQ
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                A fun Bible memorization program for grades K-6 using 576 questions from the Bible Fact-Pak.
              </p>
            </div>
            {selectedMode === "JBQ" && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            )}
          </button>

          <button
            onClick={() => setSelectedMode("TBQ")}
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-200 ${
              selectedMode === "TBQ"
                ? "border-accent bg-amber-50 shadow-lg shadow-accent/20 dark:bg-amber-950/20"
                : "border-border-light bg-surface hover:border-accent/50 hover:bg-surface-hover hover:shadow-md"
            }`}
          >
            <div className="relative z-10">
              <span
                className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold transition-colors ${
                  selectedMode === "TBQ"
                    ? "bg-accent text-white"
                    : "bg-surface-alt text-accent"
                }`}
              >
                TBQ
              </span>
              <h2
                className={`mt-4 text-xl font-semibold ${
                  selectedMode === "TBQ" ? "text-accent" : "text-text"
                }`}
              >
                TBQ
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                A competitive Bible memorization ministry for teens in grades 6-12, covering New Testament books.
              </p>
            </div>
            {selectedMode === "TBQ" && (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            )}
          </button>
        </div>

        {selectedMode === "JBQ" && (
          <div className="mt-8">
            <p className="mb-4 text-center text-sm font-medium text-text-secondary">Choose session type</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => router.push("/practice/jbq")}
                className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30"
              >
                <span className="block text-base font-semibold text-text">Practice Rounds</span>
                <span className="mt-0.5 block text-sm text-text-secondary">Practice at your own pace</span>
              </button>
              <button className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30">
                <span className="block text-base font-semibold text-text">10s Practice</span>
                <span className="mt-0.5 block text-sm text-text-secondary">10-second timed practice</span>
              </button>
              <button className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30">
                <span className="block text-base font-semibold text-text">20s Practice</span>
                <span className="mt-0.5 block text-sm text-text-secondary">20-second timed practice</span>
              </button>
              <button className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30">
                <span className="block text-base font-semibold text-text">30s Practice</span>
                <span className="mt-0.5 block text-sm text-text-secondary">30-second timed practice</span>
              </button>
            </div>
          </div>
        )}

        {selectedMode === "TBQ" && (
          <div className="mt-8">
            <p className="mb-4 text-center text-sm font-medium text-text-secondary">Choose session type</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <button className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30">
                <span className="block text-base font-semibold text-text">Individual Tournament</span>
                <span className="mt-0.5 block text-sm text-text-secondary">Compete solo in tournament mode</span>
              </button>
              <button className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30">
                <span className="block text-base font-semibold text-text">Practice Rounds</span>
                <span className="mt-0.5 block text-sm text-text-secondary">Practice at your own pace</span>
              </button>
              <button className="rounded-xl border-2 border-border-light bg-surface px-6 py-5 text-left transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md active:scale-[0.98] dark:hover:bg-green-950/30 sm:col-span-2 sm:justify-self-center sm:w-1/2">
                <span className="block text-base font-semibold text-text">Quoting Bee</span>
                <span className="mt-0.5 block text-sm text-text-secondary">Quote verses from memory</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
