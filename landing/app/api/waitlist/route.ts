import { NextResponse } from "next/server"
import { z } from "zod"
import { getPool } from "@/lib/db"

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  email: z.string().trim().email("Enter a valid email").max(255),
  storeName: z.string().trim().min(1, "Store name is required").max(255),
  website: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((value) => value || undefined)
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "Enter a valid website URL (include https://)",
    ),
})

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const parsed = waitlistSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid form data"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const { name, email, storeName, website } = parsed.data

  try {
    const pool = getPool()
    await pool.query(
      `INSERT INTO waitlist (name, email, store_name, website)
       VALUES ($1, $2, $3, $4)`,
      [name, email.toLowerCase(), storeName, website ?? null],
    )
  } catch (error) {
    const pgError = error as { code?: string }
    if (pgError.code === "23505") {
      return NextResponse.json(
        { error: "This email is already registered." },
        { status: 409 },
      )
    }

    console.error("Failed to save waitlist entry:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
