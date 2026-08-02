export type LtvInput = {
  averageOrderValue: number
  purchaseFrequencyPerYear: number
  customerLifespanYears: number
  grossMarginPercent: number
}

export type LtvResult = {
  ltv: number
  annualContribution: number
  lifetimeOrders: number
  contributionPerOrder: number
}

export function calculateLtv(input: LtvInput): LtvResult | null {
  const {
    averageOrderValue,
    purchaseFrequencyPerYear,
    customerLifespanYears,
    grossMarginPercent,
  } = input
  if (
    ![
      averageOrderValue,
      purchaseFrequencyPerYear,
      customerLifespanYears,
      grossMarginPercent,
    ].every((n) => Number.isFinite(n) && n >= 0) ||
    averageOrderValue <= 0
  ) {
    return null
  }

  const contributionPerOrder = averageOrderValue * (grossMarginPercent / 100)
  const lifetimeOrders = purchaseFrequencyPerYear * customerLifespanYears
  const annualContribution = contributionPerOrder * purchaseFrequencyPerYear
  const ltv = contributionPerOrder * lifetimeOrders

  return {
    ltv,
    annualContribution,
    lifetimeOrders,
    contributionPerOrder,
  }
}
