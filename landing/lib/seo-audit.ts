export type SeoSeverity = "pass" | "warn" | "fail" | "info"

export type SeoCheck = {
  id: string
  label: string
  severity: SeoSeverity
  message: string
  value?: string
}

export type SeoAuditResult = {
  url: string
  finalUrl: string
  score: number
  checks: SeoCheck[]
  summary: {
    pass: number
    warn: number
    fail: number
  }
  extracted: {
    title: string | null
    description: string | null
    canonical: string | null
    robots: string | null
    h1: string[]
    ogTitle: string | null
    ogDescription: string | null
    ogImage: string | null
    twitterCard: string | null
    viewport: string | null
    lang: string | null
    imageCount: number
    imagesMissingAlt: number
    internalLinks: number
    externalLinks: number
    wordCount: number
    hasHttps: boolean
    statusCode: number
  }
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim()
}

function matchAttr(html: string, tagPattern: RegExp, attr: string): string | null {
  const tag = html.match(tagPattern)?.[0]
  if (!tag) return null
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, "i")
  const value = tag.match(re)?.[1]
  return value ? decodeHtml(value) : null
}

function getMetaContent(html: string, name: string): string | null {
  const nameRe = new RegExp(
    `<meta[^>]+(?:name|property)\\s*=\\s*["']${name}["'][^>]*>`,
    "i",
  )
  const tag = html.match(nameRe)?.[0]
  if (!tag) {
    // attribute order swapped
    const altRe = new RegExp(
      `<meta[^>]+content\\s*=\\s*["']([^"']*)["'][^>]*(?:name|property)\\s*=\\s*["']${name}["'][^>]*>`,
      "i",
    )
    const alt = html.match(altRe)?.[1]
    return alt ? decodeHtml(alt) : null
  }
  return matchAttr(tag, /.*/, "content")
}

function getTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return match?.[1] ? decodeHtml(match[1].replace(/\s+/g, " ")) : null
}

function getH1s(html: string): string[] {
  const matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
  return matches
    .map((m) => decodeHtml(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")))
    .filter(Boolean)
    .slice(0, 10)
}

function getLang(html: string): string | null {
  const match = html.match(/<html[^>]*\slang\s*=\s*["']([^"']+)["']/i)
  return match?.[1] ?? null
}

function stripScriptsStyles(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
}

function countWords(html: string): number {
  const text = stripScriptsStyles(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (!text) return 0
  return text.split(" ").filter(Boolean).length
}

function analyzeImages(html: string): { total: number; missingAlt: number } {
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  let missingAlt = 0
  for (const img of imgs) {
    const alt = img.match(/\balt\s*=\s*["']([^"']*)["']/i)
    if (!alt || !alt[1].trim()) missingAlt += 1
  }
  return { total: imgs.length, missingAlt }
}

function analyzeLinks(
  html: string,
  pageHost: string,
): { internal: number; external: number } {
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)].map(
    (m) => m[1],
  )
  let internal = 0
  let external = 0
  for (const href of hrefs) {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue
    }
    try {
      const url = new URL(href, `https://${pageHost}`)
      if (url.hostname === pageHost || url.hostname.endsWith(`.${pageHost}`)) {
        internal += 1
      } else {
        external += 1
      }
    } catch {
      // ignore invalid
    }
  }
  return { internal, external }
}

