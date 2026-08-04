import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { TrademarkRegistrySearch } from "@/components/tools/trademark-registry-search"

export const metadata: Metadata = {
  title: "Trademark & registry search",
  description:
    "Free trademark search tool — check brand name strength and open USPTO, EUIPO, UK IPO, and WIPO registry searches plus matching domains.",
  alternates: { canonical: "/tools/trademark-registry-search" },
  openGraph: {
    title: "Trademark & registry search — Wodoo Store",
    images: [
      {
        url: "/tools/trademark-registry-search.webp",
        width: 1200,
        height: 630,
        alt: "Online trademark registry search helper for USPTO, EUIPO, UK IPO, and WIPO",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="trademark-registry-search"
      title="Trademark & registry search"
      intro="Get a quick distinctiveness read, then open official trademark databases for your mark. Always confirm results on the government sites before filing."
      description="Enter a mark to score distinctiveness, open registry searches, and optionally check matching domains."
    >
      <TrademarkRegistrySearch />
    </ToolShell>
  )
}
