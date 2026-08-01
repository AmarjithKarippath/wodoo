export type ProfitMarginInput = {
  sellingPrice: number
  cogs: number
  shippingCost: number
  paymentFees: number
  adSpend: number
  otherCosts: number
  unitsSold: number
}

export type ProfitMarginResult = {
  revenue: number
  totalCosts: number
  grossProfit: number
  netProfit: number
  grossMarginPercent: number
  netMarginPercent: number
  profitPerUnit: number
}

export function calculateProfitMargin(
  input: ProfitMarginInput,
): ProfitMarginResult | null {
  const {
    sellingPrice,
    cogs,
    shippingCost,
    paymentFees,
    adSpend,
    otherCosts,
    unitsSold,
  } = input

  if (!(sellingPrice > 0) || !(unitsSold > 0)) return null
  if (
    cogs < 0 ||
    shippingCost < 0 ||
    paymentFees < 0 ||
    adSpend < 0 ||
    otherCosts < 0
  ) {
    return null
  }

  const revenue = round(sellingPrice * unitsSold)
  const totalCosts = round(
    (cogs + shippingCost + paymentFees + otherCosts) * unitsSold + adSpend,
  )
  const grossProfit = round((sellingPrice - cogs) * unitsSold)
  const netProfit = round(revenue - totalCosts)
  const grossMarginPercent = (grossProfit / revenue) * 100
  const netMarginPercent = (netProfit / revenue) * 100
  const profitPerUnit = round(netProfit / unitsSold)

  return {
    revenue,
    totalCosts,
    grossProfit,
    netProfit,
    grossMarginPercent,
    netMarginPercent,
    profitPerUnit,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
