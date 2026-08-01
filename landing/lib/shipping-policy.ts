export type ShippingPolicyInput = {
  storeName: string
  shipFromCountry: string
  shipsTo: string
  processingDays: string
  domesticDelivery: string
  internationalDelivery: string
  freeShippingThreshold: string
  shippingRates: string
  carriers: string
  contactEmail: string
  restrictions: string
  offerInternational: boolean
  offerFreeShipping: boolean
}

export function generateShippingPolicy(input: ShippingPolicyInput): string {
  const store = input.storeName.trim() || "Our store"
  const from = input.shipFromCountry.trim() || "our warehouse"
  const shipsTo = input.shipsTo.trim() || "selected destinations"
  const processing = input.processingDays.trim() || "1–3 business days"
  const domestic = input.domesticDelivery.trim() || "3–7 business days"
  const international = input.internationalDelivery.trim() || "7–21 business days"
  const freeShip = input.freeShippingThreshold.trim()
  const rates = input.shippingRates.trim()
  const carriers = input.carriers.trim() || "trusted carriers"
  const email = input.contactEmail.trim()
  const restrictions = input.restrictions.trim()
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const lines: string[] = [
    `Shipping Policy`,
    ``,
    `Last updated: ${today}`,
    ``,
    `Thank you for shopping with ${store}. This Shipping Policy explains how we process, ship, and deliver orders.`,
    ``,
    `1. Shipping origin`,
    `Orders are fulfilled from ${from}.`,
    ``,
    `2. Where we ship`,
    `We currently ship to ${shipsTo}.`,
  ]

  if (input.offerInternational) {
    lines.push(
      `International orders may be subject to customs duties, taxes, or import fees charged by the destination country. These charges are the customer's responsibility unless otherwise stated at checkout.`,
    )
  }

  lines.push(
    ``,
    `3. Order processing time`,
    `Orders are typically processed within ${processing} after payment is confirmed (excluding weekends and public holidays). You will receive a confirmation email once your order has been placed, and another when it ships.`,
    ``,
    `4. Estimated delivery times`,
    `Domestic delivery: ${domestic} after dispatch.`,
  )

  if (input.offerInternational) {
    lines.push(`International delivery: ${international} after dispatch.`)
  }

  lines.push(
    `Delivery times are estimates and may vary due to carrier delays, weather, customs, or peak seasons.`,
    ``,
    `5. Shipping rates`,
  )

  if (input.offerFreeShipping && freeShip) {
    lines.push(
      `Free shipping is available on qualifying orders of ${freeShip} or more (before taxes and discounts, unless noted otherwise at checkout).`,
    )
  } else if (input.offerFreeShipping) {
    lines.push(`We offer free shipping on qualifying orders as shown at checkout.`)
  }

  if (rates) {
    lines.push(rates)
  } else {
    lines.push(
      `Shipping costs are calculated at checkout based on destination, package size/weight, and the shipping method you select.`,
    )
  }

  lines.push(
    ``,
    `6. Carriers & tracking`,
    `We ship with ${carriers}. Once your order ships, you will receive tracking information by email when available. Tracking updates depend on the carrier and may take up to 24–48 hours to appear.`,
    ``,
    `7. Incorrect or incomplete addresses`,
    `Please ensure your shipping address is complete and accurate at checkout. ${store} is not responsible for delays or lost packages caused by incorrect address details provided by the customer. Address changes after dispatch may not be possible.`,
    ``,
    `8. Lost, delayed, or damaged packages`,
    `If your package is delayed beyond the estimated window, appears lost, or arrives damaged, contact us as soon as possible with your order number and photos (for damage). We will work with the carrier to investigate and, where appropriate, arrange a replacement or refund according to our return policy.`,
  )

  if (restrictions) {
    lines.push(``, `9. Shipping restrictions`, restrictions)
  }

  const contactSection = restrictions ? "10" : "9"
  lines.push(
    ``,
    `${contactSection}. Contact`,
    email
      ? `Questions about shipping? Email us at ${email} and include your order number for faster help.`
      : `Questions about shipping? Contact us through the support details on our website and include your order number for faster help.`,
    ``,
    `We may update this Shipping Policy from time to time. The latest version will always be posted on this page.`,
  )

  return lines.join("\n")
}
