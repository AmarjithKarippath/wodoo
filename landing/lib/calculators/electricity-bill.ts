export type ElectricitySlab = {
  upToUnits: number | null
  ratePerUnit: number
}

export type ElectricityBillInput = {
  units: number
  fixedCharge: number
  slabs: ElectricitySlab[]
}

export type ElectricityBillResult = {
  energyCharge: number
  fixedCharge: number
  totalBill: number
  effectiveRate: number
}

/** Progressive slab billing (common India domestic pattern). */
export function calculateElectricityBill(
  input: ElectricityBillInput,
): ElectricityBillResult | null {
  const { units, fixedCharge, slabs } = input
  if (
    !Number.isFinite(units) ||
    units < 0 ||
    !Number.isFinite(fixedCharge) ||
    fixedCharge < 0 ||
    !slabs.length
  ) {
    return null
  }

  let remaining = units
  let prevCap = 0
  let energyCharge = 0

  for (const slab of slabs) {
    if (remaining <= 0) break
    const cap = slab.upToUnits
    const band =
      cap == null ? remaining : Math.max(0, Math.min(remaining, cap - prevCap))
    if (band <= 0) {
      if (cap != null) prevCap = cap
      continue
    }
    if (!Number.isFinite(slab.ratePerUnit) || slab.ratePerUnit < 0) return null
    energyCharge += band * slab.ratePerUnit
    remaining -= band
    if (cap != null) prevCap = cap
  }

  if (remaining > 0) {
    const last = slabs[slabs.length - 1]
    energyCharge += remaining * last.ratePerUnit
  }

  const totalBill = energyCharge + fixedCharge
  return {
    energyCharge,
    fixedCharge,
    totalBill,
    effectiveRate: units > 0 ? totalBill / units : 0,
  }
}

export const DEFAULT_DOMESTIC_SLABS: ElectricitySlab[] = [
  { upToUnits: 100, ratePerUnit: 3.5 },
  { upToUnits: 200, ratePerUnit: 5.5 },
  { upToUnits: 400, ratePerUnit: 7.0 },
  { upToUnits: null, ratePerUnit: 8.5 },
]
