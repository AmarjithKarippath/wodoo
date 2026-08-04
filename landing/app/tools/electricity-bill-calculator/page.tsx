import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ElectricityBillCalculator } from "@/components/tools/electricity-bill-calculator"

export const metadata: Metadata = {
  title: "Electricity bill calculator",
  description: "Free electricity bill calculator with progressive unit slabs, fixed charge, and effective rate per kWh.",
  alternates: { canonical: "/tools/electricity-bill-calculator" },
  openGraph: {
    title: "Electricity bill calculator — Wodoo Store",
    description: "Free electricity bill calculator with progressive unit slabs, fixed charge, and effective rate per kWh.",
    url: "/tools/electricity-bill-calculator",
    images: [
      {
        url: "/tools/electricity-bill-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online electricity bill calculator with unit slabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electricity bill calculator — Wodoo Store",
    description: "Free electricity bill calculator with progressive unit slabs, fixed charge, and effective rate per kWh.",
    images: ["/tools/electricity-bill-calculator.webp"],
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
      toolSlug="electricity-bill-calculator"
      title="Electricity bill calculator"
      intro="Estimate your power bill from units consumed and slab rates (editable for your DISCOM)."
      description="Default slabs are illustrative domestic rates — adjust ₹/unit to match your local tariff."
    >
      <ElectricityBillCalculator />
    </ToolShell>
  )
}
