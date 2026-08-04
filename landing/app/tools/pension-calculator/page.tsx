import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PensionCalculator } from "@/components/tools/pension-calculator"

export const metadata: Metadata = {
  title: "Pension calculator",
  description: "Free pension calculator — monthly pension from corpus, or corpus needed for a target pension over years.",
  alternates: { canonical: "/tools/pension-calculator" },
  openGraph: {
    title: "Pension calculator — Wodoo Store",
    description: "Free pension calculator — monthly pension from corpus, or corpus needed for a target pension over years.",
    url: "/tools/pension-calculator",
    images: [
      {
        url: "/tools/pension-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online pension and annuity drawdown calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pension calculator — Wodoo Store",
    description: "Free pension calculator — monthly pension from corpus, or corpus needed for a target pension over years.",
    images: ["/tools/pension-calculator.webp"],
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
      toolSlug="pension-calculator"
      title="Pension calculator"
      intro="Plan pension drawdowns from a corpus, or reverse-calculate how much corpus you need."
      description="Choose a mode, enter corpus or desired monthly pension, return rate, and years of drawdown."
    >
      <PensionCalculator />
    </ToolShell>
  )
}
