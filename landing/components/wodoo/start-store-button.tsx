"use client"

import { useRegistration } from "@/components/wodoo/registration-provider"

export function StartStoreButton({
  children = "Start your store →",
  className = "inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-primary",
}: {
  children?: React.ReactNode
  className?: string
}) {
  const { openRegistration } = useRegistration()

  return (
    <button type="button" onClick={openRegistration} className={className}>
      {children}
    </button>
  )
}