export function analyzeHtml(
  html: string,
  inputUrl: string,
  finalUrl: string,
  statusCode: number,
): SeoAuditResult {
  const pageUrl = new URL(finalUrl)
  const title = getTitle(html)
  const description = getMetaContent(html, "description")
  const canonical =
    matchAttr(
      html,
      /<link[^>]+rel\s*=\s*["']canonical["'][^>]*>/i,
      "href",
    ) ||
    matchAttr(
      html,
      /<link[^>]+href\s*=\s*["'][^"']+["'][^>]*rel\s*=\s*["']canonical["'][^>]*>/i,
      "href",
    )
  const robots = getMetaContent(html, "robots")
  const viewport = getMetaContent(html, "viewport")
  const ogTitle = getMetaContent(html, "og:title")
  const ogDescription = getMetaContent(html, "og:description")
  const ogImage = getMetaContent(html, "og:image")
  const twitterCard = getMetaContent(html, "twitter:card")
  const h1 = getH1s(html)
  const lang = getLang(html)
  const images = analyzeImages(html)
  const links = analyzeLinks(html, pageUrl.hostname)
  const wordCount = countWords(html)
  const hasHttps = pageUrl.protocol === "https:"

  const checks: SeoCheck[] = []

  checks.push({
    id: "https",
    label: "HTTPS",
    severity: hasHttps ? "pass" : "fail",
    message: hasHttps
      ? "Page is served over HTTPS."
      : "Page is not using HTTPS. Secure your site with SSL.",
  })

  checks.push({
    id: "status",
    label: "HTTP status",
    severity: statusCode >= 200 && statusCode < 300 ? "pass" : statusCode >= 300 && statusCode < 400 ? "warn" : "fail",
    message: `Server responded with status ${statusCode}.`,
    value: String(statusCode),
  })

  if (!title) {
    checks.push({
      id: "title",
      label: "Title tag",
      severity: "fail",
      message: "Missing <title> tag.",
    })
  } else {
    const len = title.length
    const severity =
      len >= 30 && len <= 60 ? "pass" : len > 0 && len < 70 ? "warn" : "warn"
    checks.push({
      id: "title",
      label: "Title tag",
      severity,
      message:
        len < 30
          ? "Title is quite short. Aim for about 30–60 characters."
          : len > 60
            ? "Title is long and may be truncated in search results."
            : "Title length looks solid.",
      value: title,
    })
  }

  if (!description) {
    checks.push({
      id: "description",
      label: "Meta description",
      severity: "fail",
      message: "Missing meta description.",
    })
  } else {
    const len = description.length
    checks.push({
      id: "description",
      label: "Meta description",
      severity: len >= 70 && len <= 160 ? "pass" : "warn",
      message:
        len < 70
          ? "Description is short. Aim for roughly 70–160 characters."
          : len > 160
            ? "Description may be truncated in Google results."
            : "Meta description length looks good.",
      value: description,
    })
  }

  if (h1.length === 0) {
    checks.push({
      id: "h1",
      label: "H1 heading",
      severity: "fail",
      message: "No H1 found on the page.",
    })
  } else if (h1.length === 1) {
    checks.push({
      id: "h1",
      label: "H1 heading",
      severity: "pass",
      message: "Exactly one H1 found.",
      value: h1[0],
    })
  } else {
    checks.push({
      id: "h1",
      label: "H1 heading",
      severity: "warn",
      message: `Found ${h1.length} H1 tags. Prefer a single clear H1.`,
      value: h1.join(" | "),
    })
  }

  checks.push({
    id: "canonical",
    label: "Canonical URL",
    severity: canonical ? "pass" : "warn",
    message: canonical
      ? "Canonical link is present."
      : "No canonical URL found. Add one to avoid duplicate-content confusion.",
    value: canonical ?? undefined,
  })

  if (robots && /noindex/i.test(robots)) {
    checks.push({
      id: "robots",
      label: "Robots meta",
      severity: "fail",
      message: "Page is set to noindex and may be blocked from search results.",
      value: robots,
    })
  } else {
    checks.push({
      id: "robots",
      label: "Robots meta",
      severity: "pass",
      message: robots
        ? "Robots meta does not block indexing."
        : "No restrictive robots meta tag detected.",
      value: robots ?? undefined,
    })
  }

  checks.push({
    id: "viewport",
    label: "Mobile viewport",
    severity: viewport ? "pass" : "fail",
    message: viewport
      ? "Viewport meta tag is present."
      : "Missing viewport meta tag — mobile usability may suffer.",
    value: viewport ?? undefined,
  })

  checks.push({
    id: "lang",
    label: "HTML lang",
    severity: lang ? "pass" : "warn",
    message: lang
      ? `Document language is set to “${lang}”.`
      : "Missing lang attribute on <html>.",
    value: lang ?? undefined,
  })

  const ogOk = Boolean(ogTitle && ogDescription && ogImage)
  checks.push({
    id: "open-graph",
    label: "Open Graph tags",
    severity: ogOk ? "pass" : ogTitle || ogDescription || ogImage ? "warn" : "warn",
    message: ogOk
      ? "Open Graph title, description, and image are present."
      : "Open Graph tags are incomplete. Add og:title, og:description, and og:image for social sharing.",
    value: [ogTitle, ogDescription, ogImage].filter(Boolean).join(" · ") || undefined,
  })

  checks.push({
    id: "twitter",
    label: "Twitter card",
    severity: twitterCard ? "pass" : "info",
    message: twitterCard
      ? "Twitter card meta is present."
      : "No twitter:card tag found (optional but recommended).",
    value: twitterCard ?? undefined,
  })

  if (images.total === 0) {
    checks.push({
      id: "image-alt",
      label: "Image alt text",
      severity: "info",
      message: "No images detected on the page.",
    })
  } else if (images.missingAlt === 0) {
    checks.push({
      id: "image-alt",
      label: "Image alt text",
      severity: "pass",
      message: `All ${images.total} images include alt text.`,
    })
  } else {
    checks.push({
      id: "image-alt",
      label: "Image alt text",
      severity: images.missingAlt / images.total > 0.3 ? "fail" : "warn",
      message: `${images.missingAlt} of ${images.total} images are missing alt text.`,
    })
  }

  checks.push({
    id: "content",
    label: "Content length",
    severity: wordCount >= 300 ? "pass" : wordCount >= 100 ? "warn" : "fail",
    message:
      wordCount >= 300
        ? `About ${wordCount} words of visible content.`
        : `Only about ${wordCount} words detected. Thin pages often rank poorly.`,
    value: String(wordCount),
  })

  checks.push({
    id: "links",
    label: "Links",
    severity: links.internal > 0 ? "pass" : "warn",
    message: `Found ${links.internal} internal and ${links.external} external links.`,
    value: `${links.internal} internal / ${links.external} external`,
  })

  const summary = {
    pass: checks.filter((c) => c.severity === "pass").length,
    warn: checks.filter((c) => c.severity === "warn").length,
    fail: checks.filter((c) => c.severity === "fail").length,
  }

  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        ((summary.pass * 1 + summary.warn * 0.45) /
          Math.max(checks.filter((c) => c.severity !== "info").length, 1)) *
          100,
      ),
    ),
  )

  return {
    url: inputUrl,
    finalUrl,
    score,
    checks,
    summary,
    extracted: {
      title,
      description,
      canonical,
      robots,
      h1,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      viewport,
      lang,
      imageCount: images.total,
      imagesMissingAlt: images.missingAlt,
      internalLinks: links.internal,
      externalLinks: links.external,
      wordCount,
      hasHttps,
      statusCode,
    },
  }
}

const BLOCKED_HOSTS = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
])

export function assertPublicHttpUrl(raw: string): URL {
  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    throw new Error("Enter a valid URL including https://")
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http:// and https:// URLs are supported.")
  }

  const host = parsed.hostname.toLowerCase().replace(/\.$/, "")
  if (BLOCKED_HOSTS.has(host) || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new Error("That host cannot be audited.")
  }

  // Block obvious private / loopback / link-local literals
  if (
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "127.0.0.1" ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^100\.(6[4-9]|[7-9]\d|1[0-1]\d|12[0-7])\./.test(host)
  ) {
    throw new Error("Private or local network addresses cannot be audited.")
  }

  return parsed
}
