import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DateDaysCalculator } from "@/components/tools/date-days-calculator"

export const metadata: Metadata = {
  title: "Date / days calculator",
  description: "Free date and days calculator — find days between two dates or add/subtract days from a date with weeks and months.",
  alternates: { canonical: "/tools/date-days-calculator" },
  openGraph: {
    title: "Date / days calculator — Wodoo Store",
    images: [
      {
        url: "/tools/date-days-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online date days calculator for difference between dates",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="date-days-calculator"
      title="Date / days calculator"
      intro="Count days between dates or jump forward/back by any number of days."
      description="Choose difference mode or add/subtract days. We’ll show days, weeks, and approximate months."
    >
      <DateDaysCalculator />
    </ToolShell>
  )
}
