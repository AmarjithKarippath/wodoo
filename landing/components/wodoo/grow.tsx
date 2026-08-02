"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { LANDING_VIDEOS } from "@/lib/landing-media"
import { LazyVideo } from "./lazy-video"
import { Reveal } from "./reveal"

const FADE_MS = 1200
const HOLD_MS = 3800
const GAP_MS = 900

function VideoCardOverlay({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible((current) => !current)
    }, visible ? FADE_MS + HOLD_MS : FADE_MS + GAP_MS)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/20" />
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-md text-center"
          >
            <p className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white text-balance drop-shadow-md sm:text-4xl lg:text-5xl">
              {title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/85 text-pretty sm:mt-3 sm:text-base">
              {description}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function GrowVideoCard({
  src,
  title,
  description,
  ariaLabel,
  poster,
  overlayTitle,
  delay = 0,
}: {
  src: string
  title: string
  description: string
  ariaLabel: string
  poster: string
  overlayTitle: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full min-h-[20rem] overflow-hidden rounded-3xl border border-border bg-ink shadow-sm sm:min-h-[28rem] lg:min-h-[32rem]"
      >
        <LazyVideo
          src={src}
          poster={poster}
          title={title}
          aria-label={ariaLabel}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <VideoCardOverlay title={overlayTitle} description={description} />
      </motion.div>
    </Reveal>
  )
}

export function Grow() {
  const { socialShopping, retention } = LANDING_VIDEOS

  return (
    <section className="px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            Get going, then get growing
          </p>
        </Reveal>

        <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
          <GrowVideoCard
            src={socialShopping.src}
            poster={socialShopping.thumbnailSrc}
            title={socialShopping.title}
            description={socialShopping.description}
            ariaLabel={socialShopping.ariaLabel}
            overlayTitle="Sell where they're scrolling"
          />
          <GrowVideoCard
            src={retention.src}
            poster={retention.thumbnailSrc}
            title={retention.title}
            description={retention.description}
            ariaLabel={retention.ariaLabel}
            overlayTitle="Keep them coming back"
            delay={0.12}
          />
        </div>
      </div>
    </section>
  )
}
