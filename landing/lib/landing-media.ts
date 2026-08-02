const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

export type LandingImage = {
  src: string
  alt: string
  title: string
  caption: string
  width: number
  height: number
  encodingFormat: "image/jpeg" | "image/png" | "image/webp"
}

export type LandingVideo = {
  src: string
  title: string
  description: string
  ariaLabel: string
  /** Absolute or site-relative poster / thumbnail used for schema + sitemap */
  thumbnailSrc: string
  width: number
  height: number
  uploadDate: string
  encodingFormat: "video/mp4"
}

export const LANDING_IMAGES = {
  adminDashboard: {
    src: "/images/admin-dashboard.jpg",
    alt: "Woodo Store ecommerce admin dashboard showing sales analytics, promotions, and product tools",
    title: "Woodo Store admin dashboard",
    caption:
      "Manage products, promotions, revenue, and store operations from the Woodo Store dashboard",
    width: 1024,
    height: 379,
    encodingFormat: "image/jpeg",
  },
  chooseDesign: {
    src: "/images/choose-design.jpg",
    alt: "Merchant choosing product designs in a Woodo Store ecommerce website editor",
    title: "Choose your store design",
    caption:
      "Customize your online store design and product gallery in the Woodo Store editor",
    width: 1024,
    height: 761,
    encodingFormat: "image/jpeg",
  },
  productsShine: {
    src: "/images/products-shine.jpg",
    alt: "Premium skincare product photography ready for an ecommerce product page",
    title: "Make your products shine",
    caption:
      "Product photography and presentation for high-converting Woodo Store product pages",
    width: 682,
    height: 1024,
    encodingFormat: "image/jpeg",
  },
  getPaid: {
    src: "/images/get-paid.jpg",
    alt: "Customer completing a contactless smartwatch payment at ecommerce checkout",
    title: "Get paid with secure checkout",
    caption:
      "Accept modern contactless and digital wallet payments with Woodo Store checkout",
    width: 1024,
    height: 833,
    encodingFormat: "image/jpeg",
  },
} as const satisfies Record<string, LandingImage>

export const LANDING_VIDEOS = {
  stepsHero: {
    src: "/images/steps-hero.mp4",
    title: "Trusted and growing ecommerce platform — Woodo Store",
    description:
      "Woodo Store hero video showcasing a trusted ecommerce platform for launching and growing an online store.",
    ariaLabel:
      "Woodo Store storefront preview — trusted and growing ecommerce platform",
    thumbnailSrc: "/og.png",
    width: 1920,
    height: 1080,
    uploadDate: "2026-08-02",
    encodingFormat: "video/mp4",
  },
  socialShopping: {
    src: "/images/social-shopping.mp4",
    title: "Sell where they're scrolling — Woodo Store",
    description:
      "Put your products in every feed, inbox, reel and marketplace your shoppers already live in.",
    ariaLabel:
      "Sell where they're scrolling — shopper browsing a shoppable Woodo Store storefront",
    thumbnailSrc: "/images/choose-design.jpg",
    width: 1080,
    height: 1920,
    uploadDate: "2026-08-02",
    encodingFormat: "video/mp4",
  },
  retention: {
    src: "/images/retention.mp4",
    title: "Keep them coming back — Woodo Store",
    description:
      "Re-engage shoppers with a steady drumbeat of offers, updates, and automations that run while you sleep.",
    ariaLabel:
      "Keep them coming back — ecommerce retention and customer re-engagement with Woodo Store",
    thumbnailSrc: "/images/admin-dashboard.jpg",
    width: 1920,
    height: 1080,
    uploadDate: "2026-08-02",
    encodingFormat: "video/mp4",
  },
} as const satisfies Record<string, LandingVideo>

function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`
}

export function landingImageObjects() {
  return Object.values(LANDING_IMAGES).map((image) => ({
    "@type": "ImageObject" as const,
    contentUrl: abs(image.src),
    url: abs(image.src),
    name: image.title,
    description: image.caption,
    caption: image.caption,
    width: image.width,
    height: image.height,
    encodingFormat: image.encodingFormat,
    acquireLicensePage: SITE_URL,
  }))
}

export function landingVideoObjects() {
  return Object.values(LANDING_VIDEOS).map((video) => ({
    "@type": "VideoObject" as const,
    name: video.title,
    description: video.description,
    contentUrl: abs(video.src),
    thumbnailUrl: abs(video.thumbnailSrc),
    uploadDate: video.uploadDate,
    width: video.width,
    height: video.height,
    encodingFormat: video.encodingFormat,
    isFamilyFriendly: true,
  }))
}

export function landingMediaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [...landingImageObjects(), ...landingVideoObjects()],
  }
}
