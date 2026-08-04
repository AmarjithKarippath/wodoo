import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { TdeeCalculator } from "@/components/tools/tdee-calculator"

export const metadata: Metadata = {
  title: "TDEE calculator",
  description: "Free TDEE calculator — total daily energy expenditure from BMR and activity level for maintain, cut, or bulk calories.",
  alternates: { canonical: "/tools/tdee-calculator" },
  openGraph: {
    title: "TDEE calculator — Wodoo Store",
    description: "Free TDEE calculator — total daily energy expenditure from BMR and activity level for maintain, cut, or bulk calories.",
    url: "/tools/tdee-calculator",
    images: [
      {
        url: "/tools/tdee-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online TDEE calculator for total daily energy expenditure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE calculator — Wodoo Store",
    description: "Free TDEE calculator — total daily energy expenditure from BMR and activity level for maintain, cut, or bulk calories.",
    images: ["/tools/tdee-calculator.webp"],
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
      toolSlug="tdee-calculator"
      title="TDEE calculator"
      intro="Find your total daily energy expenditure (TDEE) to set maintain, cut, or bulk calorie targets."
      description="Enter sex, age, weight, height, and activity. We use Mifflin–St Jeor BMR × activity multiplier."
    >
      <TdeeCalculator />
    </ToolShell>
  )
}
