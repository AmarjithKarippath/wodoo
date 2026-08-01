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
  {
    slug: "influencer-engagement-rate-calculator",
    title: "Influencer engagement rate calculator",
    description:
      "Calculate Instagram, TikTok, and social engagement rate from likes, comments, shares, followers, and reach.",
    href: "/tools/influencer-engagement-rate-calculator",
    status: "live",
  },
  {
    slug: "social-media-earning-calculator",
    title: "Social media earning / monetization calculator",
    description:
      "Estimate influencer income and sponsored-post rates from followers, engagement, CPM, and niche.",
    href: "/tools/social-media-earning-calculator",
    status: "live",
  },
  {
    slug: "follower-to-buyer-conversion-estimator",
    title: "Follower-to-buyer conversion estimator",
    description:
      "Estimate buyers and revenue from your follower count using profile visits, link clicks, and conversion rate.",
    href: "/tools/follower-to-buyer-conversion-estimator",
    status: "live",
  },
  {
    slug: "print-on-demand-profit-planner",
    title: "Print-on-demand (POD) profit planner",
    description:
      "Plan POD profit per order and monthly earnings after blank cost, print fees, shipping, ads, and fees.",
    href: "/tools/print-on-demand-profit-planner",
    status: "live",
  },
  {
    slug: "merchandise-mockup-generator",
    title: "Merchandise mockup generator",
    description:
      "Create t-shirt, hoodie, mug, and tote mockups with your brand text and download SVG previews.",
    href: "/tools/merchandise-mockup-generator",
    status: "live",
  },
  {
    slug: "link-in-bio-store-integrator",
    title: "Link-in-bio store integrator",
    description:
      "Generate a link-in-bio HTML page that connects Instagram or TikTok to your ecommerce store and offers.",
    href: "/tools/link-in-bio-store-integrator",
    status: "live",
  },
  {
    slug: "wholesale-private-label-catalog",
    title: "Wholesale sourcing & private label catalog tool",
    description:
      "Compare wholesale vs private label on MOQ, landed cost, setup fees, margins, and monthly profit.",
    href: "/tools/wholesale-private-label-catalog",
    status: "live",
  },
  {
    slug: "digital-product-course-profit-calculator",
    title: "Digital product & course profit margin calculator",
    description:
      "Estimate course and digital product margins after platform fees, refunds, creation cost, and marketing.",
    href: "/tools/digital-product-course-profit-calculator",
    status: "live",
  },
  {
    slug: "affiliate-vs-owned-store-calculator",
    title: "Affiliate vs. owned store commission calculator",
    description:
      "Compare affiliate commission profit versus owned ecommerce store margins per order and period.",
    href: "/tools/affiliate-vs-owned-store-calculator",
    status: "live",
  },
  {
    slug: "domain-name-availability-checker",
    title: "Domain name availability checker",
    description:
      "Check if your brand domain is available across .com, .store, .shop, .io and other ecommerce TLDs.",
    href: "/tools/domain-name-availability-checker",
    status: "live",
  },
  {
    slug: "qr-code-generator",
    title: "QR code generator",
    description:
      "Create downloadable QR codes for product links, store URLs, packaging, and marketing campaigns.",
    href: "/tools/qr-code-generator",
    status: "live",
  },
  {
    slug: "trademark-registry-search",
    title: "Trademark & registry search",
    description:
      "Score brand distinctiveness and open USPTO, EUIPO, UK IPO, and WIPO searches plus matching domains.",
    href: "/tools/trademark-registry-search",
    status: "live",
  },
  {
    slug: "offsite-ads-margin-checker",
    title: "Offsite ads margin checker",
    description:
      "Subtract marketplace referral penalties (12%–15%) from margins when running offsite ads.",
    href: "/tools/offsite-ads-margin-checker",
    status: "live",
  },
  {
    slug: "marketplace-vs-standalone-break-even",
    title: "Marketplace vs. standalone break-even calculator",
    description:
      "Find the monthly order volume where a fixed website plan beats marketplace fees (Etsy vs Shopify and more).",
    href: "/tools/marketplace-vs-standalone-break-even",
    status: "live",
  },
]

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function liveTools(): Tool[] {
  return TOOLS.filter((tool) => tool.status === "live")
}
