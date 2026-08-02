import { landingMediaJsonLd } from "@/lib/landing-media"

/** Server-side ImageObject + VideoObject JSON-LD for homepage media. */
export function LandingMediaSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(landingMediaJsonLd()) }}
    />
  )
}
