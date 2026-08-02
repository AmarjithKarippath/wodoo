export type FacebookAdsBudgetInput = {
  dailyBudget: number
  days: number
  cpc: number
  conversionRatePercent: number
  averageOrderValue: number
}

export type FacebookAdsBudgetResult = {
  totalSpend: number
  clicks: number
  orders: number
  revenue: number
  roas: number
  cpa: number
  profitBeforeCogs: number
}

export function calculateFacebookAdsBudget(
  input: FacebookAdsBudgetInput,
): FacebookAdsBudgetResult | null {
  const { dailyBudget, days, cpc, conversionRatePercent, averageOrderValue } = input
  if (
    ![dailyBudget, days, cpc, conversionRatePercent, averageOrderValue].every(
      (n) => Number.isFinite(n) && n >= 0,
    ) ||
    dailyBudget <= 0 ||
    days <= 0 ||
    cpc <= 0
  ) {
    return null
  }

  const totalSpend = dailyBudget * days
  const clicks = totalSpend / cpc
  const orders = clicks * (conversionRatePercent / 100)
  const revenue = orders * averageOrderValue
  const roas = totalSpend > 0 ? revenue / totalSpend : 0
  const cpa = orders > 0 ? totalSpend / orders : 0

  return {
    totalSpend,
    clicks,
    orders,
    revenue,
    roas,
    cpa,
    profitBeforeCogs: revenue - totalSpend,
  }
}
