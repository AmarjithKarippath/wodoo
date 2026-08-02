"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "./reveal"

const FAQS = [
  {
    q: "What is Woodo Store?",
    a: "Woodo Store is an ecommerce platform that helps you launch a professional online store quickly. You get a responsive storefront, product pages, secure checkout, and useful growth tools — without needing to code.",
  },
  {
    q: "How do I start an online store with Woodo Store?",
    a: "Create an account, choose a design, add your products, connect payments, and publish. Most people can have a live store ready in minutes and start selling the same day.",
  },
  {
    q: "Do I need coding skills to use Woodo Store?",
    a: "No. Woodo Store is a no-code platform. You can customize your theme, upload products, manage inventory, and publish your store from a simple dashboard.",
  },
  {
    q: "Is Woodo Store good for beginners and small businesses?",
    a: "Yes. It is designed for new sellers and small brands that want a clean, fast store without technical complexity. It also works well for single-product stores.",
  },
  {
    q: "Can I use Woodo Store for dropshipping or print-on-demand?",
    a: "Yes. Many sellers use Woodo Store as their storefront for dropshipping, print-on-demand, and digital products. You list the products and set your prices while fulfillment is handled separately.",
  },
  {
    q: "Does Woodo Store include free tools?",
    a: "Yes. Along with the store builder, Woodo Store offers free ecommerce tools such as shipping calculators, profit margin calculators, fee calculators, SEO tools, and more to help you plan and grow.",
  },
  {
    q: "What payment methods can I accept?",
    a: "Woodo Store supports popular payment gateways so you can accept credit cards and digital wallets. Once checkout is set up, you can start taking orders right away.",
  },
  {
    q: "Can I sell to customers in other countries?",
    a: "Yes. Woodo Store supports international selling, including shipping and tax-related features, so you can reach customers beyond your local market.",
  },
  {
    q: "How much does Woodo Store cost?",
    a: "You can start for free and launch your store without a complicated setup. Pricing is transparent, with low fees so you can keep more of every sale as you grow.",
  },
  {
    q: "Is Woodo Store an alternative to Shopify or WooCommerce?",
    a: "Woodo Store is a simpler option if you want to launch quickly with less technical work. It includes themes, product management, payments, and marketing features without the need to manage complex plugins or setups.",
  },
] as const

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wodoo.store"

export function Faq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: SITE_URL,
  }

  return (
    <section id="faq" className="px-4 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">
            Quick answers about starting an online store, selling with Woodo
            Store, and growing your ecommerce business.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground sm:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
