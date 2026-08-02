import type { Metadata } from "next"
import { ToolShell } from "@/components/tools/tool-shell"
import { PaypalStripeFeeCalculator } from "@/components/tools/paypal-stripe-fee-calculator"

export const metadata: Metadata = {
  title: "PayPal / Stripe fee calculator",
  description: "Free PayPal and Stripe fee calculator — estimate processing fees and net payout for domestic or international payments.",
  alternates: { canonical: "/tools/paypal-stripe-fee-calculator" },
  openGraph: {
    title: "PayPal / Stripe fee calculator — Woodo Store",
    images: [
      {
        url: "/tools/paypal-stripe-fee-calculator.webp",
        width: 1200,
        height: 630,
        alt: "Free online PayPal and Stripe fee calculator for processing fees and net payout",
      },
    ],
  },
}

export default function Page() {
  return (
    <ToolShell
      toolSlug="paypal-stripe-fee-calculator"
      title="PayPal / Stripe fee calculator"
      intro="Compare roughly what PayPal or Stripe takes from a payment so you can price with fees in mind."
      description="Choose PayPal or Stripe, set amount and domestic/international, then see estimated fee and net amount."
    >
      <PaypalStripeFeeCalculator />
    </ToolShell>
  )
}
