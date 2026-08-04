import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator"

export const metadata: Metadata = {
  title: "Compound interest calculator",
  description: "Free compound interest calculator — project future value with annual rate, compounding frequency, and optional monthly contributions.",
  alternates: { canonical: "/tools/compound-interest-calculator" },
  openGraph: {
    title: "Compound interest calculator — Woodo Store",
    images: [
      {
        url: "/tools/compound-interest-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online compound interest calculator for investment future value growth",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="compound-interest-calculator"
      title="Compound interest calculator"
      intro="See how compound interest grows your money over time — with optional monthly contributions."
      description="Enter principal, rate, years, compounding frequency, and optional monthly deposits to get future value."
    >
      <CompoundInterestCalculator />
    </ToolShell>
  )
}
