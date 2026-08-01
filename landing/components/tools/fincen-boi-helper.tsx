"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field, selectClassName } from "@/components/tools/calc-ui"

const FINCEN_URL = "https://www.fincen.gov/boi"

const OWNER_FIELDS = [
  "Full legal name",
  "Date of birth",
  "Residential address",
  "Unique identifying number + issuing jurisdiction (passport/driver’s license)",
  "Image of the identifying document (as required by the portal)",
]

export function FincenBoiHelper() {
  const [companyName, setCompanyName] = useState("")
  const [formedIn, setFormedIn] = useState("United States")
  const [owners, setOwners] = useState("1")

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="boi-company" label="Reporting company name" className="sm:col-span-2">
          <Input
            id="boi-company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Wildgood LLC"
          />
        </Field>
        <Field id="boi-formed" label="Formation / registration">
          <select
            id="boi-formed"
            className={selectClassName}
            value={formedIn}
            onChange={(e) => setFormedIn(e.target.value)}
          >
            <option>United States</option>
            <option>Foreign entity registered in the US</option>
          </select>
        </Field>
        <Field id="boi-owners" label="Beneficial owners to report">
          <Input
            id="boi-owners"
            type="number"
            min="1"
            max="20"
            value={owners}
            onChange={(e) => setOwners(e.target.value)}
          />
        </Field>
      </form>

      <div className="rounded-2xl border border-border bg-secondary/30 p-6">
        <p className="text-sm font-semibold">BOI filing prep sheet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Prepare company details for {companyName.trim() || "your reporting company"} ({formedIn}) and gather the
          following for about {owners} beneficial owner(s):
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {OWNER_FIELDS.map((item) => (
            <li key={item}>• {item}</li>
          ))}
          <li>• Company formation details, EIN if available, and current business address</li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Deadlines and exemptions change. Confirm current FinCEN Beneficial Ownership Information rules before filing.
        </p>
      </div>

      <a
        href={FINCEN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-4 text-sm font-semibold transition-colors hover:border-ink hover:bg-secondary/40"
      >
        <span>Open FinCEN BOI e-filing information (official)</span>
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
      </a>
    </div>
  )
}
