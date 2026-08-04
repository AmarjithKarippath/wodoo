export type GstMode = "exclusive" | "inclusive"

export type GstInput = {
  amount: number
  gstRatePercent: number
  mode: GstMode
}

export type GstResult = {
  baseAmount: number
  gstAmount: number
  totalAmount: number
  cgst: number
  sgst: number
}

export function calculateGst(input: GstInput): GstResult | null {
  const { amount, gstRatePercent, mode } = input
  if (
    ![amount, gstRatePercent].every((n) => Number.isFinite(n) && n >= 0) ||
    amount <= 0
  ) {
    return null
  }

  let baseAmount: number
  let gstAmount: number
  let totalAmount: number

  if (mode === "exclusive") {
    baseAmount = amount
    gstAmount = (amount * gstRatePercent) / 100
    totalAmount = baseAmount + gstAmount
  } else {
    totalAmount = amount
    baseAmount = amount / (1 + gstRatePercent / 100)
    gstAmount = totalAmount - baseAmount
  }

  return {
    baseAmount,
    gstAmount,
    totalAmount,
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
  }
}
