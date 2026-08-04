export type PresentValueMode = "pv" | "fv" | "npv"

export type PresentValueInput = {
  mode: PresentValueMode
  ratePercent: number
  periods: number
  /** Future value (for PV) or present value (for FV) */
  amount: number
  /** Optional payment per period (annuity) */
  payment?: number
  /** Cash flows for NPV mode (period 0..n) */
  cashFlows?: number[]
}

export type PresentValueResult = {
  mode: PresentValueMode
  presentValue: number
  futureValue: number
  npv?: number
}

export function calculatePresentValue(
  input: PresentValueInput,
): PresentValueResult | null {
  const { mode, ratePercent, periods, amount, payment = 0, cashFlows } = input
  const r = ratePercent / 100

  if (mode === "npv") {
    if (!cashFlows?.length || !cashFlows.every(Number.isFinite)) return null
    if (!Number.isFinite(ratePercent)) return null
    const npv = cashFlows.reduce(
      (s, cf, t) => s + cf / Math.pow(1 + r, t),
      0,
    )
    return { mode, presentValue: npv, futureValue: npv, npv }
  }

  if (
    ![ratePercent, periods, amount, payment].every(Number.isFinite) ||
    periods < 1 ||
    periods > 600
  ) {
    return null
  }

  const n = Math.round(periods)
  if (mode === "pv") {
    // PV of a future lump sum + optional annuity payments
    let pv = amount / Math.pow(1 + r, n)
    if (payment !== 0) {
      pv +=
        r === 0
          ? payment * n
          : (payment * (1 - Math.pow(1 + r, -n))) / r
    }
    return {
      mode,
      presentValue: pv,
      futureValue: amount,
    }
  }

  // FV of present amount + optional annuity
  let fv = amount * Math.pow(1 + r, n)
  if (payment !== 0) {
    fv +=
      r === 0
        ? payment * n
        : (payment * (Math.pow(1 + r, n) - 1)) / r
  }
  return {
    mode,
    presentValue: amount,
    futureValue: fv,
  }
}
