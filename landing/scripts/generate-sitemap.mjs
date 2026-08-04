import fs from "fs"

const SITE = "https://www.wodoo.store"
const TODAY = new Date().toISOString().slice(0, 10)

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function abs(path) {
  return path.startsWith("http") ? path : `${SITE}${path}`
}

const { liveTools } = await import("../lib/tools.ts")
const { allPosts } = await import("../lib/posts.ts")

const tools = liveTools()
const posts = allPosts()
  .slice()
  .sort((a, b) => {
    const da = a.updatedAt || a.publishedAt
    const db = b.updatedAt || b.publishedAt
    return db.localeCompare(da)
  })

/** Keep in sync with lib/landing-media.ts */
const LANDING_IMAGES = [
  {
    src: "/images/admin-dashboard.jpg",
    title: "Woodo Store ecommerce platform overview",
    caption:
      "Run sales analytics, product pages, shipping, promotions, and order notifications from the Woodo Store ecommerce platform",
  },
  {
    src: "/images/choose-design.jpg",
    title: "Choose your store design",
    caption:
      "Customize your online store design and product gallery in the Woodo Store editor",
  },
  {
    src: "/images/products-shine.jpg",
    title: "Make your products shine",
    caption:
      "Product photography and presentation for high-converting Woodo Store product pages",
  },
  {
    src: "/images/get-paid.jpg",
    title: "Get paid with secure checkout",
    caption:
      "Accept modern contactless and digital wallet payments with Woodo Store checkout",
  },
  {
    src: "/images/product-sneaker.png",
    title: "Cloud Runner product — Woodo Store",
    caption: "Example product listing for sneakers in a Woodo Store online shop",
  },
  {
    src: "/images/product-bag.png",
    title: "Everyday Tote product — Woodo Store",
    caption: "Example product listing for a tote bag in a Woodo Store online shop",
  },
]

const LANDING_VIDEOS = [
  {
    src: "/images/steps-hero.mp4",
    title: "Trusted and growing ecommerce platform — Woodo Store",
    description:
      "Woodo Store hero video showcasing a trusted ecommerce platform for launching and growing an online store.",
    thumbnailSrc: "/images/steps-hero-poster.jpg",
    uploadDate: "2026-08-02T00:00:00Z",
  },
  {
    src: "/images/social-shopping.mp4",
    title: "Sell where they're scrolling — Woodo Store",
    description:
      "Put your products in every feed, inbox, reel and marketplace your shoppers already live in.",
    thumbnailSrc: "/images/social-shopping-poster.jpg",
    uploadDate: "2026-08-02T00:00:00Z",
  },
  {
    src: "/images/retention.mp4",
    title: "Keep them coming back — Woodo Store",
    description:
      "Re-engage shoppers with a steady drumbeat of offers, updates, and automations that run while you sleep.",
    thumbnailSrc: "/images/retention-poster.jpg",
    uploadDate: "2026-08-02T00:00:00Z",
  },
]

const homeImages = [
  {
    loc: `${SITE}/og.png`,
    title: "Woodo Store",
    caption: "Woodo Store — launch a single-product ecommerce store fast",
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
    <lastmod>${TODAY}</lastmod>
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
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE}/og.png</image:loc>
      <image:title>Free online tools &amp; calculators — Woodo Store</image:title>
      <image:caption>Suite of free online ecommerce, finance, health, and maths tools from Woodo Store</image:caption>
    </image:image>
  </url>
`

for (const tool of tools) {
  xml += `  <url>
    <loc>${SITE}${tool.href}</loc>
    <lastmod>${TODAY}</lastmod>
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
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${SITE}/og.png</image:loc>
      <image:title>Woodo Store blog</image:title>
      <image:caption>Ecommerce tips, store-building guides, and selling advice from Woodo Store</image:caption>
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

fs.writeFileSync("public/sitemap.xml", xml)
const urls = (xml.match(/<loc>/g) || []).length
console.log(
  `sitemap.xml written — ${urls} URLs (${tools.length} tools, ${posts.length} posts)`,
)
