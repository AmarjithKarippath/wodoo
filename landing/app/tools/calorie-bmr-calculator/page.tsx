import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CalorieBmrCalculator } from "@/components/tools/calorie-bmr-calculator"

export const metadata: Metadata = {
  title: "Calorie & BMR calculator",
  description: "Free calorie and BMR calculator — estimate basal metabolic rate and daily calories (TDEE) for maintain, lose, or gain weight.",
  alternates: { canonical: "/tools/calorie-bmr-calculator" },
  openGraph: {
    title: "Calorie & BMR calculator — Woodo Store",
    images: [
      {
        url: "/tools/calorie-bmr-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online calorie and BMR calculator for daily calorie needs and TDEE",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="calorie-bmr-calculator"
      title="Calorie & BMR calculator"
      intro="Estimate BMR and daily calorie needs with the Mifflin–St Jeor formula — maintain, lose, or gain weight."
      description="Enter age, sex, height, weight, and activity level. We’ll calculate BMR, TDEE, and calorie targets."
    >
      <CalorieBmrCalculator />
    </ToolShell>
  )
}
