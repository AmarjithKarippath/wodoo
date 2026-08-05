import { listDbPosts, getDbPost } from "@/lib/blog-db"
import { allPosts as staticAllPosts, getPost as getStaticPost, type Post } from "@/lib/posts"

/** Static posts + DB posts, newest first. DB wins on slug collision. */
export async function allPostsMerged(): Promise<Post[]> {
  const dbPosts = await listDbPosts()
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const staticPosts = staticAllPosts().filter((p) => !dbSlugs.has(p.slug))
  return [...dbPosts, ...staticPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
}

export async function getPostMerged(slug: string): Promise<Post | undefined> {
  const fromDb = await getDbPost(slug)
  if (fromDb) return fromDb
  return getStaticPost(slug)
}
