export type KeywordIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational"

export type KeywordIdea = {
  keyword: string
  intent: KeywordIntent
  source: "related" | "suggestion" | "modifier"
  /** Relative 0–100 heuristic — not real search volume. */
  opportunity: number
  /** Relative 0–100 heuristic — not real keyword difficulty. */
  difficulty: number
}

export type KeywordExplorerResult = {
  seed: string
  ideas: KeywordIdea[]
  clusters: Record<KeywordIntent, KeywordIdea[]>
}

const PREFIX_MODIFIERS = [
  "best",
  "top",
  "cheap",
  "affordable",
  "free",
  "how to",
  "what is",
  "vs",
  "near me",
]

const SUFFIX_MODIFIERS = [
  "calculator",
  "tool",
  "template",
  "generator",
  "software",
  "app",
  "guide",
  "tips",
  "examples",
  "for ecommerce",
  "for shopify",
  "for beginners",
  "2026",
  "cost",
  "pricing",
  "free online",
]

function normalizeSeed(seed: string): string {
  return seed.replace(/\s+/g, " ").trim().toLowerCase()
}

function detectIntent(keyword: string): KeywordIntent {
  const k = keyword.toLowerCase()
  if (
    /\b(buy|order|price|pricing|cheap|discount|coupon|deal|shop|store|cost)\b/.test(
      k,
    )
  ) {
    return "transactional"
  }
  if (
    /\b(best|top|vs|review|compare|alternative|software|tool|app)\b/.test(k)
  ) {
    return "commercial"
  }
  if (/\b(login|official|website|brand)\b/.test(k)) {
    return "navigational"
  }
  return "informational"
}

function scoreIdea(keyword: string, seed: string, source: KeywordIdea["source"]): {
  opportunity: number
  difficulty: number
} {
  const words = keyword.trim().split(/\s+/).length
  const seedWords = seed.trim().split(/\s+/).length

  // Longer tails usually = lower difficulty / niche opportunity
  let opportunity = 42 + Math.min(words, 6) * 6
  let difficulty = 70 - Math.min(words, 6) * 7

  if (source === "suggestion") {
    opportunity += 8
    difficulty += 4
  }
  if (source === "related") {
    opportunity += 4
  }
  if (source === "modifier") {
    opportunity += 2
    difficulty -= 4
  }
  if (keyword.includes(seed) && words > seedWords) {
    opportunity += 5
    difficulty -= 3
  }
  if (/\b(free|template|calculator|generator|how to)\b/.test(keyword)) {
    opportunity += 6
    difficulty -= 5
  }
  if (/\b(software|agency|enterprise)\b/.test(keyword)) {
    difficulty += 10
  }

  return {
    opportunity: Math.max(15, Math.min(95, Math.round(opportunity))),
    difficulty: Math.max(10, Math.min(95, Math.round(difficulty))),
  }
}

function uniqueIdeas(ideas: KeywordIdea[]): KeywordIdea[] {
  const seen = new Set<string>()
  const out: KeywordIdea[] = []
  for (const idea of ideas) {
    const key = idea.keyword.toLowerCase()
    if (seen.has(key) || key.length < 2) continue
    seen.add(key)
    out.push(idea)
  }
  return out
}

export function buildKeywordIdeas(
  seedInput: string,
  related: string[],
  suggestions: string[],
): KeywordExplorerResult {
  const seed = normalizeSeed(seedInput)
  const ideas: KeywordIdea[] = []

  const push = (keyword: string, source: KeywordIdea["source"]) => {
    const normalized = normalizeSeed(keyword)
    if (!normalized || normalized === seed) return
    const scores = scoreIdea(normalized, seed, source)
    ideas.push({
      keyword: normalized,
      intent: detectIntent(normalized),
      source,
      ...scores,
    })
  }

  for (const item of suggestions) push(item, "suggestion")
  for (const item of related) push(item, "related")

  for (const mod of PREFIX_MODIFIERS) {
    push(`${mod} ${seed}`, "modifier")
  }
  for (const mod of SUFFIX_MODIFIERS) {
    push(`${seed} ${mod}`, "modifier")
  }

  // A few question / comparison variants
  push(`how to use ${seed}`, "modifier")
  push(`${seed} vs alternatives`, "modifier")
  push(`what is ${seed}`, "modifier")
  push(`${seed} for small business`, "modifier")

  const unique = uniqueIdeas(ideas)
    .sort((a, b) => b.opportunity - a.opportunity || a.difficulty - b.difficulty)
    .slice(0, 60)

  const clusters: Record<KeywordIntent, KeywordIdea[]> = {
    informational: [],
    commercial: [],
    transactional: [],
    navigational: [],
  }
  for (const idea of unique) {
    clusters[idea.intent].push(idea)
  }

  return { seed, ideas: unique, clusters }
}
