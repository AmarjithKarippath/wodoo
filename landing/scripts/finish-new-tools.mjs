import fs from "fs"
import path from "path"
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp")
const tools = JSON.parse(fs.readFileSync("scripts/new-tools-meta.json", "utf8"))

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function wrapTitle(title, maxLen = 28) {
  const words = title.split(" ")
  const lines = []
  let cur = ""
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (next.length > maxLen && cur) {
      lines.push(cur)
      cur = w
    } else cur = next
  }
  if (cur) lines.push(cur)
  return lines.slice(0, 3)
}

async function makeThumb(tool) {
  const W = 1200
  const H = 630
  const lines = wrapTitle(tool.title)
  const textSvg = lines
    .map(
      (line, i) =>
        `<text x="72" y="${210 + i * 64}" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#0f172a">${escapeXml(line)}</text>`,
    )
    .join("")
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f0f9ff"/>
      <stop offset="55%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="${tool.accent}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="1040" cy="120" r="180" fill="${tool.accent}" fill-opacity="0.25"/>
  <circle cx="980" cy="520" r="220" fill="${tool.accent}" fill-opacity="0.18"/>
  <text x="72" y="120" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="${tool.accent}" letter-spacing="3">WOODO STORE TOOLS</text>
  ${textSvg}
  <text x="72" y="560" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#64748b">Free online ecommerce tool</text>
</svg>`
  const dir = "public/tools"
  const buf = Buffer.from(svg)
  await sharp(buf).resize(W, H).webp({ quality: 82 }).toFile(path.join(dir, `${tool.slug}.webp`))
  await sharp(buf).resize(960).webp({ quality: 82 }).toFile(path.join(dir, `${tool.slug}-960w.webp`))
  await sharp(buf).resize(640).webp({ quality: 82 }).toFile(path.join(dir, `${tool.slug}-640w.webp`))
}

for (const tool of tools) {
  const page = `import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ${tool.component} } from "@/components/tools/${tool.slug}"

export const metadata: Metadata = {
  title: ${JSON.stringify(tool.title)},
  description: ${JSON.stringify(tool.metaDescription)},
  alternates: { canonical: "/tools/${tool.slug}" },
  openGraph: {
    title: ${JSON.stringify(`${tool.title} — Woodo Store`)},
    images: [
      {
        url: "/tools/${tool.slug}.webp",
        width: 1200,
        height: 630,
        alt: ${JSON.stringify(tool.imageAlt)},
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="${tool.slug}"
      title=${JSON.stringify(tool.title)}
      intro=${JSON.stringify(tool.intro)}
      description=${JSON.stringify(tool.description)}
    >
      <${tool.component} />
    </ToolShell>
  )
}
`
  fs.mkdirSync(path.join("app/tools", tool.slug), { recursive: true })
  fs.writeFileSync(path.join("app/tools", tool.slug, "page.tsx"), page)
  await makeThumb(tool)
  console.log("ok", tool.slug)
}

let toolsTs = fs.readFileSync("lib/tools.ts", "utf8")
if (!toolsTs.includes("dropshipping-profit-calculator")) {
  const entries = tools
    .map(
      (t) => `  {
    slug: ${JSON.stringify(t.slug)},
    title: ${JSON.stringify(t.title)},
    description:
      ${JSON.stringify(t.registryDescription)},
    href: "/tools/${t.slug}",
    image: "/tools/${t.slug}.webp",
    imageAlt:
      ${JSON.stringify(t.imageAlt)},
    status: "live",
  },`,
    )
    .join("\n")
  toolsTs = toolsTs.replace(
    /\n]\n\nexport function getTool/,
    `\n${entries}\n]\n\nexport function getTool`,
  )
  fs.writeFileSync("lib/tools.ts", toolsTs)
  console.log("registry updated")
}

let sitemap = fs.readFileSync("public/sitemap.xml", "utf8")
if (!sitemap.includes("dropshipping-profit-calculator")) {
  const today = "2026-08-02"
  const blocks = tools
    .map(
      (t) => `  <url>
    <loc>https://www.wodoo.store/tools/${t.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://www.wodoo.store/tools/${t.slug}.webp</image:loc>
      <image:title>${escapeXml(t.title)}</image:title>
      <image:caption>${escapeXml(t.imageAlt)}</image:caption>
    </image:image>
  </url>`,
    )
    .join("\n")
  sitemap = sitemap.replace(
    "  <url>\n    <loc>https://www.wodoo.store/blog</loc>",
    `${blocks}\n  <url>\n    <loc>https://www.wodoo.store/blog</loc>`,
  )
  fs.writeFileSync("public/sitemap.xml", sitemap)
  console.log("sitemap updated")
}

console.log("done", tools.length)
