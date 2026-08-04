export type IncomeTaxRegime = "new" | "old"

export type IncomeTaxInput = {
  annualIncome: number
  regime: IncomeTaxRegime
  deductions?: number
}

export type IncomeTaxResult = {
  taxableIncome: number
  tax: number
  cess: number
  totalTax: number
  effectiveRatePercent: number
  takeHome: number
}

/** Simplified India individual tax estimate (illustrative slabs). */
function taxNewRegime(taxable: number): number {
  const slabs = [
    { upTo: 300000, rate: 0 },
    { upTo: 700000, rate: 0.05 },
    { upTo: 1000000, rate: 0.1 },
    { upTo: 1200000, rate: 0.15 },
    { upTo: 1500000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ]
  let tax = 0
  let prev = 0
  for (const slab of slabs) {
    const portion = Math.min(taxable, slab.upTo) - prev
    if (portion > 0) tax += portion * slab.rate
    prev = slab.upTo
    if (taxable <= slab.upTo) break
  }
  // New regime rebate up to 7L taxable
  if (taxable <= 700000) return 0
  return tax
}

function taxOldRegime(taxable: number): number {
  const slabs = [
    { upTo: 250000, rate: 0 },
    { upTo: 500000, rate: 0.05 },
    { upTo: 1000000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ]
  let tax = 0
  let prev = 0
  for (const slab of slabs) {
    const portion = Math.min(taxable, slab.upTo) - prev
    if (portion > 0) tax += portion * slab.rate
    prev = slab.upTo
    if (taxable <= slab.upTo) break
  }
  if (taxable <= 500000) return 0
  return tax
}

export function calculateIncomeTax(
  input: IncomeTaxInput,
): IncomeTaxResult | null {
  const { annualIncome, regime, deductions = 0 } = input
  if (
    ![annualIncome, deductions].every((n) => Number.isFinite(n) && n >= 0) ||
    annualIncome <= 0
  ) {
    return null
  }

  const standardDeduction = regime === "new" ? 75000 : 50000
  const taxableIncome = Math.max(
    0,
    annualIncome - standardDeduction - (regime === "old" ? deductions : 0),
  )
  const tax =
    regime === "new" ? taxNewRegime(taxableIncome) : taxOldRegime(taxableIncome)
  const cess = tax * 0.04
  const totalTax = tax + cess

  return {
    taxableIncome,
    tax,
    cess,
    totalTax,
    effectiveRatePercent: (totalTax / annualIncome) * 100,
    takeHome: annualIncome - totalTax,
  }
}
