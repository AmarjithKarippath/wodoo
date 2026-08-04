export type CashFlow = {
  amount: number
  /** ISO date YYYY-MM-DD */
  date: string
}

export type XirrResult = {
  xirrPercent: number
  totalInvested: number
  totalReturned: number
  netProfit: number
}

function parseDate(iso: string): number | null {
  const t = Date.parse(iso)
  return Number.isFinite(t) ? t : null
}

/** Newton–Raphson XIRR (annualized). Amounts: negative = invest, positive = redeem. */
export function calculateXirr(flows: CashFlow[]): XirrResult | null {
  if (!flows.length || flows.length < 2) return null
  const parsed = flows
    .map((f) => {
      const t = parseDate(f.date)
      if (t == null || !Number.isFinite(f.amount)) return null
      return { amount: f.amount, t }
    })
    .filter((x): x is { amount: number; t: number } => x != null)
  if (parsed.length < 2) return null

  const t0 = Math.min(...parsed.map((p) => p.t))
  const years = parsed.map((p) => (p.t - t0) / (365.25 * 24 * 3600 * 1000))
  const amounts = parsed.map((p) => p.amount)

  const hasNeg = amounts.some((a) => a < 0)
  const hasPos = amounts.some((a) => a > 0)
  if (!hasNeg || !hasPos) return null

  const npv = (rate: number) =>
    amounts.reduce((s, a, i) => s + a / Math.pow(1 + rate, years[i]), 0)
  const dNpv = (rate: number) =>
    amounts.reduce(
      (s, a, i) =>
        s - (years[i] * a) / Math.pow(1 + rate, years[i] + 1),
      0,
    )

  let rate = 0.1
  for (let i = 0; i < 80; i++) {
    const f = npv(rate)
    const df = dNpv(rate)
    if (Math.abs(df) < 1e-12) break
    const next = rate - f / df
    if (!Number.isFinite(next) || next <= -0.9999) {
      rate = -0.5
      continue
    }
    if (Math.abs(next - rate) < 1e-10) {
      rate = next
      break
    }
    rate = next
  }

  if (!Number.isFinite(rate) || rate <= -1) return null

  const invested = -amounts.filter((a) => a < 0).reduce((s, a) => s + a, 0)
  const returned = amounts.filter((a) => a > 0).reduce((s, a) => s + a, 0)
  return {
    xirrPercent: rate * 100,
    totalInvested: invested,
    totalReturned: returned,
    netProfit: returned - invested,
  }
}
