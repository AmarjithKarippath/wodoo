import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FincenBoiHelper } from "@/components/tools/fincen-boi-helper"

export const metadata: Metadata = {
  title: "FinCEN BOI filing helper",
  description:
    "Free FinCEN BOI e-filing helper — prepare beneficial ownership information for your LLC or corporation and open the official FinCEN BOI portal.",
  alternates: { canonical: "/tools/fincen-boi-filing-helper" },
}

export default function Page() {
  return (
    <ToolShell
      title="FinCEN BOI filing helper"
      description="Prepare Beneficial Ownership Information details for your reporting company, then continue to the official FinCEN BOI resources."
    >
      <FincenBoiHelper />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for the FinCEN BOI e-filing portal helper? This Beneficial Ownership Information checklist helps newly
        registered corporations and LLCs gather owner IDs, addresses, and company details for Corporate Transparency Act
        style reporting. Use it as a BOI report prep tool, FinCEN filing checklist, or beneficial ownership compliance
        starter before submitting on the official site.
      </p>
    </ToolShell>
  )
}
