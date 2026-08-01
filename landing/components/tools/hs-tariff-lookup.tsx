"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { searchHsCodes } from "@/lib/hs-codes"

export function HsTariffLookup() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => searchHsCodes(query), [query])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="hs-query">Search by product or HS code</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="hs-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. cotton t-shirt, headphones, 6109.10"
            className="pl-9"
            autoComplete="off"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Browse common ecommerce HS headings. Final 8–10 digit codes differ by
          country — confirm with your customs broker.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {query.trim()
            ? `${results.length} result${results.length === 1 ? "" : "s"}`
            : "Popular starting codes"}
        </p>

        {results.length > 0 ? (
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {results.map((entry) => (
              <li key={entry.code} className="px-5 py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-lg font-bold tracking-tight text-foreground">
                    {entry.code}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {entry.chapter}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {entry.description}
                </p>
                {entry.notes ? (
                  <p className="mt-2 text-xs text-muted-foreground">{entry.notes}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.keywords.slice(0, 5).map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => setQuery(keyword)}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-primary/15 hover:text-foreground"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
            No codes matched “{query}”. Try a broader product name like “shoes”
            or “skincare”.
          </div>
        )}
      </div>
    </div>
  )
}
