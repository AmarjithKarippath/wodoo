import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LandedProductCostCalculator } from "@/components/tools/landed-product-cost-calculator"

export const metadata: Metadata = {
  title: "Landed product cost calculator",
  description:
    "Free landed cost calculator — estimate true product cost including factory price, inbound shipping, duties, taxes, insurance, and handling.",
  alternates: { canonical: "/tools/landed-product-cost-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Landed product cost calculator"
      description="Roll up factory cost, inbound freight, duties, taxes, insurance, and handling into total landed cost and cost per unit."
    >
      <LandedProductCostCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free landed product cost calculator? This landed cost calculator and import product cost calculator
        helps you combine factory price, inbound shipping, customs duties, taxes, insurance, and brokerage into true
        cost per unit. Use it as a total landed cost calculator, inventory cost calculator, or sourcing cost
        calculator so your retail price covers the full cost of getting products to your warehouse.
      </p>
    </ToolShell>
  )
}
