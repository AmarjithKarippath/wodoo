"use client"

import { useMemo, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, selectClassName } from "@/components/tools/calc-ui"
import {
  generateLegalDocument,
  type LegalDocType,
} from "@/lib/legal-documents"

export function StartupLegalDocumentGenerator() {
  const [docType, setDocType] = useState<LegalDocType>("operating-agreement")
  const [companyName, setCompanyName] = useState("Wildgood LLC")
  const [state, setState] = useState("Wyoming")
  const [memberNames, setMemberNames] = useState("Alex Founder, Sam Partner")
  const [effectiveDate, setEffectiveDate] = useState("2026-08-01")
  const [principalAddress, setPrincipalAddress] = useState("123 Main St, Cheyenne, WY")
  const [purpose, setPurpose] = useState("operate an ecommerce and digital products business")
  const [copied, setCopied] = useState(false)

  const doc = useMemo(
    () =>
      generateLegalDocument({
        docType,
        companyName,
        state,
        memberNames,
        effectiveDate,
        principalAddress,
        purpose,
      }),
    [docType, companyName, state, memberNames, effectiveDate, principalAddress, purpose],
  )

  const copy = async () => {
    await navigator.clipboard.writeText(doc)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="doc-type" label="Document type" className="sm:col-span-2">
          <select
            id="doc-type"
            className={selectClassName}
            value={docType}
            onChange={(e) => setDocType(e.target.value as LegalDocType)}
          >
            <option value="operating-agreement">LLC Operating Agreement</option>
            <option value="articles-of-organization">Articles of Organization (draft outline)</option>
            <option value="bylaws">Corporate Bylaws</option>
          </select>
        </Field>
        <Field id="doc-company" label="Company name">
          <Input id="doc-company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </Field>
        <Field id="doc-state" label="State / jurisdiction">
          <Input id="doc-state" value={state} onChange={(e) => setState(e.target.value)} />
        </Field>
        <Field id="doc-members" label="Members / shareholders" className="sm:col-span-2">
          <Input id="doc-members" value={memberNames} onChange={(e) => setMemberNames(e.target.value)} />
        </Field>
        <Field id="doc-date" label="Effective date">
          <Input id="doc-date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
        </Field>
        <Field id="doc-address" label="Principal address">
          <Input id="doc-address" value={principalAddress} onChange={(e) => setPrincipalAddress(e.target.value)} />
        </Field>
        <Field id="doc-purpose" label="Business purpose" className="sm:col-span-2">
          <Textarea id="doc-purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={3} />
        </Field>
      </form>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">Generated document draft</p>
          <Button
            type="button"
            onClick={copy}
            className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy text"}
          </Button>
        </div>
        <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-secondary/30 p-4 text-xs leading-relaxed">
          {doc}
        </pre>
        <p className="text-xs text-muted-foreground">
          Free educational templates inspired by open legal repositories — not a substitute for a lawyer or official
          state forms.
        </p>
      </div>
    </div>
  )
}
