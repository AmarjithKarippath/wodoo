/**
 * Illustrative UK take-home for 2025/26 England, Wales & NI.
 * Scottish rates differ — select Scotland for approximate Scottish bands.
 * Not official tax advice.
 */

export type UkTaxRegion = "england" | "scotland"

export type UkSalaryInput = {
  grossAnnual: number
  region: UkTaxRegion
  /** Student loan plan: none | plan1 | plan2 | plan4 | plan5 | postgraduate */
  studentLoan?: "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgraduate"
  pensionPercent?: number
}

export type UkSalaryResult = {
  grossAnnual: number
  grossMonthly: number
  incomeTax: number
  nationalInsurance: number
  studentLoan: number
  pension: number
  netAnnual: number
  netMonthly: number
  effectiveTaxRate: number
}

const PERSONAL_ALLOWANCE = 12570
const PA_TAPER_START = 100000

function personalAllowance(gross: number): number {
  if (gross <= PA_TAPER_START) return PERSONAL_ALLOWANCE
  const reduction = Math.floor((gross - PA_TAPER_START) / 2)
  return Math.max(0, PERSONAL_ALLOWANCE - reduction)
}

function englandIncomeTax(taxable: number): number {
  // Bands on taxable income after PA (2025/26)
  const basic = 37700 // to £50,270
  const higher = 125140 - PERSONAL_ALLOWANCE // up to additional threshold
  let tax = 0
  let remaining = taxable
  const b = Math.min(remaining, basic)
  tax += b * 0.2
  remaining -= b
  if (remaining <= 0) return tax
  const h = Math.min(remaining, higher - basic)
  tax += h * 0.4
  remaining -= h
  if (remaining > 0) tax += remaining * 0.45
  return tax
}

function scotlandIncomeTax(taxable: number): number {
  // Approximate Scottish bands 2025/26 (taxable after PA)
  const bands: [number, number][] = [
    [2827, 0.19], // starter to ~£15,397
    [14961, 0.2], // basic
    [12645, 0.21], // intermediate
    [43662, 0.42], // higher
    [50000, 0.45], // advanced
  ]
  let tax = 0
  let remaining = taxable
  for (const [width, rate] of bands) {
    if (remaining <= 0) break
    const slice = Math.min(remaining, width)
    tax += slice * rate
    remaining -= slice
  }
  if (remaining > 0) tax += remaining * 0.48 // top
  return tax
}

function employeeNI(gross: number): number {
  const pt = 12570
  const uel = 50270
  if (gross <= pt) return 0
  const mid = Math.min(gross, uel) - pt
  const upper = Math.max(0, gross - uel)
  return mid * 0.08 + upper * 0.02
}

const STUDENT_THRESHOLDS: Record<
  Exclude<NonNullable<UkSalaryInput["studentLoan"]>, "none">,
  { threshold: number; rate: number }
> = {
  plan1: { threshold: 26065, rate: 0.09 },
  plan2: { threshold: 28470, rate: 0.09 },
  plan4: { threshold: 32745, rate: 0.09 },
  plan5: { threshold: 25000, rate: 0.09 },
  postgraduate: { threshold: 21000, rate: 0.06 },
}

export function calculateUkSalary(input: UkSalaryInput): UkSalaryResult | null {
  const {
    grossAnnual,
    region,
    studentLoan = "none",
    pensionPercent = 0,
  } = input
  if (!Number.isFinite(grossAnnual) || grossAnnual < 0) return null
  if (
    !Number.isFinite(pensionPercent) ||
    pensionPercent < 0 ||
    pensionPercent > 100
  ) {
    return null
  }

  const pension = (grossAnnual * pensionPercent) / 100
  const grossForTax = Math.max(0, grossAnnual - pension)
  const pa = personalAllowance(grossForTax)
  const taxable = Math.max(0, grossForTax - pa)
  const incomeTax =
    region === "scotland"
      ? scotlandIncomeTax(taxable)
      : englandIncomeTax(taxable)
  const nationalInsurance = employeeNI(grossAnnual)

  let student = 0
  if (studentLoan !== "none") {
    const { threshold, rate } = STUDENT_THRESHOLDS[studentLoan]
    student = Math.max(0, grossAnnual - threshold) * rate
  }

  const netAnnual =
    grossAnnual - incomeTax - nationalInsurance - student - pension
  const effectiveTaxRate =
    grossAnnual > 0
      ? ((incomeTax + nationalInsurance + student) / grossAnnual) * 100
      : 0

  return {
    grossAnnual,
    grossMonthly: grossAnnual / 12,
    incomeTax,
    nationalInsurance,
    studentLoan: student,
    pension,
    netAnnual,
    netMonthly: netAnnual / 12,
    effectiveTaxRate,
  }
}
