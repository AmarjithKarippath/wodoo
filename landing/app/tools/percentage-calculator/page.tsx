import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PercentageCalculator } from "@/components/tools/percentage-calculator"

export const metadata: Metadata = {
  title: "Percentage calculator",
  description: "Free percentage calculator — find X% of Y, what percent one number is of another, and percentage increase or decrease.",
  alternates: { canonical: "/tools/percentage-calculator" },
  openGraph: {
    title: "Percentage calculator — Wodoo Store",
    images: [
      {
        url: "/tools/percentage-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online percentage calculator for percent of value and percentage change",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="percentage-calculator"
      title="Percentage calculator"
      intro="Solve everyday percentage problems: X% of Y, what percent is X of Y, and percentage change."
      description="Choose a mode, enter two numbers, and get an instant percentage answer."
    >
      <PercentageCalculator />
    </ToolShell>
  )
}
