import { toolImageSrcSet, type Tool } from "@/lib/tools"

const SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

export function ToolThumbnail({
  tool,
  priority = false,
  className,
}: {
  tool: Tool
  priority?: boolean
  className?: string
}) {
  return (
    // Native img: next.config has images.unoptimized, so we ship WebP + srcset ourselves.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tool.image}
      srcSet={toolImageSrcSet(tool.slug)}
      sizes={SIZES}
      alt={tool.imageAlt}
      title={tool.title}
      width={1200}
      height={630}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  )
}
