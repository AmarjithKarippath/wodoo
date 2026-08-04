export type DateDaysMode = "difference" | "add"

export type DateDaysInput = {
  mode: DateDaysMode
  startDate: string
  endDate?: string
  daysToAdd?: number
}

export type DateDaysResult = {
  days: number
  weeks: number
  monthsApprox: number
  resultDate?: string
}

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const d = new Date(`${value}T00:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function calculateDateDays(input: DateDaysInput): DateDaysResult | null {
  const start = parseDate(input.startDate)
  if (!start) return null

  if (input.mode === "add") {
    const daysToAdd = input.daysToAdd
    if (!Number.isFinite(daysToAdd)) return null
    const result = new Date(start)
    result.setDate(result.getDate() + Number(daysToAdd))
    const days = Math.abs(Number(daysToAdd))
    return {
      days,
      weeks: days / 7,
      monthsApprox: days / 30.4375,
      resultDate: formatDate(result),
    }
  }

  const end = parseDate(input.endDate || "")
  if (!end) return null
  const ms = end.getTime() - start.getTime()
  const days = Math.round(ms / 86400000)
  const abs = Math.abs(days)
  return {
    days,
    weeks: abs / 7,
    monthsApprox: abs / 30.4375,
  }
}
