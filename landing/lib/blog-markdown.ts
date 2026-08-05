import type { Block, Post } from "@/lib/posts"

export type ParsedBlog = Omit<Post, "updatedAt" | "hero"> & {
  sourceMarkdown: string
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function stripMd(text: string): string {
  return text
    .replace(/\(\[[^\]]+\]\[\d+\]\)/g, "")
    .replace(/\[([^\]]+)\]\[\d+\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function estimateReadingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function tagsFromTitle(title: string): string[] {
  const stop = new Set([
    "a",
    "an",
    "and",
    "the",
    "to",
    "of",
    "in",
    "on",
    "for",
    "with",
    "vs",
    "or",
    "your",
    "you",
    "need",
    "know",
    "everything",
    "complete",
    "guide",
    "latest",
    "about",
  ])
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !stop.has(w))
    .slice(0, 5)
}

type RefMap = Map<string, { label: string; url: string }>

function extractRefs(markdown: string): { body: string; refs: RefMap } {
  const refs: RefMap = new Map()
  const lines = markdown.split(/\r?\n/)
  const kept: string[] = []
  for (const line of lines) {
    const m = line.match(/^\[(\d+)\]:\s+(\S+)\s*(?:"([^"]*)")?\s*$/)
    if (m) {
      refs.set(m[1], { url: m[2], label: m[3] || m[2] })
      continue
    }
    kept.push(line)
  }
  return { body: kept.join("\n"), refs }
}

function flushParagraph(buf: string[], blocks: Block[]) {
  const text = stripMd(buf.join(" ").replace(/\s+/g, " "))
  buf.length = 0
  if (text) blocks.push({ type: "p", text })
}

function flushList(
  kind: "ul" | "ol",
  items: string[],
  blocks: Block[],
) {
  if (!items.length) return
  const cleaned = items.map(stripMd).filter(Boolean)
  items.length = 0
  if (cleaned.length) blocks.push({ type: kind, items: cleaned })
}

/**
 * Parse ChatGPT-style blog markdown:
 * - First `#` = title
 * - Later `#` / `##` = h2 / h3
 * - `---` separators ignored
 * - `*` / `-` bullets, `1.` numbered lists
 * - `**bold**` stripped to plain text
 * - Footnote defs `[1]: url` become a Sources list
 */
export function parseChatGptBlog(markdown: string): ParsedBlog {
  const raw = markdown.replace(/^\uFEFF/, "").trim()
  if (!raw) throw new Error("Paste is empty.")

  const { body: withoutRefs, refs } = extractRefs(raw)
  // Drop ChatGPT preamble before the first heading
  const start = withoutRefs.search(/^#\s+/m)
  const content = start >= 0 ? withoutRefs.slice(start) : withoutRefs
  const lines = content.split(/\r?\n/)

  let title = ""
  const blocks: Block[] = []
  const para: string[] = []
  const ulItems: string[] = []
  const olItems: string[] = []
  let listKind: "ul" | "ol" | null = null

  const endList = () => {
    if (listKind === "ul") flushList("ul", ulItems, blocks)
    if (listKind === "ol") flushList("ol", olItems, blocks)
    listKind = null
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed || trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushParagraph(para, blocks)
      endList()
      continue
    }

    const h1 = trimmed.match(/^#\s+(.+)$/)
    if (h1) {
      flushParagraph(para, blocks)
      endList()
      const text = stripMd(h1[1])
      if (!title) {
        title = text
      } else {
        blocks.push({ type: "h2", text, id: slugify(text) })
      }
      continue
    }

    const h2 = trimmed.match(/^##\s+(.+)$/)
    if (h2) {
      flushParagraph(para, blocks)
      endList()
      const text = stripMd(h2[1])
      blocks.push({ type: "h3", text, id: slugify(text) })
      continue
    }

    const h3 = trimmed.match(/^###\s+(.+)$/)
    if (h3) {
      flushParagraph(para, blocks)
      endList()
      const text = stripMd(h3[1])
      blocks.push({ type: "h3", text, id: slugify(text) })
      continue
    }

    const ul = trimmed.match(/^[-*•]\s+(.+)$/)
    if (ul) {
      flushParagraph(para, blocks)
      if (listKind !== "ul") {
        endList()
        listKind = "ul"
      }
      ulItems.push(ul[1])
      continue
    }

    const ol = trimmed.match(/^\d+\.\s+(.+)$/)
    if (ol) {
      flushParagraph(para, blocks)
      if (listKind !== "ol") {
        endList()
        listKind = "ol"
      }
      olItems.push(ol[1])
      continue
    }

    endList()
    para.push(trimmed)
  }

  flushParagraph(para, blocks)
  endList()

  if (!title) throw new Error("Could not find a title. Start the paste with `# Your Title`.")
  if (!blocks.length) throw new Error("Could not find any body content after the title.")

  if (refs.size > 0) {
    blocks.push({ type: "h2", text: "Sources", id: "sources" })
    blocks.push({
      type: "ul",
      items: [...refs.entries()].map(
        ([num, { label, url }]) => `${label || `Source ${num}`}: ${url}`,
      ),
    })
  }

  const firstPara = blocks.find((b) => b.type === "p")
  const description =
    firstPara && firstPara.type === "p"
      ? firstPara.text.length > 165
        ? `${firstPara.text.slice(0, 162).trim()}…`
        : firstPara.text
      : title

  const plain = blocks
    .map((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "callout")
        return b.text
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ")
      if (b.type === "quote") return b.text
      return ""
    })
    .join(" ")

  const today = new Date().toISOString().slice(0, 10)

  return {
    slug: slugify(title),
    title,
    description,
    publishedAt: today,
    author: "Wodoo Store Team",
    readingMinutes: estimateReadingMinutes(plain),
    tags: tagsFromTitle(title),
    body: blocks,
    sourceMarkdown: raw,
  }
}
