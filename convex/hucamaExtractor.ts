/**
 * HUCAMA Report Score Extractor
 *
 * Parses raw text extracted from HUCAMA PDF reports to find:
 *   - CF48-360 Great 8 competency scores (1–9 scale)
 *   - PF48 personality factor Sten scores (1–10 scale)
 *
 * This module uses only standard JavaScript — no Node.js-specific APIs — so it
 * is safe to import from both "use node" action files and the Convex runtime.
 */

export type Great8Factor =
  | "Evaluating Information"
  | "Structuring Work"
  | "Supporting Individuals"
  | "Coping with Pressure"
  | "Driving Success"
  | "Creating Solutions"
  | "Interacting with People"
  | "Exerting Influence";

export type PF48Factor =
  | "Investigation"
  | "Structure"
  | "Support"
  | "Resilience"
  | "Drive"
  | "Creativity"
  | "Interaction"
  | "Influence";

export interface Great8Scores {
  self?: number;
  peer?: number;
  directReport?: number;
  allRaters?: number;
}

export interface HucamaResult {
  reportType: "CF48-360" | "PF48" | "unknown";
  great8?: Partial<Record<Great8Factor, Great8Scores>>;
  pf48?: Partial<Record<PF48Factor, number>>;
  rawTextSnippet?: string;
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Factor name lists                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

const GREAT8_FACTORS: Great8Factor[] = [
  "Evaluating Information",
  "Structuring Work",
  "Supporting Individuals",
  "Coping with Pressure",
  "Driving Success",
  "Creating Solutions",
  "Interacting with People",
  "Exerting Influence",
];

const PF48_FACTORS: PF48Factor[] = [
  "Investigation",
  "Structure",
  "Support",
  "Resilience",
  "Drive",
  "Creativity",
  "Interaction",
  "Influence",
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Extract Great 8 scores for a single factor from its surrounding context.
 *
 * The function searches for the factor name in the text and then looks in the
 * 350 characters immediately after it for labeled scores (Self / Peer / Direct
 * Report / All Raters) or, if absent, for raw numeric values on the 1–9 scale.
 */
function extractGreat8ForFactor(
  text: string,
  factor: Great8Factor
): Great8Scores | undefined {
  const re = new RegExp(escapeRegex(factor), "i");
  const match = re.exec(text);
  if (!match) return undefined;

  // Context window after the factor name
  const ctx = text.slice(match.index + match[0].length, match.index + match[0].length + 350);

  const scores: Great8Scores = {};

  // Try labeled scores first
  const selfM = ctx.match(/\bself[\s:–-]+([1-9](?:\.\d{1,2})?)\b/i);
  if (selfM) scores.self = parseFloat(selfM[1]);

  const peerM = ctx.match(/\bpeer[\s:–-]+([1-9](?:\.\d{1,2})?)\b/i);
  if (peerM) scores.peer = parseFloat(peerM[1]);

  // "Direct Report" or "Direct Reports"
  const drM = ctx.match(/\bdirect\s*reports?[\s:–-]+([1-9](?:\.\d{1,2})?)\b/i);
  if (drM) scores.directReport = parseFloat(drM[1]);

  // "All Raters" or "Overall"
  const allM = ctx.match(/\b(?:all\s*raters?|overall)[\s:–-]+([1-9](?:\.\d{1,2})?)\b/i);
  if (allM) scores.allRaters = parseFloat(allM[1]);

  // If no labeled scores found, fall back to positional numbers
  if (Object.keys(scores).length === 0) {
    // Find all numbers in 1–9 range (including one decimal)
    const numMatches = Array.from(
      ctx.matchAll(/\b([1-9](?:\.\d{1,2})?)\b/g)
    )
      .map((m) => parseFloat(m[1]))
      .filter((n) => n >= 1 && n <= 9);

    if (numMatches.length >= 4) {
      // Assume order: Self, Peer, Direct Report, All Raters
      [scores.self, scores.peer, scores.directReport, scores.allRaters] = numMatches;
    } else if (numMatches.length === 3) {
      [scores.self, scores.peer, scores.directReport] = numMatches;
    } else if (numMatches.length >= 1) {
      // Use the last value as the aggregate
      scores.allRaters = numMatches[numMatches.length - 1];
    }
  }

  return Object.keys(scores).length > 0 ? scores : undefined;
}

/**
 * Try to extract CF48-360 Great 8 competency scores from raw text.
 * Returns null if fewer than 3 factors are found.
 */
function extractCF48Scores(
  text: string
): Partial<Record<Great8Factor, Great8Scores>> | null {
  const result: Partial<Record<Great8Factor, Great8Scores>> = {};
  let found = 0;

  for (const factor of GREAT8_FACTORS) {
    const scores = extractGreat8ForFactor(text, factor);
    if (scores) {
      result[factor] = scores;
      found++;
    }
  }

  return found >= 3 ? result : null;
}

/**
 * Try to extract PF48 Sten scores from raw text.
 * Returns null if fewer than 3 factors are found.
 */
function extractPF48Scores(
  text: string
): Partial<Record<PF48Factor, number>> | null {
  const result: Partial<Record<PF48Factor, number>> = {};
  let found = 0;

  for (const factor of PF48_FACTORS) {
    const re = new RegExp(escapeRegex(factor), "i");
    const match = re.exec(text);
    if (!match) continue;

    // Look in 150 chars after factor name for a Sten score (1–10)
    const ctx = text.slice(
      match.index + match[0].length,
      match.index + match[0].length + 150
    );

    // Sten score: integer or one decimal, range 1–10
    const numM = ctx.match(/[\s:–-]+(\d{1,2}(?:\.\d)?)\b/);
    if (!numM) continue;

    const n = parseFloat(numM[1]);
    if (n >= 1 && n <= 10) {
      result[factor as PF48Factor] = n;
      found++;
    }
  }

  return found >= 3 ? result : null;
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Public API                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * Main entry point. Accepts raw text extracted from a PDF and attempts to
 * detect and parse HUCAMA psychometric data.
 *
 * Returns:
 *   - reportType "CF48-360" + great8 scores if CF48-360 competency data found
 *   - reportType "PF48" + pf48 scores if PF48 personality data found
 *   - reportType "unknown" + rawTextSnippet if no recognisable data found
 */
export function extractHucamaScores(text: string): HucamaResult {
  // Normalise whitespace for easier matching
  const normalised = text.replace(/\s+/g, " ").trim();

  if (normalised.length < 50) {
    return { reportType: "unknown", rawTextSnippet: normalised };
  }

  // Try CF48-360 first (more specific factor names)
  const great8 = extractCF48Scores(normalised);
  if (great8 && Object.keys(great8).length >= 3) {
    return { reportType: "CF48-360", great8 };
  }

  // Try PF48
  const pf48 = extractPF48Scores(normalised);
  if (pf48 && Object.keys(pf48).length >= 3) {
    return { reportType: "PF48", pf48 };
  }

  return {
    reportType: "unknown",
    rawTextSnippet: normalised.substring(0, 500),
  };
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Score conversion helpers (used by analysis.ts)                            */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * Get the best single score for a Great 8 factor (All Raters preferred,
 * otherwise average of whichever perspectives are present).
 */
export function getRepresentativeScore(scores: Great8Scores): number | undefined {
  if (scores.allRaters !== undefined) return scores.allRaters;
  const vals = [scores.self, scores.peer, scores.directReport].filter(
    (v): v is number => v !== undefined
  );
  if (vals.length === 0) return undefined;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/**
 * Map PF48 factors to their closest Great 8 equivalents for the heatmap.
 */
export const PF48_TO_GREAT8_LABEL: Record<PF48Factor, string> = {
  Investigation: "Evaluating Information",
  Structure: "Structuring Work",
  Support: "Supporting Individuals",
  Resilience: "Coping with Pressure",
  Drive: "Driving Success",
  Creativity: "Creating Solutions",
  Interaction: "Interacting with People",
  Influence: "Exerting Influence",
};
