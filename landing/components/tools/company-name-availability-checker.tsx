"use client"

import { useMemo, useState } from "react"
import { ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/tools/calc-ui"
import {
  ENTITY_PORTALS,
  entityNameTips,
  normalizeEntityName,
} from "@/lib/entity-search"

export function CompanyNameAvailabilityChecker() {
  const [name, setName] = useState("Wildgood Ventures LLC")
  const tips = useMemo(() => entityNameTips(name), [name])
  const core = normalizeEntityName(name)

  return (
    <div className="space-y-8">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Field
          id="entity-name"
          label="Proposed company / LLC name"
          hint="We’ll prepare official registry search links. Availability is confirmed only on government portals."
        >
          <Input
            id="entity-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Acme Trading LLC"
          />
        </Field>
      </form>

      <div className="rounded-2xl border border-border bg-secondary/30 p-6">
        <p className="text-sm font-semibold">Name check checklist</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Core name for searches: <span className="font-medium text-foreground">{core || "—"}</span>
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {tips.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Official entity search portals</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ENTITY_PORTALS.map((portal) => (
            <a
              key={portal.id}
              href={portal.searchUrl(name.trim() || core || "company")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border px-4 py-3 transition-colors hover:border-ink hover:bg-secondary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{portal.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{portal.region}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{portal.description}</p>
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
