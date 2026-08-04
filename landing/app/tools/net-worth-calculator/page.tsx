import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { NetWorthCalculator } from "@/components/tools/net-worth-calculator"

export const metadata: Metadata = {
  title: "Net worth calculator",
  description: "Free net worth calculator — total assets minus liabilities across cash, investments, property, and debts.",
  alternates: { canonical: "/tools/net-worth-calculator" },
  openGraph: {
    title: "Net worth calculator — Wodoo Store",
    description: "Free net worth calculator — total assets minus liabilities across cash, investments, property, and debts.",
    url: "/tools/net-worth-calculator",
    images: [
      {
        url: "/tools/net-worth-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online net worth calculator for assets and liabilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Net worth calculator — Wodoo Store",
    description: "Free net worth calculator — total assets minus liabilities across cash, investments, property, and debts.",
    images: ["/tools/net-worth-calculator.webp"],
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
      toolSlug="net-worth-calculator"
      title="Net worth calculator"
      intro="Add up assets and liabilities to see your net worth at a glance."
      description="Enter cash, investments, property, other assets, loans, credit cards, and other liabilities."
    >
      <NetWorthCalculator />
    </ToolShell>
  )
}
