/** Extract a YouTube video ID from common URL formats. */
export function extractYoutubeId(input: string): string | null {
  const raw = input.trim()
  if (!raw) return null
  if (/^[\w-]{11}$/.test(raw)) return raw

  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./, "")
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0]
      return id && /^[\w-]{11}$/.test(id) ? id : null
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const v = url.searchParams.get("v")
      if (v && /^[\w-]{11}$/.test(v)) return v
      const parts = url.pathname.split("/").filter(Boolean)
      if (
        (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") &&
        parts[1] &&
        /^[\w-]{11}$/.test(parts[1])
      ) {
        return parts[1]
      }
    }
  } catch {
    return null
  }
  return null
}

export type YoutubeOEmbed = {
  title: string
  author_name: string
  thumbnail_url: string
  html: string
}

export async function fetchYoutubeOEmbed(
  videoId: string,
): Promise<YoutubeOEmbed | null> {
  try {
    const res = await fetch(
      `/api/youtube-oembed?v=${encodeURIComponent(videoId)}`,
    )
    if (!res.ok) return null
    return (await res.json()) as YoutubeOEmbed
  } catch {
    return null
  }
}
