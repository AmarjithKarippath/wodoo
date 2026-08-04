export type UsMortgageInput = {
  homePrice: number
  downPayment: number
  annualRatePercent: number
  termYears: number
  /** Annual property tax */
  propertyTaxAnnual?: number
  /** Annual homeowners insurance */
  insuranceAnnual?: number
  /** Monthly HOA */
  hoaMonthly?: number
  /** Monthly PMI (if down payment < 20%) */
  pmiMonthly?: number
}

export type UsMortgageResult = {
  loanAmount: number
  principalAndInterest: number
  monthlyPropertyTax: number
  monthlyInsurance: number
  monthlyHoa: number
  monthlyPmi: number
  totalMonthly: number
  totalInterest: number
  totalPayment: number
  termMonths: number
}

export function calculateUsMortgage(
  input: UsMortgageInput,
): UsMortgageResult | null {
  const {
    homePrice,
    downPayment,
    annualRatePercent,
    termYears,
    propertyTaxAnnual = 0,
    insuranceAnnual = 0,
    hoaMonthly = 0,
    pmiMonthly = 0,
  } = input
  const termMonths = Math.round(termYears * 12)
  const loanAmount = homePrice - downPayment

  if (
    ![homePrice, downPayment, annualRatePercent, termYears].every(
      Number.isFinite,
    ) ||
    homePrice <= 0 ||
    downPayment < 0 ||
    loanAmount <= 0 ||
    annualRatePercent < 0 ||
    termMonths < 1
  ) {
    return null
  }

  const r = annualRatePercent / 100 / 12
  let principalAndInterest: number
  if (r === 0) principalAndInterest = loanAmount / termMonths
  else {
    const pow = Math.pow(1 + r, termMonths)
    principalAndInterest = (loanAmount * r * pow) / (pow - 1)
  }

  const monthlyPropertyTax = Math.max(0, propertyTaxAnnual) / 12
  const monthlyInsurance = Math.max(0, insuranceAnnual) / 12
  const monthlyHoa = Math.max(0, hoaMonthly)
  const monthlyPmi = Math.max(0, pmiMonthly)
  const totalMonthly =
    principalAndInterest +
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyHoa +
    monthlyPmi
  const totalPayment = principalAndInterest * termMonths
  const totalInterest = totalPayment - loanAmount

  return {
    loanAmount,
    principalAndInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHoa,
    monthlyPmi,
    totalMonthly,
    totalInterest,
    totalPayment,
    termMonths,
  }
}
