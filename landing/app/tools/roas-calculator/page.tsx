import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { RoasCalculator } from "@/components/tools/roas-calculator"

export const metadata: Metadata = {
  title: "ROAS calculator",
  description: "Free ROAS calculator — measure return on ad spend, contribution profit, and break-even ROAS for ecommerce ads.",
  alternates: { canonical: "/tools/roas-calculator" },
  openGraph: {
    title: "ROAS calculator — Wodoo Store",
    images: [
      {
        url: "/tools/roas-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online ROAS calculator for ecommerce return on ad spend and break-even ROAS",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="roas-calculator"
      title="ROAS calculator"
      intro="Check whether your ad spend is returning enough revenue — and what ROAS you need just to break even on margin."
      description="Enter ad spend, attributed revenue, and gross margin. We’ll calculate ROAS, contribution profit, and break-even ROAS."
    >
      <RoasCalculator />
    </ToolShell>
  )
}
