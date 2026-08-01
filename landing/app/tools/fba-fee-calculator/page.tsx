import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FbaFeeCalculator } from "@/components/tools/fba-fee-calculator"

export const metadata: Metadata = {
  title: "FBA fee & revenue calculator",
  description:
    "Free Amazon FBA fee calculator — estimate referral fees, fulfillment fees, storage, net revenue, and profit margin per unit.",
  alternates: { canonical: "/tools/fba-fee-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="FBA fee & revenue calculator"
      description="Estimate Amazon-style FBA referral fees, fulfillment fees, storage, net revenue, and profit per unit before you list a product."
    >
      <FbaFeeCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free FBA fee calculator for Amazon sellers? This Amazon FBA fee calculator and FBA revenue calculator
        helps you estimate referral fees, fulfillment fees, monthly storage, and net profit per unit. Use it as an
        FBA profit calculator, Amazon seller fee calculator, or FBA cost calculator to see true take-home revenue
        after Amazon fees — so you can price products with confidence and avoid unprofitable ASINs.
      </p>
    </ToolShell>
  )
}
