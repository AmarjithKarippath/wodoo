"use client"

import { useMemo, useState } from "react"
import { Check, Copy, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/tools/calc-ui"
import { generateLinkInBioHtml, type BioLink } from "@/lib/link-in-bio"

const emptyLink = (): BioLink => ({ title: "", url: "" })

export function LinkInBioIntegrator() {
  const [brandName, setBrandName] = useState("Wildgood Co.")
  const [tagline, setTagline] = useState("Shop the collection")
  const [accent, setAccent] = useState("#111111")
  const [links, setLinks] = useState<BioLink[]>([
    { title: "Shop my store", url: "https://www.wodoo.store" },
    { title: "Best sellers", url: "https://www.wodoo.store/tools" },
    { title: "Join waitlist", url: "https://www.wodoo.store/#start" },
  ])
  const [copied, setCopied] = useState(false)

  const html = useMemo(
    () => generateLinkInBioHtml({ brandName, tagline, links, accent }),
    [brandName, tagline, links, accent],
  )

  const updateLink = (index: number, key: keyof BioLink, value: string) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [key]: value } : link)),
    )
  }

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="space-y-8">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field id="bio-brand" label="Brand name">
          <Input id="bio-brand" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        </Field>
        <Field id="bio-accent" label="Accent color">
          <Input id="bio-accent" type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-10 cursor-pointer p-1" />
        </Field>
        <Field id="bio-tagline" label="Tagline" className="sm:col-span-2">
          <Input id="bio-tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </Field>
      </form>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Store & social links</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setLinks((prev) => [...prev, emptyLink()])}
            disabled={links.length >= 8}
          >
            <Plus className="size-4" />
            Add link
          </Button>
        </div>
        {links.map((link, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-[1fr_1.2fr_auto]">
            <Field id={`bio-title-${index}`} label="Button title">
              <Input
                id={`bio-title-${index}`}
                value={link.title}
                placeholder="Shop now"
                onChange={(e) => updateLink(index, "title", e.target.value)}
              />
            </Field>
            <Field id={`bio-url-${index}`} label="URL">
              <Input
                id={`bio-url-${index}`}
                value={link.url}
                placeholder="https://yoursite.com"
                onChange={(e) => updateLink(index, "url", e.target.value)}
              />
            </Field>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove link"
                disabled={links.length <= 1}
                onClick={() => setLinks((prev) => prev.filter((_, i) => i !== index))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">Generated link-in-bio HTML</p>
          <Button
            type="button"
            onClick={copyHtml}
            className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy HTML"}
          </Button>
        </div>
        <pre className="max-h-80 overflow-auto rounded-2xl border border-border bg-secondary/30 p-4 text-xs leading-relaxed text-foreground">
          {html}
        </pre>
        <p className="text-xs text-muted-foreground">
          Paste into a static host, Notion embed, or your store microsite. Point Instagram / TikTok bio to that page.
        </p>
      </div>
    </div>
  )
}
