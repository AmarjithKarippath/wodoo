import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { StampDutyCalculator } from "@/components/tools/stamp-duty-calculator"

export const metadata: Metadata = {
  title: "Stamp duty calculator",
  description: "Free India stamp duty calculator — estimate stamp duty and registration charges by state (illustrative rates).",
  alternates: { canonical: "/tools/stamp-duty-calculator" },
  openGraph: {
    title: "Stamp duty calculator — Wodoo Store",
    description: "Free India stamp duty calculator — estimate stamp duty and registration charges by state (illustrative rates).",
    url: "/tools/stamp-duty-calculator",
    images: [
      {
        url: "/tools/stamp-duty-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online stamp duty calculator India for property purchase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stamp duty calculator — Wodoo Store",
    description: "Free India stamp duty calculator — estimate stamp duty and registration charges by state (illustrative rates).",
    images: ["/tools/stamp-duty-calculator.webp"],
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
      toolSlug="stamp-duty-calculator"
      title="Stamp duty calculator"
      intro="Estimate stamp duty and registration on a property purchase for major Indian states."
      description="Rates are illustrative defaults and may differ by locality. Confirm with your registrar before buying."
    >
      <StampDutyCalculator />
    </ToolShell>
  )
}
