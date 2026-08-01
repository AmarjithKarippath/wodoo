import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FollowerToBuyerEstimator } from "@/components/tools/follower-to-buyer-estimator"

export const metadata: Metadata = {
  title: "Follower to buyer conversion estimator",
  description:
    "Free follower-to-buyer conversion calculator — estimate social commerce buyers, link-in-bio clicks, and revenue from your follower count.",
  alternates: { canonical: "/tools/follower-to-buyer-conversion-estimator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Follower-to-buyer conversion estimator"
      description="Turn followers into estimated buyers and revenue using profile visits, link clicks, conversion rate, and AOV."
    >
      <FollowerToBuyerEstimator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Searching for a free follower to buyer conversion calculator? This social commerce conversion estimator and
        Instagram sales calculator helps creators and DTC brands forecast buyers from followers, link-in-bio clicks,
        and store conversion rate. Use it as a social media ROI calculator, influencer conversion funnel tool, or
        audience monetization planner before you invest in content or ads.
      </p>
    </ToolShell>
  )
}
