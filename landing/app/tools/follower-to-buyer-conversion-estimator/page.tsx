import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FollowerToBuyerEstimator } from "@/components/tools/follower-to-buyer-estimator"

export const metadata: Metadata = {
  title: "Follower to buyer conversion estimator",
  description:
    "Free follower-to-buyer conversion calculator — estimate social commerce buyers, link-in-bio clicks, and revenue from your follower count.",
  alternates: { canonical: "/tools/follower-to-buyer-conversion-estimator" },
  openGraph: {
    title: "Follower-to-buyer conversion estimator — Woodo Store",
    images: [
      {
        url: "/tools/follower-to-buyer-conversion-estimator.webp",
        width: 1200,
        height: 630,
        alt: "Free online follower-to-buyer estimator for creator ecommerce conversion and revenue",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="follower-to-buyer-conversion-estimator"
      title="Follower-to-buyer conversion estimator"
      intro="Translate followers into estimated buyers and revenue using realistic funnel rates. Useful before you invest more in content or ads."
      description="Turn followers into estimated buyers and revenue using profile visits, link clicks, conversion rate, and AOV."
    >
      <FollowerToBuyerEstimator />
    </ToolShell>
  )
}
