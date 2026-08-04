import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DropshippingProfitCalculator } from "@/components/tools/dropshipping-profit-calculator"

export const metadata: Metadata = {
  title: "Dropshipping profit calculator",
  description: "Free dropshipping profit calculator — estimate profit, margin, fees, and break-even price per order for ecommerce stores.",
  alternates: { canonical: "/tools/dropshipping-profit-calculator" },
  openGraph: {
    title: "Dropshipping profit calculator — Wodoo Store",
    images: [
      {
        url: "/tools/dropshipping-profit-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online dropshipping profit calculator for margin, fees, and break-even price",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="dropshipping-profit-calculator"
      title="Dropshipping profit calculator"
      intro="See what you actually keep after product cost, shipping, ads, and platform fees. Useful before you launch or scale a dropshipping offer."
      description="Enter selling price, supplier cost, shipping, ad spend per order, and platform fee percent. We’ll show profit, margin, and a break-even price."
    >
      <DropshippingProfitCalculator />
    </ToolShell>
  )
}
