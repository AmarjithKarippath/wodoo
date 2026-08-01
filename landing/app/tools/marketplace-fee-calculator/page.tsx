import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MarketplaceFeeCalculator } from "@/components/tools/marketplace-fee-calculator"

export const metadata: Metadata = {
  title: "eBay & Etsy marketplace fee calculator",
  description:
    "Free eBay final value fee calculator and Etsy fee calculator — estimate marketplace fees, payment processing, net payout, and profit.",
  alternates: { canonical: "/tools/marketplace-fee-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Marketplace fee calculator (eBay & Etsy)"
      description="Estimate final value / transaction fees, payment processing, net payout, and profit for eBay and Etsy listings."
    >
      <MarketplaceFeeCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free marketplace fee calculator for eBay and Etsy? This eBay final value fee calculator and Etsy seller
        fee calculator helps you estimate transaction fees, payment processing, net payout, and profit per sale. Use
        it as an Etsy fee calculator, eBay fee calculator, or marketplace profit calculator to price handmade and
        resale listings correctly after platform take rates.
      </p>
    </ToolShell>
  )
}
