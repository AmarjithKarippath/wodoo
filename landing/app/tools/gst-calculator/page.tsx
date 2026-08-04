import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { GstCalculator } from "@/components/tools/gst-calculator"

export const metadata: Metadata = {
  title: "GST calculator",
  description: "Free GST calculator India — add or remove GST at 5%, 12%, 18%, or 28% with CGST/SGST split and invoice total.",
  alternates: { canonical: "/tools/gst-calculator" },
  openGraph: {
    title: "GST calculator — Woodo Store",
    images: [
      {
        url: "/tools/gst-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online GST calculator India for CGST SGST and invoice total",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="gst-calculator"
      title="GST calculator"
      intro="Add or remove GST instantly — taxable value, GST amount, CGST/SGST, and invoice total."
      description="Choose exclusive or inclusive amount, pick a GST rate, and enter the amount to calculate tax breakup."
    >
      <GstCalculator />
    </ToolShell>
  )
}
