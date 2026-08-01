import { NextResponse } from "next/server"
import {
  DOMAIN_TLDS,
  splitDomain,
  type DomainCheckResult,
  type DomainStatus,
} from "@/lib/domain-check"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const raw = (searchParams.get("domain") || "").trim()
  const multi = searchParams.get("multi") === "1"

  const parsed = splitDomain(raw)
  if (!parsed) {
    return NextResponse.json(
      { error: "Enter a valid domain or brand name (letters, numbers, hyphens)." },
      { status: 400 },
    )
  }

  try {
    if (multi || !parsed.tld) {
      const label = parsed.label.split(".")[0]
      if (!label || label.length < 2) {
        return NextResponse.json(
          { error: "Brand name is too short." },
          { status: 400 },
        )
      }

      const results = await Promise.all(
        DOMAIN_TLDS.map((tld) => checkDomain(`${label}.${tld}`)),
      )

      return NextResponse.json({
        label,
        results,
      })
    }

    const domain = `${parsed.label}.${parsed.tld}`
    const result = await checkDomain(domain)
    return NextResponse.json({ label: parsed.label, results: [result] })
  } catch {
    return NextResponse.json(
      { error: "Domain lookup failed. Try again in a moment." },
      { status: 502 },
    )
  }
}

async function checkDomain(domain: string): Promise<DomainCheckResult> {
  const rdap = await checkRdap(domain)
  if (rdap.status !== "unknown") return rdap

  const dns = await checkDns(domain)
  return {
    ...dns,
    registrar: rdap.registrar ?? dns.registrar,
    created: rdap.created ?? dns.created,
    expires: rdap.expires ?? dns.expires,
    source: "combined",
  }
}

async function checkRdap(domain: string): Promise<DomainCheckResult> {
  try {
    const response = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain)}`,
      {
        headers: { Accept: "application/rdap+json, application/json" },
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      },
    )

    if (response.status === 404) {
      return {
        domain,
        status: "available",
        source: "rdap",
      }
    }

    if (!response.ok) {
      return { domain, status: "unknown", source: "rdap" }
    }

    const data = (await response.json()) as {
      ldhName?: string
      status?: string[]
      entities?: Array<{
        roles?: string[]
        vcardArray?: unknown[]
      }>
      events?: Array<{ eventAction?: string; eventDate?: string }>
      nameservers?: Array<{ ldhName?: string }>
    }

    const registrar = extractRegistrar(data.entities)
    const created =
      data.events?.find((e) => e.eventAction === "registration")?.eventDate ??
      null
    const expires =
      data.events?.find((e) => e.eventAction === "expiration")?.eventDate ?? null
    const nameservers =
      data.nameservers
        ?.map((ns) => ns.ldhName)
        .filter((ns): ns is string => Boolean(ns)) ?? []

    const statusTexts = (data.status ?? []).map((s) => s.toLowerCase())
    const status: DomainStatus = statusTexts.some((s) =>
      s.includes("available"),
    )
      ? "available"
      : "registered"

    return {
      domain: data.ldhName?.toLowerCase() || domain,
      status,
      registrar,
      created,
      expires,
      nameservers,
      source: "rdap",
    }
  } catch {
    return { domain, status: "unknown", source: "rdap" }
  }
}

async function checkDns(domain: string): Promise<DomainCheckResult> {
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=NS`,
      {
        headers: { Accept: "application/dns-json" },
        signal: AbortSignal.timeout(6000),
        cache: "no-store",
      },
    )

    if (!response.ok) {
      return { domain, status: "unknown", source: "dns" }
    }

    const data = (await response.json()) as {
      Status?: number
      Answer?: Array<{ data?: string }>
    }

    // Status 0 = NOERROR with answers → registered; 3 = NXDOMAIN → often available
    if (data.Status === 3) {
      return { domain, status: "available", source: "dns" }
    }

    const nameservers =
      data.Answer?.map((a) => a.data?.replace(/\.$/, "")).filter(
        (ns): ns is string => Boolean(ns),
      ) ?? []

    if (nameservers.length > 0 || data.Status === 0) {
      return {
        domain,
        status: "registered",
        nameservers,
        source: "dns",
      }
    }

    return { domain, status: "unknown", source: "dns" }
  } catch {
    return { domain, status: "unknown", source: "dns" }
  }
}

function extractRegistrar(
  entities: Array<{ roles?: string[]; vcardArray?: unknown[] }> | undefined,
): string | null {
  if (!entities?.length) return null
  const registrar = entities.find((e) => e.roles?.includes("registrar"))
  if (!registrar?.vcardArray || !Array.isArray(registrar.vcardArray)) return null

  const vcard = registrar.vcardArray[1]
  if (!Array.isArray(vcard)) return null

  for (const entry of vcard) {
    if (
      Array.isArray(entry) &&
      entry[0] === "fn" &&
      typeof entry[3] === "string"
    ) {
      return entry[3]
    }
  }
  return null
}
