
/**
 * Global Migration Intelligence Toolkit
 * Occupation Classifier - Starter Version
 *
 * A transparent, rule-based classifier that maps common job titles
 * to broad occupation categories.
 *
 * This is a starter taxonomy, not an official or validated global
 * occupational classification system.
 */

export type OccupationCategory =
  | "technology"
  | "engineering"
  | "healthcare"
  | "finance"
  | "education"
  | "sales"
  | "marketing"
  | "hospitality"
  | "construction"
  | "transportation"
  | "administration"
  | "other";

export interface ClassificationResult {
  input: string;
  normalizedTitle: string;
  category: OccupationCategory;
  matchedTerms: string[];
  confidence: number;
  explanation: string;
}

interface OccupationRule {
  category: OccupationCategory;
  terms: string[];
  explanation: string;
}

const RULES: OccupationRule[] = [
  {
    category: "technology",
    terms: [
      "software engineer",
      "software developer",
      "web developer",
      "frontend developer",
      "front end developer",
      "backend developer",
      "back end developer",
      "full stack developer",
      "data scientist",
      "data analyst",
      "machine learning engineer",
      "ai engineer",
      "cybersecurity analyst",
      "cloud engineer",
      "devops engineer",
      "database administrator",
      "systems administrator",
      "it support",
      "network engineer",
    ],
    explanation: "The title matches a technology, software, data, or IT-related occupation.",
  },
  {
    category: "engineering",
    terms: [
      "civil engineer",
      "mechanical engineer",
      "electrical engineer",
      "chemical engineer",
      "industrial engineer",
      "structural engineer",
      "automotive engineer",
      "design engineer",
      "process engineer",
      "electronics engineer",
    ],
    explanation: "The title matches a professional engineering occupation.",
  },
  {
    category: "healthcare",
    terms: [
      "doctor",
      "physician",
      "surgeon",
      "nurse",
      "registered nurse",
      "nursing assistant",
      "dentist",
      "pharmacist",
      "physiotherapist",
      "physical therapist",
      "medical laboratory technician",
      "radiographer",
      "paramedic",
      "midwife",
      "occupational therapist",
    ],
    explanation: "The title matches a healthcare or clinical occupation.",
  },
  {
    category: "finance",
    terms: [
      "accountant",
      "chartered accountant",
      "financial analyst",
      "investment analyst",
      "investment banker",
      "auditor",
      "tax consultant",
      "financial controller",
      "risk analyst",
      "credit analyst",
      "portfolio manager",
      "actuary",
    ],
    explanation: "The title matches an accounting, finance, investment, or risk-related occupation.",
  },
  {
    category: "education",
    terms: [
      "teacher",
      "school teacher",
      "lecturer",
      "professor",
      "researcher",
      "academic researcher",
      "teaching assistant",
      "school principal",
      "education consultant",
      "special education teacher",
    ],
    explanation: "The title matches a teaching, academic, or research occupation.",
  },
  {
    category: "sales",
    terms: [
      "sales executive",
      "sales manager",
      "business development executive",
      "business development manager",
      "account executive",
      "account manager",
      "real estate agent",
      "property consultant",
      "insurance agent",
      "retail sales associate",
    ],
    explanation: "The title matches a sales, business development, or client acquisition occupation.",
  },
  {
    category: "marketing",
    terms: [
      "marketing manager",
      "digital marketing executive",
      "digital marketing manager",
      "social media manager",
      "content strategist",
      "brand manager",
      "seo specialist",
      "sem specialist",
      "performance marketing manager",
      "public relations officer",
      "communications specialist",
      "advertising executive",
    ],
    explanation: "The title matches a marketing, advertising, communications, or public relations occupation.",
  },
  {
    category: "hospitality",
    terms: [
      "hotel manager",
      "chef",
      "cook",
      "waiter",
      "waitress",
      "housekeeping supervisor",
      "restaurant manager",
      "front office executive",
      "hospitality manager",
      "travel consultant",
    ],
    explanation: "The title matches a hospitality, food service, or travel-related occupation.",
  },
  {
    category: "construction",
    terms: [
      "construction manager",
      "site engineer",
      "quantity surveyor",
      "civil supervisor",
      "electrician",
      "plumber",
      "carpenter",
      "mason",
      "welder",
      "hvac technician",
      "building inspector",
    ],
    explanation: "The title matches a construction, building, or skilled-trade occupation.",
  },
  {
    category: "transportation",
    terms: [
      "truck driver",
      "heavy vehicle driver",
      "bus driver",
      "delivery driver",
      "logistics manager",
      "supply chain manager",
      "warehouse supervisor",
      "forklift operator",
      "aircraft pilot",
      "ship captain",
    ],
    explanation: "The title matches a transport, logistics, or supply-chain occupation.",
  },
  {
    category: "administration",
    terms: [
      "administrative assistant",
      "office administrator",
      "office manager",
      "executive assistant",
      "human resources manager",
      "hr executive",
      "recruitment consultant",
      "recruiter",
      "data entry operator",
      "customer service representative",
    ],
    explanation: "The title matches an administrative, HR, recruitment, or office-support occupation.",
  },
];

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Classifies a job title using transparent keyword matching.
 *
 * Confidence is a simple rule-match indicator, not a statistically
 * calibrated probability that the classification is correct.
 */
export function classifyOccupation(title: string): ClassificationResult {
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("Occupation title must be a non-empty string.");
  }

  const normalizedTitle = normalizeTitle(title);

  const matches = RULES
    .map((rule) => ({
      rule,
      matchedTerms: rule.terms.filter((term) => {
        const normalizedTerm = normalizeTitle(term);
        return (
          normalizedTitle === normalizedTerm ||
          normalizedTitle.includes(normalizedTerm)
        );
      }),
    }))
    .filter((item) => item.matchedTerms.length > 0)
    .sort(
      (a, b) =>
        Math.max(...b.matchedTerms.map((term) => term.length)) -
        Math.max(...a.matchedTerms.map((term) => term.length))
    );

  if (matches.length === 0) {
    return {
      input: title,
      normalizedTitle,
      category: "other",
      matchedTerms: [],
      confidence: 0,
      explanation:
        "No matching occupation rule was found. The title may require a new rule or manual review.",
    };
  }

  const bestMatch = matches[0];
  const longestMatch = Math.max(
    ...bestMatch.matchedTerms.map((term) => term.length)
  );

  return {
    input: title,
    normalizedTitle,
    category: bestMatch.rule.category,
    matchedTerms: bestMatch.matchedTerms,
    confidence: Math.min(
      0.95,
      Number((0.65 + longestMatch / normalizedTitle.length * 0.3).toFixed(2))
    ),
    explanation: bestMatch.rule.explanation,
  };
}

/**
 * Returns the occupation categories supported by this starter classifier.
 */
export function getOccupationCategories(): OccupationCategory[] {
  return [...new Set(RULES.map((rule) => rule.category)), "other"];
}
