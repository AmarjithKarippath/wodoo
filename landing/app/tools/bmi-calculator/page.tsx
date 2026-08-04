import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { BmiCalculator } from "@/components/tools/bmi-calculator"

export const metadata: Metadata = {
  title: "BMI calculator",
  description: "Free BMI calculator online — check body mass index from height and weight, see category, and healthy weight range.",
  alternates: { canonical: "/tools/bmi-calculator" },
  openGraph: {
    title: "BMI calculator — Wodoo Store",
    images: [
      {
        url: "/tools/bmi-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online BMI calculator for body mass index and healthy weight range",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="bmi-calculator"
      title="BMI calculator"
      intro="Find your body mass index in seconds and see whether you’re underweight, normal, overweight, or obese."
      description="Enter height and weight. We’ll calculate BMI, category, and a healthy weight range for your height."
    >
      <BmiCalculator />
    </ToolShell>
  )
}
