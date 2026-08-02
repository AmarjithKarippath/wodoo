"use client"

import { motion } from "framer-motion"
import { Reveal } from "./reveal"

function RetentionVisual() {
  const rows = [
    { t: "Welcome, friend 🐇", s: "Sent to 2,300 subscribers" },
    { t: "You left something behind", s: "Recovered 38 carts" },
    { t: "Members-only drop", s: "Opens in 2 days" },
  ]
  return (
    <div className="relative w-full space-y-3">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-brand-bright/15 via-transparent to-primary/20 blur-xl"
      />
      {rows.map((r, i) => (
        <motion.div
          key={r.t}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="relative flex items-center gap-3 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/[0.07] px-4 py-3 shadow-[0_16px_32px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-bright/20 text-brand-bright">
            ✦
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-foreground">{r.t}</p>
            <p className="text-xs text-ink-foreground/60">{r.s}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function Grow() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            Get going, then get growing
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border shadow-sm">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,oklch(0.92_0.04_200)_0%,transparent_55%),linear-gradient(160deg,oklch(0.97_0.02_220)_0%,oklch(0.94_0.03_200)_45%,oklch(0.90_0.04_232)_100%)]"
              />
              <div
                aria-hidden
                className="absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand-bright/20 blur-3xl"
              />

              <div className="relative z-10 grid h-full items-center gap-8 p-8 sm:grid-cols-[1.1fr_0.9fr] sm:gap-6 sm:p-8 lg:p-9">
                <div className="min-w-0">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-foreground text-balance">
                    Sell where they&apos;re scrolling
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                    Put your products in every feed, inbox, reel and marketplace your
                    shoppers already live in.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mx-auto w-full max-w-[200px] sm:max-w-[220px] sm:justify-self-end"
                >
                  <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-b from-primary/20 via-transparent to-brand-bright/15 blur-xl" />
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-border/80 bg-ink shadow-[0_24px_48px_-20px_rgba(15,23,42,0.45)] ring-1 ring-white/40">
                    <video
                      src="/images/social-shopping.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="Shopper scrolling a shoppable storefront on their phone"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-ink shadow-sm">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,oklch(0.28_0.04_232)_0%,transparent_55%),linear-gradient(160deg,oklch(0.20_0.02_250)_0%,oklch(0.16_0.01_250)_50%,oklch(0.14_0.02_220)_100%)]"
              />
              <div
                aria-hidden
                className="absolute -right-12 top-1/3 h-72 w-72 rounded-full bg-brand-bright/20 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
              />

              <div className="relative z-10 grid h-full items-center gap-8 p-8 sm:grid-cols-[1.1fr_0.9fr] sm:gap-6 sm:p-8 lg:p-9">
                <div className="min-w-0">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-ink-foreground text-balance">
                    Keep them coming back
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-ink-foreground/70">
                    Re-engage shoppers with a steady drumbeat of offers, updates,
                    and automations that run while you sleep.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full sm:justify-self-end"
                >
                  <RetentionVisual />
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
