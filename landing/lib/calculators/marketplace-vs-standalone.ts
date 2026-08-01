export type MarketplaceVsStandaloneInput = {
  marketplaceFeePercent: number
  marketplaceListingFeePerOrder: number
  standaloneMonthlyFee: number
  standaloneFeePercent: number
  averageOrderValue: number
}

export type MarketplaceVsStandaloneResult = {
  marketplaceCostPerOrder: number
  standaloneVariablePerOrder: number
  breakEvenOrders: number
  breakEvenGmv: number
  marketplaceCostAtBreakEven: number
  standaloneCostAtBreakEven: number
  note: string
}

/**
 * Find monthly order volume where fixed standalone plan + % fees
 * becomes cheaper than marketplace % + listing fees.
 *
 * marketplaceCost(n) = n * (AOV * mkt% + listingFee)
 * standaloneCost(n) = monthlyFee + n * (AOV * stand%)
 *
 * Break-even when equal:
 * n * mktPerOrder = monthly + n * standPerOrder
 * n * (mktPerOrder - standPerOrder) = monthly
 * n = monthly / (mktPerOrder - standPerOrder)
 */
export function calculateMarketplaceVsStandalone(
  input: MarketplaceVsStandaloneInput,
): MarketplaceVsStandaloneResult | null {
  const {
    marketplaceFeePercent,
    marketplaceListingFeePerOrder,
    standaloneMonthlyFee,
    standaloneFeePercent,
    averageOrderValue,
  } = input

  if (!(averageOrderValue > 0) || !(standaloneMonthlyFee >= 0)) return null
  if (marketplaceFeePercent < 0 || standaloneFeePercent < 0) return null
  if (marketplaceListingFeePerOrder < 0) return null

  const marketplaceCostPerOrder = round(
    averageOrderValue * (marketplaceFeePercent / 100) +
      marketplaceListingFeePerOrder,
  )
  const standaloneVariablePerOrder = round(
    averageOrderValue * (standaloneFeePercent / 100),
  )

  const savingsPerOrder = marketplaceCostPerOrder - standaloneVariablePerOrder

  if (savingsPerOrder <= 0) {
    return {
      marketplaceCostPerOrder,
      standaloneVariablePerOrder,
      breakEvenOrders: 0,
      breakEvenGmv: 0,
      marketplaceCostAtBreakEven: 0,
      standaloneCostAtBreakEven: standaloneMonthlyFee,
      note:
        "Marketplace per-order fees are already lower than the standalone variable fees — the marketplace stays cheaper at any volume with these inputs.",
    }
  }

  const breakEvenOrders = Math.ceil(standaloneMonthlyFee / savingsPerOrder)
  const breakEvenGmv = round(breakEvenOrders * averageOrderValue)
  const marketplaceCostAtBreakEven = round(
    breakEvenOrders * marketplaceCostPerOrder,
  )
  const standaloneCostAtBreakEven = round(
    standaloneMonthlyFee + breakEvenOrders * standaloneVariablePerOrder,
  )

  return {
    marketplaceCostPerOrder,
    standaloneVariablePerOrder,
    breakEvenOrders,
    breakEvenGmv,
    marketplaceCostAtBreakEven,
    standaloneCostAtBreakEven,
    note: `Above ~${breakEvenOrders} orders/month (about $${breakEvenGmv.toLocaleString()} GMV), the standalone website plan is typically cheaper.`,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
