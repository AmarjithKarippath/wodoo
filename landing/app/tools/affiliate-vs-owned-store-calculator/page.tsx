import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { AffiliateVsOwnedCalculator } from "@/components/tools/affiliate-vs-owned-calculator"

export const metadata: Metadata = {
  title: "Affiliate vs owned store commission calculator",
  description:
    "Free affiliate vs DTC calculator — compare affiliate commission profit versus owned ecommerce store margins per order and period.",
  alternates: { canonical: "/tools/affiliate-vs-owned-store-calculator" },
  openGraph: {
    title: "Affiliate vs. owned store commission calculator — Wodoo Store",
    images: [
      {
        url: "/tools/affiliate-vs-owned-store-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online affiliate vs owned store calculator to compare commission and margins",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="affiliate-vs-owned-store-calculator"
      title="Affiliate vs. owned store commission calculator"
      intro="Compare profit from affiliate commissions with selling through your own store. Decide where the next order is more valuable."
      description="Compare profit from affiliate sales (commission paid) versus selling through your own store after fees and fulfillment."
    >
      <AffiliateVsOwnedCalculator />
    </ToolShell>
  )
}
