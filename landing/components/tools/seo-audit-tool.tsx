"use client"

import { useState } from "react"
import { Loader2, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { SeoAuditResult, SeoSeverity } from "@/lib/seo-audit"

function severityStyles(severity: SeoSeverity): string {
  switch (severity) {
    case "pass":
      return "border-primary/30 bg-primary/5 text-foreground"
    case "warn":
      return "border-amber-500/30 bg-amber-500/5 text-foreground"
    case "fail":
      return "border-destructive/30 bg-destructive/5 text-foreground"
    default:
      return "border-border bg-secondary/40 text-foreground"
  }
}

function severityLabel(severity: SeoSeverity): string {
  switch (severity) {
    case "pass":
      return "Pass"
    case "warn":
      return "Warn"
    case "fail":
      return "Fail"
    default:
      return "Info"
  }
}

export function SeoAuditTool() {
  const [url, setUrl] = useState("https://www.wodoo.store")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SeoAuditResult | null>(null)

  async function runAudit(event?: React.FormEvent) {
    event?.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ url })
      const response = await fetch(`/api/seo-audit?${params.toString()}`)
      const data = (await response.json()) as SeoAuditResult & { error?: string }

      if (!response.ok) {
        setResult(null)
        setError(data.error ?? "Audit failed.")
        return
      }

      setResult(data)
    } catch {
      setResult(null)
      setError("Something went wrong running the audit.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={runAudit}
        className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <div className="space-y-2">
          <Label htmlFor="seo-url">Page URL</Label>
          <Input
            id="seo-url"
            type="url"
            inputMode="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Audits public HTML pages for title, meta, headings, social tags, and
            more.
          </p>
        </div>
        <Button
          type="submit"
          disabled={loading || !url.trim()}
          className="rounded-full"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Auditing
            </>
          ) : (
            <>
              <Search />
              Run SEO audit
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
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
            <p className="text-sm font-medium text-muted-foreground">SEO score</p>
            <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-foreground">
              {result.score}
              <span className="text-2xl text-muted-foreground">/100</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground break-all">
              Audited{" "}
              <a
                href={result.finalUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {result.finalUrl}
              </a>
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-border bg-background px-3 py-3">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Pass
                </dt>
                <dd className="mt-1 text-xl font-bold text-foreground">
                  {result.summary.pass}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-3">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Warn
                </dt>
                <dd className="mt-1 text-xl font-bold text-foreground">
                  {result.summary.warn}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-3">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Fail
                </dt>
                <dd className="mt-1 text-xl font-bold text-foreground">
                  {result.summary.fail}
                </dd>
              </div>
            </dl>
          </div>

          <ul className="space-y-3">
            {result.checks.map((check) => (
              <li
                key={check.id}
                className={`rounded-2xl border px-5 py-4 ${severityStyles(check.severity)}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-foreground">{check.label}</p>
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {severityLabel(check.severity)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{check.message}</p>
                {check.value ? (
                  <p className="mt-2 break-all font-mono text-xs text-foreground/80">
                    {check.value}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground">
            On-page technical snapshot only — not a full Google ranking audit.
            JavaScript-rendered content may not be fully visible to this checker.
          </p>
        </div>
      ) : null}
    </div>
  )
}
