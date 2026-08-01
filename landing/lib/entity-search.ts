export type EntityPortal = {
  id: string
  label: string
  region: string
  description: string
  searchUrl: (name: string) => string
}

export const ENTITY_PORTALS: EntityPortal[] = [
  {
    id: "companies-house",
    label: "Companies House (UK)",
    region: "United Kingdom",
    description: "Search company names and registered entities via Companies House.",
    searchUrl: (name) =>
      `https://find-and-update.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(name)}`,
  },
  {
    id: "delaware",
    label: "Delaware Division of Corporations",
    region: "United States · DE",
    description: "Check entity name availability in Delaware.",
    searchUrl: (name) =>
      `https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx`,
  },
  {
    id: "wyoming",
    label: "Wyoming Secretary of State",
    region: "United States · WY",
    description: "Business name search for Wyoming filings.",
    searchUrl: () =>
      `https://wyobiz.wyo.gov/Business/FilingSearch.aspx`,
  },
  {
    id: "california",
    label: "California Secretary of State",
    region: "United States · CA",
    description: "Business search for California entities.",
    searchUrl: (name) =>
      `https://bizfileonline.sos.ca.gov/search/business`,
  },
  {
    id: "texas",
    label: "Texas Secretary of State",
    region: "United States · TX",
    description: "SOSDirect / business organization search for Texas.",
    searchUrl: () =>
      `https://www.sos.state.tx.us/corp/sosda/index.shtml`,
  },
  {
    id: "florida",
    label: "Florida Division of Corporations",
    region: "United States · FL",
    description: "Sunbiz entity name search.",
    searchUrl: (name) =>
      `https://search.sunbiz.org/Inquiry/CorporationSearch/ByName`,
  },
  {
    id: "new-york",
    label: "New York Department of State",
    region: "United States · NY",
    description: "Corporation and business entity database search.",
    searchUrl: () =>
      `https://apps.dos.ny.gov/publicInquiry/`,
  },
  {
    id: "nevada",
    label: "Nevada Secretary of State",
    region: "United States · NV",
    description: "SilverFlume business search.",
    searchUrl: () =>
      `https://esos.nv.gov/EntitySearch/OnlineEntitySearch`,
  },
]

export function normalizeEntityName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b(llc|l\.l\.c\.|inc|corp|corporation|ltd|limited|co)\b/gi, "")
    .trim()
}

export function entityNameTips(name: string): string[] {
  const tips: string[] = []
  const cleaned = name.trim()
  if (!cleaned) return ["Enter a proposed company name to get checklist tips."]
  if (cleaned.length < 3) tips.push("Most registries require more than a few characters.")
  if (/\b(llc|inc|corp|ltd)\b/i.test(cleaned)) {
    tips.push("Include the correct legal designator required by your state or country.")
  } else {
    tips.push("Add a legal ending (LLC, Inc., Ltd.) if your jurisdiction requires one.")
  }
  if (/[^a-z0-9\s&'.-]/i.test(cleaned)) {
    tips.push("Avoid special characters that SOS databases often reject.")
  }
  tips.push("Always confirm availability on the official government portal before filing.")
  tips.push("Also run a USPTO TESS trademark search to avoid brand conflicts.")
  return tips
}
