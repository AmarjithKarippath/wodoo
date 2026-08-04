import { toolImageObject } from "@/lib/image-metadata"
import type { Tool } from "@/lib/tools"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

/** WebApplication + BreadcrumbList JSON-LD for a tool page. */
export function toolPageSchemas(tool: Tool) {
  const pageUrl = `${SITE_URL}${tool.href}`
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Wodoo Store",
      url: SITE_URL,
    },
    image: toolImageObject(tool, { representativeOfPage: true }),
    inLanguage: "en",
    isAccessibleForFree: true,
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.title,
        item: pageUrl,
      },
    ],
  }

  return [webApp, breadcrumb]
}

/** ItemList of all live tools for the /tools index. */
export function toolsIndexListSchema(tools: Tool[]) {
  const live = tools.filter((t) => t.status === "live")
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wodoo Store free online tools & calculators",
    description:
      "Free ecommerce, finance, health, and maths calculators from Wodoo Store",
    numberOfItems: live.length,
    itemListElement: live.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE_URL}${tool.href}`,
      description: tool.description,
    })),
  }
}
