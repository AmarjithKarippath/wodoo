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
      intro="See what remains after marketplace referral penalties and ad spend. Helps you judge whether offsite traffic still makes sense."
      description="See true profit after automated marketplace referral penalties (typically 12%–15%) plus ads, COGS, shipping, and payment fees."
    >
      <OffsiteAdsMarginChecker />
    </ToolShell>
  )
}
