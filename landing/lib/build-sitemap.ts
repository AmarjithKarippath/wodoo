import { allPostsMerged } from "@/lib/blog"
import { liveTools } from "@/lib/tools"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE}${path}`
}

/** Keep in sync with lib/landing-media.ts / scripts/generate-sitemap.mjs */
const LANDING_IMAGES = [
  {
    src: "/images/admin-dashboard.jpg",
    title: "Wodoo Store ecommerce platform overview",
    caption:
      "Run sales analytics, product pages, shipping, promotions, and order notifications from the Wodoo Store ecommerce platform",
  },
  {
    src: "/images/choose-design.jpg",
    title: "Choose your store design",
    caption:
      "Customize your online store design and product gallery in the Wodoo Store editor",
  },
  {
    src: "/images/products-shine.jpg",
    title: "Make your products shine",
    caption:
      "Product photography and presentation for high-converting Wodoo Store product pages",
  },
  {
    src: "/images/get-paid.jpg",
    title: "Get paid with secure checkout",
    caption:
      "Accept modern contactless and digital wallet payments with Wodoo Store checkout",
  },
  {
    src: "/images/product-sneaker.png",
    title: "Cloud Runner product — Wodoo Store",
    caption: "Example product listing for sneakers in a Wodoo Store online shop",
  },
  {
    src: "/images/product-bag.png",
    title: "Everyday Tote product — Wodoo Store",
    caption: "Example product listing for a tote bag in a Wodoo Store online shop",
  },
]

const LANDING_VIDEOS = [
  {
    src: "/images/steps-hero.mp4",
    title: "Trusted and growing ecommerce platform — Wodoo Store",
    description:
      "Wodoo Store hero video showcasing a trusted ecommerce platform for launching and growing an online store.",
    thumbnailSrc: "/images/steps-hero-poster.jpg",
    uploadDate: "2026-08-02T00:00:00Z",
  },
  {
    src: "/images/social-shopping.mp4",
    title: "Sell where they're scrolling — Wodoo Store",
    description:
      "Put your products in every feed, inbox, reel and marketplace your shoppers already live in.",
    thumbnailSrc: "/images/social-shopping-poster.jpg",
    uploadDate: "2026-08-02T00:00:00Z",
  },
  {
    src: "/images/retention.mp4",
    title: "Keep them coming back — Wodoo Store",
    description:
      "Re-engage shoppers with a steady drumbeat of offers, updates, and automations that run while you sleep.",
    thumbnailSrc: "/images/retention-poster.jpg",
    uploadDate: "2026-08-02T00:00:00Z",
  },
]

export type SitemapStats = {
  urlCount: number
  toolCount: number
  postCount: number
}

/** Full sitemap XML including tools + static/DB blog posts. */
export async function buildSitemapXml(): Promise<{ xml: string; stats: SitemapStats }> {
  const today = new Date().toISOString().slice(0, 10)
  const tools = liveTools()
  const posts = await allPostsMerged()

  const homeImages = [
    {
      loc: `${SITE}/og.png`,
      title: "Wodoo Store",
      caption: "Wodoo Store — launch a single-product ecommerce store fast",
    },
    ...LANDING_IMAGES.map((image) => ({
      loc: abs(image.src),
      title: image.title,
      caption: image.caption,
    })),
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${homeImages
  .map(
    (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`,
  )
  .join("\n")}
${LANDING_VIDEOS.map(
  (v) => `    <video:video>
      <video:thumbnail_loc>${escapeXml(abs(v.thumbnailSrc))}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>${escapeXml(abs(v.src))}</video:content_loc>
      <video:publication_date>${escapeXml(v.uploadDate)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`,
).join("\n")}
  </url>
  <url>
    <loc>${SITE}/tools</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE}/og.png</image:loc>
      <image:title>Free online tools &amp; calculators — Wodoo Store</image:title>
      <image:caption>Suite of free online ecommerce, finance, health, and maths tools from Wodoo Store — EMI, XIRR, TDEE, retirement, stamp duty, and more</image:caption>
    </image:image>
  </url>
`

  for (const tool of tools) {
    xml += `  <url>
    <loc>${SITE}${tool.href}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${SITE}${tool.image}</image:loc>
      <image:title>${escapeXml(tool.title)}</image:title>
      <image:caption>${escapeXml(tool.imageAlt)}</image:caption>
    </image:image>
  </url>
`
  }

  xml += `  <url>
    <loc>${SITE}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${SITE}/og.png</image:loc>
      <image:title>Wodoo Store blog</image:title>
      <image:caption>Ecommerce tips, store-building guides, and selling advice from Wodoo Store</image:caption>
    </image:image>
  </url>
`

  for (const post of posts) {
    const lastmod = (post.updatedAt || post.publishedAt).slice(0, 10)
    const imageLoc = post.hero ? abs(post.hero) : `${SITE}/og.png`
    xml += `  <url>
    <loc>${SITE}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.description)}</image:caption>
    </image:image>
  </url>
`
  }

  xml += `</urlset>
`

  const urlCount = (xml.match(/<loc>/g) || []).length
  return {
    xml,
    stats: {
      urlCount,
      toolCount: tools.length,
      postCount: posts.length,
    },
  }
}

export function buildRobotsTxt(stats?: SitemapStats): string {
  const countNote = stats
    ? `${stats.urlCount} URLs — home, tools index + ${stats.toolCount} calculators, blog + ${stats.postCount} posts`
    : "home, tools, blog, and all public pages"

  return `# https://www.wodoo.store/robots.txt
# Wodoo Store — crawl rules for search engines

User-agent: *
Allow: /
Allow: /tools
Allow: /tools/
Allow: /blog
Allow: /blog/

# Block private app surfaces
Disallow: /api/
Disallow: /api/*
Disallow: /admin
Disallow: /admin/

# Googlebot — same rules, explicit allow for tools & blog
User-agent: Googlebot
Allow: /
Allow: /tools
Allow: /blog
Disallow: /api/
Disallow: /admin

# Prefer the canonical host
Host: www.wodoo.store

# Sitemap (${countNote})
Sitemap: ${SITE}/sitemap.xml
`
}
