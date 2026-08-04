import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ProfitMarginCalculator } from "@/components/tools/profit-margin-calculator"

export const metadata: Metadata = {
  title: "Ecommerce profit margin calculator",
  description:
    "Free ecommerce profit margin calculator — compute gross margin, net margin, and profit per unit including COGS, shipping, fees, and ads.",
  alternates: { canonical: "/tools/ecommerce-profit-margin-calculator" },
  openGraph: {
    title: "Ecommerce profit margin calculator — Wodoo Store",
    images: [
      {
        url: "/tools/ecommerce-profit-margin-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online ecommerce profit margin calculator for COGS, fees, and ad costs",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="ecommerce-profit-margin-calculator"
      title="Ecommerce profit margin calculator"
      intro="See gross and net margin after product cost, shipping, fees, and ads. A simple way to check whether a SKU is actually profitable."
      description="Calculate gross and net profit margins with COGS, shipping, payment fees, ad spend, and other costs — built for online store owners."
    >
      <ProfitMarginCalculator />
    </ToolShell>
  )
}
