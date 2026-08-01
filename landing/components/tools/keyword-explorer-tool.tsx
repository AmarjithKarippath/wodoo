"use client"

import { useMemo, useState } from "react"
import { Loader2, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type {
  KeywordExplorerResult,
  KeywordIdea,
  KeywordIntent,
} from "@/lib/keyword-explorer"

const INTENT_LABELS: Record<KeywordIntent, string> = {
  informational: "Informational",
  commercial: "Commercial",
  transactional: "Transactional",
  navigational: "Navigational",
}

function MetricBar({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "opportunity" | "difficulty"
}) {
  const color =
    tone === "opportunity" ? "bg-primary" : "bg-foreground/40"
  return (
    <div className="min-w-[5.5rem]">
      <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function IdeaRow({ idea }: { idea: KeywordIdea }) {
  return (
    <li className="flex flex-col gap-3 border-b border-border px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold text-foreground">{idea.keyword}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {INTENT_LABELS[idea.intent]} · {idea.source}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <MetricBar
          label="Opportunity"
          value={idea.opportunity}
          tone="opportunity"
        />
        <MetricBar
          label="Difficulty"
          value={idea.difficulty}
          tone="difficulty"
        />
      </div>
    </li>
  )
}

export function KeywordExplorerTool() {
  const [seed, setSeed] = useState("free shipping")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<KeywordExplorerResult | null>(null)
  const [intentFilter, setIntentFilter] = useState<"all" | KeywordIntent>("all")

  const visibleIdeas = useMemo(() => {
    if (!result) return []
    if (intentFilter === "all") return result.ideas
    return result.clusters[intentFilter]
  }, [result, intentFilter])

  async function explore(event?: React.FormEvent) {
    event?.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ q: seed })
      const response = await fetch(`/api/keyword-explorer?${params.toString()}`)
      const data = (await response.json()) as KeywordExplorerResult & {
        error?: string
      }

      if (!response.ok) {
        setResult(null)
        setError(data.error ?? "Could not explore keywords.")
        return
      }

      setResult(data)
      setIntentFilter("all")
    } catch {
      setResult(null)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={explore}
        className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <div className="space-y-2">
          <Label htmlFor="keyword-seed">Seed keyword</Label>
          <Input
            id="keyword-seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="e.g. shipping calculator"
            required
            minLength={2}
            maxLength={80}
          />
          <p className="text-xs text-muted-foreground">
            We’ll expand related terms, autocomplete ideas, and long-tail
            modifiers.
          </p>
        </div>
        <Button
          type="submit"
          disabled={loading || seed.trim().length < 2}
          className="rounded-full"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Exploring
            </>
          ) : (
            <>
              <Search />
              Explore keywords
            </>
          )}
        </Button>
      </form>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-secondary/30 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Ideas for
            </p>
            <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground">
              {result.seed}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {result.ideas.length} keyword ideas · Opportunity / difficulty are
              relative heuristics, not live search-volume data.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              [
                "all",
                "informational",
                "commercial",
                "transactional",
                "navigational",
              ] as const
            ).map((key) => {
              const count =
                key === "all" ? result.ideas.length : result.clusters[key].length
              const active = intentFilter === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIntentFilter(key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground/80 hover:bg-primary/15"
                  }`}
                >
                  {key === "all" ? "All" : INTENT_LABELS[key]} ({count})
                </button>
              )
            })}
          </div>

          {visibleIdeas.length > 0 ? (
            <ul className="overflow-hidden rounded-2xl border border-border bg-background">
              {visibleIdeas.map((idea) => (
                <IdeaRow key={idea.keyword} idea={idea} />
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
              No keywords in this intent group.
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
