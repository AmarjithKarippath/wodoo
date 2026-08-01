import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CacPaybackCalculator } from "@/components/tools/cac-payback-calculator"

export const metadata: Metadata = {
  title: "CAC payback calculator",
  description:
    "Free customer acquisition cost payback calculator — estimate CAC payback period, contribution per order, and LTV:CAC for ecommerce brands.",
  alternates: { canonical: "/tools/cac-payback-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="CAC payback calculator"
      description="Estimate how many months it takes to recover customer acquisition cost using AOV, gross margin, and purchase frequency."
    >
      <CacPaybackCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free CAC payback calculator? This customer acquisition cost calculator and CAC payback period
        calculator helps ecommerce brands estimate months to recover ad spend using AOV, gross margin, and purchase
        frequency. Use it as an LTV:CAC calculator, marketing payback calculator, or customer profitability
        calculator to decide whether paid acquisition is sustainable before you scale campaigns.
      </p>
    </ToolShell>
  )
}
