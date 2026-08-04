import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CpaAdCostCalculator } from "@/components/tools/cpa-ad-cost-calculator"

export const metadata: Metadata = {
  title: "CPA / ad cost calculator",
  description: "Free CPA ad cost calculator — calculate cost per acquisition and max profitable CPA from AOV and margin.",
  alternates: { canonical: "/tools/cpa-ad-cost-calculator" },
  openGraph: {
    title: "CPA / ad cost calculator — Wodoo Store",
    images: [
      {
        url: "/tools/cpa-ad-cost-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online CPA ad cost calculator for cost per acquisition and max profitable CPA",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="cpa-ad-cost-calculator"
      title="CPA / ad cost calculator"
      intro="Know your cost per acquisition and the ceiling CPA your margins can still support."
      description="Enter ad spend, conversions, AOV, and gross margin. We’ll show CPA, max profitable CPA, and headroom."
    >
      <CpaAdCostCalculator />
    </ToolShell>
  )
}
