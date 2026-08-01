export type AffiliateVsOwnedInput = {
  sellingPrice: number
  productCost: number
  affiliateCommissionPercent: number
  ownedStoreFeePercent: number
  ownedFulfillmentCost: number
  affiliateOrders: number
  ownedOrders: number
}

export type ChannelResult = {
  revenue: number
  costs: number
  profit: number
  profitPerOrder: number
  marginPercent: number
}

export type AffiliateVsOwnedResult = {
  affiliate: ChannelResult
  owned: ChannelResult
  betterChannel: "affiliate" | "owned" | "tie"
  profitDifference: number
}

export function calculateAffiliateVsOwned(
  input: AffiliateVsOwnedInput,
): AffiliateVsOwnedResult | null {
  const {
    sellingPrice,
    productCost,
    affiliateCommissionPercent,
    ownedStoreFeePercent,
    ownedFulfillmentCost,
    affiliateOrders,
    ownedOrders,
  } = input

  if (!(sellingPrice > 0)) return null
  if (
    productCost < 0 ||
    affiliateCommissionPercent < 0 ||
    ownedStoreFeePercent < 0 ||
    ownedFulfillmentCost < 0 ||
    affiliateOrders < 0 ||
    ownedOrders < 0
  ) {
    return null
  }

  const affiliateCommission = round(
    sellingPrice * (affiliateCommissionPercent / 100),
  )
  // Affiliate path: you earn commission only (as affiliate) OR pay commission (as brand).
  // Tool models brand view: selling via affiliates vs own store.
  const affiliateCostPerOrder = round(productCost + affiliateCommission)
  const affiliateProfitPerOrder = round(sellingPrice - affiliateCostPerOrder)
  const affiliateRevenue = round(sellingPrice * affiliateOrders)
  const affiliateCosts = round(affiliateCostPerOrder * affiliateOrders)
  const affiliateProfit = round(affiliateProfitPerOrder * affiliateOrders)

  const ownedFee = round(sellingPrice * (ownedStoreFeePercent / 100))
  const ownedCostPerOrder = round(productCost + ownedFee + ownedFulfillmentCost)
  const ownedProfitPerOrder = round(sellingPrice - ownedCostPerOrder)
  const ownedRevenue = round(sellingPrice * ownedOrders)
  const ownedCosts = round(ownedCostPerOrder * ownedOrders)
  const ownedProfit = round(ownedProfitPerOrder * ownedOrders)

  const affiliate: ChannelResult = {
    revenue: affiliateRevenue,
    costs: affiliateCosts,
    profit: affiliateProfit,
    profitPerOrder: affiliateProfitPerOrder,
    marginPercent:
      sellingPrice > 0
        ? round((affiliateProfitPerOrder / sellingPrice) * 100)
        : 0,
  }

  const owned: ChannelResult = {
    revenue: ownedRevenue,
    costs: ownedCosts,
    profit: ownedProfit,
    profitPerOrder: ownedProfitPerOrder,
    marginPercent:
      sellingPrice > 0
        ? round((ownedProfitPerOrder / sellingPrice) * 100)
        : 0,
  }

  const profitDifference = round(ownedProfit - affiliateProfit)
  let betterChannel: AffiliateVsOwnedResult["betterChannel"] = "tie"
  if (profitDifference > 0.01) betterChannel = "owned"
  else if (profitDifference < -0.01) betterChannel = "affiliate"

  return { affiliate, owned, betterChannel, profitDifference }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
