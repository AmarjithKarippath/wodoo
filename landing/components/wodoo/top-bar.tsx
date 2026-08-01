"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRegistration } from "@/components/wodoo/registration-provider"

function StoreMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 14V26h20V14"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14h24M16 14V6M11 6h10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 20h6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TopBar() {
  const { openRegistration } = useRegistration()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="flex w-full max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/80 px-5 py-2.5 shadow-sm backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <StoreMark />
          </span>
          Woodo
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/tools"
            className="hidden text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground sm:inline"
          >
            Tools
          </Link>
          <Link
            href="/blog"
            className="hidden text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground sm:inline"
          >
            Blog
          </Link>
          <motion.button
            type="button"
            onClick={openRegistration}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary"
          >
            Start free
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
