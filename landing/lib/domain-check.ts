export const DOMAIN_TLDS = [
  "com",
  "net",
  "org",
  "io",
  "co",
  "store",
  "shop",
  "online",
  "app",
  "ai",
] as const

export type DomainStatus = "available" | "registered" | "unknown"

export type DomainCheckResult = {
  domain: string
  status: DomainStatus
  registrar?: string | null
  created?: string | null
  expires?: string | null
  nameservers?: string[]
  source: "rdap" | "dns" | "combined"
}

export function normalizeDomainLabel(input: string): string | null {
  let value = input.trim().toLowerCase()
  value = value.replace(/^https?:\/\//, "").replace(/^www\./, "")
  value = value.split("/")[0] ?? ""
  value = value.split("?")[0] ?? ""

  // Strip trailing TLD if user pasted a full domain — keep label only when checking multi-TLD
  if (!value) return null

  // Allow full domain or bare label
  if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/.test(value)) {
    return null
  }

  return value
}

export function splitDomain(input: string): { label: string; tld: string | null } | null {
  const normalized = normalizeDomainLabel(input)
  if (!normalized) return null

  const parts = normalized.split(".")
  if (parts.length === 1) {
    return { label: parts[0], tld: null }
  }

  const tld = parts[parts.length - 1]
  const label = parts.slice(0, -1).join(".")
  if (!label || !tld) return null
  return { label, tld }
}
