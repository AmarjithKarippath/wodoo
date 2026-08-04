import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MarketplaceFeeCalculator } from "@/components/tools/marketplace-fee-calculator"

export const metadata: Metadata = {
  title: "eBay & Etsy marketplace fee calculator",
  description:
    "Free eBay final value fee calculator and Etsy fee calculator — estimate marketplace fees, payment processing, net payout, and profit.",
  alternates: { canonical: "/tools/marketplace-fee-calculator" },
  openGraph: {
    title: "Marketplace fee calculator (eBay & Etsy) — Wodoo Store",
    images: [
      {
        url: "/tools/marketplace-fee-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online eBay and Etsy marketplace fee calculator for net payout and profit",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="marketplace-fee-calculator"
      title="Marketplace fee calculator (eBay & Etsy)"
      intro="Estimate selling fees and net payout on marketplaces like eBay and Etsy. Price with the platform cut already in mind."
      description="Estimate final value / transaction fees, payment processing, net payout, and profit for eBay and Etsy listings."
    >
      <MarketplaceFeeCalculator />
    </ToolShell>
  )
}
