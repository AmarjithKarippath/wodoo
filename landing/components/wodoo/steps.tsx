"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { LANDING_IMAGES, LANDING_VIDEOS } from "@/lib/landing-media"
import { LazyVideo } from "./lazy-video"
import { Reveal } from "./reveal"

const OVERLAY_PHASES = [
  {
    id: "headline",
    holdMs: 3800,
    className:
      "max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white text-balance drop-shadow-md sm:text-5xl lg:text-6xl",
    lines: ["Trusted and growing ecommerce platform"],
  },
] as const

const FADE_MS = 1200
const GAP_MS = 900

function StepsHeroOverlay() {
  const [index, setIndex] = useState(0)
  const phase = OVERLAY_PHASES[index]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % OVERLAY_PHASES.length)
    }, FADE_MS + phase.holdMs + FADE_MS + GAP_MS)
    return () => window.clearTimeout(timer)
  }, [index, phase.holdMs])

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-black/25" />
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center"
        >
          {phase.lines.map((line, i) => (
            <p
              key={line}
              className={`${phase.className}${i > 0 ? " mt-3 sm:mt-4" : ""}`}
            >
              {line}
            </p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function DesignVisual() {
  const image = LANDING_IMAGES.chooseDesign
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-sm"
    >
      <Image
        src={image.src}
        alt={image.alt}
        title={image.title}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 100vw, 360px"
        loading="lazy"
        className="h-40 w-full object-cover sm:h-44"
      />
    </motion.div>
  )
}

function ProductVisual() {
  const image = LANDING_IMAGES.productsShine
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-sm"
    >
      <Image
        src={image.src}
        alt={image.alt}
        title={image.title}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 100vw, 360px"
        loading="lazy"
        className="h-40 w-full object-cover sm:h-44"
      />
    </motion.div>
  )
}

function PayVisual() {
  const image = LANDING_IMAGES.getPaid
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-sm"
    >
      <Image
        src={image.src}
        alt={image.alt}
        title={image.title}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 100vw, 360px"
        loading="lazy"
        className="h-40 w-full object-cover sm:h-44"
      />
    </motion.div>
  )
}

const STEPS = [
  {
    n: "01",
    title: "Choose design",
    body: "Start from a stunning prebuilt theme, or describe your vibe and let Woodo Store generate a store that looks built just for your brand.",
    visual: <DesignVisual />,
  },
  {
    n: "02",
    title: "List products",
    body: "Drop in your photos and Woodo Store polishes them, writes descriptions, and lays out product pages that turn browsers into buyers.",
    visual: <ProductVisual />,
  },
  {
    n: "03",
    title: "Get paid",
    body: "All you need is a bank account. Accept every way your customers love to pay, with secure checkout built right in.",
    visual: <PayVisual />,
  },
]

export function Steps() {
  const hero = LANDING_VIDEOS.stepsHero

  return (
    <section id="product" className="px-4 py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-secondary/30 shadow-sm sm:rounded-[2rem]">
            <LazyVideo
              src={hero.src}
              poster={hero.thumbnailSrc}
              title={hero.title}
              aria-label={hero.ariaLabel}
              className="aspect-video h-auto w-full object-cover"
            />
            <StepsHeroOverlay />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground text-balance sm:mt-10 sm:text-4xl lg:text-5xl">
            You&apos;re three easy steps away from launching your ecommerce store
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm sm:gap-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-primary">{s.n}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div>{s.visual}</div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.body}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
