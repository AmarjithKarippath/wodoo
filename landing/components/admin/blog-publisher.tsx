"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { parseChatGptBlog } from "@/lib/blog-markdown"

type DbPostSummary = {
  slug: string
  title: string
  publishedAt: string
  readingMinutes: number
}

export function BlogPublisher({ initialPosts }: { initialPosts: DbPostSummary[] }) {
  const [markdown, setMarkdown] = useState("")
  const [slugOverride, setSlugOverride] = useState("")
  const [tagsOverride, setTagsOverride] = useState("")
  const [posts, setPosts] = useState(initialPosts)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [publishedHref, setPublishedHref] = useState<string | null>(null)

  const preview = useMemo(() => {
    if (markdown.trim().length < 20) return null
    try {
      return parseChatGptBlog(markdown)
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Parse error" }
    }
  }, [markdown])

  async function publish() {
    setBusy(true)
    setError(null)
    setMessage(null)
    setPublishedHref(null)
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          markdown,
          slug: slugOverride || undefined,
          tags: tagsOverride || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Publish failed")
        return
      }
      const seoNote = data.seo
        ? ` · sitemap now ${data.seo.urlCount} URLs (${data.seo.postCount} posts)`
        : ""
      setMessage(`Published: ${data.post.title}${seoNote}`)
      setPublishedHref(data.post.href)
      setPosts((prev) => [
        {
          slug: data.post.slug,
          title: data.post.title,
          publishedAt: data.post.publishedAt,
          readingMinutes: preview && "readingMinutes" in preview ? preview.readingMinutes : 5,
        },
        ...prev.filter((p) => p.slug !== data.post.slug),
      ])
      setMarkdown("")
      setSlugOverride("")
      setTagsOverride("")
    } catch {
      setError("Network error — try again.")
    } finally {
      setBusy(false)
    }
  }

  async function remove(slug: string) {
    if (!confirm(`Delete published post “${slug}”?`)) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Delete failed")
        return
      }
      setPosts((prev) => prev.filter((p) => p.slug !== slug))
      setMessage(`Deleted ${slug}`)
    } catch {
      setError("Network error — try again.")
    } finally {
      setBusy(false)
    }
  }

  const parsedOk = preview && !("error" in preview)

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Paste ChatGPT blog</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste the full Markdown starting with <code className="rounded bg-secondary px-1"># Title</code>.
            Headings, lists, FAQ, and sources are parsed automatically. Publishing also refreshes{" "}
            <code className="rounded bg-secondary px-1">/sitemap.xml</code> and{" "}
            <code className="rounded bg-secondary px-1">/robots.txt</code> (dynamic — includes every new post).
          </p>
        </div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="# Your Blog Title&#10;&#10;First paragraph becomes the meta description…&#10;&#10;---&#10;&#10;# Next section&#10;…"
          className="border-input min-h-[320px] w-full rounded-xl border bg-transparent px-4 py-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug override (optional)
            </label>
            <Input
              id="slug"
              value={slugOverride}
              onChange={(e) => setSlugOverride(e.target.value)}
              placeholder={parsedOk ? preview.slug : "auto-from-title"}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags override (optional, comma-separated)
            </label>
            <Input
              id="tags"
              value={tagsOverride}
              onChange={(e) => setTagsOverride(e.target.value)}
              placeholder={parsedOk ? preview.tags.join(", ") : "auto-from-title"}
            />
          </div>
        </div>

        {preview && "error" in preview ? (
          <p className="text-sm text-destructive">{preview.error}</p>
        ) : null}

        {parsedOk ? (
          <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-sm">
            <p className="font-semibold text-foreground">{preview.title}</p>
            <p className="mt-2 text-muted-foreground">{preview.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              /blog/{slugOverride.trim() || preview.slug} · {preview.readingMinutes} min ·{" "}
              {(tagsOverride
                ? tagsOverride.split(",").map((t) => t.trim()).filter(Boolean)
                : preview.tags
              ).join(", ") || "no tags"}{" "}
              · {preview.body.length} blocks
            </p>
          </div>
        ) : null}

        {error ? (
          <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm">
            {message}{" "}
            {publishedHref ? (
              <Link href={publishedHref} className="font-semibold text-primary underline-offset-4 hover:underline">
                View post →
              </Link>
            ) : null}
          </p>
        ) : null}

        <Button
          type="button"
          disabled={busy || !parsedOk}
          onClick={() => void publish()}
        >
          {busy ? "Publishing…" : "Publish blog"}
        </Button>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Published from admin</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Posts saved to the database (not the built-in static list).
        </p>
        <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
          {posts.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              No admin-published posts yet.
            </li>
          ) : (
            posts.map((p) => (
              <li
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    /blog/{p.slug} · {p.publishedAt} · {p.readingMinutes} min
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void remove(p.slug)}
                  className="text-sm text-destructive hover:underline"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  )
}
