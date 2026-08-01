export type UnitSystem = "imperial" | "metric"
export type ShippingZone = "local" | "regional" | "national" | "international"

export type CourierInput = {
  weight: number
  length: number
  width: number
  height: number
  units: UnitSystem
  zone: ShippingZone
}

export type CourierQuote = {
  id: string
  carrier: string
  service: string
  estimatedPrice: number
  transitDaysMin: number
  transitDaysMax: number
  billableWeightLb: number
  notes: string
}

export type CourierCompareResult = {
  quotes: CourierQuote[]
  cheapest: CourierQuote
  fastest: CourierQuote
  bestValue: CourierQuote
  billableWeightLb: number
  dimensionalWeightLb: number
}

const ZONE_DISTANCE: Record<ShippingZone, number> = {
  local: 1,
  regional: 1.35,
  national: 1.85,
  international: 2.8,
}

type ServiceDef = {
  id: string
  carrier: string
  service: string
  base: number
  perLb: number
  days: [number, number]
  zones: ShippingZone[]
  notes: string
}

const SERVICES: ServiceDef[] = [
  {
    id: "usps-ground-advantage",
    carrier: "USPS",
    service: "Ground Advantage",
    base: 5.4,
    perLb: 0.85,
    days: [2, 5],
    zones: ["local", "regional", "national"],
    notes: "Often the cheapest for light domestic parcels.",
  },
  {
    id: "usps-priority",
    carrier: "USPS",
    service: "Priority Mail",
    base: 8.2,
    perLb: 1.15,
    days: [1, 3],
    zones: ["local", "regional", "national"],
    notes: "Good balance of price and speed for most US orders.",
  },
  {
    id: "usps-express",
    carrier: "USPS",
    service: "Priority Mail Express",
    base: 28,
    perLb: 2.4,
    days: [1, 2],
    zones: ["local", "regional", "national"],
    notes: "Overnight / 1–2 day overnight-style service.",
  },
  {
    id: "ups-ground",
    carrier: "UPS",
    service: "Ground",
    base: 9.5,
    perLb: 1.35,
    days: [1, 5],
    zones: ["local", "regional", "national"],
    notes: "Reliable for heavier domestic boxes.",
  },
  {
    id: "ups-2day",
    carrier: "UPS",
    service: "2nd Day Air",
    base: 22,
    perLb: 2.1,
    days: [2, 2],
    zones: ["local", "regional", "national"],
    notes: "Predictable two-business-day delivery.",
  },
  {
    id: "ups-next-day",
    carrier: "UPS",
    service: "Next Day Air",
    base: 38,
    perLb: 3.2,
    days: [1, 1],
    zones: ["local", "regional", "national"],
    notes: "Fastest common UPS option for urgent orders.",
  },
  {
    id: "fedex-ground",
    carrier: "FedEx",
    service: "Ground / Home Delivery",
    base: 9.2,
    perLb: 1.3,
    days: [1, 5],
    zones: ["local", "regional", "national"],
    notes: "Strong for residential ecommerce deliveries.",
  },
  {
    id: "fedex-express-saver",
    carrier: "FedEx",
    service: "Express Saver",
    base: 20,
    perLb: 2.0,
    days: [3, 3],
    zones: ["local", "regional", "national"],
    notes: "Three-business-day express option.",
  },
  {
    id: "fedex-overnight",
    carrier: "FedEx",
    service: "Standard Overnight",
    base: 40,
    perLb: 3.4,
    days: [1, 1],
    zones: ["local", "regional", "national"],
    notes: "Next-business-day delivery for time-critical packages.",
  },
  {
    id: "dhl-express",
    carrier: "DHL",
    service: "Express Worldwide",
    base: 42,
    perLb: 4.5,
    days: [2, 5],
    zones: ["international"],
    notes: "Common choice for fast cross-border parcels.",
  },
  {
    id: "usps-intl-priority",
    carrier: "USPS",
    service: "Priority Mail International",
    base: 32,
    perLb: 3.1,
    days: [6, 10],
    zones: ["international"],
    notes: "Often cheaper for lighter international packages.",
  },
  {
    id: "ups-worldwide-expedited",
    carrier: "UPS",
    service: "Worldwide Expedited",
    base: 48,
    perLb: 4.8,
    days: [2, 5],
    zones: ["international"],
    notes: "Business-oriented international expedited service.",
  },
  {
    id: "fedex-intl-economy",
    carrier: "FedEx",
    service: "International Economy",
    base: 45,
    perLb: 4.2,
    days: [4, 6],
    zones: ["international"],
    notes: "Lower-cost FedEx international option vs overnight.",
  },
]

