export type StateFilingFee = {
  state: string
  code: string
  entity: "LLC" | "Corporation"
  formationFee: number
  annualReportFee: number
  notes: string
}

/** Approximate published fees for comparison — always verify on the official SOS site. */
export const STATE_FILING_FEES: StateFilingFee[] = [
  { state: "Wyoming", code: "WY", entity: "LLC", formationFee: 100, annualReportFee: 60, notes: "Popular low-cost LLC haven" },
  { state: "Wyoming", code: "WY", entity: "Corporation", formationFee: 100, annualReportFee: 60, notes: "Low ongoing fees" },
  { state: "Delaware", code: "DE", entity: "LLC", formationFee: 90, annualReportFee: 300, notes: "Flat LLC tax / annual tax" },
  { state: "Delaware", code: "DE", entity: "Corporation", formationFee: 175, annualReportFee: 175, notes: "Franchise tax can be higher for large corps" },
  { state: "Nevada", code: "NV", entity: "LLC", formationFee: 425, annualReportFee: 350, notes: "Higher initial + annual list fee" },
  { state: "Nevada", code: "NV", entity: "Corporation", formationFee: 725, annualReportFee: 650, notes: "Business license fees may apply" },
  { state: "Texas", code: "TX", entity: "LLC", formationFee: 300, annualReportFee: 0, notes: "Franchise tax may apply above thresholds" },
  { state: "Texas", code: "TX", entity: "Corporation", formationFee: 300, annualReportFee: 0, notes: "Franchise tax may apply above thresholds" },
  { state: "Florida", code: "FL", entity: "LLC", formationFee: 125, annualReportFee: 138.75, notes: "Annual report required" },
  { state: "Florida", code: "FL", entity: "Corporation", formationFee: 70, annualReportFee: 150, notes: "Plus registered agent costs" },
  { state: "California", code: "CA", entity: "LLC", formationFee: 70, annualReportFee: 800, notes: "$800 minimum franchise tax (rules vary for new LLCs)" },
  { state: "California", code: "CA", entity: "Corporation", formationFee: 100, annualReportFee: 800, notes: "Franchise tax minimum commonly cited" },
  { state: "New York", code: "NY", entity: "LLC", formationFee: 200, annualReportFee: 9, notes: "Publication requirement can add major cost" },
  { state: "New York", code: "NY", entity: "Corporation", formationFee: 125, annualReportFee: 9, notes: "Biennial statement fee" },
  { state: "New Mexico", code: "NM", entity: "LLC", formationFee: 50, annualReportFee: 0, notes: "Low formation; no annual report for many LLCs" },
  { state: "New Mexico", code: "NM", entity: "Corporation", formationFee: 100, annualReportFee: 25, notes: "Corporate report fee" },
]

export function compareStateFees(entity: "LLC" | "Corporation") {
  return STATE_FILING_FEES.filter((row) => row.entity === entity)
    .map((row) => ({
      ...row,
      yearOneCost: row.formationFee + row.annualReportFee,
      threeYearCost: row.formationFee + row.annualReportFee * 3,
    }))
    .sort((a, b) => a.yearOneCost - b.yearOneCost)
}
