"use client"

import { useMemo, useState } from "react"
import { ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field, ResultPanel } from "@/components/tools/calc-ui"
import { analyzeMarkStrength } from "@/lib/trademark-search"

const TESS_URL =
  "https://tmsearch.uspto.gov/search/search-information"

export function UsptoTessSearch() {
  const [mark, setMark] = useState("Wildgood")
  const strength = useMemo(() => analyzeMarkStrength(mark), [mark])
  const query = mark.trim() || "brand"

  return (
    <div className="space-y-8">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Field
          id="tess-mark"
          label="Proposed registration / brand name"
          hint="Cross-check your company name against active U.S. trademarks before you file."
        >
          <Input
            id="tess-mark"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            placeholder="Your brand or company name"
          />
        </Field>
      </form>

      <ResultPanel
        title="Pre-search distinctiveness snapshot"
        value={`${strength.score}/100`}
        subtitle={`Rated ${strength.rating} — not a clearance opinion.`}
      >
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          {strength.notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </ResultPanel>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Open USPTO Trademark Electronic Search System (TESS)</p>
        <a
          href={`https://tmsearch.uspto.gov/search/search-results?query=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-4 text-sm font-semibold transition-colors hover:border-ink hover:bg-secondary/40"
        >
          <span>Search “{query}” on USPTO TESS</span>
          <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
        </a>
        <a
          href={TESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-ink hover:bg-secondary/40"
        >
          <span>USPTO trademark search help &amp; information</span>
          <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
        </a>
        <p className="text-xs text-muted-foreground">
          Search identical marks, similar spellings, and related goods/services classes. Consider counsel for a formal
          clearance search before nationwide branding or registration.
        </p>
      </div>
    </div>
  )
}
