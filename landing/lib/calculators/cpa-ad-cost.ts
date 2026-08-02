export type CpaAdCostInput = {
  adSpend: number
  conversions: number
  averageOrderValue: number
  grossMarginPercent: number
}

export type CpaAdCostResult = {
  cpa: number
  maxProfitableCpa: number
  contributionPerOrder: number
  isProfitable: boolean
  headroom: number
}

export function calculateCpaAdCost(input: CpaAdCostInput): CpaAdCostResult | null {
  const { adSpend, conversions, averageOrderValue, grossMarginPercent } = input
  if (
    ![adSpend, conversions, averageOrderValue, grossMarginPercent].every(
      (n) => Number.isFinite(n) && n >= 0,
    ) ||
    conversions <= 0 ||
    adSpend < 0
  ) {
    return null
  }

  const cpa = adSpend / conversions
  const contributionPerOrder = averageOrderValue * (grossMarginPercent / 100)
  const maxProfitableCpa = contributionPerOrder
  const headroom = maxProfitableCpa - cpa

  return {
    cpa,
    maxProfitableCpa,
    contributionPerOrder,
    isProfitable: cpa <= maxProfitableCpa,
    headroom,
  }
}
