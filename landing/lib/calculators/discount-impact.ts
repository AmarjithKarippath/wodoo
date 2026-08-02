export type DiscountImpactInput = {
  price: number
  cost: number
  discountPercent: number
}

export type DiscountImpactResult = {
  discountedPrice: number
  originalProfit: number
  discountedProfit: number
  originalMarginPercent: number
  discountedMarginPercent: number
  unitsNeededForSameProfit: number
  extraUnitsPercent: number
}

export function calculateDiscountImpact(
  input: DiscountImpactInput,
): DiscountImpactResult | null {
  const { price, cost, discountPercent } = input
  if (
    ![price, cost, discountPercent].every((n) => Number.isFinite(n) && n >= 0) ||
    price <= 0 ||
    cost >= price ||
    discountPercent >= 100
  ) {
    return null
  }

  const discountedPrice = price * (1 - discountPercent / 100)
  const originalProfit = price - cost
  const discountedProfit = discountedPrice - cost
  if (discountedProfit <= 0) {
    return {
      discountedPrice,
      originalProfit,
      discountedProfit,
      originalMarginPercent: (originalProfit / price) * 100,
      discountedMarginPercent: (discountedProfit / discountedPrice) * 100,
      unitsNeededForSameProfit: Infinity,
      extraUnitsPercent: Infinity,
    }
  }

  const unitsNeededForSameProfit = originalProfit / discountedProfit
  const extraUnitsPercent = (unitsNeededForSameProfit - 1) * 100

  return {
    discountedPrice,
    originalProfit,
    discountedProfit,
    originalMarginPercent: (originalProfit / price) * 100,
    discountedMarginPercent: (discountedProfit / discountedPrice) * 100,
    unitsNeededForSameProfit,
    extraUnitsPercent,
  }
}
