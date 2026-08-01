export type FreeShippingInput = {
  shippingCost: number
  grossMarginPercent: number
  averageOrderValue: number
  marginBufferPercent: number
}

export type FreeShippingResult = {
  breakEvenThreshold: number
  bufferedThreshold: number
  aovTargetThreshold: number
  recommendedThreshold: number
  roundedThreshold: number
  contributionAtRecommended: number
  shippingAsPercentOfRecommended: number
}

/** Round up to a clean merchandising number (…9 / …5 / …0). */
export function roundMerchandising(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0
  if (value < 20) return Math.ceil(value)
  if (value < 50) return Math.ceil(value / 5) * 5
  if (value < 200) return Math.ceil(value / 5) * 5
  return Math.ceil(value / 10) * 10
}

/**
 * Break-even free-shipping floor:
 *   shippingCost ÷ (grossMargin / 100)
 *
 * Recommended threshold is the higher of:
 *   - break-even with a margin buffer
 *   - ~25% above current AOV (basket-size nudge)
 */
export function calculateFreeShipping(
  input: FreeShippingInput,
): FreeShippingResult | null {
  const {
    shippingCost,
    grossMarginPercent,
    averageOrderValue,
    marginBufferPercent,
  } = input

  if (
    !(shippingCost > 0) ||
    !(grossMarginPercent > 0) ||
    !(grossMarginPercent < 100) ||
    !(averageOrderValue > 0) ||
    marginBufferPercent < 0
  ) {
    return null
  }

  const margin = grossMarginPercent / 100
  const buffer = marginBufferPercent / 100

  const breakEvenThreshold = shippingCost / margin
  const bufferedThreshold = breakEvenThreshold * (1 + buffer)
  const aovTargetThreshold = averageOrderValue * 1.25
  const recommendedThreshold = Math.max(bufferedThreshold, aovTargetThreshold)
  const roundedThreshold = roundMerchandising(recommendedThreshold)

  return {
    breakEvenThreshold,
    bufferedThreshold,
    aovTargetThreshold,
    recommendedThreshold,
    roundedThreshold,
    contributionAtRecommended: roundedThreshold * margin,
    shippingAsPercentOfRecommended:
      (shippingCost / roundedThreshold) * 100,
  }
}

export function formatMoney(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: value >= 100 ? 0 : 2,
    }).format(value)
  } catch {
    return `${currency} ${value.toFixed(2)}`
  }
}
