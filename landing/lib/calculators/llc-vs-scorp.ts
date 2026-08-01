export type LlcVsScorpInput = {
  netProfit: number
  reasonableSalary: number
  selfEmploymentRatePercent: number
  payrollTaxRatePercent: number
  incomeTaxRatePercent: number
}

export type LlcVsScorpResult = {
  llcSelfEmploymentTax: number
  llcIncomeTax: number
  llcTotalTax: number
  scorpPayrollTax: number
  scorpIncomeTax: number
  scorpTotalTax: number
  estimatedSavingsWithScorp: number
  distributionAmount: number
  note: string
}

/**
 * Simplified founder-facing model (not tax advice):
 * LLC: SE tax on net profit + income tax on net profit
 * S-Corp: payroll taxes on salary only; income tax on salary + distributions
 */
export function calculateLlcVsScorp(
  input: LlcVsScorpInput,
): LlcVsScorpResult | null {
  const {
    netProfit,
    reasonableSalary,
    selfEmploymentRatePercent,
    payrollTaxRatePercent,
    incomeTaxRatePercent,
  } = input

  if (!(netProfit > 0)) return null
  if (
    reasonableSalary < 0 ||
    selfEmploymentRatePercent < 0 ||
    payrollTaxRatePercent < 0 ||
    incomeTaxRatePercent < 0
  ) {
    return null
  }

  const salary = Math.min(reasonableSalary, netProfit)
  const distributionAmount = round(Math.max(0, netProfit - salary))

  // SE tax is typically applied to ~92.35% of net earnings; keep simple for founders
  const seBase = netProfit * 0.9235
  const llcSelfEmploymentTax = round(
    seBase * (selfEmploymentRatePercent / 100),
  )
  const llcIncomeTax = round(netProfit * (incomeTaxRatePercent / 100))
  const llcTotalTax = round(llcSelfEmploymentTax + llcIncomeTax)

  const scorpPayrollTax = round(salary * (payrollTaxRatePercent / 100))
  const scorpIncomeTax = round(netProfit * (incomeTaxRatePercent / 100))
  const scorpTotalTax = round(scorpPayrollTax + scorpIncomeTax)

  const estimatedSavingsWithScorp = round(llcTotalTax - scorpTotalTax)

  const note =
    estimatedSavingsWithScorp > 0
      ? "Under this simplified model, an S-Corp election may reduce employment-related taxes — confirm with a CPA."
      : "Under this simplified model, staying an LLC may be simpler or similarly taxed — confirm with a CPA."

  return {
    llcSelfEmploymentTax,
    llcIncomeTax,
    llcTotalTax,
    scorpPayrollTax,
    scorpIncomeTax,
    scorpTotalTax,
    estimatedSavingsWithScorp,
    distributionAmount,
    note,
  }
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
