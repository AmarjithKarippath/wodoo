import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { BodyFatIdealWeightCalculator } from "@/components/tools/body-fat-ideal-weight-calculator"

export const metadata: Metadata = {
  title: "Body fat & ideal weight calculator",
  description: "Free body fat and ideal weight calculator — US Navy body fat %, category, Devine ideal weight, and BMI from measurements.",
  alternates: { canonical: "/tools/body-fat-ideal-weight-calculator" },
  openGraph: {
    title: "Body fat & ideal weight calculator — Woodo Store",
    images: [
      {
        url: "/tools/body-fat-ideal-weight-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online body fat percentage and ideal weight calculator",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="body-fat-ideal-weight-calculator"
      title="Body fat & ideal weight calculator"
      intro="Estimate body fat percentage (US Navy method), ideal weight, and BMI from simple measurements."
      description="Enter sex, age, height, weight, waist, neck (and hip for women). We’ll estimate body fat %, category, and ideal weight."
    >
      <BodyFatIdealWeightCalculator />
    </ToolShell>
  )
}
