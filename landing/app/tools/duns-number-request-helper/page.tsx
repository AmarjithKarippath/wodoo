import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { DunsNumberHelper } from "@/components/tools/duns-number-helper"

export const metadata: Metadata = {
  title: "D-U-N-S number request helper",
  description:
    "Free DUNS number request checklist — prepare your company details and open the Dun & Bradstreet D-U-N-S number request tool.",
  alternates: { canonical: "/tools/duns-number-request-helper" },
  openGraph: {
    title: "D-U-N-S number request helper — Woodo Store",
    images: [
      {
        url: "/tools/duns-number-request-helper.webp",
        width: 1200,
        height: 630,
        alt: "Online D-U-N-S number request helper to prepare Dun & Bradstreet company details",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="duns-number-request-helper"
      title="D-U-N-S number request helper"
      intro="Collect the company details Dun & Bradstreet usually needs, then continue to their official request flow. Useful for credit files and some vendor setups."
      description="Enter your legal company name and location, review the prep list, then open the official Dun & Bradstreet request page."
    >
      <DunsNumberHelper />
    </ToolShell>
  )
}
