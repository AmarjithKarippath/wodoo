import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FacebookAdsBudgetCalculator } from "@/components/tools/facebook-ads-budget-calculator"

export const metadata: Metadata = {
  title: "Facebook ads budget calculator",
  description: "Free Facebook ads budget calculator — project clicks, orders, CPA, ROAS, and revenue from daily Meta ad spend.",
  alternates: { canonical: "/tools/facebook-ads-budget-calculator" },
  openGraph: {
    title: "Facebook ads budget calculator — Wodoo Store",
    images: [
      {
        url: "/tools/facebook-ads-budget-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online Facebook ads budget calculator for Meta CPC, CPA, ROAS, and revenue",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="facebook-ads-budget-calculator"
      title="Facebook ads budget calculator"
      intro="Turn a daily Meta ads budget into expected clicks, orders, CPA, and ROAS before you spend."
      description="Enter daily budget, campaign days, CPC, conversion rate, and AOV. We’ll project traffic, sales, and return."
    >
      <FacebookAdsBudgetCalculator />
    </ToolShell>
  )
}
