import { NextResponse } from "next/server"
import { analyzeHtml, assertPublicHttpUrl } from "@/lib/seo-audit"

const MAX_CHARS = 1_500_000
const TIMEOUT_MS = 12_000

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawUrl = searchParams.get("url")?.trim() || ""

  if (!rawUrl) {
    return NextResponse.json({ error: "Enter a page URL to audit." }, { status: 400 })
  }

  let target: URL
  try {
    target = assertPublicHttpUrl(
      rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
        ? rawUrl
        : `https://${rawUrl}`,
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid URL." },
      { status: 400 },
    )
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(target.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "WodooStoreSeoAudit/1.0 (+https://www.wodoo.store/tools/seo-audit)",
        Accept: "text/html,application/xhtml+xml",
      },
    })

    const contentType = response.headers.get("content-type") || ""
    if (
      !contentType.includes("text/html") &&
      !contentType.includes("application/xhtml")
    ) {
      return NextResponse.json(
        { error: "That URL did not return an HTML page." },
        { status: 422 },
      )
    }

    const contentLength = Number(response.headers.get("content-length") || 0)
    if (contentLength > MAX_CHARS) {
      return NextResponse.json(
        { error: "Page is too large to audit." },
        { status: 413 },
      )
    }

    let html = await response.text()
    if (html.length > MAX_CHARS) {
      html = html.slice(0, MAX_CHARS)
    }

    const finalUrl = response.url || target.toString()
    const result = analyzeHtml(html, target.toString(), finalUrl, response.status)

    return NextResponse.json(result)
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The page took too long to respond."
        : "Could not fetch that page. Check the URL and try again."
    console.error("SEO audit failed:", error)
    return NextResponse.json({ error: message }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}
