export type AgeInput = { birthDate: string; asOfDate?: string }

export type AgeResult = {
  years: number
  months: number
  days: number
  totalDays: number
  nextBirthdayInDays: number
}

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const d = new Date(`${value}T00:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

export function calculateAge(input: AgeInput): AgeResult | null {
  const birth = parseDate(input.birthDate)
  const asOf = parseDate(input.asOfDate || new Date().toISOString().slice(0, 10))
  if (!birth || !asOf || asOf < birth) return null

  let years = asOf.getFullYear() - birth.getFullYear()
  let months = asOf.getMonth() - birth.getMonth()
  let days = asOf.getDate() - birth.getDate()

  if (days < 0) {
    months -= 1
    const prev = new Date(asOf.getFullYear(), asOf.getMonth(), 0)
    days += prev.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor((asOf.getTime() - birth.getTime()) / 86400000)

  const next = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate())
  if (next <= asOf) next.setFullYear(asOf.getFullYear() + 1)
  const nextBirthdayInDays = Math.ceil((next.getTime() - asOf.getTime()) / 86400000)

  return { years, months, days, totalDays, nextBirthdayInDays }
}
