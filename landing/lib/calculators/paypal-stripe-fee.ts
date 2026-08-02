export type PaymentProvider = "stripe" | "paypal"

export type PaypalStripeFeeInput = {
  amount: number
  provider: PaymentProvider
  international: boolean
}

export type PaypalStripeFeeResult = {
  ratePercent: number
  fixedFee: number
  fee: number
  net: number
  providerLabel: string
}

const RATES: Record<
  PaymentProvider,
  { domestic: { rate: number; fixed: number }; intl: { rate: number; fixed: number }; label: string }
> = {
  stripe: {
    label: "Stripe",
    domestic: { rate: 2.9, fixed: 0.3 },
    intl: { rate: 3.9, fixed: 0.3 },
  },
  paypal: {
    label: "PayPal",
    domestic: { rate: 3.49, fixed: 0.49 },
    intl: { rate: 4.99, fixed: 0.49 },
  },
}

export function calculatePaypalStripeFee(
  input: PaypalStripeFeeInput,
): PaypalStripeFeeResult | null {
  const { amount, provider, international } = input
  if (!Number.isFinite(amount) || amount <= 0) return null
  const cfg = RATES[provider]
  if (!cfg) return null
  const tier = international ? cfg.intl : cfg.domestic
  const fee = amount * (tier.rate / 100) + tier.fixed
  return {
    ratePercent: tier.rate,
    fixedFee: tier.fixed,
    fee,
    net: amount - fee,
    providerLabel: cfg.label,
  }
}
