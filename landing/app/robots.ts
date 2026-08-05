import type { MetadataRoute } from "next"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

export const dynamic = "force-dynamic"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tools", "/tools/", "/blog", "/blog/"],
        disallow: ["/api/", "/api/*", "/admin", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/tools", "/blog"],
        disallow: ["/api/", "/admin"],
      },
    ],
    host: "www.wodoo.store",
    sitemap: `${SITE}/sitemap.xml`,
  }
}
