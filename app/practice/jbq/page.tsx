'use client'

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Question = {
  number: number
  text: string
  answer: string
  isQuotation: boolean
  points: number
}

type RoundData = {
  match: Question[]
  overtime: Question[]
  substitutes: Question[]
}

function QuestionCard({ q, index }: { q: Question; index: number }) {
  const pts = q.points
  return (
    <div className="rounded-lg border border-border-light bg-surface p-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
        Question. Question #{index + 1} for {pts} point{pts >= 10 ? "s" : ""}
      </div>
      <p className="text-sm font-bold text-text">{q.text}{q.text.endsWith("?") ? "" : "?"}</p>
      <p className="mt-1 text-xs font-medium text-text-secondary">{q.answer}</p>
      <div className="mt-2 border-t border-dotted border-border-light pt-2 text-center text-[10px] text-gray-400">
        _____ 4 &nbsp; 3 &nbsp; 2 &nbsp; 1 &nbsp; &ndash; &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; _____
      </div>
    </div>
  )
}

function fetchRound(): Promise<RoundData> {
  return fetch("/api/practice/jbq").then(r => r.json())
}

export default function JBQPracticePage() {
  const router = useRouter()
  const [data, setData] = useState<RoundData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadRound = useCallback(() => {
    setLoading(true)
    fetchRound().then(setData).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRound()
  }, [loadRound])

  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit", day: "2-digit", year: "numeric"
  })

  return (
    <div className="flex flex-1 flex-col bg-bg">
      <div className="flex items-center justify-between border-b border-border-light px-6 py-3">
        <h1 className="text-lg font-semibold text-text">JBQ Practice Round</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg border border-border-light bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover"
          >
            Back to Dashboard
          </button>
          <button
            onClick={loading ? undefined : loadRound}
            className={`rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-hover ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {loading ? "Loading..." : "New Round"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-1 items-center justify-center bg-bg">
          <p className="text-text-secondary">Generating practice round...</p>
        </div>
      )}

      {!loading && data && (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-base font-bold text-text">
              Round: 1 Practice - Match {today}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.match.slice(0, 10).map((q, i) => (
                <QuestionCard key={`m1-${i}`} q={q} index={i} />
              ))}
              {data.match.slice(10, 20).map((q, i) => (
                <QuestionCard key={`m2-${i}`} q={q} index={i + 10} />
              ))}
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-center text-sm font-bold text-text">
                ***** Overtime Questions *****
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.overtime.map((q, i) => (
                  <QuestionCard key={`ot-${i}`} q={q} index={20 + i} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-center text-sm font-bold text-text">
                ***** Substitute Questions *****
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.substitutes.map((q, i) => (
                  <QuestionCard key={`sub-${i}`} q={q} index={23 + i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
