export type LoanType = "home" | "personal"

export type LoanEmiInput = {
  loanType: LoanType
  principal: number
  annualRatePercent: number
  tenureYears: number
}

export type LoanEmiResult = {
  emi: number
  totalPayment: number
  totalInterest: number
  loanType: LoanType
}

export function calculateLoanEmi(input: LoanEmiInput): LoanEmiResult | null {
  const { loanType, principal, annualRatePercent, tenureYears } = input
  const tenureMonths = Math.round(tenureYears * 12)
  if (
    ![principal, annualRatePercent, tenureYears].every(Number.isFinite) ||
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
    loanType,
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
  }
}
