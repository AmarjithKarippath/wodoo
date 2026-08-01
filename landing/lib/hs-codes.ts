export type HsCodeEntry = {
  code: string
  description: string
  chapter: string
  keywords: string[]
  notes?: string
}

/**
 * Curated HS (Harmonized System) codes commonly used by ecommerce sellers.
 * Not an official tariff database — verify with your broker / customs authority.
 */
export const HS_CODES: HsCodeEntry[] = [
  {
    code: "6109.10",
    description: "T-shirts, singlets and other vests, knitted or crocheted, of cotton",
    chapter: "61 — Knitted apparel",
    keywords: ["tshirt", "t-shirt", "tee", "cotton shirt", "vest", "apparel", "clothing"],
    notes: "Common for basic cotton tees. Exact 8–10 digit code varies by country.",
  },
  {
    code: "6109.90",
    description: "T-shirts, singlets and other vests, knitted or crocheted, of other textile materials",
    chapter: "61 — Knitted apparel",
    keywords: ["polyester tshirt", "blend tee", "synthetic shirt", "apparel"],
  },
  {
    code: "6110.20",
    description: "Jerseys, pullovers, cardigans, of cotton, knitted or crocheted",
    chapter: "61 — Knitted apparel",
    keywords: ["hoodie", "sweater", "pullover", "jumper", "cardigan", "cotton sweatshirt"],
  },
  {
    code: "6110.30",
    description: "Jerseys, pullovers, cardigans, of man-made fibres, knitted or crocheted",
    chapter: "61 — Knitted apparel",
    keywords: ["polyester hoodie", "fleece", "synthetic sweater", "sportswear"],
  },
  {
    code: "6203.42",
    description: "Men's or boys' trousers, bib and brace overalls, of cotton",
    chapter: "62 — Woven apparel",
    keywords: ["jeans", "pants", "trousers", "chinos", "denim", "mens pants"],
  },
  {
    code: "6204.62",
    description: "Women's or girls' trousers, bib and brace overalls, of cotton",
    chapter: "62 — Woven apparel",
    keywords: ["womens jeans", "womens pants", "leggings woven", "trousers"],
  },
  {
    code: "6402.99",
    description: "Footwear with outer soles and uppers of rubber or plastics",
    chapter: "64 — Footwear",
    keywords: ["shoes", "sneakers", "trainers", "sandals plastic", "footwear"],
  },
  {
    code: "6403.99",
    description: "Footwear with outer soles of rubber/plastics and uppers of leather",
    chapter: "64 — Footwear",
    keywords: ["leather shoes", "boots", "dress shoes", "footwear leather"],
  },
  {
    code: "4202.92",
    description: "Trunks, suit-cases, vanity-cases, executive-cases, briefcases, school satchels and similar containers with outer surface of plastic sheeting or textile materials",
    chapter: "42 — Leather goods",
    keywords: ["backpack", "bag", "tote", "duffel", "handbag textile", "luggage"],
  },
  {
    code: "4202.21",
    description: "Handbags, whether or not with shoulder strap, with outer surface of leather",
    chapter: "42 — Leather goods",
    keywords: ["leather handbag", "purse", "shoulder bag leather"],
  },
  {
    code: "3304.99",
    description: "Beauty or make-up preparations and preparations for the care of the skin (other than medicaments)",
    chapter: "33 — Cosmetics",
    keywords: ["skincare", "cream", "lotion", "moisturizer", "beauty", "cosmetics", "serum"],
  },
  {
    code: "3305.10",
    description: "Shampoos",
    chapter: "33 — Cosmetics",
    keywords: ["shampoo", "hair wash", "haircare"],
  },
  {
    code: "3307.20",
    description: "Personal deodorants and antiperspirants",
    chapter: "33 — Cosmetics",
    keywords: ["deodorant", "antiperspirant", "body spray"],
  },
  {
    code: "3401.11",
    description: "Soap and organic surface-active products for toilet use, in bars",
    chapter: "34 — Soap",
    keywords: ["soap", "bar soap", "bath soap", "toiletries"],
  },
  {
    code: "8517.13",
    description: "Smartphones",
    chapter: "85 — Electrical machinery",
    keywords: ["phone", "smartphone", "mobile", "iphone", "android phone"],
  },
  {
    code: "8518.30",
    description: "Headphones and earphones, whether or not combined with a microphone",
    chapter: "85 — Electrical machinery",
    keywords: ["headphones", "earphones", "earbuds", "airpods", "headset"],
  },
  {
    code: "8471.30",
    description: "Portable automatic data processing machines, weighing not more than 10 kg",
    chapter: "84 — Machinery",
    keywords: ["laptop", "notebook", "chromebook", "portable computer"],
  },
  {
    code: "8528.72",
    description: "Reception apparatus for television, colour, whether or not incorporating radio receivers",
    chapter: "85 — Electrical machinery",
    keywords: ["tv", "television", "smart tv", "monitor tv"],
  },
  {
    code: "9503.00",
    description: "Tricycles, scooters, pedal cars and similar wheeled toys; dolls' carriages; dolls; other toys",
    chapter: "95 — Toys",
    keywords: ["toy", "toys", "kids toy", "figurine", "playset"],
  },
  {
    code: "9506.91",
    description: "Articles and equipment for general physical exercise, gymnastics or athletics",
    chapter: "95 — Sports",
    keywords: ["fitness", "gym", "exercise", "dumbbell", "yoga", "workout"],
  },
  {
    code: "9506.32",
    description: "Golf balls",
    chapter: "95 — Sports",
    keywords: ["golf ball", "golf", "sports ball"],
  },
  {
    code: "7113.11",
    description: "Articles of jewellery and parts thereof, of silver",
    chapter: "71 — Jewellery",
    keywords: ["silver jewelry", "necklace silver", "ring silver", "bracelet"],
  },
  {
    code: "7113.19",
    description: "Articles of jewellery and parts thereof, of other precious metal",
    chapter: "71 — Jewellery",
    keywords: ["gold jewelry", "jewellery", "necklace", "ring", "earrings gold"],
  },
  {
    code: "7117.19",
    description: "Imitation jewellery of base metal, whether or not plated with precious metal",
    chapter: "71 — Jewellery",
    keywords: ["fashion jewelry", "costume jewellery", "imitation jewelry", "accessories"],
  },
  {
    code: "9102.11",
    description: "Wrist-watches, electrically operated, with mechanical display only",
    chapter: "91 — Clocks & watches",
    keywords: ["watch", "wristwatch", "analog watch", "timepiece"],
  },
  {
    code: "9102.12",
    description: "Wrist-watches, electrically operated, with opto-electronic display only",
    chapter: "91 — Clocks & watches",
    keywords: ["smartwatch", "digital watch", "fitness watch"],
  },
  {
    code: "4901.99",
    description: "Printed books, brochures, leaflets and similar printed matter",
    chapter: "49 — Printed books",
    keywords: ["book", "books", "paperback", "hardcover", "novel", "printed book"],
  },
  {
    code: "4820.10",
    description: "Registers, account books, notebooks, order books, receipt books, letter pads, memorandum pads, diaries and similar articles",
    chapter: "48 — Paper",
    keywords: ["notebook", "journal", "diary", "planner", "notepad"],
  },
  {
    code: "9403.60",
    description: "Other wooden furniture",
    chapter: "94 — Furniture",
    keywords: ["furniture", "wooden table", "chair wood", "shelf", "home furniture"],
  },
  {
    code: "9401.61",
    description: "Upholstered seats with wooden frames",
    chapter: "94 — Furniture",
    keywords: ["sofa", "armchair", "upholstered chair", "couch"],
  },
  {
    code: "3924.10",
    description: "Tableware and kitchenware of plastics",
    chapter: "39 — Plastics",
    keywords: ["plastic kitchen", "Tupperware", "plastic plate", "kitchenware plastic"],
  },
  {
    code: "6911.10",
    description: "Tableware and kitchenware of porcelain or china",
    chapter: "69 — Ceramics",
    keywords: ["ceramic", "porcelain", "dinnerware", "mug ceramic", "plate china"],
  },
  {
    code: "7013.37",
    description: "Other drinking glasses (other than of glass-ceramics)",
    chapter: "70 — Glass",
    keywords: ["glass", "drinking glass", "tumbler", "glassware"],
  },
  {
    code: "9608.10",
    description: "Ball point pens",
    chapter: "96 — Miscellaneous",
    keywords: ["pen", "ballpoint", "biro", "stationery"],
  },
  {
    code: "9609.10",
    description: "Pencils and crayons, with leads encased in a rigid sheath",
    chapter: "96 — Miscellaneous",
    keywords: ["pencil", "crayon", "stationery pencil"],
  },
  {
    code: "2106.90",
    description: "Food preparations not elsewhere specified or included",
    chapter: "21 — Miscellaneous edible preparations",
    keywords: ["supplement", "protein", "food prep", "nutrition", "snack mix"],
    notes: "Food and supplements often need extra permits — check destination rules.",
  },
  {
    code: "0901.21",
    description: "Coffee, roasted, not decaffeinated",
    chapter: "09 — Coffee, tea, spices",
    keywords: ["coffee", "roasted coffee", "beans coffee"],
  },
  {
    code: "0902.30",
    description: "Black tea (fermented) and partly fermented tea, in immediate packings of a content not exceeding 3 kg",
    chapter: "09 — Coffee, tea, spices",
    keywords: ["tea", "black tea", "tea bags"],
  },
  {
    code: "1806.90",
    description: "Chocolate and other food preparations containing cocoa",
    chapter: "18 — Cocoa",
    keywords: ["chocolate", "cocoa", "candy chocolate", "confectionery"],
  },
  {
    code: "3004.90",
    description: "Medicaments consisting of mixed or unmixed products for therapeutic or prophylactic uses, put up in measured doses",
    chapter: "30 — Pharmaceuticals",
    keywords: ["medicine", "medicament", "pharmaceutical", "pills", "otc drug"],
    notes: "Often restricted. May require licenses; not typical for casual ecommerce export.",
  },
  {
    code: "3926.90",
    description: "Other articles of plastics and articles of other materials of headings 3901 to 3914",
    chapter: "39 — Plastics",
    keywords: ["plastic goods", "plastic accessory", "gadget plastic", "phone case plastic"],
  },
  {
    code: "6302.21",
    description: "Bed linen, printed, of cotton",
    chapter: "63 — Made-up textile articles",
    keywords: ["bedding", "sheets", "bed linen", "duvet cover", "pillowcase"],
  },
  {
    code: "6302.60",
    description: "Toilet linen and kitchen linen, of terry towelling or similar terry fabrics, of cotton",
    chapter: "63 — Made-up textile articles",
    keywords: ["towel", "bath towel", "kitchen towel", "terry"],
  },
  {
    code: "8516.32",
    description: "Other hair-dressing apparatus",
    chapter: "85 — Electrical machinery",
    keywords: ["hair dryer", "straightener", "curling iron", "hair tool"],
  },
  {
    code: "8504.40",
    description: "Static converters (e.g. chargers, power supplies)",
    chapter: "85 — Electrical machinery",
    keywords: ["charger", "adapter", "power supply", "usb charger"],
  },
  {
    code: "8525.89",
    description: "Television cameras, digital cameras and video camera recorders",
    chapter: "85 — Electrical machinery",
    keywords: ["camera", "digital camera", "webcam", "action camera"],
  },
  {
    code: "9004.10",
    description: "Sunglasses",
    chapter: "90 — Optical",
    keywords: ["sunglasses", "shades", "sun glasses"],
  },
  {
    code: "9004.90",
    description: "Spectacles, goggles and the like, corrective, protective or other",
    chapter: "90 — Optical",
    keywords: ["glasses", "eyeglasses", "spectacles", "goggles"],
  },
  {
    code: "9615.11",
    description: "Combs, hair-slides and the like of hard rubber or plastics",
    chapter: "96 — Miscellaneous",
    keywords: ["comb", "hair clip", "hair accessory", "scrunchie plastic"],
  },
  {
    code: "6704.19",
    description: "Wigs, false beards, eyebrows and eyelashes, of synthetic textile materials",
    chapter: "67 — Prepared feathers & artificial hair",
    keywords: ["wig", "false eyelashes", "lashes", "hair extension synthetic"],
  },
]

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function searchHsCodes(query: string, limit = 25): HsCodeEntry[] {
  const q = normalize(query)
  if (!q) return HS_CODES.slice(0, 12)

  const tokens = q.split(" ").filter(Boolean)

  const scored = HS_CODES.map((entry) => {
    const haystack = normalize(
      [
        entry.code,
        entry.description,
        entry.chapter,
        entry.keywords.join(" "),
        entry.notes ?? "",
      ].join(" "),
    )

    let score = 0
    if (entry.code.replace(/\./g, "").startsWith(q.replace(/\./g, ""))) score += 50
    if (haystack.includes(q)) score += 20
    for (const token of tokens) {
      if (entry.keywords.some((k) => normalize(k).includes(token))) score += 8
      if (haystack.includes(token)) score += 3
    }
    return { entry, score }
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.code.localeCompare(b.entry.code))

  return scored.slice(0, limit).map((row) => row.entry)
}

export function getHsCode(code: string): HsCodeEntry | undefined {
  const normalized = code.replace(/\s/g, "")
  return HS_CODES.find((entry) => entry.code === normalized)
}
