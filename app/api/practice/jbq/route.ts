import { NextResponse } from "next/server"
import questionsData from "@/app/data/jbq-questions.json"

type Question = {
  number: number
  text: string
  answer: string
  isQuotation: boolean
  points: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count)
}

function selectMatchQuestions(pool10: Question[], pool20: Question[], pool30: Question[]) {
  const used10 = new Set<number>()
  const used20 = new Set<number>()
  const used30 = new Set<number>()

  const pick = (pool: Question[], used: Set<number>, n: number) => {
    const available = pool.filter(q => !used.has(q.number))
    const picked = pickRandom(available, n)
    picked.forEach(q => used.add(q.number))
    return picked
  }

  const pick10 = (n: number) => pick(pool10, used10, n)
  const pick20 = (n: number) => pick(pool20, used20, n)
  const pick30 = (n: number) => pick(pool30, used30, n)

  const half1_20 = Math.random() < 0.5 ? 3 : 4
  const half2_20 = 7 - half1_20
  const half1_30 = Math.random() < 0.5 ? 1 : 2
  const half2_30 = 3 - half1_30

  const half1_10 = 10 - half1_20 - half1_30
  const half2_10 = 10 - half2_20 - half2_30

  let half1: Question[] = [
    ...pick10(half1_10),
    ...pick20(half1_20),
    ...pick30(half1_30),
  ]
  let half2: Question[] = [
    ...pick10(half2_10),
    ...pick20(half2_20),
    ...pick30(half2_30),
  ]

  const sortHalves = (h: Question[]) => {
    const sorted: Question[] = []
    let remaining = [...h]

    while (remaining.length > 0) {
      const pos = sorted.length
      const eligible = remaining.filter(q => {
        if (q.points === 30) {
          if (pos === 0) return false
          const prev = sorted[sorted.length - 1]
          if (prev && prev.points === 30) return false
        }
        return true
      })
      const pick = eligible[Math.floor(Math.random() * eligible.length)] || remaining[0]
      sorted.push(pick)
      remaining = remaining.filter(q => q.number !== pick.number)
    }

    return sorted
  }

  half1 = sortHalves(half1)
  half2 = sortHalves(half2)

  return { half1, half2, used10, used20, used30 }
}

function selectExtra(pool: Question[], used: Set<number>, n: number) {
  const available = pool.filter(q => !used.has(q.number))
  return pickRandom(available, n)
}

export async function GET() {
  const all = questionsData as Question[]
  const pool10 = all.filter(q => q.points === 10)
  const pool20 = all.filter(q => q.points === 20)
  const pool30 = all.filter(q => q.points === 30)

  const { half1, half2, used10, used20, used30 } = selectMatchQuestions(pool10, pool20, pool30)
  const overtime = [
    ...selectExtra(pool10, used10, 1),
    ...selectExtra(pool20, used20, 1),
    ...selectExtra(pool30, used30, 1),
  ]
  const substitutes = [
    ...selectExtra(pool10, used10, 1),
    ...selectExtra(pool20, used20, 1),
    ...selectExtra(pool30, used30, 1),
  ]

  return NextResponse.json({
    match: [...half1, ...half2],
    overtime,
    substitutes,
  })
}
