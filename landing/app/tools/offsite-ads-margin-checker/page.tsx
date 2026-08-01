import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { OffsiteAdsMarginChecker } from "@/components/tools/offsite-ads-margin-checker"

export const metadata: Metadata = {
  title: "Offsite ads margin checker",
  description:
    "Free offsite ads margin calculator — subtract marketplace referral penalties (12%–15%) from margins when running Amazon, eBay, or marketplace offsite ads.",
  alternates: { canonical: "/tools/offsite-ads-margin-checker" },
}

export default function Page() {
  return (
    <ToolShell
      title="Offsite ads margin checker"
      description="See true profit after automated marketplace referral penalties (typically 12%–15%) plus ads, COGS, shipping, and payment fees."
    >
      <OffsiteAdsMarginChecker />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free offsite ads margin checker? This marketplace referral fee calculator and Amazon offsite ads margin
        tool subtracts 12%–15% referral penalties from your profit so you know if external traffic still pays. Use it
        as an eBay promoted listings margin calculator, marketplace advertising ROI tool, or seller fee impact
        calculator before scaling offsite campaigns.
      </p>
    </ToolShell>
  )
}
