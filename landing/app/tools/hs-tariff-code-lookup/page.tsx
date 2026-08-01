import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { HsTariffLookup } from "@/components/tools/hs-tariff-lookup"

export const metadata: Metadata = {
  title: "HS tariff code lookup",
  description:
    "Look up Harmonized System (HS) tariff codes for common ecommerce products — search by keyword or code for customs classification.",
  alternates: { canonical: "/tools/hs-tariff-code-lookup" },
  openGraph: {
    images: [{ url: "/tools/hs-tariff-code-lookup.png", width: 1200, height: 630, alt: "HS tariff code lookup — free ecommerce tool" }],
    title: "HS tariff code lookup — Woodo Store",
    description:
      "Find HS tariff codes for apparel, electronics, cosmetics, and more with a free product search.",
  },
}

export default function HsTariffCodeLookupPage() {
  return (
    <ToolShell
      title="HS tariff code lookup"
      intro="Search common Harmonized System codes by product keyword or code. Treat matches as a starting point, then confirm against your local tariff schedule."
      description="Search Harmonized System (HS) codes by product name or code. Use the matches as a starting point for customs declarations — always verify the full local tariff schedule before shipping."
    >
      <HsTariffLookup />
    </ToolShell>
  )
}
