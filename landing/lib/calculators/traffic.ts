export type TrafficInput = {
  monthlyProfitGoal: number
  averageOrderValue: number
  grossMarginPercent: number
  conversionRatePercent: number
}

export type TrafficResult = {
  profitPerOrder: number
  ordersNeeded: number
  visitorsNeeded: number
  dailyVisitorsNeeded: number
}

export function calculateTraffic(input: TrafficInput): TrafficResult | null {
  const {
    monthlyProfitGoal,
    averageOrderValue,
    grossMarginPercent,
    conversionRatePercent,
  } = input
  if (
    ![
      monthlyProfitGoal,
      averageOrderValue,
      grossMarginPercent,
      conversionRatePercent,
    ].every((n) => Number.isFinite(n) && n >= 0) ||
    averageOrderValue <= 0 ||
    conversionRatePercent <= 0 ||
    grossMarginPercent <= 0
  ) {
    return null
  }

  const profitPerOrder = averageOrderValue * (grossMarginPercent / 100)
  if (profitPerOrder <= 0) return null
  const ordersNeeded = monthlyProfitGoal / profitPerOrder
  const visitorsNeeded = ordersNeeded / (conversionRatePercent / 100)
  const dailyVisitorsNeeded = visitorsNeeded / 30

  return {
    profitPerOrder,
    ordersNeeded,
    visitorsNeeded,
    dailyVisitorsNeeded,
  }
}
