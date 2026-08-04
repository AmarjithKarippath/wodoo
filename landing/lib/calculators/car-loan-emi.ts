export type CarLoanEmiInput = {
  carPrice: number
  downPayment: number
  annualRatePercent: number
  tenureYears: number
}

export type CarLoanEmiResult = {
  principal: number
  emi: number
  totalPayment: number
  totalInterest: number
  tenureMonths: number
}

export function calculateCarLoanEmi(
  input: CarLoanEmiInput,
): CarLoanEmiResult | null {
  const { carPrice, downPayment, annualRatePercent, tenureYears } = input
  const tenureMonths = Math.round(tenureYears * 12)
  const principal = carPrice - downPayment
  if (
    ![carPrice, downPayment, annualRatePercent, tenureYears].every(
      Number.isFinite,
    ) ||
    carPrice <= 0 ||
    downPayment < 0 ||
    principal <= 0 ||
    annualRatePercent < 0 ||
    tenureMonths < 1
  ) {
    return null
  }

  const r = annualRatePercent / 12 / 100
  let emi: number
  if (r === 0) emi = principal / tenureMonths
  else {
    const pow = Math.pow(1 + r, tenureMonths)
    emi = (principal * r * pow) / (pow - 1)
  }
  const totalPayment = emi * tenureMonths
  return {
    principal,
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
    tenureMonths,
  }
}
