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
      intro="Collect the company details Dun & Bradstreet usually needs, then continue to their official request flow. Useful for credit files and some vendor setups."
      description="Enter your legal company name and location, review the prep list, then open the official Dun & Bradstreet request page."
    >
      <DunsNumberHelper />
    </ToolShell>
  )
}
