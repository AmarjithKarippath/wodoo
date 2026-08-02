export type DropshippingProfitInput = {
  sellingPrice: number
  productCost: number
  shippingCost: number
  adCostPerOrder: number
  platformFeePercent: number
}

export type DropshippingProfitResult = {
  platformFee: number
  totalCost: number
  profit: number
  marginPercent: number
  breakEvenPrice: number
}

export function calculateDropshippingProfit(
  input: DropshippingProfitInput,
): DropshippingProfitResult | null {
  const {
    sellingPrice,
    productCost,
    shippingCost,
    adCostPerOrder,
    platformFeePercent,
  } = input
  if (
    ![sellingPrice, productCost, shippingCost, adCostPerOrder, platformFeePercent].every(
      (n) => Number.isFinite(n) && n >= 0,
    ) ||
    sellingPrice <= 0
  ) {
    return null
  }

  const platformFee = sellingPrice * (platformFeePercent / 100)
  const totalCost = productCost + shippingCost + adCostPerOrder + platformFee
  const profit = sellingPrice - totalCost
  const marginPercent = (profit / sellingPrice) * 100
  const fixedCosts = productCost + shippingCost + adCostPerOrder
  const feeRate = platformFeePercent / 100
  const breakEvenPrice =
    feeRate >= 1 ? fixedCosts : fixedCosts / Math.max(0.01, 1 - feeRate)

  return {
    platformFee,
    totalCost,
    profit,
    marginPercent,
    breakEvenPrice,
  }
}
