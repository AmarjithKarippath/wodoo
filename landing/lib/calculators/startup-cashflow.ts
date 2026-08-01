export type StartupCashflowInput = {
  startingCash: number
  monthlyRevenue: number
  monthlyGrowthPercent: number
  monthlyCogs: number
  monthlyOperatingExpenses: number
  months: number
}

export type CashflowMonth = {
  month: number
  revenue: number
  costs: number
  net: number
  endingCash: number
}

export type StartupCashflowResult = {
  months: CashflowMonth[]
  lowestCash: number
  endingCash: number
  totalRevenue: number
  totalCosts: number
  profitableMonth: number | null
}

export function calculateStartupCashflow(
  input: StartupCashflowInput,
): StartupCashflowResult | null {
  const {
    startingCash,
    monthlyRevenue,
    monthlyGrowthPercent,
    monthlyCogs,
    monthlyOperatingExpenses,
    months,
  } = input

  if (!(months >= 1) || months > 36) return null
  if (
    startingCash < 0 ||
    monthlyRevenue < 0 ||
    monthlyGrowthPercent < 0 ||
    monthlyCogs < 0 ||
    monthlyOperatingExpenses < 0
  ) {
    return null
  }

  const rows: CashflowMonth[] = []
  let cash = startingCash
  let revenue = monthlyRevenue
  let lowestCash = startingCash
  let totalRevenue = 0
  let totalCosts = 0
  let profitableMonth: number | null = null

  for (let m = 1; m <= months; m++) {
    const costs = monthlyCogs + monthlyOperatingExpenses
    const net = round(revenue - costs)
    cash = round(cash + net)
    totalRevenue = round(totalRevenue + revenue)
    totalCosts = round(totalCosts + costs)
    if (cash < lowestCash) lowestCash = cash
    if (profitableMonth == null && net > 0) profitableMonth = m

    rows.push({
      month: m,
      revenue: round(revenue),
      costs: round(costs),
      net,
      endingCash: cash,
    })

    revenue = round(revenue * (1 + monthlyGrowthPercent / 100))
  }

  return {
    months: rows,
    lowestCash,
    endingCash: cash,
    totalRevenue,
    totalCosts,
    profitableMonth,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
