/**
 * Optional local snapshot helper.
 * Runtime source of truth (includes admin/DB posts automatically):
 *   GET /sitemap.xml → app/sitemap.xml/route.ts
 *   GET /robots.txt  → app/robots.ts
 *
 * Do not write public/sitemap.xml — static public files override dynamic routes.
 */
import pg from "pg"
import { liveTools } from "../lib/tools.ts"
import { allPosts as staticPosts } from "../lib/posts.ts"

const tools = liveTools()
let dbCount = 0
if (process.env.DATABASE_URL) {
  try {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
    const { rows } = await pool.query(`SELECT COUNT(*)::int AS n FROM blog_posts`)
    dbCount = rows[0]?.n ?? 0
    await pool.end()
  } catch {
    dbCount = 0
  }
}

const staticCount = staticPosts().length
const postCount = staticCount + dbCount
// home + tools index + tools + blog index + posts
const urlCount = 1 + 1 + tools.length + 1 + postCount

console.log(
  `Dynamic SEO routes active — ~${urlCount} URLs (${tools.length} tools, ${staticCount} static posts + ${dbCount} DB posts)`,
)
console.log("Serve /sitemap.xml and /robots.txt from the Next.js app (not public/).")
