import { buildSitemapXml } from "@/lib/build-sitemap"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const { xml } = await buildSitemapXml()
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  })
}
