import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { XirrCalculator } from "@/components/tools/xirr-calculator"

export const metadata: Metadata = {
  title: "XIRR calculator",
  description: "Free XIRR calculator — annualized return from dated cash flows for SIPs, lumpsums, and redemptions.",
  alternates: { canonical: "/tools/xirr-calculator" },
  openGraph: {
    title: "XIRR calculator — Wodoo Store",
    description: "Free XIRR calculator — annualized return from dated cash flows for SIPs, lumpsums, and redemptions.",
    url: "/tools/xirr-calculator",
    images: [
      {
        url: "/tools/xirr-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online XIRR calculator for mutual fund and investment returns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XIRR calculator — Wodoo Store",
    description: "Free XIRR calculator — annualized return from dated cash flows for SIPs, lumpsums, and redemptions.",
    images: ["/tools/xirr-calculator.webp"],
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
      toolSlug="xirr-calculator"
      title="XIRR calculator"
      intro="Calculate XIRR from irregular investments and redemptions with dates."
      description="Add cash flows (negative = invest, positive = redeem) with dates to get annualized XIRR."
    >
      <XirrCalculator />
    </ToolShell>
  )
}
