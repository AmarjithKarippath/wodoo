/** Prepend https:// when the user enters a bare domain like example.com */
export function normalizeWebsite(value?: string | null): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined

  if (/^https?:\/\//i.test(trimmed)) return trimmed

  // Treat protocol-relative //example.com the same way
  const withoutSlashes = trimmed.replace(/^\/+/, "")
  if (!withoutSlashes) return undefined

  return `https://${withoutSlashes}`
}

export function isValidWebsite(value?: string | null): boolean {
  if (!value) return true
  try {
    const url = new URL(value)
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname) &&
      url.hostname.includes(".")
    )
  } catch {
    return false
  }
}
