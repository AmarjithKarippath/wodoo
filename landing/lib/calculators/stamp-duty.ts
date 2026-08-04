export type StampDutyState =
  | "maharashtra"
  | "karnataka"
  | "delhi"
  | "tamil-nadu"
  | "telangana"
  | "gujarat"
  | "uttar-pradesh"
  | "other"

/** Illustrative rates — verify with local authority before purchase. */
const RATES: Record<
  StampDutyState,
  { stampPercent: number; registrationPercent: number; label: string }
> = {
  maharashtra: { stampPercent: 5, registrationPercent: 1, label: "Maharashtra" },
  karnataka: { stampPercent: 5, registrationPercent: 1, label: "Karnataka" },
  delhi: { stampPercent: 6, registrationPercent: 1, label: "Delhi" },
  "tamil-nadu": {
    stampPercent: 7,
    registrationPercent: 1,
    label: "Tamil Nadu",
  },
  telangana: { stampPercent: 5, registrationPercent: 0.5, label: "Telangana" },
  gujarat: { stampPercent: 4.9, registrationPercent: 1, label: "Gujarat" },
  "uttar-pradesh": {
    stampPercent: 5,
    registrationPercent: 1,
    label: "Uttar Pradesh",
  },
  other: { stampPercent: 5, registrationPercent: 1, label: "Other (custom)" },
}

export type StampDutyInput = {
  propertyValue: number
  state: StampDutyState
  /** Override stamp % when state is other or custom */
  customStampPercent?: number
  customRegistrationPercent?: number
  /** Typical woman-buyer concession in some states (illustrative −1%) */
  womanBuyer?: boolean
}

export type StampDutyResult = {
  stateLabel: string
  stampPercent: number
  registrationPercent: number
  stampDuty: number
  registrationFee: number
  totalCharges: number
  totalWithProperty: number
}

export function calculateStampDuty(
  input: StampDutyInput,
): StampDutyResult | null {
  const {
    propertyValue,
    state,
    customStampPercent,
    customRegistrationPercent,
    womanBuyer,
  } = input
  if (!Number.isFinite(propertyValue) || propertyValue <= 0) return null

  const base = RATES[state]
  let stampPercent =
    customStampPercent != null && Number.isFinite(customStampPercent)
      ? customStampPercent
      : base.stampPercent
  const registrationPercent =
    customRegistrationPercent != null &&
    Number.isFinite(customRegistrationPercent)
      ? customRegistrationPercent
      : base.registrationPercent

  if (womanBuyer && state !== "other") {
    stampPercent = Math.max(0, stampPercent - 1)
  }

  if (stampPercent < 0 || registrationPercent < 0) return null

  const stampDuty = (propertyValue * stampPercent) / 100
  const registrationFee = (propertyValue * registrationPercent) / 100
  const totalCharges = stampDuty + registrationFee

  return {
    stateLabel: base.label,
    stampPercent,
    registrationPercent,
    stampDuty,
    registrationFee,
    totalCharges,
    totalWithProperty: propertyValue + totalCharges,
  }
}

export const STAMP_DUTY_STATES = Object.entries(RATES).map(([value, meta]) => ({
  value: value as StampDutyState,
  label: meta.label,
}))
