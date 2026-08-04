import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { WinningProductScoreCalculator } from "@/components/tools/winning-product-score-calculator"

export const metadata: Metadata = {
  title: "Winning product score calculator",
  description: "Free winning product score calculator — score dropshipping and ecommerce product ideas on demand, competition, margin, and trend.",
  alternates: { canonical: "/tools/winning-product-score-calculator" },
  openGraph: {
    title: "Winning product score calculator — Wodoo Store",
    images: [
      {
        url: "/tools/winning-product-score-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online winning product score calculator for dropshipping and ecommerce ideas",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="winning-product-score-calculator"
      title="Winning product score calculator"
      intro="Score a product idea across demand, competition, margin, trend, and shipping ease before you invest in ads or inventory."
      description="Rate each factor from 1–10 (and enter margin %). We’ll produce a 0–100 score with a clear grade and breakdown."
    >
      <WinningProductScoreCalculator />
    </ToolShell>
  )
}
