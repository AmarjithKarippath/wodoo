export type EmiInput = {
  principal: number
  annualRatePercent: number
  tenureMonths: number
}

export type EmiResult = {
  emi: number
  totalPayment: number
  totalInterest: number
}

export function calculateEmi(input: EmiInput): EmiResult | null {
  const { principal, annualRatePercent, tenureMonths } = input
  if (
    ![principal, annualRatePercent, tenureMonths].every(Number.isFinite) ||
    principal <= 0 ||
    annualRatePercent < 0 ||
    tenureMonths < 1
  ) {
    return null
  }

  const r = annualRatePercent / 12 / 100
  let emi: number
  if (r === 0) {
    emi = principal / tenureMonths
  } else {
    const pow = Math.pow(1 + r, tenureMonths)
    emi = (principal * r * pow) / (pow - 1)
  }

  const totalPayment = emi * tenureMonths
  return {
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
  }
}
