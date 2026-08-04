import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ShopifyFeeCalculator } from "@/components/tools/shopify-fee-calculator"

export const metadata: Metadata = {
  title: "Shopify fee calculator",
  description: "Free Shopify fee calculator — estimate payment processing fees, plan fees, and net per order for Shopify stores.",
  alternates: { canonical: "/tools/shopify-fee-calculator" },
  openGraph: {
    title: "Shopify fee calculator — Wodoo Store",
    images: [
      {
        url: "/tools/shopify-fee-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online Shopify fee calculator for payment fees, plan fees, and net payout",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="shopify-fee-calculator"
      title="Shopify fee calculator"
      intro="Estimate what Shopify-style plan and card fees take from each order and across a month of sales."
      description="Enter average order value, monthly orders, plan fee, and card rate. We’ll show fees per order, monthly totals, and net."
    >
      <ShopifyFeeCalculator />
    </ToolShell>
  )
}
