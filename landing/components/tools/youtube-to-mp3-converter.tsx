"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/tools/calc-ui"
import {
  extractYoutubeId,
  fetchYoutubeOEmbed,
  type YoutubeOEmbed,
} from "@/lib/youtube"

/**
 * Official YouTube embed player focused on listening.
 * Does not download or extract MP3 files (against YouTube ToS / copyright).
 */
export function YoutubeToMp3Converter() {
  const [input, setInput] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  const [meta, setMeta] = useState<YoutubeOEmbed | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const videoId = useMemo(() => extractYoutubeId(input), [input])

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!videoId) {
        setMeta(null)
        setError(input.trim() ? "Enter a valid YouTube URL or 11-character video ID." : null)
        return
      }
      setLoading(true)
      setError(null)
      const data = await fetchYoutubeOEmbed(videoId)
      if (cancelled) return
      setLoading(false)
      if (!data) {
        setMeta(null)
        setError("Could not load that video. It may be private or unavailable.")
        return
      }
      setMeta(data)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [videoId, input])

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Paste a YouTube link to open an official in-browser player for listening.
        We do <strong className="font-semibold text-foreground">not</strong> download
        or convert videos to MP3 files — that violates YouTube&apos;s terms and copyright.
      </p>
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <Field id="yt-url" label="YouTube URL">
          <Input
            id="yt-url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
          />
        </Field>
      </form>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
      {videoId && meta ? (
        <div className="space-y-4">
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-foreground">
              {meta.title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{meta.author_name}</p>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-black">
            <iframe
              title={meta.title}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={`https://music.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in YouTube Music
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
