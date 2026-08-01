export type DigitalProductMarginInput = {
  price: number
  platformFeePercent: number
  paymentFeePercent: number
  refundRatePercent: number
  creationCost: number
  expectedLifetimeSales: number
  marketingCostPerSale: number
}

export type DigitalProductMarginResult = {
  platformFee: number
  paymentFee: number
  refundReserve: number
  amortizedCreationCost: number
  netPerSale: number
  marginPercent: number
  breakEvenSales: number
  lifetimeProfit: number
}

export function calculateDigitalProductMargin(
  input: DigitalProductMarginInput,
): DigitalProductMarginResult | null {
  const {
    price,
    platformFeePercent,
    paymentFeePercent,
    refundRatePercent,
    creationCost,
    expectedLifetimeSales,
    marketingCostPerSale,
  } = input

  if (!(price > 0) || !(expectedLifetimeSales > 0)) return null
  if (
    platformFeePercent < 0 ||
    paymentFeePercent < 0 ||
    refundRatePercent < 0 ||
    creationCost < 0 ||
    marketingCostPerSale < 0
  ) {
    return null
  }

  const platformFee = round(price * (platformFeePercent / 100))
  const paymentFee = round(price * (paymentFeePercent / 100))
  const refundReserve = round(price * (refundRatePercent / 100))
  const amortizedCreationCost = round(creationCost / expectedLifetimeSales)
  const netPerSale = round(
    price -
      platformFee -
      paymentFee -
      refundReserve -
      amortizedCreationCost -
      marketingCostPerSale,
  )
  const marginPercent = round((netPerSale / price) * 100)
  const fixedRecoverable = creationCost
  const contributionBeforeCreation = round(
    price -
      platformFee -
      paymentFee -
      refundReserve -
      marketingCostPerSale,
  )
  const breakEvenSales =
    contributionBeforeCreation > 0
      ? Math.ceil(fixedRecoverable / contributionBeforeCreation)
      : Infinity
  const lifetimeProfit = round(netPerSale * expectedLifetimeSales)

  return {
    platformFee,
    paymentFee,
    refundReserve,
    amortizedCreationCost,
    netPerSale,
    marginPercent,
    breakEvenSales: Number.isFinite(breakEvenSales) ? breakEvenSales : 0,
    lifetimeProfit,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
