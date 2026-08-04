import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { InterestCalculator } from "@/components/tools/interest-calculator"

export const metadata: Metadata = {
  title: "Interest calculator",
  description: "Free interest calculator for simple and compound interest — principal, rate, years, and total amount.",
  alternates: { canonical: "/tools/interest-calculator" },
  openGraph: {
    title: "Interest calculator — Wodoo Store",
    description: "Free interest calculator for simple and compound interest — principal, rate, years, and total amount.",
    url: "/tools/interest-calculator",
    images: [
      {
        url: "/tools/interest-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online interest calculator for simple and compound interest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interest calculator — Wodoo Store",
    description: "Free interest calculator for simple and compound interest — principal, rate, years, and total amount.",
    images: ["/tools/interest-calculator.webp"],
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
      toolSlug="interest-calculator"
      title="Interest calculator"
      intro="Compare simple vs compound interest and see how your principal grows over time."
      description="Choose interest type, enter principal, rate, and tenure. Optional compounding frequency for compound interest."
    >
      <InterestCalculator />
    </ToolShell>
  )
}
