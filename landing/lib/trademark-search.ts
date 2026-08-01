export type TrademarkJurisdiction = {
  id: string
  label: string
  searchUrl: (mark: string) => string
}

export const TRADEMARK_JURISDICTIONS: TrademarkJurisdiction[] = [
  {
    id: "uspto",
    label: "USPTO (United States)",
    searchUrl: (mark) =>
      `https://tmsearch.uspto.gov/search/search-results?query=${encodeURIComponent(mark)}`,
  },
  {
    id: "euipo",
    label: "EUIPO (European Union)",
    searchUrl: (mark) =>
      `https://euipo.europa.eu/eSearch/#basic/${encodeURIComponent(mark)}`,
  },
  {
    id: "ukipo",
    label: "UK IPO",
    searchUrl: (mark) =>
      `https://www.gov.uk/search-for-trademark?q=${encodeURIComponent(mark)}`,
  },
  {
    id: "wipo",
    label: "WIPO Global Brand Database",
    searchUrl: (mark) =>
      `https://branddb.wipo.int/en/similarname?q=${encodeURIComponent(mark)}`,
  },
  {
    id: "cipo",
    label: "CIPO (Canada)",
    searchUrl: (mark) =>
      `https://www.ic.gc.ca/app/opic-cipo/trdmrks/srch/home?lang=eng&q=${encodeURIComponent(mark)}`,
  },
]

export type MarkStrength = {
  score: number
  rating: "weak" | "moderate" | "strong"
  notes: string[]
}

export function analyzeMarkStrength(mark: string): MarkStrength {
  const cleaned = mark.trim()
  const notes: string[] = []
  let score = 50

  if (cleaned.length < 3) {
    score -= 25
    notes.push("Very short marks are harder to protect and easier to collide with.")
  } else if (cleaned.length >= 8) {
    score += 10
    notes.push("Longer, distinctive word marks often clear more easily.")
  }

  if (/\s/.test(cleaned)) {
    score += 5
    notes.push("Multi-word marks can be more distinctive than a single common word.")
  }

  if (/^[0-9]+$/.test(cleaned)) {
    score -= 30
    notes.push("Numbers alone are usually weak as trademarks.")
  }

  const genericHints =
    /\b(shop|store|best|cheap|online|buy|sale|market|goods|products)\b/i
  if (genericHints.test(cleaned)) {
    score -= 20
    notes.push("Generic ecommerce wording can weaken trademark distinctiveness.")
  }

  if (/[^a-z0-9\s&'-]/i.test(cleaned)) {
    score -= 5
    notes.push("Unusual symbols may limit how the mark is registered or searched.")
  }

  if (/[A-Z]/.test(cleaned) && /[a-z]/.test(cleaned)) {
    score += 5
  }

  score = Math.max(5, Math.min(95, score))

  const rating: MarkStrength["rating"] =
    score >= 70 ? "strong" : score >= 45 ? "moderate" : "weak"

  if (notes.length === 0) {
    notes.push("Run official registry searches before filing or launching the brand.")
  }

  return { score, rating, notes }
}
