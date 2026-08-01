export type DestinationId =
  | "us"
  | "ca"
  | "gb"
  | "eu"
  | "au"
  | "in"
  | "ae"
  | "sg"
  | "jp"
  | "mx"

export type ProductCategoryId =
  | "general"
  | "apparel"
  | "electronics"
  | "beauty"
  | "home"
  | "jewelry"
  | "books"
  | "food"

export type TaxDutyInput = {
  productValue: number
  shippingCost: number
  insuranceCost: number
  destination: DestinationId
  category: ProductCategoryId
  /** When true, shipping + insurance are included in the dutiable base (CIF-style). */
  includeFreightInCustoms: boolean
}

export type TaxDutyResult = {
  customsValue: number
  dutyRate: number
  taxRate: number
  dutyAmount: number
  taxAmount: number
  totalImportCharges: number
  landedCost: number
  effectiveRate: number
  deMinimisNote: string | null
  destinationLabel: string
  categoryLabel: string
  taxLabel: string
}

type Destination = {
  id: DestinationId
  label: string
  taxLabel: string
  taxRate: number
  /** Typical order value below which duty/tax may not apply (informational). */
  deMinimis: number
  dutyByCategory: Record<ProductCategoryId, number>
}

const DESTINATIONS: Destination[] = [
  {
    id: "us",
    label: "United States",
    taxLabel: "Sales tax / MPF estimate",
    taxRate: 0.025,
    deMinimis: 800,
    dutyByCategory: {
      general: 0.05,
      apparel: 0.12,
      electronics: 0.02,
      beauty: 0.04,
      home: 0.06,
      jewelry: 0.1,
      books: 0,
      food: 0.05,
    },
  },
  {
    id: "ca",
    label: "Canada",
    taxLabel: "GST/HST estimate",
    taxRate: 0.13,
    deMinimis: 20,
    dutyByCategory: {
      general: 0.06,
      apparel: 0.16,
      electronics: 0.03,
      beauty: 0.065,
      home: 0.07,
      jewelry: 0.08,
      books: 0,
      food: 0.05,
    },
  },
  {
    id: "gb",
    label: "United Kingdom",
    taxLabel: "VAT",
    taxRate: 0.2,
    deMinimis: 135,
    dutyByCategory: {
      general: 0.04,
      apparel: 0.12,
      electronics: 0.02,
      beauty: 0.04,
      home: 0.05,
      jewelry: 0.025,
      books: 0,
      food: 0.08,
    },
  },
  {
    id: "eu",
    label: "European Union",
    taxLabel: "VAT",
    taxRate: 0.21,
    deMinimis: 150,
    dutyByCategory: {
      general: 0.045,
      apparel: 0.12,
      electronics: 0.025,
      beauty: 0.045,
      home: 0.05,
      jewelry: 0.04,
      books: 0,
      food: 0.1,
    },
  },
  {
    id: "au",
    label: "Australia",
    taxLabel: "GST",
    taxRate: 0.1,
    deMinimis: 1000,
    dutyByCategory: {
      general: 0.05,
      apparel: 0.1,
      electronics: 0.02,
      beauty: 0.05,
      home: 0.05,
      jewelry: 0.05,
      books: 0,
      food: 0.05,
    },
  },
  {
    id: "in",
    label: "India",
    taxLabel: "IGST + cess estimate",
    taxRate: 0.18,
    deMinimis: 0,
    dutyByCategory: {
      general: 0.15,
      apparel: 0.2,
      electronics: 0.15,
      beauty: 0.2,
      home: 0.15,
      jewelry: 0.2,
      books: 0,
      food: 0.3,
    },
  },
  {
    id: "ae",
    label: "United Arab Emirates",
    taxLabel: "VAT",
    taxRate: 0.05,
    deMinimis: 0,
    dutyByCategory: {
      general: 0.05,
      apparel: 0.05,
      electronics: 0.05,
      beauty: 0.05,
      home: 0.05,
      jewelry: 0.05,
      books: 0,
      food: 0.05,
    },
  },
  {
    id: "sg",
    label: "Singapore",
    taxLabel: "GST",
    taxRate: 0.09,
    deMinimis: 400,
    dutyByCategory: {
      general: 0,
      apparel: 0,
      electronics: 0,
      beauty: 0,
      home: 0,
      jewelry: 0,
      books: 0,
      food: 0,
    },
  },
  {
    id: "jp",
    label: "Japan",
    taxLabel: "Consumption tax",
    taxRate: 0.1,
    deMinimis: 70,
    dutyByCategory: {
      general: 0.04,
      apparel: 0.09,
      electronics: 0,
      beauty: 0.04,
      home: 0.04,
      jewelry: 0.05,
      books: 0,
      food: 0.1,
    },
  },
  {
    id: "mx",
    label: "Mexico",
    taxLabel: "IVA",
    taxRate: 0.16,
    deMinimis: 50,
    dutyByCategory: {
      general: 0.1,
      apparel: 0.2,
      electronics: 0.05,
      beauty: 0.1,
      home: 0.1,
      jewelry: 0.15,
      books: 0,
      food: 0.15,
    },
  },
]

