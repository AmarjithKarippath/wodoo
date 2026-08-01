import { NextResponse } from "next/server"
import { buildKeywordIdeas } from "@/lib/keyword-explorer"

type DatamuseWord = { word: string; score?: number }

async function fetchDatamuse(url: string): Promise<string[]> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  })
  if (!response.ok) return []
  const data = (await response.json()) as DatamuseWord[]
  return data
    .map((row) => row.word)
    .filter((word) => typeof word === "string" && word.length > 1)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const seed = (searchParams.get("q") || "").trim()

  if (seed.length < 2) {
    return NextResponse.json(
      { error: "Enter a seed keyword (at least 2 characters)." },
      { status: 400 },
    )
  }
  if (seed.length > 80) {
    return NextResponse.json(
      { error: "Keep the seed keyword under 80 characters." },
      { status: 400 },
    )
  }

  const encoded = encodeURIComponent(seed)

  try {
    const [related, triggered, suggestions] = await Promise.all([
      fetchDatamuse(`https://api.datamuse.com/words?ml=${encoded}&max=30`),
      fetchDatamuse(`https://api.datamuse.com/words?rel_trg=${encoded}&max=20`),
      fetchDatamuse(`https://api.datamuse.com/sug?s=${encoded}&max=15`),
    ])

    const result = buildKeywordIdeas(
      seed,
      [...related, ...triggered],
      suggestions,
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error("Keyword explorer failed:", error)
    return NextResponse.json(
      { error: "Could not explore keywords right now. Try again." },
      { status: 502 },
    )
  }
}
