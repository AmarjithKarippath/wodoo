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
      description="Compare marketplace percentage fees with a fixed standalone store plan and find the monthly volume where your own site becomes cheaper."
    >
      <MarketplaceVsStandaloneCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free marketplace vs standalone break-even calculator? This Etsy vs Shopify comparison tool and
        eBay vs website fee calculator shows the monthly transaction volume where a fixed ecommerce plan beats
        marketplace commissions. Use it as a seller platform cost calculator, DTC vs marketplace planner, or store
        migration break-even tool before leaving a marketplace.
      </p>
    </ToolShell>
  )
}
