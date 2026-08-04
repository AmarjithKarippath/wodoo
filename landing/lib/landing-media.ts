import { imageAttribution } from "@/lib/image-metadata"

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
    alt: "Wodoo Store ecommerce platform collage with sales analytics, product editing, shipping tools, promotions, and a mobile shipped-order notification",
    title: "Wodoo Store ecommerce platform overview",
    caption:
      "Run sales analytics, product pages, shipping, promotions, and order notifications from the Wodoo Store ecommerce platform",
    width: 1024,
    height: 570,
    encodingFormat: "image/jpeg",
  },
  chooseDesign: {
    src: "/images/choose-design.jpg",
    alt: "Merchant choosing product designs in a Wodoo Store ecommerce website editor",
    title: "Choose your store design",
    caption:
      "Customize your online store design and product gallery in the Wodoo Store editor",
    width: 1024,
    height: 761,
    encodingFormat: "image/jpeg",
  },
  productsShine: {
    src: "/images/products-shine.jpg",
    alt: "Premium skincare product photography ready for an ecommerce product page",
    title: "Make your products shine",
    caption:
      "Product photography and presentation for high-converting Wodoo Store product pages",
    width: 682,
    height: 1024,
    encodingFormat: "image/jpeg",
  },
  getPaid: {
    src: "/images/get-paid.jpg",
    alt: "Customer completing a contactless smartwatch payment at ecommerce checkout",
    title: "Get paid with secure checkout",
    caption:
      "Accept modern contactless and digital wallet payments with Wodoo Store checkout",
    width: 1024,
    height: 833,
    encodingFormat: "image/jpeg",
  },
  productSneaker: {
    src: "/images/product-sneaker.png",
    alt: "Cloud Runner sneaker product photo on a Wodoo Store demo storefront",
    title: "Cloud Runner product — Wodoo Store",
    caption: "Example product listing for sneakers in a Wodoo Store online shop",
    width: 1024,
    height: 1024,
    encodingFormat: "image/png",
  },
  productBag: {
    src: "/images/product-bag.png",
    alt: "Everyday Tote bag product photo on a Wodoo Store demo storefront",
    title: "Everyday Tote product — Wodoo Store",
    caption: "Example product listing for a tote bag in a Wodoo Store online shop",
    width: 1024,
    height: 1024,
    encodingFormat: "image/png",
  },
} as const satisfies Record<string, LandingImage>

export const LANDING_VIDEOS = {
  stepsHero: {
    src: "/images/steps-hero.mp4",
    title: "Trusted and growing ecommerce platform — Wodoo Store",
    description:
      "Wodoo Store hero video showcasing a trusted ecommerce platform for launching and growing an online store.",
    ariaLabel:
      "Wodoo Store storefront preview — trusted and growing ecommerce platform",
    thumbnailSrc: "/images/steps-hero-poster.jpg",
    width: 1280,
    height: 720,
    uploadDate: "2026-08-02T00:00:00Z",
    encodingFormat: "video/mp4",
  },
  socialShopping: {
    src: "/images/social-shopping.mp4",
    title: "Sell where they're scrolling — Wodoo Store",
    description:
      "Put your products in every feed, inbox, reel and marketplace your shoppers already live in.",
    ariaLabel:
      "Sell where they're scrolling — shopper browsing a shoppable Wodoo Store storefront",
    thumbnailSrc: "/images/social-shopping-poster.jpg",
    width: 720,
    height: 1280,
    uploadDate: "2026-08-02T00:00:00Z",
    encodingFormat: "video/mp4",
  },
  retention: {
    src: "/images/retention.mp4",
    title: "Keep them coming back — Wodoo Store",
    description:
      "Re-engage shoppers with a steady drumbeat of offers, updates, and automations that run while you sleep.",
    ariaLabel:
      "Keep them coming back — ecommerce retention and customer re-engagement with Wodoo Store",
    thumbnailSrc: "/images/retention-poster.jpg",
    width: 1280,
    height: 720,
    uploadDate: "2026-08-02T00:00:00Z",
    encodingFormat: "video/mp4",
  },
} as const satisfies Record<string, LandingVideo>

function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export function landingImageObjects() {
  const attribution = imageAttribution()
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
    inLanguage: "en",
    ...attribution,
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
    inLanguage: "en",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization" as const,
      name: "Wodoo Store",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject" as const,
        contentUrl: abs("/og.png"),
        url: abs("/og.png"),
        name: "Wodoo Store",
        description: "Wodoo Store logo",
        width: 1200,
        height: 630,
        encodingFormat: "image/png",
        ...imageAttribution(),
      },
    },
  }))
}

export function landingMediaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Wodoo Store — launch your ecommerce store",
        image: Object.values(LANDING_IMAGES).map((image) => abs(image.src)),
        video: Object.values(LANDING_VIDEOS).map((video) => abs(video.src)),
      },
      ...landingImageObjects(),
      ...landingVideoObjects(),
    ],
  }
}

/** Homepage image + video sitemap fragments (Google image/video extensions). */
export function landingSitemapMediaXml() {
  const images = Object.values(LANDING_IMAGES)
    .map(
      (image) => `    <image:image>
      <image:loc>${escapeXml(abs(image.src))}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`
    )
    .join("\n")

  const videos = Object.values(LANDING_VIDEOS)
    .map(
      (video) => `    <video:video>
      <video:thumbnail_loc>${escapeXml(abs(video.thumbnailSrc))}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(abs(video.src))}</video:content_loc>
      <video:publication_date>${video.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`
    )
    .join("\n")

  return `${images}\n${videos}`
}
