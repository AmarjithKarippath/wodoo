import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MarketplaceVsStandaloneCalculator } from "@/components/tools/marketplace-vs-standalone-calculator"

export const metadata: Metadata = {
  title: "Marketplace vs standalone break-even calculator",
  description:
    "Free Etsy vs Shopify break-even calculator — find the monthly order volume and GMV where a fixed website plan beats marketplace fees.",
  alternates: { canonical: "/tools/marketplace-vs-standalone-break-even" },
}

export default function Page() {
  return (
    <ToolShell
      title="Marketplace vs. standalone break-even calculator"
      intro="Find the monthly sales volume where a fixed website plan beats marketplace fees. Useful when you are weighing Etsy-style fees against your own store."
      description="Compare marketplace percentage fees with a fixed standalone store plan and find the monthly volume where your own site becomes cheaper."
    >
      <MarketplaceVsStandaloneCalculator />
    </ToolShell>
  )
}
