import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LtvCalculator } from "@/components/tools/ltv-calculator"

export const metadata: Metadata = {
  title: "LTV calculator",
  description: "Free customer LTV calculator — estimate lifetime value from AOV, purchase frequency, lifespan, and margin.",
  alternates: { canonical: "/tools/ltv-calculator" },
  openGraph: {
    title: "LTV calculator — Woodo Store",
    images: [
      {
        url: "/tools/ltv-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online customer LTV calculator for ecommerce lifetime value and contribution",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="ltv-calculator"
      title="LTV calculator"
      intro="Estimate how much a customer is worth over their relationship with your store — key for CAC and retention decisions."
      description="Enter AOV, purchases per year, customer lifespan, and gross margin. We’ll estimate contribution LTV and lifetime orders."
    >
      <LtvCalculator />
    </ToolShell>
  )
}
