import { buildSitemapXml } from "@/lib/build-sitemap"

/**
 * Rebuild SEO stats after blog publish/delete.
 * Live discovery uses dynamic routes (always include DB posts):
 *   GET /sitemap.xml → app/sitemap.xml/route.ts
 *   GET /robots.txt  → app/robots.ts
 *
 * We intentionally do not write public/sitemap.xml or public/robots.txt —
 * static files in public/ would override those dynamic routes in Next.js.
 */
export async function syncSeoFiles(): Promise<{
  urlCount: number
  toolCount: number
  postCount: number
}> {
  const { stats } = await buildSitemapXml()
  return stats
}
