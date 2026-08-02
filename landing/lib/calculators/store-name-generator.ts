const PREFIXES = [
  "Nova",
  "Peak",
  "Urban",
  "Bold",
  "Pure",
  "Swift",
  "Luxe",
  "Bright",
  "North",
  "Prime",
  "Velvet",
  "Craft",
]

const SUFFIXES = [
  "Store",
  "Shop",
  "Co",
  "Hub",
  "Lab",
  "House",
  "Market",
  "Supply",
  "Goods",
  "Collective",
  "Studio",
  "Depot",
]

const STYLES = ["& Co.", "Official", "Direct", "Daily", "Base", "Club"]

function titleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

function hashSeed(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function generateStoreNames(keyword: string, count = 12): string[] {
  const base = titleCase(keyword.replace(/[^a-zA-Z0-9\s]/g, " "))
  if (!base) return []

  const seed = hashSeed(base.toLowerCase())
  const names = new Set<string>()
  const compact = base.replace(/\s+/g, "")

  names.add(`${base} Store`)
  names.add(`The ${base} Shop`)
  names.add(`${compact}Co`)

  for (let i = 0; i < count * 3 && names.size < count; i++) {
    const n = seed + i * 97
    const prefix = PREFIXES[n % PREFIXES.length]
    const suffix = SUFFIXES[(n >> 3) % SUFFIXES.length]
    const style = STYLES[(n >> 5) % STYLES.length]
    const pattern = n % 5
    if (pattern === 0) names.add(`${prefix} ${base}`)
    else if (pattern === 1) names.add(`${base} ${suffix}`)
    else if (pattern === 2) names.add(`${prefix}${compact}`)
    else if (pattern === 3) names.add(`${base} ${style}`)
    else names.add(`${compact} ${suffix}`)
  }

  return Array.from(names).slice(0, count)
}
