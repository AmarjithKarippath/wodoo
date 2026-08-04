const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

/** Google Image metadata recommended fields (creator, creditText, copyrightNotice). */
export function imageAttribution(year = new Date().getFullYear()) {
  return {
    creator: {
      "@type": "Organization" as const,
      name: "Wodoo Store",
      url: SITE_URL,
    },
    creditText: "Wodoo Store",
    copyrightNotice: `© ${year} Wodoo Store`,
    license: SITE_URL,
    acquireLicensePage: SITE_URL,
  }
}

type ToolImageSource = {
  title: string
  image: string
  imageAlt: string
  href: string
}

/** Full ImageObject for tool thumbnails (Search Console image metadata). */
export function toolImageObject(
  tool: ToolImageSource,
  options?: { representativeOfPage?: boolean },
) {
  return {
    "@type": "ImageObject" as const,
    contentUrl: `${SITE_URL}${tool.image}`,
    url: `${SITE_URL}${tool.image}`,
    name: tool.title,
    description: tool.imageAlt,
    caption: tool.imageAlt,
    width: 1200,
    height: 630,
    encodingFormat: "image/webp" as const,
    inLanguage: "en",
    representativeOfPage: options?.representativeOfPage ?? false,
    ...imageAttribution(),
    acquireLicensePage: `${SITE_URL}${tool.href}`,
  }
}
