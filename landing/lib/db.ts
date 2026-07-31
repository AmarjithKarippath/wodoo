import { Pool } from "pg"

const globalForPg = globalThis as typeof globalThis & {
  pgPool?: Pool
}

export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured")
  }

  if (!globalForPg.pgPool) {
    globalForPg.pgPool = new Pool({ connectionString })
  }

  return globalForPg.pgPool
}
