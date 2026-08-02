export type AliExpressProfitInput = {
  sellingPrice: number
  supplierCost: number
  shippingCost: number
  customsDutyPercent: number
  paymentFeePercent: number
  adCostPerOrder: number
}

export type AliExpressProfitResult = {
  duty: number
  paymentFee: number
  landedCost: number
  totalCost: number
  profit: number
  marginPercent: number
}

export function calculateAliExpressProfit(
  input: AliExpressProfitInput,
): AliExpressProfitResult | null {
  const {
    sellingPrice,
    supplierCost,
    shippingCost,
    customsDutyPercent,
    paymentFeePercent,
    adCostPerOrder,
  } = input
  if (
    ![
      sellingPrice,
      supplierCost,
      shippingCost,
      customsDutyPercent,
      paymentFeePercent,
      adCostPerOrder,
    ].every((n) => Number.isFinite(n) && n >= 0) ||
    sellingPrice <= 0
  ) {
    return null
  }

  const duty = (supplierCost + shippingCost) * (customsDutyPercent / 100)
  const paymentFee = sellingPrice * (paymentFeePercent / 100)
  const landedCost = supplierCost + shippingCost + duty
  const totalCost = landedCost + paymentFee + adCostPerOrder
  const profit = sellingPrice - totalCost
  const marginPercent = (profit / sellingPrice) * 100

  return { duty, paymentFee, landedCost, totalCost, profit, marginPercent }
}
