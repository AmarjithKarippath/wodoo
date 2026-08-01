import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FbaFeeCalculator } from "@/components/tools/fba-fee-calculator"

export const metadata: Metadata = {
  title: "FBA fee & revenue calculator",
  description:
    "Free Amazon FBA fee calculator — estimate referral fees, fulfillment fees, storage, net revenue, and profit margin per unit.",
  alternates: { canonical: "/tools/fba-fee-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="FBA fee & revenue calculator"
      intro="Estimate referral, fulfillment, and storage-style fees before you list a product. See what is left after Amazon-style costs come out."
      description="Estimate Amazon-style FBA referral fees, fulfillment fees, storage, net revenue, and profit per unit before you list a product."
    >
      <FbaFeeCalculator />
    </ToolShell>
  )
}
