"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/tools/calc-ui"

const DNB_URL = "https://www.dnb.com/duns-number/get-a-duns.html"

const PREP = [
  "Legal business name and any trade names",
  "Physical business address (not only a P.O. box where required)",
  "Mailing address",
  "Business phone number",
  "Number of employees",
  "Year started / formation date",
  "CEO / owner / principal name",
  "Legal structure (LLC, corp, etc.) and EIN if available",
]

export function DunsNumberHelper() {
  const [companyName, setCompanyName] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("United States")

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="duns-name" label="Legal company name" className="sm:col-span-2">
          <Input
            id="duns-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Wildgood LLC"
          />
        </Field>
        <Field id="duns-city" label="City">
          <Input id="duns-city" value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        <Field id="duns-country" label="Country">
          <Input id="duns-country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </Field>
      </form>

      <div className="rounded-2xl border border-border bg-secondary/30 p-6">
        <p className="text-sm font-semibold">D-U-N-S request prep</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Gather details for {companyName.trim() || "your company"}
          {city ? ` in ${city}` : ""}
          {country ? `, ${country}` : ""} before requesting a free D-U-N-S number from Dun &amp; Bradstreet.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {PREP.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          A D-U-N-S number is commonly used for corporate credit files, vendor onboarding, and some government contracting
          systems.
        </p>
      </div>

      <a
        href={DNB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-4 text-sm font-semibold transition-colors hover:border-ink hover:bg-secondary/40"
      >
        <span>Open Dun &amp; Bradstreet D-U-N-S request (official)</span>
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
      </a>
    </div>
  )
}
