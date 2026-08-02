const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

/** Google Image metadata recommended fields (creator, creditText, copyrightNotice). */
export function imageAttribution(year = new Date().getFullYear()) {
  return {
    creator: {
      "@type": "Organization" as const,
      name: "Woodo Store",
      url: SITE_URL,
    },
    creditText: "Woodo Store",
    copyrightNotice: `© ${year} Woodo Store`,
    license: SITE_URL,
    acquireLicensePage: SITE_URL,
  }
}
