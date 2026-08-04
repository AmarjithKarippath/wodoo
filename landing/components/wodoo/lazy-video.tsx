"use client"

import { useEffect, useRef, useState } from "react"

type LazyVideoProps = {
  src: string
  poster?: string
  "aria-label"?: string
  className?: string
  /** How far before entering the viewport to start loading. */
  rootMargin?: string
}

function prefersReducedData() {
  if (typeof window === "undefined") return false
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
  ).connection
  if (connection?.saveData) return true
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
    return true
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Defers assigning video `src` until near the viewport so mobile
 * doesn't download below-fold MP4s on first paint.
 */
export function LazyVideo({
  src,
  poster,
  "aria-label": ariaLabel,
  className,
  rootMargin = "200px 0px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined)
  const [shouldAutoplay, setShouldAutoplay] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedData()) {
      setShouldAutoplay(false)
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      setActiveSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setActiveSrc(src)
        observer.disconnect()
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [src, rootMargin])

  useEffect(() => {
    const el = ref.current
    if (!el || !activeSrc || !shouldAutoplay) return
    el.play().catch(() => {
      /* Autoplay can be blocked; poster remains visible. */
    })
  }, [activeSrc, shouldAutoplay])

  return (
    <video
      ref={ref}
      src={activeSrc}
      poster={poster}
      aria-label={ariaLabel}
      autoPlay={shouldAutoplay && Boolean(activeSrc)}
      muted
      loop
      playsInline
      preload={activeSrc ? "metadata" : "none"}
      className={className}
    />
  )
}
