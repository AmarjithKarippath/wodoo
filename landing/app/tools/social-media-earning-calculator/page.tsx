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
      intro="Rough out sponsored-post rates from audience size, engagement, and niche demand. Helps creators and brands start rate conversations with clearer numbers."
      description="Estimate sponsored-post rates and monthly creator income from followers, engagement, CPM, and niche demand."
    >
      <SocialMediaEarningCalculator />
    </ToolShell>
  )
}
