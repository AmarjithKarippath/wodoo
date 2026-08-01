"use client"

import { useState } from "react"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/tools/calc-ui"
import type { DomainCheckResult } from "@/lib/domain-check"

export function DomainAvailabilityChecker() {
  const [domain, setDomain] = useState("mybrand")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<DomainCheckResult[] | null>(null)
  const [label, setLabel] = useState<string | null>(null)

  async function check(event?: React.FormEvent) {
    event?.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ domain, multi: "1" })
      const response = await fetch(`/api/domain-check?${params.toString()}`)
      const data = (await response.json()) as {
        error?: string
        label?: string
        results?: DomainCheckResult[]
      }

      if (!response.ok) {
        setResults(null)
        setLabel(null)
        setError(data.error ?? "Lookup failed.")
        return
      }

      setLabel(data.label ?? null)
      setResults(data.results ?? [])
    } catch {
      setResults(null)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={check}
        className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <Field
          id="domain"
          label="Brand name or domain"
          hint="Enter a name (mybrand) or full domain (mybrand.com)"
        >
          <Input
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="mybrand"
            autoComplete="off"
          />
        </Field>
        <Button
          type="submit"
          disabled={loading}
          className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          Check availability
        </Button>
      </form>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {results ? (
        <div className="space-y-4">
          {label ? (
            <p className="text-sm text-muted-foreground">
              Results for <span className="font-semibold text-foreground">{label}</span> across popular ecommerce TLDs.
              Status is based on RDAP/DNS and may take time to update after a registration.
            </p>
          ) : null}
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Domain</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Registrar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {results.map((row) => (
                  <tr key={row.domain} className="bg-background">
                    <td className="px-4 py-3 font-semibold">{row.domain}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.registrar || "—"}
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

function StatusPill({ status }: { status: DomainCheckResult["status"] }) {
  const styles =
    status === "available"
      ? "bg-emerald-500/15 text-emerald-800"
      : status === "registered"
        ? "bg-red-500/10 text-red-700"
        : "bg-secondary text-muted-foreground"

  const label =
    status === "available"
      ? "Likely available"
      : status === "registered"
        ? "Registered"
        : "Unknown"

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>
      {label}
    </span>
  )
}
