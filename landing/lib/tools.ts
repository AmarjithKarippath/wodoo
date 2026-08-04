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
  {
    slug: "dropshipping-profit-calculator",
    title: "Dropshipping profit calculator",
    description:
      "Estimate dropshipping profit and margin after product cost, shipping, ads, and platform fees.",
    href: "/tools/dropshipping-profit-calculator",
    image: "/tools/dropshipping-profit-calculator.webp",
    imageAlt:
      "Free online dropshipping profit calculator for margin, fees, and break-even price",
    status: "live",
  },
  {
    slug: "aliexpress-supplier-profit-calculator",
    title: "AliExpress / supplier profit calculator",
    description:
      "Estimate AliExpress and supplier landed cost, duties, fees, and profit per unit.",
    href: "/tools/aliexpress-supplier-profit-calculator",
    image: "/tools/aliexpress-supplier-profit-calculator.webp",
    imageAlt:
      "Free online AliExpress supplier profit calculator for landed cost and margin",
    status: "live",
  },
  {
    slug: "roas-calculator",
    title: "ROAS calculator",
    description:
      "Calculate return on ad spend, contribution profit, and break-even ROAS for paid campaigns.",
    href: "/tools/roas-calculator",
    image: "/tools/roas-calculator.webp",
    imageAlt:
      "Free online ROAS calculator for ecommerce return on ad spend and break-even ROAS",
    status: "live",
  },
  {
    slug: "shopify-fee-calculator",
    title: "Shopify fee calculator",
    description:
      "Estimate Shopify plan and payment processing fees, monthly totals, and net per order.",
    href: "/tools/shopify-fee-calculator",
    image: "/tools/shopify-fee-calculator.webp",
    imageAlt:
      "Free online Shopify fee calculator for payment fees, plan fees, and net payout",
    status: "live",
  },
  {
    slug: "paypal-stripe-fee-calculator",
    title: "PayPal / Stripe fee calculator",
    description:
      "Estimate PayPal or Stripe processing fees and net payout for domestic or international charges.",
    href: "/tools/paypal-stripe-fee-calculator",
    image: "/tools/paypal-stripe-fee-calculator.webp",
    imageAlt:
      "Free online PayPal and Stripe fee calculator for processing fees and net payout",
    status: "live",
  },
  {
    slug: "facebook-ads-budget-calculator",
    title: "Facebook ads budget calculator",
    description:
      "Project Facebook/Meta ad clicks, orders, CPA, ROAS, and revenue from a daily budget.",
    href: "/tools/facebook-ads-budget-calculator",
    image: "/tools/facebook-ads-budget-calculator.webp",
    imageAlt:
      "Free online Facebook ads budget calculator for Meta CPC, CPA, ROAS, and revenue",
    status: "live",
  },
  {
    slug: "winning-product-score-calculator",
    title: "Winning product score calculator",
    description:
      "Score ecommerce product ideas on demand, competition, margin, trend, and shipping ease.",
    href: "/tools/winning-product-score-calculator",
    image: "/tools/winning-product-score-calculator.webp",
    imageAlt:
      "Free online winning product score calculator for dropshipping and ecommerce ideas",
    status: "live",
  },
  {
    slug: "discount-impact-calculator",
    title: "Discount impact calculator",
    description:
      "Measure how a discount changes margin and how many extra units you need for the same profit.",
    href: "/tools/discount-impact-calculator",
    image: "/tools/discount-impact-calculator.webp",
    imageAlt:
      "Free online discount impact calculator for margin loss and break-even volume",
    status: "live",
  },
  {
    slug: "cpa-ad-cost-calculator",
    title: "CPA / ad cost calculator",
    description:
      "Calculate cost per acquisition and the maximum profitable CPA from AOV and margin.",
    href: "/tools/cpa-ad-cost-calculator",
    image: "/tools/cpa-ad-cost-calculator.webp",
    imageAlt:
      "Free online CPA ad cost calculator for cost per acquisition and max profitable CPA",
    status: "live",
  },
  {
    slug: "conversion-rate-calculator",
    title: "Conversion rate calculator",
    description:
      "Calculate conversion rate and how many visitors you need to hit a sales goal.",
    href: "/tools/conversion-rate-calculator",
    image: "/tools/conversion-rate-calculator.webp",
    imageAlt:
      "Free online conversion rate calculator for visitors needed to hit ecommerce sales goals",
    status: "live",
  },
  {
    slug: "traffic-calculator",
    title: "Traffic calculator",
    description:
      "Estimate how much traffic you need to hit a monthly profit goal from AOV, margin, and conversion rate.",
    href: "/tools/traffic-calculator",
    image: "/tools/traffic-calculator.webp",
    imageAlt:
      "Free online traffic calculator for visitors needed to hit ecommerce profit goals",
    status: "live",
  },
  {
    slug: "ltv-calculator",
    title: "LTV calculator",
    description:
      "Estimate customer lifetime value from AOV, purchase frequency, lifespan, and margin.",
    href: "/tools/ltv-calculator",
    image: "/tools/ltv-calculator.webp",
    imageAlt:
      "Free online customer LTV calculator for ecommerce lifetime value and contribution",
    status: "live",
  },
  {
    slug: "store-name-generator",
    title: "Store name generator",
    description:
      "Generate brandable ecommerce store name ideas from a niche or product keyword.",
    href: "/tools/store-name-generator",
    image: "/tools/store-name-generator.webp",
    imageAlt:
      "Free online store name generator for ecommerce brand and shop name ideas",
    status: "live",
  },
  {
    slug: "bmi-calculator",
    title: "BMI calculator",
    description:
      "Free BMI calculator to check body mass index, weight category, and healthy weight range.",
    href: "/tools/bmi-calculator",
    image: "/tools/bmi-calculator.webp",
    imageAlt:
      "Free online BMI calculator for body mass index and healthy weight range",
    status: "live",
  },
  {
    slug: "age-calculator",
    title: "Age calculator",
    description:
      "Free age calculator for exact age in years, months, days, and next birthday countdown.",
    href: "/tools/age-calculator",
    image: "/tools/age-calculator.webp",
    imageAlt:
      "Free online age calculator for years months days from date of birth",
    status: "live",
  },
  {
    slug: "percentage-calculator",
    title: "Percentage calculator",
    description:
      "Free percentage calculator for percent of a number, reverse percent, and percentage change.",
    href: "/tools/percentage-calculator",
    image: "/tools/percentage-calculator.webp",
    imageAlt:
      "Free online percentage calculator for percent of value and percentage change",
    status: "live",
  },
  {
    slug: "emi-calculator",
    title: "EMI calculator",
    description:
      "Free EMI calculator for monthly installment, total interest, and total loan payment.",
    href: "/tools/emi-calculator",
    image: "/tools/emi-calculator.webp",
    imageAlt:
      "Free online EMI calculator for monthly loan installment and total interest",
    status: "live",
  },
  {
    slug: "calorie-bmr-calculator",
    title: "Calorie & BMR calculator",
    description:
      "Free calorie and BMR calculator for daily energy needs, weight loss, and weight gain targets.",
    href: "/tools/calorie-bmr-calculator",
    image: "/tools/calorie-bmr-calculator.webp",
    imageAlt:
      "Free online calorie and BMR calculator for daily calorie needs and TDEE",
    status: "live",
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound interest calculator",
    description:
      "Free compound interest calculator for future value, contributions, and interest earned.",
    href: "/tools/compound-interest-calculator",
    image: "/tools/compound-interest-calculator.webp",
    imageAlt:
      "Free online compound interest calculator for investment future value growth",
    status: "live",
  },
  {
    slug: "fd-calculator",
    title: "FD calculator",
    description:
      "Free fixed deposit FD calculator for maturity amount and interest earned.",
    href: "/tools/fd-calculator",
    image: "/tools/fd-calculator.webp",
    imageAlt:
      "Free online FD calculator for fixed deposit maturity amount and interest",
    status: "live",
  },
  {
    slug: "rd-calculator",
    title: "RD calculator",
    description:
      "Free recurring deposit RD calculator for maturity value and interest earned.",
    href: "/tools/rd-calculator",
    image: "/tools/rd-calculator.webp",
    imageAlt:
      "Free online RD calculator for recurring deposit maturity and interest",
    status: "live",
  },
  {
    slug: "home-personal-loan-emi-calculator",
    title: "Home & personal loan EMI calculator",
    description:
      "Free home loan and personal loan EMI calculator for monthly payment and total interest.",
    href: "/tools/home-personal-loan-emi-calculator",
    image: "/tools/home-personal-loan-emi-calculator.webp",
    imageAlt:
      "Free online home loan and personal loan EMI calculator",
    status: "live",
  },
  {
    slug: "gst-calculator",
    title: "GST calculator",
    description:
      "Free India GST calculator for exclusive/inclusive tax, CGST, SGST, and invoice total.",
    href: "/tools/gst-calculator",
    image: "/tools/gst-calculator.webp",
    imageAlt:
      "Free online GST calculator India for CGST SGST and invoice total",
    status: "live",
  },
  {
    slug: "income-tax-calculator",
    title: "Income tax calculator",
    description:
      "Free India income tax calculator for new/old regime tax, cess, and take-home estimate.",
    href: "/tools/income-tax-calculator",
    image: "/tools/income-tax-calculator.webp",
    imageAlt:
      "Free online income tax calculator India for new and old regime",
    status: "live",
  },
  {
    slug: "date-days-calculator",
    title: "Date / days calculator",
    description:
      "Free date calculator for days between dates and adding or subtracting days.",
    href: "/tools/date-days-calculator",
    image: "/tools/date-days-calculator.webp",
    imageAlt:
      "Free online date days calculator for difference between dates",
    status: "live",
  },
  {
    slug: "maths-solver",
    title: "Maths solver",
    description:
      "Free maths solver for arithmetic expressions with parentheses, powers, and percentages.",
    href: "/tools/maths-solver",
    image: "/tools/maths-solver.webp",
    imageAlt:
      "Free online maths solver calculator for arithmetic expressions",
    status: "live",
  },
  {
    slug: "gpa-calculator",
    title: "GPA calculator",
    description:
      "Free GPA calculator for weighted grade point average from credits and grade points.",
    href: "/tools/gpa-calculator",
    image: "/tools/gpa-calculator.webp",
    imageAlt:
      "Free online GPA calculator for college grade point average",
    status: "live",
  },
  {
    slug: "body-fat-ideal-weight-calculator",
    title: "Body fat & ideal weight calculator",
    description:
      "Free body fat and ideal weight calculator using US Navy method plus Devine ideal weight.",
    href: "/tools/body-fat-ideal-weight-calculator",
    image: "/tools/body-fat-ideal-weight-calculator.webp",
    imageAlt:
      "Free online body fat percentage and ideal weight calculator",
    status: "live",
  },
  {
    slug: "car-loan-emi-calculator",
    title: "Car loan EMI calculator",
    description:
      "Free car loan EMI calculator for monthly installment after down payment, total interest, and repayment.",
    href: "/tools/car-loan-emi-calculator",
    image: "/tools/car-loan-emi-calculator.webp",
    imageAlt:
      "Free online car loan EMI calculator for vehicle financing",
    status: "live",
  },
  {
    slug: "interest-calculator",
    title: "Interest calculator",
    description:
      "Free simple and compound interest calculator for principal, rate, years, and maturity amount.",
    href: "/tools/interest-calculator",
    image: "/tools/interest-calculator.webp",
    imageAlt:
      "Free online interest calculator for simple and compound interest",
    status: "live",
  },
  {
    slug: "lumpsum-calculator",
    title: "Lumpsum calculator",
    description:
      "Free lumpsum investment calculator for future value and wealth gained from expected returns.",
    href: "/tools/lumpsum-calculator",
    image: "/tools/lumpsum-calculator.webp",
    imageAlt:
      "Free online lumpsum mutual fund calculator",
    status: "live",
  },
  {
    slug: "swp-calculator",
    title: "SWP calculator",
    description:
      "Free SWP calculator for systematic withdrawals, ending corpus, and sustainability of drawdowns.",
    href: "/tools/swp-calculator",
    image: "/tools/swp-calculator.webp",
    imageAlt:
      "Free online SWP systematic withdrawal plan calculator",
    status: "live",
  },
  {
    slug: "sukanya-samriddhi-calculator",
    title: "Sukanya Samriddhi Yojana calculator",
    description:
      "Free Sukanya Samriddhi Yojana calculator for maturity value, deposits, and interest earned.",
    href: "/tools/sukanya-samriddhi-calculator",
    image: "/tools/sukanya-samriddhi-calculator.webp",
    imageAlt:
      "Free online Sukanya Samriddhi Yojana SSY calculator India",
    status: "live",
  },
  {
    slug: "xirr-calculator",
    title: "XIRR calculator",
    description:
      "Free XIRR calculator for annualized returns from dated investment cash flows.",
    href: "/tools/xirr-calculator",
    image: "/tools/xirr-calculator.webp",
    imageAlt:
      "Free online XIRR calculator for mutual fund and investment returns",
    status: "live",
  },
  {
    slug: "tdee-calculator",
    title: "TDEE calculator",
    description:
      "Free TDEE calculator for daily calorie needs from BMR and activity level.",
    href: "/tools/tdee-calculator",
    image: "/tools/tdee-calculator.webp",
    imageAlt:
      "Free online TDEE calculator for total daily energy expenditure",
    status: "live",
  },
  {
    slug: "calorie-deficit-calculator",
    title: "Calorie deficit calculator",
    description:
      "Free calorie deficit calculator for weight-loss pace and time to target weight.",
    href: "/tools/calorie-deficit-calculator",
    image: "/tools/calorie-deficit-calculator.webp",
    imageAlt:
      "Free online calorie deficit calculator for weight loss timeline",
    status: "live",
  },
  {
    slug: "metabolic-rate-calculator",
    title: "Metabolic rate calculator",
    description:
      "Free metabolic rate calculator comparing Mifflin, Harris–Benedict, and Katch–McArdle BMR/TDEE.",
    href: "/tools/metabolic-rate-calculator",
    image: "/tools/metabolic-rate-calculator.webp",
    imageAlt:
      "Free online metabolic rate BMR calculator with multiple formulas",
    status: "live",
  },
  {
    slug: "retirement-calculator",
    title: "Retirement calculator",
    description:
      "Free retirement planning calculator for corpus needed, projected savings, and shortfall.",
    href: "/tools/retirement-calculator",
    image: "/tools/retirement-calculator.webp",
    imageAlt:
      "Free online retirement corpus planning calculator",
    status: "live",
  },
  {
    slug: "pension-calculator",
    title: "Pension calculator",
    description:
      "Free pension calculator for monthly pension from corpus or corpus required for target pension.",
    href: "/tools/pension-calculator",
    image: "/tools/pension-calculator.webp",
    imageAlt:
      "Free online pension and annuity drawdown calculator",
    status: "live",
  },
  {
    slug: "electricity-bill-calculator",
    title: "Electricity bill calculator",
    description:
      "Free electricity bill calculator for slab-based energy charges and fixed charges.",
    href: "/tools/electricity-bill-calculator",
    image: "/tools/electricity-bill-calculator.webp",
    imageAlt:
      "Free online electricity bill calculator with unit slabs",
    status: "live",
  },
  {
    slug: "net-worth-calculator",
    title: "Net worth calculator",
    description:
      "Free net worth calculator for assets, liabilities, and overall financial position.",
    href: "/tools/net-worth-calculator",
    image: "/tools/net-worth-calculator.webp",
    imageAlt:
      "Free online net worth calculator for assets and liabilities",
    status: "live",
  },
  {
    slug: "irr-calculator",
    title: "IRR calculator",
    description:
      "Free IRR calculator for internal rate of return from periodic investment cash flows.",
    href: "/tools/irr-calculator",
    image: "/tools/irr-calculator.webp",
    imageAlt:
      "Free online IRR internal rate of return calculator",
    status: "live",
  },
  {
    slug: "present-value-calculator",
    title: "Present value calculator",
    description:
      "Free PV, FV, and NPV calculator for time value of money and project cash flows.",
    href: "/tools/present-value-calculator",
    image: "/tools/present-value-calculator.webp",
    imageAlt:
      "Free online present value NPV and future value calculator",
    status: "live",
  },
  {
    slug: "stamp-duty-calculator",
    title: "Stamp duty calculator",
    description:
      "Free stamp duty calculator India for property stamp duty and registration estimates by state.",
    href: "/tools/stamp-duty-calculator",
    image: "/tools/stamp-duty-calculator.webp",
    imageAlt:
      "Free online stamp duty calculator India for property purchase",
    status: "live",
  },
  {
    slug: "us-mortgage-calculator",
    title: "US mortgage calculator",
    description:
      "Free US mortgage calculator for monthly PITI, loan amount, and total interest.",
    href: "/tools/us-mortgage-calculator",
    image: "/tools/us-mortgage-calculator.webp",
    imageAlt:
      "Free online US mortgage calculator for monthly home loan payments",
    status: "live",
  },
  {
    slug: "uk-salary-calculator",
    title: "UK salary / take-home calculator",
    description:
      "Free UK salary take-home calculator for income tax, NI, student loan, and pension.",
    href: "/tools/uk-salary-calculator",
    image: "/tools/uk-salary-calculator.webp",
    imageAlt:
      "Free online UK salary take-home pay calculator",
    status: "live",
  },
  {
    slug: "pdf-converter",
    title: "PDF converter",
    description:
      "Free PDF converter for text and images to PDF in the browser.",
    href: "/tools/pdf-converter",
    image: "/tools/pdf-converter.webp",
    imageAlt:
      "Free online PDF converter for text and images",
    status: "live",
  },
  {
    slug: "pdf-to-pdf-converter",
    title: "PDF to PDF converter",
    description:
      "Free PDF to PDF converter to merge PDFs or rotate pages locally.",
    href: "/tools/pdf-to-pdf-converter",
    image: "/tools/pdf-to-pdf-converter.webp",
    imageAlt:
      "Free online PDF merge and rotate converter",
    status: "live",
  },
  {
    slug: "word-to-pdf-converter",
    title: "Word to PDF converter",
    description:
      "Free Word to PDF converter for .docx documents in the browser.",
    href: "/tools/word-to-pdf-converter",
    image: "/tools/word-to-pdf-converter.webp",
    imageAlt:
      "Free online Word DOCX to PDF converter",
    status: "live",
  },
  {
    slug: "images-to-pdf-converter",
    title: "Images to PDF converter",
    description:
      "Free images to PDF converter for JPG and PNG to multi-page PDF.",
    href: "/tools/images-to-pdf-converter",
    image: "/tools/images-to-pdf-converter.webp",
    imageAlt:
      "Free online images to PDF converter for JPG and PNG",
    status: "live",
  },
  {
    slug: "youtube-to-mp3-converter",
    title: "YouTube audio player",
    description:
      "Free YouTube audio player via official embed — no MP3 downloading.",
    href: "/tools/youtube-to-mp3-converter",
    image: "/tools/youtube-to-mp3-converter.webp",
    imageAlt:
      "Free online YouTube audio player with official embed",
    status: "live",
  },
]

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}

export function liveTools(): Tool[] {
  return TOOLS.filter((tool) => tool.status === "live")
}
