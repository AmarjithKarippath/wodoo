/** Constant-time string compare for Basic Auth credentials. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USER?.trim()
  const password = process.env.ADMIN_PASSWORD
  if (!username || !password) return null
  return { username, password }
}

export function parseBasicAuth(
  header: string | null,
): { username: string; password: string } | null {
  if (!header?.startsWith("Basic ")) return null
  try {
    const decoded = atob(header.slice(6))
    const colon = decoded.indexOf(":")
    if (colon < 0) return null
    return {
      username: decoded.slice(0, colon),
      password: decoded.slice(colon + 1),
    }
  } catch {
    return null
  }
}

export function isAuthorizedAdmin(authorizationHeader: string | null): boolean {
  const expected = getAdminCredentials()
  if (!expected) return false
  const provided = parseBasicAuth(authorizationHeader)
  if (!provided) return false
  return (
    safeEqual(provided.username, expected.username) &&
    safeEqual(provided.password, expected.password)
  )
}
