import { getPool } from "@/lib/db"

export type WaitlistEntry = {
  id: number
  name: string
  email: string
  storeName: string
  website: string | null
  createdAt: Date
}

export async function getWaitlistStats() {
  const pool = getPool()
  const { rows } = await pool.query<{
    total: string
    today: string
    last_7_days: string
  }>(`
    SELECT
      COUNT(*)::text AS total,
      COUNT(*) FILTER (WHERE created_at >= date_trunc('day', NOW()))::text AS today,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::text AS last_7_days
    FROM waitlist
  `)

  const row = rows[0]
  return {
    total: Number(row?.total ?? 0),
    today: Number(row?.today ?? 0),
    last7Days: Number(row?.last_7_days ?? 0),
  }
}

export async function listWaitlistEntries(limit = 500): Promise<WaitlistEntry[]> {
  const pool = getPool()
  const { rows } = await pool.query<{
    id: number
    name: string
    email: string
    store_name: string
    website: string | null
    created_at: Date
  }>(
    `SELECT id, name, email, store_name, website, created_at
     FROM waitlist
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit],
  )

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    storeName: row.store_name,
    website: row.website,
    createdAt: row.created_at,
  }))
}
