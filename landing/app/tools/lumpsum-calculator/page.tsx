import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { LumpsumCalculator } from "@/components/tools/lumpsum-calculator"

export const metadata: Metadata = {
  title: "Lumpsum calculator",
  description: "Free lumpsum mutual fund calculator — project future value, invested amount, and wealth gained from expected returns.",
  alternates: { canonical: "/tools/lumpsum-calculator" },
  openGraph: {
    title: "Lumpsum calculator — Wodoo Store",
    description: "Free lumpsum mutual fund calculator — project future value, invested amount, and wealth gained from expected returns.",
    url: "/tools/lumpsum-calculator",
    images: [
      {
        url: "/tools/lumpsum-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online lumpsum mutual fund calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumpsum calculator — Wodoo Store",
    description: "Free lumpsum mutual fund calculator — project future value, invested amount, and wealth gained from expected returns.",
    images: ["/tools/lumpsum-calculator.webp"],
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
      toolSlug="lumpsum-calculator"
      title="Lumpsum calculator"
      intro="Estimate the future value of a one-time mutual fund or investment lumpsum."
      description="Enter investment amount, expected annual return, and years to see maturity value and gains."
    >
      <LumpsumCalculator />
    </ToolShell>
  )
}
