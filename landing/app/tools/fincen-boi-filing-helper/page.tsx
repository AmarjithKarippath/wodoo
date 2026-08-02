import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FincenBoiHelper } from "@/components/tools/fincen-boi-helper"

export const metadata: Metadata = {
  title: "FinCEN BOI filing helper",
  description:
    "Free FinCEN BOI e-filing helper — prepare beneficial ownership information for your LLC or corporation and open the official FinCEN BOI portal.",
  alternates: { canonical: "/tools/fincen-boi-filing-helper" },
  openGraph: {
    title: "FinCEN BOI filing helper — Woodo Store",
    images: [
      {
        url: "/tools/fincen-boi-filing-helper.webp",
        width: 1200,
        height: 630,
        alt: "Online FinCEN BOI filing helper for Beneficial Ownership Information preparation",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="fincen-boi-filing-helper"
      title="FinCEN BOI filing helper"
      intro="Prep beneficial ownership details before you file with FinCEN. Rules change, so confirm current requirements on the official portal."
      description="Enter your company details and owner count to build a prep sheet, then continue to FinCEN’s official BOI resources."
    >
      <FincenBoiHelper />
    </ToolShell>
  )
}
