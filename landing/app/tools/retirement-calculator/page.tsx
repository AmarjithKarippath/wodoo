import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { RetirementCalculator } from "@/components/tools/retirement-calculator"

export const metadata: Metadata = {
  title: "Retirement calculator",
  description: "Free retirement calculator — corpus needed, projected savings, and shortfall or surplus with inflation and returns.",
  alternates: { canonical: "/tools/retirement-calculator" },
  openGraph: {
    title: "Retirement calculator — Wodoo Store",
    description: "Free retirement calculator — corpus needed, projected savings, and shortfall or surplus with inflation and returns.",
    url: "/tools/retirement-calculator",
    images: [
      {
        url: "/tools/retirement-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online retirement corpus planning calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement calculator — Wodoo Store",
    description: "Free retirement calculator — corpus needed, projected savings, and shortfall or surplus with inflation and returns.",
    images: ["/tools/retirement-calculator.webp"],
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
      toolSlug="retirement-calculator"
      title="Retirement calculator"
      intro="Estimate the retirement corpus you need and whether your savings plan gets you there."
      description="Uses inflation-adjusted expenses and a 25× annual expense rule of thumb, plus projected investments."
    >
      <RetirementCalculator />
    </ToolShell>
  )
}
