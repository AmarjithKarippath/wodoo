export type OffsiteAdsMarginInput = {
  sellingPrice: number
  productCost: number
  shippingCost: number
  adSpendPerOrder: number
  referralPenaltyPercent: number
  paymentFeePercent: number
}

export type OffsiteAdsMarginResult = {
  grossBeforePenalty: number
  referralPenalty: number
  paymentFee: number
  netMargin: number
  netMarginPercent: number
  marginWithoutPenalty: number
  marginWithoutPenaltyPercent: number
  penaltyImpact: number
}

export function calculateOffsiteAdsMargin(
  input: OffsiteAdsMarginInput,
): OffsiteAdsMarginResult | null {
  const {
    sellingPrice,
    productCost,
    shippingCost,
    adSpendPerOrder,
    referralPenaltyPercent,
    paymentFeePercent,
  } = input

  if (!(sellingPrice > 0)) return null
  if (
    productCost < 0 ||
    shippingCost < 0 ||
    adSpendPerOrder < 0 ||
    referralPenaltyPercent < 0 ||
    paymentFeePercent < 0
  ) {
    return null
  }

  const referralPenalty = round(sellingPrice * (referralPenaltyPercent / 100))
  const paymentFee = round(sellingPrice * (paymentFeePercent / 100))
  const baseCosts = productCost + shippingCost + adSpendPerOrder + paymentFee

  const marginWithoutPenalty = round(sellingPrice - baseCosts)
  const netMargin = round(sellingPrice - baseCosts - referralPenalty)
  const marginWithoutPenaltyPercent = round(
    (marginWithoutPenalty / sellingPrice) * 100,
  )
  const netMarginPercent = round((netMargin / sellingPrice) * 100)
  const grossBeforePenalty = round(sellingPrice - productCost - shippingCost)
  const penaltyImpact = round(marginWithoutPenalty - netMargin)

  return {
    grossBeforePenalty,
    referralPenalty,
    paymentFee,
    netMargin,
    netMarginPercent,
    marginWithoutPenalty,
    marginWithoutPenaltyPercent,
    penaltyImpact,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
