import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { AffiliateVsOwnedCalculator } from "@/components/tools/affiliate-vs-owned-calculator"

export const metadata: Metadata = {
  title: "Affiliate vs owned store commission calculator",
  description:
    "Free affiliate vs DTC calculator — compare affiliate commission profit versus owned ecommerce store margins per order and period.",
  alternates: { canonical: "/tools/affiliate-vs-owned-store-calculator" },
  openGraph: {
    title: "Affiliate vs. owned store commission calculator — Woodo Store",
    images: [
      {
        url: "/tools/affiliate-vs-owned-store-calculator.png",
        width: 1200,
        height: 630,
        alt: "Affiliate vs. owned store commission calculator — free ecommerce tool",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      title="Affiliate vs. owned store commission calculator"
      intro="Compare profit from affiliate commissions with selling through your own store. Decide where the next order is more valuable."
      description="Compare profit from affiliate sales (commission paid) versus selling through your own store after fees and fulfillment."
    >
      <AffiliateVsOwnedCalculator />
    </ToolShell>
  )
}
