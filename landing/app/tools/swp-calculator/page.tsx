import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { SwpCalculator } from "@/components/tools/swp-calculator"

export const metadata: Metadata = {
  title: "SWP calculator",
  description: "Free SWP calculator — systematic withdrawal plan ending corpus, total withdrawn, and months the corpus lasts.",
  alternates: { canonical: "/tools/swp-calculator" },
  openGraph: {
    title: "SWP calculator — Wodoo Store",
    description: "Free SWP calculator — systematic withdrawal plan ending corpus, total withdrawn, and months the corpus lasts.",
    url: "/tools/swp-calculator",
    images: [
      {
        url: "/tools/swp-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online SWP systematic withdrawal plan calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWP calculator — Wodoo Store",
    description: "Free SWP calculator — systematic withdrawal plan ending corpus, total withdrawn, and months the corpus lasts.",
    images: ["/tools/swp-calculator.webp"],
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
      toolSlug="swp-calculator"
      title="SWP calculator"
      intro="Model monthly withdrawals from a corpus and see how long your money lasts."
      description="Enter starting corpus, monthly withdrawal, expected return, and years to project ending balance."
    >
      <SwpCalculator />
    </ToolShell>
  )
}
