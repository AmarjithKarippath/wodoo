export type Tool = {
  slug: string
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
  status: "live" | "soon"
}

/** Responsive WebP srcset for tool thumbnails (unoptimized Next images). */
export function toolImageSrcSet(slug: string): string {
  return [
    `/tools/${slug}-640w.webp 640w`,
    `/tools/${slug}-960w.webp 960w`,
    `/tools/${slug}.webp 1200w`,
  ].join(", ")
}

export const TOOLS: Tool[] = [
  {
    slug: "free-shipping-calculator",
    title: "Free shipping rate calculator",
    description:
      "Find a free-shipping threshold that covers your shipping cost, protects margin, and nudges average order value up.",
    href: "/tools/free-shipping-calculator",
    image: "/tools/free-shipping-calculator.webp",
    imageAlt:
      "Free online shipping threshold calculator to set profitable free shipping for ecommerce stores",
    status: "live",
  },
  {
    slug: "shipping-policy-generator",
    title: "Shipping policy generator",
    description:
      "Generate a clear, copy-ready shipping policy for your store — processing times, delivery windows, rates, and carriers.",
    href: "/tools/shipping-policy-generator",
    image: "/tools/shipping-policy-generator.webp",
    imageAlt:
      "Free online shipping policy generator for ecommerce store delivery terms and rates",
    status: "live",
  },
  {
    slug: "courier-carrier-finder",
    title: "Cheapest & fastest courier finder",
    description:
      "Compare USPS, UPS, FedEx, and DHL estimates by weight, size, and distance — then pick the cheapest or fastest option.",
    href: "/tools/courier-carrier-finder",
    image: "/tools/courier-carrier-finder.webp",
    imageAlt:
      "Online courier comparison tool to find the cheapest or fastest shipping carrier",
    status: "live",
  },
  {
    slug: "tax-duty-calculator",
    title: "Tax & duty calculator",
    description:
      "Estimate import duty, VAT/GST, and total landed cost by destination and product category for cross-border orders.",
    href: "/tools/tax-duty-calculator",
    image: "/tools/tax-duty-calculator.webp",
    imageAlt:
      "Free online import tax and duty calculator for cross-border ecommerce landed cost",
    status: "live",
  },
  {
    slug: "hs-tariff-code-lookup",
    title: "HS tariff code lookup",
    description:
      "Search Harmonized System (HS) codes by product keyword or code for customs classification.",
    href: "/tools/hs-tariff-code-lookup",
    image: "/tools/hs-tariff-code-lookup.webp",
    imageAlt:
      "Free online HS tariff code lookup tool for customs product classification",
    status: "live",
  },
  {
    slug: "postcode-address-finder",
    title: "Address by ZIP / postcode finder",
    description:
      "Look up city, region, and map location from a ZIP or postcode for shipping zones and delivery planning.",
    href: "/tools/postcode-address-finder",
    image: "/tools/postcode-address-finder.webp",
    imageAlt:
      "Online ZIP and postcode address finder for ecommerce shipping zone planning",
    status: "live",
  },
  {
    slug: "seo-audit",
    title: "SEO audit tool",
    description:
      "Run a free on-page SEO audit for title tags, meta descriptions, headings, Open Graph, HTTPS, and more.",
    href: "/tools/seo-audit",
    image: "/tools/seo-audit.webp",
    imageAlt:
      "Free online SEO audit tool to check on-page titles, metas, and technical signals",
    status: "live",
  },
  {
    slug: "seo-keyword-explorer",
    title: "SEO keyword explorer",
    description:
      "Expand a seed keyword into related terms, long-tail ideas, and search-intent clusters for content planning.",
    href: "/tools/seo-keyword-explorer",
    image: "/tools/seo-keyword-explorer.webp",
    imageAlt:
      "Free online SEO keyword explorer for long-tail ideas and search intent clusters",
    status: "live",
  },
  {
    slug: "fba-fee-calculator",
    title: "FBA fee & revenue calculator",
    description:
      "Estimate Amazon-style FBA referral, fulfillment, and storage fees — plus net revenue and profit per unit.",
    href: "/tools/fba-fee-calculator",
    image: "/tools/fba-fee-calculator.webp",
    imageAlt:
      "Free online Amazon FBA fee calculator to estimate referral, fulfillment, and profit",
    status: "live",
  },
  {
    slug: "ecommerce-profit-margin-calculator",
    title: "Ecommerce profit margin calculator",
    description:
      "Calculate gross and net margins with COGS, shipping, payment fees, ads, and other store costs.",
    href: "/tools/ecommerce-profit-margin-calculator",
    image: "/tools/ecommerce-profit-margin-calculator.webp",
    imageAlt:
      "Free online ecommerce profit margin calculator for COGS, fees, and ad costs",
    status: "live",
  },
  {
    slug: "dimensional-weight-calculator",
    title: "Dimensional weight & volume calculator",
    description:
      "Compute package volume, DIM weight, and billable shipping weight with common carrier divisors.",
    href: "/tools/dimensional-weight-calculator",
    image: "/tools/dimensional-weight-calculator.webp",
    imageAlt:
      "Online dimensional weight calculator for package volume and billable shipping weight",
    status: "live",
  },
  {
    slug: "break-even-units-calculator",
    title: "Break-even units calculator",
    description:
      "Find how many units you must sell to cover fixed costs based on price and variable cost.",
    href: "/tools/break-even-units-calculator",
    image: "/tools/break-even-units-calculator.webp",
    imageAlt:
      "Free online break-even units calculator for ecommerce pricing and fixed costs",
    status: "live",
  },
  {
    slug: "landed-product-cost-calculator",
    title: "Landed product cost calculator",
    description:
      "Roll up factory cost, inbound freight, duties, taxes, and handling into true cost per unit.",
    href: "/tools/landed-product-cost-calculator",
    image: "/tools/landed-product-cost-calculator.webp",
    imageAlt:
      "Online landed product cost calculator for factory, freight, duties, and taxes",
    status: "live",
  },
  {
    slug: "cac-payback-calculator",
    title: "CAC payback calculator",
    description:
      "Estimate months to recover customer acquisition cost using AOV, margin, and purchase frequency.",
    href: "/tools/cac-payback-calculator",
    image: "/tools/cac-payback-calculator.webp",
    imageAlt:
      "Free online CAC payback calculator to estimate months to recover acquisition cost",
    status: "live",
  },
  {
    slug: "marketplace-fee-calculator",
    title: "Marketplace fee calculator (eBay & Etsy)",
    description:
      "Estimate eBay final value fees and Etsy transaction/processing fees, net payout, and profit.",
    href: "/tools/marketplace-fee-calculator",
    image: "/tools/marketplace-fee-calculator.webp",
    imageAlt:
      "Free online eBay and Etsy marketplace fee calculator for net payout and profit",
    status: "live",
  },
  {
    slug: "volume-discount-planner",
    title: "Volume discount vs unit margin planner",
    description:
      "Compare discount tiers against expected volume to maximize total profit without killing unit margin.",
    href: "/tools/volume-discount-planner",
    image: "/tools/volume-discount-planner.webp",
    imageAlt:
      "Online volume discount planner to balance unit margin and total ecommerce profit",
    status: "live",
  },
  {
    slug: "influencer-engagement-rate-calculator",
    title: "Influencer engagement rate calculator",
    description:
      "Calculate Instagram, TikTok, and social engagement rate from likes, comments, shares, followers, and reach.",
    href: "/tools/influencer-engagement-rate-calculator",
    image: "/tools/influencer-engagement-rate-calculator.webp",
    imageAlt:
      "Free online influencer engagement rate calculator for Instagram and TikTok",
    status: "live",
  },
  {
    slug: "social-media-earning-calculator",
    title: "Social media earning / monetization calculator",
    description:
      "Estimate influencer income and sponsored-post rates from followers, engagement, CPM, and niche.",
    href: "/tools/social-media-earning-calculator",
    image: "/tools/social-media-earning-calculator.webp",
    imageAlt:
      "Online social media earning calculator for influencer income and sponsored rates",
    status: "live",
  },
  {
    slug: "follower-to-buyer-conversion-estimator",
    title: "Follower-to-buyer conversion estimator",
    description:
      "Estimate buyers and revenue from your follower count using profile visits, link clicks, and conversion rate.",
    href: "/tools/follower-to-buyer-conversion-estimator",
    image: "/tools/follower-to-buyer-conversion-estimator.webp",
    imageAlt:
      "Free online follower-to-buyer estimator for creator ecommerce conversion and revenue",
    status: "live",
  },
  {
    slug: "print-on-demand-profit-planner",
    title: "Print-on-demand (POD) profit planner",
    description:
      "Plan POD profit per order and monthly earnings after blank cost, print fees, shipping, ads, and fees.",
    href: "/tools/print-on-demand-profit-planner",
    image: "/tools/print-on-demand-profit-planner.webp",
    imageAlt:
      "Free online print-on-demand profit planner for per-order and monthly POD earnings",
    status: "live",
  },
  {
    slug: "merchandise-mockup-generator",
    title: "Merchandise mockup generator",
    description:
      "Create t-shirt, hoodie, mug, and tote mockups with your brand text and download SVG previews.",
    href: "/tools/merchandise-mockup-generator",
    image: "/tools/merchandise-mockup-generator.webp",
    imageAlt:
      "Free online merchandise mockup generator for t-shirts, hoodies, mugs, and totes",
    status: "live",
  },
  {
    slug: "link-in-bio-store-integrator",
    title: "Link-in-bio store integrator",
    description:
      "Generate a link-in-bio HTML page that connects Instagram or TikTok to your ecommerce store and offers.",
    href: "/tools/link-in-bio-store-integrator",
    image: "/tools/link-in-bio-store-integrator.webp",
    imageAlt:
      "Online link-in-bio store integrator to connect Instagram or TikTok to your shop",
    status: "live",
  },
  {
    slug: "wholesale-private-label-catalog",
    title: "Wholesale sourcing & private label catalog tool",
    description:
      "Compare wholesale vs private label on MOQ, landed cost, setup fees, margins, and monthly profit.",
    href: "/tools/wholesale-private-label-catalog",
    image: "/tools/wholesale-private-label-catalog.webp",
    imageAlt:
      "Free online wholesale vs private label catalog tool for MOQ, cost, and margin",
    status: "live",
  },
  {
    slug: "digital-product-course-profit-calculator",
    title: "Digital product & course profit margin calculator",
    description:
      "Estimate course and digital product margins after platform fees, refunds, creation cost, and marketing.",
    href: "/tools/digital-product-course-profit-calculator",
    image: "/tools/digital-product-course-profit-calculator.webp",
    imageAlt:
      "Online digital product and course profit margin calculator for creators",
    status: "live",
  },
  {
    slug: "affiliate-vs-owned-store-calculator",
    title: "Affiliate vs. owned store commission calculator",
    description:
      "Compare affiliate commission profit versus owned ecommerce store margins per order and period.",
    href: "/tools/affiliate-vs-owned-store-calculator",
    image: "/tools/affiliate-vs-owned-store-calculator.webp",
    imageAlt:
      "Free online affiliate vs owned store calculator to compare commission and margins",
    status: "live",
  },
  {
    slug: "domain-name-availability-checker",
    title: "Domain name availability checker",
    description:
      "Check if your brand domain is available across .com, .store, .shop, .io and other ecommerce TLDs.",
    href: "/tools/domain-name-availability-checker",
    image: "/tools/domain-name-availability-checker.webp",
    imageAlt:
      "Free online domain name availability checker for ecommerce brand TLDs",
    status: "live",
  },
  {
    slug: "qr-code-generator",
    title: "QR code generator",
    description:
      "Create downloadable QR codes for product links, store URLs, packaging, and marketing campaigns.",
    href: "/tools/qr-code-generator",
    image: "/tools/qr-code-generator.webp",
    imageAlt:
      "Free online QR code generator for product links, store URLs, and packaging",
    status: "live",
  },
  {
    slug: "trademark-registry-search",
    title: "Trademark & registry search",
    description:
      "Score brand distinctiveness and open USPTO, EUIPO, UK IPO, and WIPO searches plus matching domains.",
    href: "/tools/trademark-registry-search",
    image: "/tools/trademark-registry-search.webp",
    imageAlt:
      "Online trademark registry search helper for USPTO, EUIPO, UK IPO, and WIPO",
    status: "live",
  },
  {
    slug: "offsite-ads-margin-checker",
    title: "Offsite ads margin checker",
    description:
      "Subtract marketplace referral penalties (12%–15%) from margins when running offsite ads.",
    href: "/tools/offsite-ads-margin-checker",
    image: "/tools/offsite-ads-margin-checker.webp",
    imageAlt:
      "Free online offsite ads margin checker for marketplace referral fee impact",
    status: "live",
  },
  {
    slug: "marketplace-vs-standalone-break-even",
    title: "Marketplace vs. standalone break-even calculator",
    description:
      "Find the monthly order volume where a fixed website plan beats marketplace fees (Etsy vs Shopify and more).",
    href: "/tools/marketplace-vs-standalone-break-even",
    image: "/tools/marketplace-vs-standalone-break-even.webp",
    imageAlt:
      "Online marketplace vs standalone break-even calculator for Etsy vs Shopify fees",
    status: "live",
  },
  {
    slug: "company-name-availability-checker",
    title: "Company name availability checker",
    description:
      "Check proposed LLC and company names via Companies House and US Secretary of State entity search portals.",
    href: "/tools/company-name-availability-checker",
    image: "/tools/company-name-availability-checker.webp",
    imageAlt:
      "Free online company name availability checker for LLC and business entity search",
    status: "live",
  },
  {
    slug: "uspto-tess-trademark-search",
    title: "USPTO TESS trademark search",
    description:
      "Score your brand name and open the USPTO Trademark Electronic Search System before you register.",
    href: "/tools/uspto-tess-trademark-search",
    image: "/tools/uspto-tess-trademark-search.webp",
    imageAlt:
      "Online USPTO TESS trademark search helper to check brand name conflicts",
    status: "live",
  },
  {
    slug: "startup-legal-document-generator",
    title: "Startup legal document generator",
    description:
      "Draft free LLC operating agreements, articles of organization outlines, and corporate bylaws.",
    href: "/tools/startup-legal-document-generator",
    image: "/tools/startup-legal-document-generator.webp",
    imageAlt:
      "Free online startup legal document generator for LLC agreements and bylaws",
    status: "live",
  },
  {
    slug: "llc-vs-scorp-tax-calculator",
    title: "LLC vs. S-Corp tax calculator",
    description:
      "Compare self-employment tax on LLC profits versus S-Corp salary payroll taxes and distributions.",
    href: "/tools/llc-vs-scorp-tax-calculator",
    image: "/tools/llc-vs-scorp-tax-calculator.webp",
    imageAlt:
      "Free online LLC vs S-Corp tax calculator to compare self-employment and payroll tax",
    status: "live",
  },
  {
    slug: "state-filing-fee-comparison",
    title: "State filing fee comparison",
    description:
      "Compare approximate LLC and corporation formation and annual report fees across popular US states.",
    href: "/tools/state-filing-fee-comparison",
    image: "/tools/state-filing-fee-comparison.webp",
    imageAlt:
      "Online US state filing fee comparison for LLC and corporation formation costs",
    status: "live",
  },
  {
    slug: "irs-ein-assistant",
    title: "IRS EIN online assistant",
    description:
      "Prep your entity details and open the official IRS Employer Identification Number online application.",
    href: "/tools/irs-ein-assistant",
    image: "/tools/irs-ein-assistant.webp",
    imageAlt:
      "Free online IRS EIN assistant to prepare your Employer Identification Number application",
    status: "live",
  },
  {
    slug: "fincen-boi-filing-helper",
    title: "FinCEN BOI filing helper",
    description:
      "Prepare Beneficial Ownership Information details and continue to official FinCEN BOI filing resources.",
    href: "/tools/fincen-boi-filing-helper",
    image: "/tools/fincen-boi-filing-helper.webp",
    imageAlt:
      "Online FinCEN BOI filing helper for Beneficial Ownership Information preparation",
    status: "live",
  },
  {
    slug: "startup-business-plan-builder",
    title: "Startup business plan & cash flow builder",
    description:
      "Project monthly revenue, costs, and cash for banking, loans, and early company planning.",
    href: "/tools/startup-business-plan-builder",
    image: "/tools/startup-business-plan-builder.webp",
    imageAlt:
      "Free online startup business plan and cash flow builder for early company planning",
    status: "live",
  },
  {
    slug: "duns-number-request-helper",
    title: "D-U-N-S number request helper",
    description:
      "Prep company details and open the Dun & Bradstreet D-U-N-S number request for credit and contracts.",
    href: "/tools/duns-number-request-helper",
    image: "/tools/duns-number-request-helper.webp",
    imageAlt:
      "Online D-U-N-S number request helper to prepare Dun & Bradstreet company details",
    status: "live",
  },
]

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function liveTools(): Tool[] {
  return TOOLS.filter((tool) => tool.status === "live")
}
