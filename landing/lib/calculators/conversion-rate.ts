export type ConversionRateInput = {
  visitors: number
  orders: number
  salesGoal: number
}

export type ConversionRateResult = {
  conversionRatePercent: number
  visitorsNeededForGoal: number
  ordersFromCurrentTraffic: number
}

export function calculateConversionRate(
  input: ConversionRateInput,
): ConversionRateResult | null {
  const { visitors, orders, salesGoal } = input
  if (
    ![visitors, orders, salesGoal].every((n) => Number.isFinite(n) && n >= 0) ||
    visitors <= 0
  ) {
    return null
  }

  const conversionRatePercent = (orders / visitors) * 100
  const rate = orders / visitors
  const visitorsNeededForGoal = rate > 0 ? salesGoal / rate : Infinity

  return {
    conversionRatePercent,
    visitorsNeededForGoal,
    ordersFromCurrentTraffic: orders,
  }
}
