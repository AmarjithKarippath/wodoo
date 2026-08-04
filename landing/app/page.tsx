import { TopBar } from "@/components/wodoo/top-bar"
import { Hero } from "@/components/wodoo/hero"
import { Steps } from "@/components/wodoo/steps"
import { Grow } from "@/components/wodoo/grow"
import { StatBand } from "@/components/wodoo/stat-band"
import { WhyWodoo } from "@/components/wodoo/why-wodoo"
import { Faq } from "@/components/wodoo/faq"
import { Cta } from "@/components/wodoo/cta"
import { SiteFooter } from "@/components/wodoo/site-footer"
import { LandingMediaSchema } from "@/components/wodoo/landing-media-schema"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <LandingMediaSchema />
      <TopBar />
      <Hero />
      <Steps />
      <Grow />
      <StatBand />
      <WhyWodoo />
      <Faq />
      <Cta />
      <SiteFooter />
    </main>
  )
}
