import { NextResponse } from "next/server"
import { extractYoutubeId } from "@/lib/youtube"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const urlOrId = searchParams.get("url") || searchParams.get("v") || ""
  const id = extractYoutubeId(urlOrId)
  if (!id) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })
  }

  const watchUrl = `https://www.youtube.com/watch?v=${id}`
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`

  try {
    const res = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }
    const data = await res.json()
    return NextResponse.json({ ...data, videoId: id })
  } catch {
    return NextResponse.json({ error: "Lookup failed" }, { status: 502 })
  }
}
