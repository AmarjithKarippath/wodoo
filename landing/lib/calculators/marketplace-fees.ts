export type Marketplace = "ebay" | "etsy"

export type MarketplaceFeeInput = {
  marketplace: Marketplace
  salePrice: number
  shippingCharged: number
  /** Final value / transaction fee % */
  feePercent: number
  /** Fixed per-order fee (e.g. Etsy transaction/processing extras) */
  fixedFee: number
  paymentProcessingPercent: number
  paymentProcessingFixed: number
  productCost: number
}

export type MarketplaceFeeResult = {
  feeBase: number
  marketplaceFee: number
  paymentFee: number
  totalFees: number
  netPayout: number
  profit: number
  feePercentOfSale: number
}

export function calculateMarketplaceFees(
  input: MarketplaceFeeInput,
): MarketplaceFeeResult | null {
  const {
    salePrice,
    shippingCharged,
    feePercent,
    fixedFee,
    paymentProcessingPercent,
    paymentProcessingFixed,
    productCost,
  } = input

  if (!(salePrice > 0) || shippingCharged < 0 || productCost < 0) return null
  if (feePercent < 0 || feePercent > 100) return null
  if (
    fixedFee < 0 ||
    paymentProcessingPercent < 0 ||
    paymentProcessingFixed < 0
  ) {
    return null
  }

  // Many marketplaces apply final value on item + shipping
  const feeBase = round(salePrice + shippingCharged)
  const marketplaceFee = round(feeBase * (feePercent / 100) + fixedFee)
  const paymentFee = round(
    feeBase * (paymentProcessingPercent / 100) + paymentProcessingFixed,
  )
  const totalFees = round(marketplaceFee + paymentFee)
  const netPayout = round(feeBase - totalFees)
  const profit = round(netPayout - productCost)
  const feePercentOfSale = (totalFees / feeBase) * 100

  return {
    feeBase,
    marketplaceFee,
    paymentFee,
    totalFees,
    netPayout,
    profit,
    feePercentOfSale,
  }
}

export const MARKETPLACE_DEFAULTS = {
  ebay: {
    feePercent: 13.25,
    fixedFee: 0.3,
    paymentProcessingPercent: 0,
    paymentProcessingFixed: 0,
  },
  etsy: {
    feePercent: 6.5,
    fixedFee: 0.2,
    paymentProcessingPercent: 3,
    paymentProcessingFixed: 0.25,
  },
} as const

function round(n: number) {
  return Math.round(n * 100) / 100
}
