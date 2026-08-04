import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FdCalculator } from "@/components/tools/fd-calculator"

export const metadata: Metadata = {
  title: "FD calculator",
  description: "Free FD calculator — estimate fixed deposit maturity amount and interest earned for bank FD tenure and compounding.",
  alternates: { canonical: "/tools/fd-calculator" },
  openGraph: {
    title: "FD calculator — Wodoo Store",
    images: [
      {
        url: "/tools/fd-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online FD calculator for fixed deposit maturity amount and interest",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="fd-calculator"
      title="FD calculator"
      intro="Calculate fixed deposit maturity value and interest for your bank FD rate and tenure."
      description="Enter deposit amount, interest rate, tenure in months, and compounding frequency to see maturity amount."
    >
      <FdCalculator />
    </ToolShell>
  )
}
