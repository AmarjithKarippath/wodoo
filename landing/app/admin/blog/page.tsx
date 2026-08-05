import { BlogPublisher } from "@/components/admin/blog-publisher"
import { listDbPosts } from "@/lib/blog-db"

export const dynamic = "force-dynamic"

export default async function AdminBlogPage() {
  const posts = await listDbPosts()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Blog publisher
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste a ChatGPT blog (with <code className="rounded bg-secondary px-1"># Title</code>{" "}
          headings) and publish in one click.
        </p>
      </div>
      <BlogPublisher
        initialPosts={posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          publishedAt: p.publishedAt,
          readingMinutes: p.readingMinutes,
        }))}
      />
    </div>
  )
}
