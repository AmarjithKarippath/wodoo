/** Periodic IRR (equal periods). Cash flows: period 0..n, typically CF0 negative. */
export function calculateIrr(cashFlows: number[]): number | null {
  if (cashFlows.length < 2) return null
  if (!cashFlows.every(Number.isFinite)) return null
  const hasNeg = cashFlows.some((a) => a < 0)
  const hasPos = cashFlows.some((a) => a > 0)
  if (!hasNeg || !hasPos) return null

  const npv = (rate: number) =>
    cashFlows.reduce((s, cf, t) => s + cf / Math.pow(1 + rate, t), 0)
  const dNpv = (rate: number) =>
    cashFlows.reduce(
      (s, cf, t) => (t === 0 ? s : s - (t * cf) / Math.pow(1 + rate, t + 1)),
      0,
    )

  let rate = 0.1
  for (let i = 0; i < 80; i++) {
    const f = npv(rate)
    const df = dNpv(rate)
    if (Math.abs(df) < 1e-12) break
    const next = rate - f / df
    if (!Number.isFinite(next) || next <= -0.9999) {
      rate = 0.05
      continue
    }
    if (Math.abs(next - rate) < 1e-10) {
      rate = next
      break
    }
    rate = next
  }

  if (!Number.isFinite(rate) || rate <= -1) return null
  return rate * 100
}

export type IrrSummary = {
  irrPercent: number
  totalIn: number
  totalOut: number
  net: number
}

export function summarizeIrr(cashFlows: number[]): IrrSummary | null {
  const irrPercent = calculateIrr(cashFlows)
  if (irrPercent == null) return null
  const totalIn = -cashFlows.filter((a) => a < 0).reduce((s, a) => s + a, 0)
  const totalOut = cashFlows.filter((a) => a > 0).reduce((s, a) => s + a, 0)
  return { irrPercent, totalIn, totalOut, net: totalOut - totalIn }
}
