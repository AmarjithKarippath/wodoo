export type FbaInput = {
  sellingPrice: number
  productCost: number
  referralFeePercent: number
  fulfillmentFee: number
  monthlyStorageFee: number
  otherFees: number
}

export type FbaResult = {
  referralFee: number
  totalFees: number
  netRevenue: number
  grossProfit: number
  marginPercent: number
  feePercentOfPrice: number
}

export function calculateFba(input: FbaInput): FbaResult | null {
  const {
    sellingPrice,
    productCost,
    referralFeePercent,
    fulfillmentFee,
    monthlyStorageFee,
    otherFees,
  } = input

  if (!(sellingPrice > 0) || productCost < 0) return null
  if (referralFeePercent < 0 || referralFeePercent > 100) return null
  if (fulfillmentFee < 0 || monthlyStorageFee < 0 || otherFees < 0) return null

  const referralFee = round(sellingPrice * (referralFeePercent / 100))
  const totalFees = round(
    referralFee + fulfillmentFee + monthlyStorageFee + otherFees,
  )
  const netRevenue = round(sellingPrice - totalFees)
  const grossProfit = round(netRevenue - productCost)
  const marginPercent = (grossProfit / sellingPrice) * 100
  const feePercentOfPrice = (totalFees / sellingPrice) * 100

  return {
    referralFee,
    totalFees,
    netRevenue,
    grossProfit,
    marginPercent,
    feePercentOfPrice,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
