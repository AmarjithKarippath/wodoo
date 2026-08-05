import { getPool } from "@/lib/db"
import type { Block, Post } from "@/lib/posts"
import type { ParsedBlog } from "@/lib/blog-markdown"

type BlogRow = {
  slug: string
  title: string
  description: string
  published_at: string | Date
  updated_at: string | Date | null
  author: string
  reading_minutes: number
  tags: string[] | null
  hero: string | null
  body: Block[]
}

function toIsoDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

function rowToPost(row: BlogRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    publishedAt: toIsoDate(row.published_at),
    updatedAt: row.updated_at ? toIsoDate(row.updated_at) : undefined,
    author: row.author,
    readingMinutes: row.reading_minutes,
    tags: row.tags ?? [],
    hero: row.hero ?? undefined,
    body: row.body,
  }
}

export async function listDbPosts(): Promise<Post[]> {
  try {
    const pool = getPool()
    const { rows } = await pool.query<BlogRow>(
      `SELECT slug, title, description, published_at, updated_at, author,
              reading_minutes, tags, hero, body
       FROM blog_posts
       ORDER BY published_at DESC, created_at DESC`,
    )
    return rows.map(rowToPost)
  } catch (err) {
    console.error("listDbPosts failed:", err)
    return []
  }
}

export async function getDbPost(slug: string): Promise<Post | undefined> {
  try {
    const pool = getPool()
    const { rows } = await pool.query<BlogRow>(
      `SELECT slug, title, description, published_at, updated_at, author,
              reading_minutes, tags, hero, body
       FROM blog_posts
       WHERE slug = $1
       LIMIT 1`,
      [slug],
    )
    return rows[0] ? rowToPost(rows[0]) : undefined
  } catch (err) {
    console.error("getDbPost failed:", err)
    return undefined
  }
}

export async function createDbPost(
  post: ParsedBlog,
  overrides?: { slug?: string; tags?: string[] },
): Promise<Post> {
  const pool = getPool()
  const slug = overrides?.slug?.trim() || post.slug
  const tags = overrides?.tags?.length ? overrides.tags : post.tags

  const { rows } = await pool.query<BlogRow>(
    `INSERT INTO blog_posts
       (slug, title, description, published_at, author, reading_minutes, tags, body, source_markdown)
     VALUES ($1, $2, $3, $4::date, $5, $6, $7, $8::jsonb, $9)
     RETURNING slug, title, description, published_at, updated_at, author,
               reading_minutes, tags, hero, body`,
    [
      slug,
      post.title,
      post.description,
      post.publishedAt,
      post.author,
      post.readingMinutes,
      tags,
      JSON.stringify(post.body),
      post.sourceMarkdown,
    ],
  )

  return rowToPost(rows[0])
}

export async function deleteDbPost(slug: string): Promise<boolean> {
  const pool = getPool()
  const { rowCount } = await pool.query(
    `DELETE FROM blog_posts WHERE slug = $1`,
    [slug],
  )
  return (rowCount ?? 0) > 0
}
