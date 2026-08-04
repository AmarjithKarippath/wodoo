import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { IrrCalculator } from "@/components/tools/irr-calculator"

export const metadata: Metadata = {
  title: "IRR calculator",
  description: "Free IRR calculator for periodic cash flows — internal rate of return per period for projects and investments.",
  alternates: { canonical: "/tools/irr-calculator" },
  openGraph: {
    title: "IRR calculator — Wodoo Store",
    description: "Free IRR calculator for periodic cash flows — internal rate of return per period for projects and investments.",
    url: "/tools/irr-calculator",
    images: [
      {
        url: "/tools/irr-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online IRR internal rate of return calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IRR calculator — Wodoo Store",
    description: "Free IRR calculator for periodic cash flows — internal rate of return per period for projects and investments.",
    images: ["/tools/irr-calculator.webp"],
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
      toolSlug="irr-calculator"
      title="IRR calculator"
      intro="Compute internal rate of return from a sequence of equal-period cash flows."
      description="Paste comma-separated cash flows (first usually negative). For dated irregular flows, use the XIRR calculator."
    >
      <IrrCalculator />
    </ToolShell>
  )
}
