"use client"

import { motion, useInView, useMotionValue, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    })
    return () => controls.stop()
  }, [inView, to, mv])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

const ITEMS = ["Built for makers", "Trusted at checkout", "Open in minutes", "Sell anywhere"]

export function StatBand() {
  return (
    <section className="px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary px-5 py-10 text-center text-primary-foreground sm:px-6 sm:py-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl font-display text-2xl font-extrabold leading-tight text-balance sm:text-3xl lg:text-4xl"
        >
          Every few seconds, somebody opens their very first shop with Woodo
          Store.
        </motion.p>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-8">
          {[
            { to: 175, suffix: "+", label: "countries selling" },
            { to: 92, suffix: "%", label: "launch in under a day" },
            { to: 40, suffix: "K", label: "new stores each month" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-extrabold sm:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>

        {/* marquee */}
        <div className="relative mt-8 flex overflow-hidden border-t border-primary-foreground/20 pt-5 sm:mt-10 sm:pt-6">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex shrink-0 items-center gap-8 pr-8 text-base font-semibold text-primary-foreground/85 sm:text-lg"
          >
            {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((t, i) => (
              <span key={i} className="flex items-center gap-8">
                {t}
                <span className="text-primary-foreground/40">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
