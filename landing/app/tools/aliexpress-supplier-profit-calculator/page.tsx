import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { AliExpressSupplierProfitCalculator } from "@/components/tools/aliexpress-supplier-profit-calculator"

export const metadata: Metadata = {
  title: "AliExpress / supplier profit calculator",
  description: "Free AliExpress supplier profit calculator — estimate landed cost, duties, fees, and profit for imported ecommerce products.",
  alternates: { canonical: "/tools/aliexpress-supplier-profit-calculator" },
  openGraph: {
    title: "AliExpress / supplier profit calculator — Woodo Store",
    images: [
      {
        url: "/tools/aliexpress-supplier-profit-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online AliExpress supplier profit calculator for landed cost and margin",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="aliexpress-supplier-profit-calculator"
      title="AliExpress / supplier profit calculator"
      intro="Roll supplier cost, shipping, and duty into a true landed cost so you know if an AliExpress product can still make money."
      description="Enter supplier price, shipping, customs duty, payment fees, and ads. We’ll estimate landed cost, total cost, profit, and margin."
    >
      <AliExpressSupplierProfitCalculator />
    </ToolShell>
  )
}
