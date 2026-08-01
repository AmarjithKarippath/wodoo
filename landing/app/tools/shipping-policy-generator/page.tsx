import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { ShippingPolicyGenerator } from "@/components/tools/shipping-policy-generator"

export const metadata: Metadata = {
  title: "Shipping policy generator",
  description:
    "Generate a clear shipping policy for your online store — processing times, delivery estimates, free shipping, carriers, and more.",
  alternates: { canonical: "/tools/shipping-policy-generator" },
  openGraph: {
    images: [{ url: "/tools/shipping-policy-generator.png", width: 1200, height: 630, alt: "Shipping policy generator — free ecommerce tool" }],
    title: "Shipping policy generator — Woodo Store",
    description:
      "Create a ready-to-publish shipping policy for your ecommerce store in minutes.",
  },
}

export default function ShippingPolicyGeneratorPage() {
  return (
    <ToolShell
      title="Shipping policy generator"
      intro="Create a clear shipping policy your customers can understand at checkout. Fill in your store details and copy a ready draft in minutes."
      description="Add processing times, delivery windows, rates, and carriers, then copy the draft into your store policies."
    >
      <ShippingPolicyGenerator />
    </ToolShell>
  )
}
