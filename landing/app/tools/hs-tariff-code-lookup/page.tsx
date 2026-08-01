import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { HsTariffLookup } from "@/components/tools/hs-tariff-lookup"

export const metadata: Metadata = {
  title: "HS tariff code lookup",
  description:
    "Look up Harmonized System (HS) tariff codes for common ecommerce products — search by keyword or code for customs classification.",
  alternates: { canonical: "/tools/hs-tariff-code-lookup" },
  openGraph: {
    title: "HS tariff code lookup — Woodo Store",
    description:
      "Find HS tariff codes for apparel, electronics, cosmetics, and more with a free product search.",
  },
}

export default function HsTariffCodeLookupPage() {
  return (
    <ToolShell
      title="HS tariff code lookup"
      description="Search Harmonized System (HS) codes by product name or code. Use the matches as a starting point for customs declarations — always verify the full local tariff schedule before shipping."
    >
      <HsTariffLookup />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a reliable HS Tariff Code Lookup tool? Our free HS code lookup and HS
        code finder make it easy to search and classify products accurately for
        international shipping. Whether you’re looking for an HTS code lookup,
        tariff code lookup, or free HS code lookup, this powerful HS code search
        also works as a complete Harmonized System code lookup and HTS tariff code
        lookup. Simply enter a product description to get instant results from our
        customs code lookup and commodity code lookup features — or use the free HS
        code finder to ensure correct classification, avoid customs delays, and
        calculate duties with confidence.
      </p>
    </ToolShell>
  )
}
