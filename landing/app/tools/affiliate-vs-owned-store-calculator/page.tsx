import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { AffiliateVsOwnedCalculator } from "@/components/tools/affiliate-vs-owned-calculator"

export const metadata: Metadata = {
  title: "Affiliate vs owned store commission calculator",
  description:
    "Free affiliate vs DTC calculator — compare affiliate commission profit versus owned ecommerce store margins per order and period.",
  alternates: { canonical: "/tools/affiliate-vs-owned-store-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Affiliate vs. owned store commission calculator"
      description="Compare profit from affiliate sales (commission paid) versus selling through your own store after fees and fulfillment."
    >
      <AffiliateVsOwnedCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free affiliate vs owned store calculator? This affiliate commission calculator and DTC margin
        comparison tool helps brands decide whether to scale affiliate marketing or push traffic to their own
        ecommerce store. Use it as an affiliate payout planner, marketplace vs DTC profit tool, or owned-store ROI
        calculator before allocating budget.
      </p>
    </ToolShell>
  )
}
