import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { RdCalculator } from "@/components/tools/rd-calculator"

export const metadata: Metadata = {
  title: "RD calculator",
  description: "Free RD calculator — estimate recurring deposit maturity value, total deposited, and interest for monthly RD plans.",
  alternates: { canonical: "/tools/rd-calculator" },
  openGraph: {
    title: "RD calculator — Woodo Store",
    images: [
      {
        url: "/tools/rd-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online RD calculator for recurring deposit maturity and interest",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="rd-calculator"
      title="RD calculator"
      intro="Plan a recurring deposit — see maturity amount, total deposits, and interest earned."
      description="Enter monthly deposit, interest rate, and tenure in months to calculate RD maturity."
    >
      <RdCalculator />
    </ToolShell>
  )
}
