export type Tool = {
  slug: string
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
  status: "live" | "soon"
}

export const TOOLS: Tool[] = [
  {
    slug: "free-shipping-calculator",
    title: "Free shipping rate calculator",
    description:
      "Find a free-shipping threshold that covers your shipping cost, protects margin, and nudges average order value up.",
    href: "/tools/free-shipping-calculator",
    image: "/tools/free-shipping-calculator.png",
    imageAlt: "Free shipping rate calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "shipping-policy-generator",
    title: "Shipping policy generator",
    description:
      "Generate a clear, copy-ready shipping policy for your store — processing times, delivery windows, rates, and carriers.",
    href: "/tools/shipping-policy-generator",
    image: "/tools/shipping-policy-generator.png",
    imageAlt: "Shipping policy generator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "courier-carrier-finder",
    title: "Cheapest & fastest courier finder",
    description:
      "Compare USPS, UPS, FedEx, and DHL estimates by weight, size, and distance — then pick the cheapest or fastest option.",
    href: "/tools/courier-carrier-finder",
    image: "/tools/courier-carrier-finder.png",
    imageAlt: "Cheapest & fastest courier finder — free ecommerce tool",
    status: "live",
  },
  {
    slug: "tax-duty-calculator",
    title: "Tax & duty calculator",
    description:
      "Estimate import duty, VAT/GST, and total landed cost by destination and product category for cross-border orders.",
    href: "/tools/tax-duty-calculator",
    image: "/tools/tax-duty-calculator.png",
    imageAlt: "Tax & duty calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "hs-tariff-code-lookup",
    title: "HS tariff code lookup",
    description:
      "Search Harmonized System (HS) codes by product keyword or code for customs classification.",
    href: "/tools/hs-tariff-code-lookup",
    image: "/tools/hs-tariff-code-lookup.png",
    imageAlt: "HS tariff code lookup — free ecommerce tool",
    status: "live",
  },
  {
    slug: "postcode-address-finder",
    title: "Address by ZIP / postcode finder",
    description:
      "Look up city, region, and map location from a ZIP or postcode for shipping zones and delivery planning.",
    href: "/tools/postcode-address-finder",
    image: "/tools/postcode-address-finder.png",
    imageAlt: "Address by ZIP / postcode finder — free ecommerce tool",
    status: "live",
  },
  {
    slug: "seo-audit",
    title: "SEO audit tool",
    description:
      "Run a free on-page SEO audit for title tags, meta descriptions, headings, Open Graph, HTTPS, and more.",
    href: "/tools/seo-audit",
    image: "/tools/seo-audit.png",
    imageAlt: "SEO audit tool — free ecommerce tool",
    status: "live",
  },
  {
    slug: "seo-keyword-explorer",
    title: "SEO keyword explorer",
    description:
      "Expand a seed keyword into related terms, long-tail ideas, and search-intent clusters for content planning.",
    href: "/tools/seo-keyword-explorer",
    image: "/tools/seo-keyword-explorer.png",
    imageAlt: "SEO keyword explorer — free ecommerce tool",
    status: "live",
  },
  {
    slug: "fba-fee-calculator",
    title: "FBA fee & revenue calculator",
    description:
      "Estimate Amazon-style FBA referral, fulfillment, and storage fees — plus net revenue and profit per unit.",
    href: "/tools/fba-fee-calculator",
    image: "/tools/fba-fee-calculator.png",
    imageAlt: "FBA fee & revenue calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "ecommerce-profit-margin-calculator",
    title: "Ecommerce profit margin calculator",
    description:
      "Calculate gross and net margins with COGS, shipping, payment fees, ads, and other store costs.",
    href: "/tools/ecommerce-profit-margin-calculator",
    image: "/tools/ecommerce-profit-margin-calculator.png",
    imageAlt: "Ecommerce profit margin calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "dimensional-weight-calculator",
    title: "Dimensional weight & volume calculator",
    description:
      "Compute package volume, DIM weight, and billable shipping weight with common carrier divisors.",
    href: "/tools/dimensional-weight-calculator",
    image: "/tools/dimensional-weight-calculator.png",
    imageAlt: "Dimensional weight & volume calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "break-even-units-calculator",
    title: "Break-even units calculator",
    description:
      "Find how many units you must sell to cover fixed costs based on price and variable cost.",
    href: "/tools/break-even-units-calculator",
    image: "/tools/break-even-units-calculator.png",
    imageAlt: "Break-even units calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "landed-product-cost-calculator",
    title: "Landed product cost calculator",
    description:
      "Roll up factory cost, inbound freight, duties, taxes, and handling into true cost per unit.",
    href: "/tools/landed-product-cost-calculator",
    image: "/tools/landed-product-cost-calculator.png",
    imageAlt: "Landed product cost calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "cac-payback-calculator",
    title: "CAC payback calculator",
    description:
      "Estimate months to recover customer acquisition cost using AOV, margin, and purchase frequency.",
    href: "/tools/cac-payback-calculator",
    image: "/tools/cac-payback-calculator.png",
    imageAlt: "CAC payback calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "marketplace-fee-calculator",
    title: "Marketplace fee calculator (eBay & Etsy)",
    description:
      "Estimate eBay final value fees and Etsy transaction/processing fees, net payout, and profit.",
    href: "/tools/marketplace-fee-calculator",
    image: "/tools/marketplace-fee-calculator.png",
    imageAlt: "Marketplace fee calculator (eBay & Etsy) — free ecommerce tool",
    status: "live",
  },
  {
    slug: "volume-discount-planner",
    title: "Volume discount vs unit margin planner",
    description:
      "Compare discount tiers against expected volume to maximize total profit without killing unit margin.",
    href: "/tools/volume-discount-planner",
    image: "/tools/volume-discount-planner.png",
    imageAlt: "Volume discount vs unit margin planner — free ecommerce tool",
    status: "live",
  },
  {
    slug: "influencer-engagement-rate-calculator",
    title: "Influencer engagement rate calculator",
    description:
      "Calculate Instagram, TikTok, and social engagement rate from likes, comments, shares, followers, and reach.",
    href: "/tools/influencer-engagement-rate-calculator",
    image: "/tools/influencer-engagement-rate-calculator.png",
    imageAlt: "Influencer engagement rate calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "social-media-earning-calculator",
    title: "Social media earning / monetization calculator",
    description:
      "Estimate influencer income and sponsored-post rates from followers, engagement, CPM, and niche.",
    href: "/tools/social-media-earning-calculator",
    image: "/tools/social-media-earning-calculator.png",
    imageAlt: "Social media earning / monetization calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "follower-to-buyer-conversion-estimator",
    title: "Follower-to-buyer conversion estimator",
    description:
      "Estimate buyers and revenue from your follower count using profile visits, link clicks, and conversion rate.",
    href: "/tools/follower-to-buyer-conversion-estimator",
    image: "/tools/follower-to-buyer-conversion-estimator.png",
    imageAlt: "Follower-to-buyer conversion estimator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "print-on-demand-profit-planner",
    title: "Print-on-demand (POD) profit planner",
    description:
      "Plan POD profit per order and monthly earnings after blank cost, print fees, shipping, ads, and fees.",
    href: "/tools/print-on-demand-profit-planner",
    image: "/tools/print-on-demand-profit-planner.png",
    imageAlt: "Print-on-demand (POD) profit planner — free ecommerce tool",
    status: "live",
  },
  {
    slug: "merchandise-mockup-generator",
    title: "Merchandise mockup generator",
    description:
      "Create t-shirt, hoodie, mug, and tote mockups with your brand text and download SVG previews.",
    href: "/tools/merchandise-mockup-generator",
    image: "/tools/merchandise-mockup-generator.png",
    imageAlt: "Merchandise mockup generator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "link-in-bio-store-integrator",
    title: "Link-in-bio store integrator",
    description:
      "Generate a link-in-bio HTML page that connects Instagram or TikTok to your ecommerce store and offers.",
    href: "/tools/link-in-bio-store-integrator",
    image: "/tools/link-in-bio-store-integrator.png",
    imageAlt: "Link-in-bio store integrator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "wholesale-private-label-catalog",
    title: "Wholesale sourcing & private label catalog tool",
    description:
      "Compare wholesale vs private label on MOQ, landed cost, setup fees, margins, and monthly profit.",
    href: "/tools/wholesale-private-label-catalog",
    image: "/tools/wholesale-private-label-catalog.png",
    imageAlt: "Wholesale sourcing & private label catalog tool — free ecommerce tool",
    status: "live",
  },
  {
    slug: "digital-product-course-profit-calculator",
    title: "Digital product & course profit margin calculator",
    description:
      "Estimate course and digital product margins after platform fees, refunds, creation cost, and marketing.",
    href: "/tools/digital-product-course-profit-calculator",
    image: "/tools/digital-product-course-profit-calculator.png",
    imageAlt: "Digital product & course profit margin calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "affiliate-vs-owned-store-calculator",
    title: "Affiliate vs. owned store commission calculator",
    description:
      "Compare affiliate commission profit versus owned ecommerce store margins per order and period.",
    href: "/tools/affiliate-vs-owned-store-calculator",
    image: "/tools/affiliate-vs-owned-store-calculator.png",
    imageAlt: "Affiliate vs. owned store commission calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "domain-name-availability-checker",
    title: "Domain name availability checker",
    description:
      "Check if your brand domain is available across .com, .store, .shop, .io and other ecommerce TLDs.",
    href: "/tools/domain-name-availability-checker",
    image: "/tools/domain-name-availability-checker.png",
    imageAlt: "Domain name availability checker — free ecommerce tool",
    status: "live",
  },
  {
    slug: "qr-code-generator",
    title: "QR code generator",
    description:
      "Create downloadable QR codes for product links, store URLs, packaging, and marketing campaigns.",
    href: "/tools/qr-code-generator",
    image: "/tools/qr-code-generator.png",
    imageAlt: "QR code generator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "trademark-registry-search",
    title: "Trademark & registry search",
    description:
      "Score brand distinctiveness and open USPTO, EUIPO, UK IPO, and WIPO searches plus matching domains.",
    href: "/tools/trademark-registry-search",
    image: "/tools/trademark-registry-search.png",
    imageAlt: "Trademark & registry search — free ecommerce tool",
    status: "live",
  },
  {
    slug: "offsite-ads-margin-checker",
    title: "Offsite ads margin checker",
    description:
      "Subtract marketplace referral penalties (12%–15%) from margins when running offsite ads.",
    href: "/tools/offsite-ads-margin-checker",
    image: "/tools/offsite-ads-margin-checker.png",
    imageAlt: "Offsite ads margin checker — free ecommerce tool",
    status: "live",
  },
  {
    slug: "marketplace-vs-standalone-break-even",
    title: "Marketplace vs. standalone break-even calculator",
    description:
      "Find the monthly order volume where a fixed website plan beats marketplace fees (Etsy vs Shopify and more).",
    href: "/tools/marketplace-vs-standalone-break-even",
    image: "/tools/marketplace-vs-standalone-break-even.png",
    imageAlt: "Marketplace vs. standalone break-even calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "company-name-availability-checker",
    title: "Company name availability checker",
    description:
      "Check proposed LLC and company names via Companies House and US Secretary of State entity search portals.",
    href: "/tools/company-name-availability-checker",
    image: "/tools/company-name-availability-checker.png",
    imageAlt: "Company name availability checker — free ecommerce tool",
    status: "live",
  },
  {
    slug: "uspto-tess-trademark-search",
    title: "USPTO TESS trademark search",
    description:
      "Score your brand name and open the USPTO Trademark Electronic Search System before you register.",
    href: "/tools/uspto-tess-trademark-search",
    image: "/tools/uspto-tess-trademark-search.png",
    imageAlt: "USPTO TESS trademark search — free ecommerce tool",
    status: "live",
  },
  {
    slug: "startup-legal-document-generator",
    title: "Startup legal document generator",
    description:
      "Draft free LLC operating agreements, articles of organization outlines, and corporate bylaws.",
    href: "/tools/startup-legal-document-generator",
    image: "/tools/startup-legal-document-generator.png",
    imageAlt: "Startup legal document generator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "llc-vs-scorp-tax-calculator",
    title: "LLC vs. S-Corp tax calculator",
    description:
      "Compare self-employment tax on LLC profits versus S-Corp salary payroll taxes and distributions.",
    href: "/tools/llc-vs-scorp-tax-calculator",
    image: "/tools/llc-vs-scorp-tax-calculator.png",
    imageAlt: "LLC vs. S-Corp tax calculator — free ecommerce tool",
    status: "live",
  },
  {
    slug: "state-filing-fee-comparison",
    title: "State filing fee comparison",
    description:
      "Compare approximate LLC and corporation formation and annual report fees across popular US states.",
    href: "/tools/state-filing-fee-comparison",
    image: "/tools/state-filing-fee-comparison.png",
    imageAlt: "State filing fee comparison — free ecommerce tool",
    status: "live",
  },
  {
    slug: "irs-ein-assistant",
    title: "IRS EIN online assistant",
    description:
      "Prep your entity details and open the official IRS Employer Identification Number online application.",
    href: "/tools/irs-ein-assistant",
    image: "/tools/irs-ein-assistant.png",
    imageAlt: "IRS EIN online assistant — free ecommerce tool",
    status: "live",
  },
  {
    slug: "fincen-boi-filing-helper",
    title: "FinCEN BOI filing helper",
    description:
      "Prepare Beneficial Ownership Information details and continue to official FinCEN BOI filing resources.",
    href: "/tools/fincen-boi-filing-helper",
    image: "/tools/fincen-boi-filing-helper.png",
    imageAlt: "FinCEN BOI filing helper — free ecommerce tool",
    status: "live",
  },
  {
    slug: "startup-business-plan-builder",
    title: "Startup business plan & cash flow builder",
    description:
      "Project monthly revenue, costs, and cash for banking, loans, and early company planning.",
    href: "/tools/startup-business-plan-builder",
    image: "/tools/startup-business-plan-builder.png",
    imageAlt: "Startup business plan & cash flow builder — free ecommerce tool",
    status: "live",
  },
  {
    slug: "duns-number-request-helper",
    title: "D-U-N-S number request helper",
    description:
      "Prep company details and open the Dun & Bradstreet D-U-N-S number request for credit and contracts.",
    href: "/tools/duns-number-request-helper",
    image: "/tools/duns-number-request-helper.png",
    imageAlt: "D-U-N-S number request helper — free ecommerce tool",
    status: "live",
  },
]

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function liveTools(): Tool[] {
  return TOOLS.filter((tool) => tool.status === "live")
}
