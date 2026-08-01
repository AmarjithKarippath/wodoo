export type BioLink = {
  title: string
  url: string
}

export type LinkInBioInput = {
  brandName: string
  tagline: string
  links: BioLink[]
  accent: string
}

export function generateLinkInBioHtml(input: LinkInBioInput): string {
  const brand = escapeHtml(input.brandName.trim() || "Your Brand")
  const tagline = escapeHtml(input.tagline.trim() || "Shop my favorites")
  const accent = sanitizeColor(input.accent) || "#111111"
  const buttons = input.links
    .filter((l) => l.title.trim() && l.url.trim())
    .map((l) => {
      const href = escapeAttr(normalizeUrl(l.url))
      const title = escapeHtml(l.title.trim())
      return `    <a class="link" href="${href}" target="_blank" rel="noopener noreferrer">${title}</a>`
    })
    .join("\n")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${brand} | Link in bio</title>
  <style>
    :root { --accent: ${accent}; }
    * { box-sizing: border-box; }
    body {
      margin: 0; min-height: 100vh; font-family: system-ui, sans-serif;
      background: #f6f6f4; color: #111;
      display: flex; justify-content: center; padding: 2.5rem 1rem;
    }
    .card {
      width: 100%; max-width: 420px; text-align: center;
    }
    .mark {
      width: 64px; height: 64px; margin: 0 auto 1rem; border-radius: 999px;
      background: var(--accent); color: #fff; display: grid; place-items: center;
      font-weight: 800; font-size: 1.25rem;
    }
    h1 { margin: 0 0 0.35rem; font-size: 1.5rem; }
    p { margin: 0 0 1.5rem; color: #555; }
    .link {
      display: block; margin: 0.65rem 0; padding: 0.9rem 1rem;
      border: 2px solid #111; border-radius: 999px; text-decoration: none;
      color: #111; font-weight: 600; background: #fff;
      transition: background .15s ease, color .15s ease;
    }
    .link:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
  </style>
</head>
<body>
  <div class="card">
    <div class="mark">${brand.slice(0, 1).toUpperCase()}</div>
    <h1>${brand}</h1>
    <p>${tagline}</p>
${buttons || `    <a class="link" href="#">Add your first link</a>`}
  </div>
</body>
</html>`
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return "#"
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function sanitizeColor(value: string): string {
  const v = value.trim()
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v
  if (/^[a-zA-Z]+$/.test(v)) return v
  return "#111111"
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function escapeAttr(s: string) {
  return escapeHtml(s).replaceAll("'", "&#39;")
}
