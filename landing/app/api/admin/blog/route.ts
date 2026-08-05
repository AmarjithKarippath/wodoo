import { NextResponse } from "next/server"
import { z } from "zod"
import { isAuthorizedAdmin, getAdminCredentials } from "@/lib/admin-auth"
import { parseChatGptBlog } from "@/lib/blog-markdown"
import { createDbPost, listDbPosts, deleteDbPost } from "@/lib/blog-db"
import { getPost as getStaticPost } from "@/lib/posts"
import { syncSeoFiles } from "@/lib/sync-seo-files"

export const dynamic = "force-dynamic"

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Wodoo Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  })
}

function requireAdmin(request: Request) {
  if (!getAdminCredentials()) {
    return new NextResponse("Admin is not configured", { status: 503 })
  }
  if (!isAuthorizedAdmin(request.headers.get("authorization"))) {
    return unauthorized()
  }
  return null
}

const publishSchema = z.object({
  markdown: z.string().min(20),
  slug: z.string().max(200).optional(),
  tags: z.string().optional(),
})

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const posts = await listDbPosts()
  return NextResponse.json({
    posts: posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      publishedAt: p.publishedAt,
      readingMinutes: p.readingMinutes,
    })),
  })
}

export async function POST(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = publishSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Provide markdown (at least 20 characters)." },
      { status: 400 },
    )
  }

  let draft
  try {
    draft = parseChatGptBlog(parsed.data.markdown)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not parse markdown." },
      { status: 400 },
    )
  }

  const slug = (parsed.data.slug?.trim() || draft.slug)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")

  if (!slug) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 })
  }

  if (getStaticPost(slug)) {
    return NextResponse.json(
      { error: `Slug "${slug}" already exists as a built-in post. Choose another.` },
      { status: 409 },
    )
  }

  const tags = parsed.data.tags
    ? parsed.data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : undefined

  try {
    const post = await createDbPost(draft, { slug, tags })
    let seo = null
    try {
      seo = await syncSeoFiles()
    } catch (err) {
      console.error("SEO file sync failed (dynamic /sitemap.xml still includes the post):", err)
    }
    return NextResponse.json({
      ok: true,
      post: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
        href: `/blog/${post.slug}`,
      },
      seo,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Save failed"
    if (message.includes("unique") || message.includes("duplicate")) {
      return NextResponse.json(
        { error: `Slug "${slug}" already exists. Change the slug and try again.` },
        { status: 409 },
      )
    }
    console.error("createDbPost failed:", err)
    return NextResponse.json(
      { error: "Could not save post. Is the blog_posts migration applied?" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")?.trim()
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 })
  }

  const ok = await deleteDbPost(slug)
  if (!ok) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  let seo = null
  try {
    seo = await syncSeoFiles()
  } catch (err) {
    console.error("SEO file sync failed after delete:", err)
  }
  return NextResponse.json({ ok: true, seo })
}
