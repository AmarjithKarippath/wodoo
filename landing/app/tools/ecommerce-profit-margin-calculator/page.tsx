import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ProfitMarginCalculator } from "@/components/tools/profit-margin-calculator"

export const metadata: Metadata = {
  title: "Ecommerce profit margin calculator",
  description:
    "Free ecommerce profit margin calculator — compute gross margin, net margin, and profit per unit including COGS, shipping, fees, and ads.",
  alternates: { canonical: "/tools/ecommerce-profit-margin-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Ecommerce profit margin calculator"
      description="Calculate gross and net profit margins with COGS, shipping, payment fees, ad spend, and other costs — built for online store owners."
    >
      <ProfitMarginCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free ecommerce profit margin calculator? This online store profit calculator and net margin
        calculator helps you measure gross profit, net profit, and profit per unit after COGS, shipping, payment
        fees, and advertising. Use it as a product margin calculator, ecommerce profitability calculator, or sales
        margin calculator to know which SKUs actually make money — and which ones quietly lose it.
      </p>
    </ToolShell>
  )
}
