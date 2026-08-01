import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DunsNumberHelper } from "@/components/tools/duns-number-helper"

export const metadata: Metadata = {
  title: "D-U-N-S number request helper",
  description:
    "Free DUNS number request checklist — prepare your company details and open the Dun & Bradstreet D-U-N-S number request tool.",
  alternates: { canonical: "/tools/duns-number-request-helper" },
}

export default function Page() {
  return (
    <ToolShell
      title="D-U-N-S number request helper"
      description="Prep your registered company information, then request a free D-U-N-S number from Dun & Bradstreet for credit and contracting profiles."
    >
      <DunsNumberHelper />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free DUNS number request tool helper? This Dun &amp; Bradstreet D-U-N-S checklist helps registered
        companies gather legal name, address, and ownership details before creating a corporate credit tracking profile.
        Use it as a DUNS application guide, business credit setup helper, or government contracting identifier prep
        sheet.
      </p>
    </ToolShell>
  )
}
