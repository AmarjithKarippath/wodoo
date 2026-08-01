import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { SocialMediaEarningCalculator } from "@/components/tools/social-media-earning-calculator"

export const metadata: Metadata = {
  title: "Social media earning & monetization calculator",
  description:
    "Free social media earning calculator — estimate influencer income, sponsored post rates, CPM monetization, and monthly creator earnings by niche.",
  alternates: { canonical: "/tools/social-media-earning-calculator" },
}

export default function Page() {
  return (
    <ToolShell
      title="Social media earning / monetization calculator"
      description="Estimate sponsored-post rates and monthly creator income from followers, engagement, CPM, and niche demand."
    >
      <SocialMediaEarningCalculator />
      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Need a free social media monetization calculator? This influencer income calculator and creator earnings
        estimator helps you price sponsored posts with CPM-based rates by niche. Use it as an Instagram money
        calculator, TikTok creator payout estimator, influencer rate card calculator, or brand deal pricing tool
        before negotiating partnerships.
      </p>
    </ToolShell>
  )
}
