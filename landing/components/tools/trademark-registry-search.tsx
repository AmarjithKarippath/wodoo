"use client"

import { useMemo, useState } from "react"
import { ExternalLink, Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import {
  TRADEMARK_JURISDICTIONS,
  analyzeMarkStrength,
} from "@/lib/trademark-search"
import type { DomainCheckResult } from "@/lib/domain-check"

export function TrademarkRegistrySearch() {
  const [mark, setMark] = useState("Wildgood")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [domains, setDomains] = useState<DomainCheckResult[] | null>(null)

  const strength = useMemo(() => analyzeMarkStrength(mark), [mark])

  async function search(event?: React.FormEvent) {
    event?.preventDefault()
    const value = mark.trim()
    if (!value) {
      setError("Enter a brand or trademark to search.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ domain: value, multi: "1" })
      const response = await fetch(`/api/domain-check?${params.toString()}`)
      const data = (await response.json()) as {
        error?: string
        results?: DomainCheckResult[]
      }

      if (!response.ok) {
        setDomains(null)
        setError(data.error ?? "Domain side-check failed.")
        return
      }

      setDomains(data.results ?? [])
    } catch {
      setDomains(null)
      setError("Something went wrong checking related domains.")
    } finally {
      setLoading(false)
    }
  }

  const availableCount = domains?.filter((d) => d.status === "available").length ?? 0

  return (
    <div className="space-y-8">
      <form
        onSubmit={search}
        className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <Field
          id="tm-mark"
          label="Brand / trademark"
          hint="We’ll score distinctiveness, open official registry searches, and check matching domains."
        >
          <Input
            id="tm-mark"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            placeholder="Your brand name"
          />
        </Field>
        <Button
          type="submit"
          disabled={loading}
          className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          Analyze & search
        </Button>
      </form>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <ResultPanel
        title="Mark strength snapshot"
        value={`${strength.score}/100`}
        subtitle={`Rated ${strength.rating} for distinctiveness heuristics — not legal advice.`}
      >
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          {strength.notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </ResultPanel>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Official trademark & registry searches</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TRADEMARK_JURISDICTIONS.map((jurisdiction) => (
            <a
              key={jurisdiction.id}
              href={jurisdiction.searchUrl(mark.trim() || "brand")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-ink hover:bg-secondary/40"
            >
              <span>{jurisdiction.label}</span>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>

      {domains ? (
        <div className="space-y-4">
          <ResultPanel
            title="Matching domain availability"
            value={`${availableCount} open`}
            subtitle="Related domains for the same brand label across popular TLDs."
          >
            <StatGrid
              items={[
                {
                  label: "Checked",
                  value: String(domains.length),
                },
                {
                  label: "Likely available",
                  value: String(availableCount),
                },
                {
                  label: "Registered",
                  value: String(domains.filter((d) => d.status === "registered").length),
                },
                {
                  label: "Unknown",
                  value: String(domains.filter((d) => d.status === "unknown").length),
                },
              ]}
            />
          </ResultPanel>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[24rem] text-left text-sm">
              <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Domain</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {domains.map((row) => (
                  <tr key={row.domain}>
                    <td className="px-4 py-3 font-semibold">{row.domain}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {row.status === "available" ? "Likely available" : row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  )
}
