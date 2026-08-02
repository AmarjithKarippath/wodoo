export type RoasInput = {
  adSpend: number
  revenue: number
  grossMarginPercent: number
}

export type RoasResult = {
  roas: number
  profit: number
  breakEvenRoas: number
  isProfitable: boolean
}

export function calculateRoas(input: RoasInput): RoasResult | null {
  const { adSpend, revenue, grossMarginPercent } = input
  if (
    ![adSpend, revenue, grossMarginPercent].every((n) => Number.isFinite(n) && n >= 0) ||
    adSpend <= 0
  ) {
    return null
  }

  const roas = revenue / adSpend
  const contribution = revenue * (grossMarginPercent / 100)
  const profit = contribution - adSpend
  const margin = grossMarginPercent / 100
  const breakEvenRoas = margin > 0 ? 1 / margin : Infinity

  return {
    roas,
    profit,
    breakEvenRoas,
    isProfitable: profit >= 0,
  }
}
