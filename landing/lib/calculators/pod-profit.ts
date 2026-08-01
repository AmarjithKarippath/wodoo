export type PodProfitInput = {
  sellingPrice: number
  baseProductCost: number
  printCost: number
  shippingCharged: number
  shippingCost: number
  paymentFeePercent: number
  adCostPerOrder: number
  monthlyUnits: number
}

export type PodProfitResult = {
  revenuePerOrder: number
  totalCostPerOrder: number
  profitPerOrder: number
  marginPercent: number
  monthlyProfit: number
  monthlyRevenue: number
  breakEvenAdCost: number
}

export function calculatePodProfit(
  input: PodProfitInput,
): PodProfitResult | null {
  const {
    sellingPrice,
    baseProductCost,
    printCost,
    shippingCharged,
    shippingCost,
    paymentFeePercent,
    adCostPerOrder,
    monthlyUnits,
  } = input

  if (!(sellingPrice > 0) || monthlyUnits < 0) return null
  if (
    baseProductCost < 0 ||
    printCost < 0 ||
    shippingCharged < 0 ||
    shippingCost < 0 ||
    adCostPerOrder < 0 ||
    paymentFeePercent < 0
  ) {
    return null
  }

  const revenuePerOrder = round(sellingPrice + shippingCharged)
  const paymentFee = round(revenuePerOrder * (paymentFeePercent / 100))
  const totalCostPerOrder = round(
    baseProductCost + printCost + shippingCost + paymentFee + adCostPerOrder,
  )
  const profitPerOrder = round(revenuePerOrder - totalCostPerOrder)
  const marginPercent =
    revenuePerOrder > 0
      ? round((profitPerOrder / revenuePerOrder) * 100)
      : 0
  const monthlyProfit = round(profitPerOrder * monthlyUnits)
  const monthlyRevenue = round(revenuePerOrder * monthlyUnits)
  const breakEvenAdCost = round(
    Math.max(
      0,
      revenuePerOrder -
        (baseProductCost + printCost + shippingCost + paymentFee),
    ),
  )

  return {
    revenuePerOrder,
    totalCostPerOrder,
    profitPerOrder,
    marginPercent,
    monthlyProfit,
    monthlyRevenue,
    breakEvenAdCost,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
