export type Tool = {
  slug: string
  title: string
  description: string
  href: string
  status: "live" | "soon"
}

export const TOOLS: Tool[] = [
  {
    slug: "free-shipping-calculator",
    title: "Free shipping rate calculator",
    description:
      "Find a free-shipping threshold that covers your shipping cost, protects margin, and nudges average order value up.",
    href: "/tools/free-shipping-calculator",
    status: "live",
  },
  {
    slug: "shipping-policy-generator",
    title: "Shipping policy generator",
    description:
      "Generate a clear, copy-ready shipping policy for your store — processing times, delivery windows, rates, and carriers.",
    href: "/tools/shipping-policy-generator",
    status: "live",
  },
  {
    slug: "courier-carrier-finder",
    title: "Cheapest & fastest courier finder",
    description:
      "Compare USPS, UPS, FedEx, and DHL estimates by weight, size, and distance — then pick the cheapest or fastest option.",
    href: "/tools/courier-carrier-finder",
    status: "live",
  },
  {
    slug: "tax-duty-calculator",
    title: "Tax & duty calculator",
    description:
      "Estimate import duty, VAT/GST, and total landed cost by destination and product category for cross-border orders.",
    href: "/tools/tax-duty-calculator",
    status: "live",
  },
  {
    slug: "hs-tariff-code-lookup",
    title: "HS tariff code lookup",
    description:
      "Search Harmonized System (HS) codes by product keyword or code for customs classification.",
    href: "/tools/hs-tariff-code-lookup",
    status: "live",
  },
  {
    slug: "postcode-address-finder",
    title: "Address by ZIP / postcode finder",
    description:
      "Look up city, region, and map location from a ZIP or postcode for shipping zones and delivery planning.",
    href: "/tools/postcode-address-finder",
    status: "live",
  },
  {
    slug: "seo-audit",
    title: "SEO audit tool",
    description:
      "Run a free on-page SEO audit for title tags, meta descriptions, headings, Open Graph, HTTPS, and more.",
    href: "/tools/seo-audit",
    status: "live",
  },
  {
    slug: "seo-keyword-explorer",
    title: "SEO keyword explorer",
    description:
      "Expand a seed keyword into related terms, long-tail ideas, and search-intent clusters for content planning.",
    href: "/tools/seo-keyword-explorer",
    status: "live",
  },
  {
    slug: "fba-fee-calculator",
    title: "FBA fee & revenue calculator",
    description:
      "Estimate Amazon-style FBA referral, fulfillment, and storage fees — plus net revenue and profit per unit.",
    href: "/tools/fba-fee-calculator",
    status: "live",
  },
  {
    slug: "ecommerce-profit-margin-calculator",
    title: "Ecommerce profit margin calculator",
    description:
      "Calculate gross and net margins with COGS, shipping, payment fees, ads, and other store costs.",
    href: "/tools/ecommerce-profit-margin-calculator",
    status: "live",
  },
  {
    slug: "dimensional-weight-calculator",
    title: "Dimensional weight & volume calculator",
    description:
      "Compute package volume, DIM weight, and billable shipping weight with common carrier divisors.",
    href: "/tools/dimensional-weight-calculator",
    status: "live",
  },
  {
    slug: "break-even-units-calculator",
    title: "Break-even units calculator",
    description:
      "Find how many units you must sell to cover fixed costs based on price and variable cost.",
    href: "/tools/break-even-units-calculator",
    status: "live",
  },
  {
    slug: "landed-product-cost-calculator",
    title: "Landed product cost calculator",
    description:
      "Roll up factory cost, inbound freight, duties, taxes, and handling into true cost per unit.",
    href: "/tools/landed-product-cost-calculator",
    status: "live",
  },
  {
    slug: "cac-payback-calculator",
    title: "CAC payback calculator",
    description:
      "Estimate months to recover customer acquisition cost using AOV, margin, and purchase frequency.",
    href: "/tools/cac-payback-calculator",
    status: "live",
  },
  {
    slug: "marketplace-fee-calculator",
    title: "Marketplace fee calculator (eBay & Etsy)",
    description:
      "Estimate eBay final value fees and Etsy transaction/processing fees, net payout, and profit.",
    href: "/tools/marketplace-fee-calculator",
    status: "live",
  },
  {
    slug: "volume-discount-planner",
    title: "Volume discount vs unit margin planner",
    description:
      "Compare discount tiers against expected volume to maximize total profit without killing unit margin.",
    href: "/tools/volume-discount-planner",
    status: "live",
  },
]

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function liveTools(): Tool[] {
  return TOOLS.filter((tool) => tool.status === "live")
}
