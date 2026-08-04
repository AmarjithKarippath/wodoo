import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { UkSalaryCalculator } from "@/components/tools/uk-salary-calculator"

export const metadata: Metadata = {
  title: "UK salary / take-home calculator",
  description: "Free UK take-home pay calculator — estimate net salary after income tax, National Insurance, student loan, and pension (2025/26 illustrative).",
  alternates: { canonical: "/tools/uk-salary-calculator" },
  openGraph: {
    title: "UK salary / take-home calculator — Wodoo Store",
    description: "Free UK take-home pay calculator — estimate net salary after income tax, National Insurance, student loan, and pension (2025/26 illustrative).",
    url: "/tools/uk-salary-calculator",
    images: [
      {
        url: "/tools/uk-salary-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online UK salary take-home pay calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK salary / take-home calculator — Wodoo Store",
    description: "Free UK take-home pay calculator — estimate net salary after income tax, National Insurance, student loan, and pension (2025/26 illustrative).",
    images: ["/tools/uk-salary-calculator.webp"],
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
      toolSlug="uk-salary-calculator"
      title="UK salary / take-home calculator"
      intro="Estimate UK take-home pay after tax, National Insurance, student loan, and pension contributions."
      description="Illustrative 2025/26 figures for England/Wales/NI or approximate Scottish bands. Not official tax advice."
    >
      <UkSalaryCalculator />
    </ToolShell>
  )
}
