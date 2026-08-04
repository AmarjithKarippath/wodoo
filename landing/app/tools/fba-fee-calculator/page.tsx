import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FbaFeeCalculator } from "@/components/tools/fba-fee-calculator"

export const metadata: Metadata = {
  title: "FBA fee & revenue calculator",
  description:
    "Free Amazon FBA fee calculator — estimate referral fees, fulfillment fees, storage, net revenue, and profit margin per unit.",
  alternates: { canonical: "/tools/fba-fee-calculator" },
  openGraph: {
    title: "FBA fee & revenue calculator — Wodoo Store",
    images: [
      {
        url: "/tools/fba-fee-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online Amazon FBA fee calculator to estimate referral, fulfillment, and profit",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="fba-fee-calculator"
      title="FBA fee & revenue calculator"
      intro="Estimate referral, fulfillment, and storage-style fees before you list a product. See what is left after Amazon-style costs come out."
      description="Estimate Amazon-style FBA referral fees, fulfillment fees, storage, net revenue, and profit per unit before you list a product."
    >
      <FbaFeeCalculator />
    </ToolShell>
  )
}
