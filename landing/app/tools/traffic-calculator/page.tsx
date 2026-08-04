import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { TrafficCalculator } from "@/components/tools/traffic-calculator"

export const metadata: Metadata = {
  title: "Traffic calculator",
  description: "Free ecommerce traffic calculator — estimate monthly and daily visitors needed to hit a profit goal.",
  alternates: { canonical: "/tools/traffic-calculator" },
  openGraph: {
    title: "Traffic calculator — Wodoo Store",
    images: [
      {
        url: "/tools/traffic-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online traffic calculator for visitors needed to hit ecommerce profit goals",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="traffic-calculator"
      title="Traffic calculator"
      intro="Work backwards from a profit goal to the traffic you need, given AOV, margin, and conversion rate."
      description="Enter monthly profit goal, AOV, gross margin, and conversion rate. We’ll estimate orders and visitors required."
    >
      <TrafficCalculator />
    </ToolShell>
  )
}
