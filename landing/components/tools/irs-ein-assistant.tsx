"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field, selectClassName } from "@/components/tools/calc-ui"

const IRS_EIN_URL =
  "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"

const CHECKLIST = [
  "Legal name of the entity exactly as it will appear on formation documents",
  "Trade name / DBA (if any)",
  "Responsible party’s name and SSN/ITIN (or equivalent as required)",
  "Entity type (LLC, corporation, partnership, sole prop, etc.)",
  "Reason for applying (started a new business, banking, hiring, etc.)",
  "Principal business address and mailing address",
  "Closing month of accounting year",
]

export function IrsEinAssistant() {
  const [entityType, setEntityType] = useState("LLC")
  const [legalName, setLegalName] = useState("")
  const [state, setState] = useState("Wyoming")

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="ein-type" label="Entity type">
          <select
            id="ein-type"
            className={selectClassName}
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
          >
            <option>LLC</option>
            <option>Corporation</option>
            <option>Partnership</option>
            <option>Sole proprietorship</option>
            <option>Estate / Trust</option>
          </select>
        </Field>
        <Field id="ein-state" label="Formation state">
          <Input id="ein-state" value={state} onChange={(e) => setState(e.target.value)} />
        </Field>
        <Field id="ein-name" label="Legal entity name" className="sm:col-span-2">
          <Input
            id="ein-name"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            placeholder="Wildgood LLC"
          />
        </Field>
      </form>

      <div className="rounded-2xl border border-border bg-secondary/30 p-6">
        <p className="text-sm font-semibold">Ready for the IRS EIN Online Assistant</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {legalName.trim() || "Your entity"} ({entityType}) · {state}. Have the items below ready — the IRS tool can
          issue an EIN immediately for eligible applicants.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {CHECKLIST.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      <a
        href={IRS_EIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-4 text-sm font-semibold transition-colors hover:border-ink hover:bg-secondary/40"
      >
        <span>Open IRS EIN Online Assistant (official)</span>
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
      </a>
    </div>
  )
}
