import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PresentValueCalculator } from "@/components/tools/present-value-calculator"

export const metadata: Metadata = {
  title: "Present value calculator",
  description: "Free present value, future value, and NPV calculator — discount rates, periods, annuities, and cash flows.",
  alternates: { canonical: "/tools/present-value-calculator" },
  openGraph: {
    title: "Present value calculator — Wodoo Store",
    description: "Free present value, future value, and NPV calculator — discount rates, periods, annuities, and cash flows.",
    url: "/tools/present-value-calculator",
    images: [
      {
        url: "/tools/present-value-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online present value NPV and future value calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Present value calculator — Wodoo Store",
    description: "Free present value, future value, and NPV calculator — discount rates, periods, annuities, and cash flows.",
    images: ["/tools/present-value-calculator.webp"],
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
      toolSlug="present-value-calculator"
      title="Present value calculator"
      intro="Calculate present value, future value, or NPV of cash flows with a discount rate."
      description="Switch modes for PV of a future sum, FV of a present sum (plus optional payments), or NPV."
    >
      <PresentValueCalculator />
    </ToolShell>
  )
}
