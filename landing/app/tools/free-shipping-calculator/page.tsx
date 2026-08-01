import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { FreeShippingCalculator } from "@/components/tools/free-shipping-calculator"

export const metadata: Metadata = {
  title: "Free shipping rate calculator",
  description:
    "Calculate a free-shipping threshold that covers shipping cost, protects gross margin, and lifts average order value.",
  alternates: { canonical: "/tools/free-shipping-calculator" },
  openGraph: {
    title: "Free shipping rate calculator — Woodo Store",
    description:
      "Find a free-shipping threshold that covers your shipping cost and protects margin.",
  },
}

export default function FreeShippingCalculatorPage() {
  return (
    <ToolShell
      title="Free shipping rate calculator"
      description="Enter your real shipping cost, margin, and average order value. We’ll suggest a free-shipping threshold that doesn’t give margin away — and still nudges carts higher."
    >
      <FreeShippingCalculator />

      <p className="mt-14 text-sm leading-relaxed text-muted-foreground text-pretty">
        Looking for a reliable <strong className="font-semibold text-foreground">free shipping rate calculator</strong>?
        Our easy-to-use <strong className="font-semibold text-foreground">free shipping calculator</strong> and{" "}
        <strong className="font-semibold text-foreground">shipping cost calculator</strong> help you instantly
        compare rates with a <strong className="font-semibold text-foreground">shipping rate calculator free</strong>{" "}
        tool that works as a complete{" "}
        <strong className="font-semibold text-foreground">online shipping cost estimator</strong>. Whether you need
        a <strong className="font-semibold text-foreground">USPS shipping rate calculator</strong>,{" "}
        <strong className="font-semibold text-foreground">UPS shipping rate calculator</strong>, or{" "}
        <strong className="font-semibold text-foreground">FedEx shipping calculator</strong>, this{" "}
        <strong className="font-semibold text-foreground">multi-carrier shipping rate calculator</strong> delivers
        accurate results for domestic and{" "}
        <strong className="font-semibold text-foreground">international shipping rate calculator</strong> needs.
        Ecommerce sellers love our{" "}
        <strong className="font-semibold text-foreground">Shopify shipping calculator</strong> and{" "}
        <strong className="font-semibold text-foreground">package shipping rate calculator</strong> because it
        factors in <strong className="font-semibold text-foreground">volumetric weight calculator</strong> data,
        helps you find the <strong className="font-semibold text-foreground">cheapest shipping calculator</strong>{" "}
        options, and lets you{" "}
        <strong className="font-semibold text-foreground">compare shipping rates free</strong> while also serving as
        a handy <strong className="font-semibold text-foreground">postage calculator free</strong> solution for every
        order.
      </p>
    </ToolShell>
  )
}
