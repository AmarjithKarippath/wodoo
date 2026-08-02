import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MarketplaceVsStandaloneCalculator } from "@/components/tools/marketplace-vs-standalone-calculator"

export const metadata: Metadata = {
  title: "Marketplace vs standalone break-even calculator",
  description:
    "Free Etsy vs Shopify break-even calculator — find the monthly order volume and GMV where a fixed website plan beats marketplace fees.",
  alternates: { canonical: "/tools/marketplace-vs-standalone-break-even" },
  openGraph: {
    title: "Marketplace vs. standalone break-even calculator — Woodo Store",
    images: [
      {
        url: "/tools/marketplace-vs-standalone-break-even.webp",
        width: 1200,
        height: 630,
        alt: "Online marketplace vs standalone break-even calculator for Etsy vs Shopify fees",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="marketplace-vs-standalone-break-even"
      title="Marketplace vs. standalone break-even calculator"
      intro="Find the monthly sales volume where a fixed website plan beats marketplace fees. Useful when you are weighing Etsy-style fees against your own store."
      description="Compare marketplace percentage fees with a fixed standalone store plan and find the monthly volume where your own site becomes cheaper."
    >
      <MarketplaceVsStandaloneCalculator />
    </ToolShell>
  )
}
