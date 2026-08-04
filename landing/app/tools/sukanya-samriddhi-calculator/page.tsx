import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { SukanyaSamriddhiCalculator } from "@/components/tools/sukanya-samriddhi-calculator"

export const metadata: Metadata = {
  title: "Sukanya Samriddhi Yojana calculator",
  description: "Free Sukanya Samriddhi Yojana (SSY) calculator — estimate maturity amount, deposits, and interest (illustrative).",
  alternates: { canonical: "/tools/sukanya-samriddhi-calculator" },
  openGraph: {
    title: "Sukanya Samriddhi Yojana calculator — Wodoo Store",
    description: "Free Sukanya Samriddhi Yojana (SSY) calculator — estimate maturity amount, deposits, and interest (illustrative).",
    url: "/tools/sukanya-samriddhi-calculator",
    images: [
      {
        url: "/tools/sukanya-samriddhi-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online Sukanya Samriddhi Yojana SSY calculator India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukanya Samriddhi Yojana calculator — Wodoo Store",
    description: "Free Sukanya Samriddhi Yojana (SSY) calculator — estimate maturity amount, deposits, and interest (illustrative).",
    images: ["/tools/sukanya-samriddhi-calculator.webp"],
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
      toolSlug="sukanya-samriddhi-calculator"
      title="Sukanya Samriddhi Yojana calculator"
      intro="Project Sukanya Samriddhi maturity with yearly deposits, deposit years, and the current scheme rate."
      description="Illustrative SSY estimate — enter deposit, years, and rate. Confirm final figures with your bank or post office."
    >
      <SukanyaSamriddhiCalculator />
    </ToolShell>
  )
}
