import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { CalorieDeficitCalculator } from "@/components/tools/calorie-deficit-calculator"

export const metadata: Metadata = {
  title: "Calorie deficit calculator",
  description: "Free calorie deficit calculator — daily/weekly deficit, kg per week, and estimated weeks to your target weight.",
  alternates: { canonical: "/tools/calorie-deficit-calculator" },
  openGraph: {
    title: "Calorie deficit calculator — Wodoo Store",
    description: "Free calorie deficit calculator — daily/weekly deficit, kg per week, and estimated weeks to your target weight.",
    url: "/tools/calorie-deficit-calculator",
    images: [
      {
        url: "/tools/calorie-deficit-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online calorie deficit calculator for weight loss timeline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie deficit calculator — Wodoo Store",
    description: "Free calorie deficit calculator — daily/weekly deficit, kg per week, and estimated weeks to your target weight.",
    images: ["/tools/calorie-deficit-calculator.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="calorie-deficit-calculator"
      title="Calorie deficit calculator"
      intro="Turn a calorie deficit (or surplus) into an estimated weight-change timeline."
      description="Enter maintenance calories, intake, current weight, and target weight to estimate pace and time to goal."
    >
      <CalorieDeficitCalculator />
    </ToolShell>
  )
}
