import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ConversionRateCalculator } from "@/components/tools/conversion-rate-calculator"

export const metadata: Metadata = {
  title: "Conversion rate calculator",
  description: "Free conversion rate calculator — measure store conversion rate and visitors needed to hit a sales goal.",
  alternates: { canonical: "/tools/conversion-rate-calculator" },
  openGraph: {
    title: "Conversion rate calculator — Woodo Store",
    images: [
      {
        url: "/tools/conversion-rate-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online conversion rate calculator for visitors needed to hit ecommerce sales goals",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="conversion-rate-calculator"
      title="Conversion rate calculator"
      intro="Turn visitors and orders into a conversion rate — then see how much traffic a sales goal really needs."
      description="Enter visitors, orders, and a sales goal. We’ll calculate conversion rate and visitors required for that goal."
    >
      <ConversionRateCalculator />
    </ToolShell>
  )
}
