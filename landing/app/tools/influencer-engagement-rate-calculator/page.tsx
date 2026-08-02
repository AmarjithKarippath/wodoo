import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { InfluencerEngagementCalculator } from "@/components/tools/influencer-engagement-calculator"

export const metadata: Metadata = {
  title: "Influencer engagement rate calculator",
  description:
    "Free influencer engagement rate calculator — compute Instagram, TikTok, and YouTube engagement rate from likes, comments, shares, followers, and reach.",
  alternates: { canonical: "/tools/influencer-engagement-rate-calculator" },
  openGraph: {
    title: "Influencer engagement rate calculator — Woodo Store",
    images: [
      {
        url: "/tools/influencer-engagement-rate-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online influencer engagement rate calculator for Instagram and TikTok",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="influencer-engagement-rate-calculator"
      title="Influencer engagement rate calculator"
      intro="Measure how actively an audience responds relative to follower count. A quick signal when you are vetting creators or reporting campaign results."
      description="Calculate engagement rate from average likes, comments, shares, and follower count — with an optional reach-based rate for campaign reporting."
    >
      <InfluencerEngagementCalculator />
    </ToolShell>
  )
}
