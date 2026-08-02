export type ShopifyFeeInput = {
  orderValue: number
  monthlyOrders: number
  planFee: number
  cardRatePercent: number
  cardFixedFee: number
}

export type ShopifyFeeResult = {
  paymentFeePerOrder: number
  monthlyPaymentFees: number
  monthlyPlanFee: number
  totalMonthlyFees: number
  feePercentOfSales: number
  netPerOrder: number
}

export function calculateShopifyFees(input: ShopifyFeeInput): ShopifyFeeResult | null {
  const { orderValue, monthlyOrders, planFee, cardRatePercent, cardFixedFee } = input
  if (
    ![orderValue, monthlyOrders, planFee, cardRatePercent, cardFixedFee].every(
      (n) => Number.isFinite(n) && n >= 0,
    ) ||
    orderValue <= 0
  ) {
    return null
  }

  const paymentFeePerOrder = orderValue * (cardRatePercent / 100) + cardFixedFee
  const monthlyPaymentFees = paymentFeePerOrder * monthlyOrders
  const monthlySales = orderValue * monthlyOrders
  const totalMonthlyFees = monthlyPaymentFees + planFee
  const feePercentOfSales =
    monthlySales > 0 ? (totalMonthlyFees / monthlySales) * 100 : 0
  const netPerOrder = orderValue - paymentFeePerOrder - planFee / Math.max(1, monthlyOrders)

  return {
    paymentFeePerOrder,
    monthlyPaymentFees,
    monthlyPlanFee: planFee,
    totalMonthlyFees,
    feePercentOfSales,
    netPerOrder,
  }
}
