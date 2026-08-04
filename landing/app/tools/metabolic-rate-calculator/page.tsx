import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { MetabolicRateCalculator } from "@/components/tools/metabolic-rate-calculator"

export const metadata: Metadata = {
  title: "Metabolic rate calculator",
  description: "Free metabolic rate calculator comparing Mifflin–St Jeor, Harris–Benedict, and Katch–McArdle BMR plus TDEE.",
  alternates: { canonical: "/tools/metabolic-rate-calculator" },
  openGraph: {
    title: "Metabolic rate calculator — Wodoo Store",
    description: "Free metabolic rate calculator comparing Mifflin–St Jeor, Harris–Benedict, and Katch–McArdle BMR plus TDEE.",
    url: "/tools/metabolic-rate-calculator",
    images: [
      {
        url: "/tools/metabolic-rate-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online metabolic rate BMR calculator with multiple formulas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metabolic rate calculator — Wodoo Store",
    description: "Free metabolic rate calculator comparing Mifflin–St Jeor, Harris–Benedict, and Katch–McArdle BMR plus TDEE.",
    images: ["/tools/metabolic-rate-calculator.webp"],
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
      toolSlug="metabolic-rate-calculator"
      title="Metabolic rate calculator"
      intro="Compare popular BMR formulas side by side, then see TDEE for your activity level."
      description="Optional body fat % unlocks Katch–McArdle. Useful when refining calorie targets beyond a single formula."
    >
      <MetabolicRateCalculator />
    </ToolShell>
  )
}
