import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { TrademarkRegistrySearch } from "@/components/tools/trademark-registry-search"

export const metadata: Metadata = {
  title: "Trademark & registry search",
  description:
    "Free trademark search tool — check brand name strength and open USPTO, EUIPO, UK IPO, and WIPO registry searches plus matching domains.",
  alternates: { canonical: "/tools/trademark-registry-search" },
}

export default function Page() {
  return (
    <ToolShell
      title="Trademark & registry search"
      description="Score brand distinctiveness, launch official trademark registry searches, and check matching domain availability in one place."
    >
      <TrademarkRegistrySearch />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a free trademark search tool? This brand name registry checker helps you start USPTO trademark
        search, EUIPO trademark search, UK IPO lookups, and WIPO Global Brand Database queries. Use it as a brand
        name availability checker, trademark conflict starter tool, or ecommerce brand registry search before you file
        or launch.
      </p>
    </ToolShell>
  )
}