export const PRODUCT_CATEGORIES: {
  id: ProductCategoryId
  label: string
}[] = [
  { id: "general", label: "General merchandise" },
  { id: "apparel", label: "Apparel & footwear" },
  { id: "electronics", label: "Electronics" },
  { id: "beauty", label: "Beauty & personal care" },
  { id: "home", label: "Home & lifestyle" },
  { id: "jewelry", label: "Jewelry & accessories" },
  { id: "books", label: "Books & media" },
  { id: "food", label: "Food & consumables" },
]

export function listDestinations() {
  return DESTINATIONS.map(({ id, label, taxLabel }) => ({
    id,
    label,
    taxLabel,
  }))
}

export function calculateTaxDuty(input: TaxDutyInput): TaxDutyResult | null {
  const {
    productValue,
    shippingCost,
    insuranceCost,
    destination,
    category,
    includeFreightInCustoms,
  } = input

  if (!(productValue > 0) || shippingCost < 0 || insuranceCost < 0) {
    return null
  }

  const dest = DESTINATIONS.find((d) => d.id === destination)
  if (!dest) return null

  const freight = includeFreightInCustoms ? shippingCost + insuranceCost : 0
  const customsValue = productValue + freight
  const dutyRate = dest.dutyByCategory[category]
  const taxRate = dest.taxRate

  // Simplified model used by many brokers:
  // duty on customs value; tax on (customs value + duty)
  const dutyAmount = roundMoney(customsValue * dutyRate)
  const taxAmount = roundMoney((customsValue + dutyAmount) * taxRate)
  const totalImportCharges = roundMoney(dutyAmount + taxAmount)
  const landedCost = roundMoney(
    productValue + shippingCost + insuranceCost + totalImportCharges,
  )
  const effectiveRate = (totalImportCharges / productValue) * 100

  let deMinimisNote: string | null = null
  if (dest.deMinimis > 0 && customsValue < dest.deMinimis) {
    deMinimisNote = `${dest.label} often has a low-value threshold around ${formatMoney(dest.deMinimis)}. Shipments below that may see reduced or waived duty/tax — confirm with your broker or local rules.`
  } else if (dest.deMinimis === 0) {
    deMinimisNote =
      "This destination commonly assesses import charges on most commercial shipments; de minimis relief may be limited."
  }

  return {
    customsValue: roundMoney(customsValue),
    dutyRate,
    taxRate,
    dutyAmount,
    taxAmount,
    totalImportCharges,
    landedCost,
    effectiveRate,
    deMinimisNote,
    destinationLabel: dest.label,
    categoryLabel:
      PRODUCT_CATEGORIES.find((c) => c.id === category)?.label ?? category,
    taxLabel: dest.taxLabel,
  }
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}

export function formatMoney(value: number, currency = "USD"): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return `${currency} ${value.toFixed(2)}`
  }
}

export function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`
}
