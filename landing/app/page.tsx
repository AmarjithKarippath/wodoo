import { TopBar } from "@/components/wodoo/top-bar"
import { Hero } from "@/components/wodoo/hero"
import { Steps } from "@/components/wodoo/steps"
import { Grow } from "@/components/wodoo/grow"
import { StatBand } from "@/components/wodoo/stat-band"
import { WhyWoodo } from "@/components/wodoo/why-woodo"
import { Faq } from "@/components/wodoo/faq"
import { Cta } from "@/components/wodoo/cta"
import { SiteFooter } from "@/components/wodoo/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <TopBar />
      <Hero />
      <Steps />
      <Grow />
      <StatBand />
      <WhyWoodo />
      <Faq />
      <Cta />
      <SiteFooter />
    </main>
  )
}
