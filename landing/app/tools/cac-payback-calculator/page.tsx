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
      intro="Estimate how long it takes to recover what you spend to acquire a customer. Useful when you are deciding whether paid acquisition can scale."
      description="Estimate how many months it takes to recover customer acquisition cost using AOV, gross margin, and purchase frequency."
    >
      <CacPaybackCalculator />
    </ToolShell>
  )
}