function toPounds(weight: number, units: UnitSystem): number {
  return units === "metric" ? weight * 2.20462 : weight
}

function toInches(value: number, units: UnitSystem): number {
  return units === "metric" ? value / 2.54 : value
}

export function dimensionalWeightLb(
  length: number,
  width: number,
  height: number,
  units: UnitSystem,
): number {
  const l = toInches(length, units)
  const w = toInches(width, units)
  const h = toInches(height, units)
  return (l * w * h) / 139
}

function estimatePrice(
  service: ServiceDef,
  billableLb: number,
  zone: ShippingZone,
): number {
  const distance = ZONE_DISTANCE[zone]
  const weightFactor = Math.max(billableLb, 1)
  const raw = (service.base + service.perLb * weightFactor) * distance
  const heavyAdj = billableLb > 20 ? 1 + (billableLb - 20) * 0.015 : 1
  return Math.round(raw * heavyAdj * 100) / 100
}

function valueScore(quote: CourierQuote): number {
  const avgDays = (quote.transitDaysMin + quote.transitDaysMax) / 2
  return quote.estimatedPrice * 0.7 + avgDays * 4.5
}

export function compareCouriers(
  input: CourierInput,
): CourierCompareResult | null {
  if (
    !(input.weight > 0) ||
    !(input.length > 0) ||
    !(input.width > 0) ||
    !(input.height > 0)
  ) {
    return null
  }

  const actualLb = toPounds(input.weight, input.units)
  const dimensionalLb = dimensionalWeightLb(
    input.length,
    input.width,
    input.height,
    input.units,
  )
  const billableLb = Math.max(actualLb, dimensionalLb, 0.1)

  const quotes = SERVICES.filter((s) => s.zones.includes(input.zone))
    .map((service) => {
      const dayBump =
        input.zone === "national" && service.days[1] >= 5 ? 1 : 0

      return {
        id: service.id,
        carrier: service.carrier,
        service: service.service,
        estimatedPrice: estimatePrice(service, billableLb, input.zone),
        transitDaysMin: service.days[0],
        transitDaysMax: service.days[1] + dayBump,
        billableWeightLb: Math.ceil(billableLb * 10) / 10,
        notes: service.notes,
      } satisfies CourierQuote
    })
    .sort((a, b) => a.estimatedPrice - b.estimatedPrice)

  if (quotes.length === 0) return null

  const cheapest = [...quotes].sort(
    (a, b) => a.estimatedPrice - b.estimatedPrice,
  )[0]!

  const fastest = [...quotes].sort((a, b) => {
    const aAvg = (a.transitDaysMin + a.transitDaysMax) / 2
    const bAvg = (b.transitDaysMin + b.transitDaysMax) / 2
    if (aAvg !== bAvg) return aAvg - bAvg
    return a.estimatedPrice - b.estimatedPrice
  })[0]!

  const bestValue = [...quotes].sort(
    (a, b) => valueScore(a) - valueScore(b),
  )[0]!

  return {
    quotes,
    cheapest,
    fastest,
    bestValue,
    billableWeightLb: Math.ceil(billableLb * 10) / 10,
    dimensionalWeightLb: Math.ceil(dimensionalLb * 10) / 10,
  }
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function formatTransit(min: number, max: number): string {
  if (min === max) return `${min} business day${min === 1 ? "" : "s"}`
  return `${min}–${max} business days`
}
