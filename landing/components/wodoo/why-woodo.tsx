"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { LANDING_IMAGES } from "@/lib/landing-media"
import { Reveal } from "./reveal"

const COLUMNS = [
  {
    title: "Launch Fast",
    items: [
      "Fully responsive online store that looks great on every device",
      "Fast-loading storefronts built for better performance",
      "Bulk upload and import products with ease",
      "Seamless payment gateway integrations",
      "Easy-to-customize themes to match your brand",
    ],
  },
  {
    title: "Scale Faster",
    items: [
      "Reliable uptime so your store stays open for business",
      "Powerful tools and integrations to support growth",
      "Built-in marketing and discount features to drive repeat sales",
      "Staff accounts with role-based permissions",
      "Unlimited transactions with transparent, low fees",
    ],
  },
  {
    title: "Manage Better",
    items: [
      "Easy order tracking, invoicing, and reporting",
      "Bulk editing for prices, variants, and inventory",
      "Support for global shipping and deliveries",
      "Clear business analytics to guide decisions",
      "Automated tax calculations for smoother operations",
    ],
  },
] as const

export function WhyWoodo() {
  const dashboard = LANDING_IMAGES.adminDashboard

  return (
    <section className="px-4 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl">
            Whether you&apos;re just starting out or already running a growing
            business.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] sm:mt-10 sm:rounded-[2rem]">
            <Image
              src={dashboard.src}
              alt={dashboard.alt}
              title={dashboard.title}
              width={dashboard.width}
              height={dashboard.height}
              sizes="(max-width: 768px) 100vw, 1152px"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-3 md:gap-8">
          {COLUMNS.map((column, i) => (
            <Reveal key={column.title} delay={i * 0.1}>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
                  {column.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + j * 0.05 }}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
