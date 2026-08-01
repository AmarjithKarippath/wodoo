import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LandedProductCostCalculator } from "@/components/tools/landed-product-cost-calculator"

export const metadata: Metadata = {
  title: "Landed product cost calculator",
  description:
    "Free landed cost calculator — estimate true product cost including factory price, inbound shipping, duties, taxes, insurance, and handling.",
  alternates: { canonical: "/tools/landed-product-cost-calculator" },
  openGraph: {
    title: "Landed product cost calculator — Woodo Store",
    images: [
      {
        url: "/tools/landed-product-cost-calculator.png",
        width: 1200,
        height: 630,
        alt: "Landed product cost calculator — free ecommerce tool",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      title="Landed product cost calculator"
      intro="Add factory cost, freight, duties, and handling into a true cost per unit. Better purchasing decisions start with the full landed number."
      description="Roll up factory cost, inbound freight, duties, taxes, insurance, and handling into total landed cost and cost per unit."
    >
      <LandedProductCostCalculator />
    </ToolShell>
  )
}
