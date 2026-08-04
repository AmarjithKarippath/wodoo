import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { AgeCalculator } from "@/components/tools/age-calculator"

export const metadata: Metadata = {
  title: "Age calculator",
  description: "Free age calculator — find exact age in years, months, and days from date of birth, plus days until next birthday.",
  alternates: { canonical: "/tools/age-calculator" },
  openGraph: {
    title: "Age calculator — Wodoo Store",
    images: [
      {
        url: "/tools/age-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online age calculator for years months days from date of birth",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="age-calculator"
      title="Age calculator"
      intro="Calculate your exact age from your date of birth — years, months, days, and total days lived."
      description="Pick a birth date and an “as of” date. We’ll show precise age and when your next birthday falls."
    >
      <AgeCalculator />
    </ToolShell>
  )
}
