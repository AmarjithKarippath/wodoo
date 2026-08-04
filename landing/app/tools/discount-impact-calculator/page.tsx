import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DiscountImpactCalculator } from "@/components/tools/discount-impact-calculator"

export const metadata: Metadata = {
  title: "Discount impact calculator",
  description: "Free discount impact calculator — see how a sale affects margin and how many extra units you need to keep the same profit.",
  alternates: { canonical: "/tools/discount-impact-calculator" },
  openGraph: {
    title: "Discount impact calculator — Wodoo Store",
    images: [
      {
        url: "/tools/discount-impact-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online discount impact calculator for margin loss and break-even volume",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="discount-impact-calculator"
      title="Discount impact calculator"
      intro="Discounts feel good for conversion — this shows what they do to margin and how much more you must sell to stay even."
      description="Enter price, cost, and discount percent. We’ll show discounted profit, margin, and units needed to match original profit."
    >
      <DiscountImpactCalculator />
    </ToolShell>
  )
}
