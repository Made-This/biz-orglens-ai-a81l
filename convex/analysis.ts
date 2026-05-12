"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import {
  extractHucamaScores,
  getRepresentativeScore,
  PF48_TO_GREAT8_LABEL,
  type HucamaResult,
  type Great8Factor,
  type PF48Factor,
} from "./hucamaExtractor";

// pdf-parse has no TypeScript declarations; we type-ignore the import.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdfParse from "pdf-parse";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Main analysis action                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * runAnalysis
 *
 * Scheduled by uploads.triggerAnalysis. Attempts to:
 *   1. Read the uploaded PDF from Convex storage.
 *   2. Extract text with pdf-parse.
 *   3. Detect HUCAMA CF48-360 / PF48 scores with hucamaExtractor.
 *   4. Build analysis data from real scores when found.
 *   5. Fall back to the NovaCloud demo dataset and set usedMockData=true
 *      if parsing fails or no recognisable data is present.
 */
export const runAnalysis = internalAction({
  args: { uploadId: v.id("analysisUploads") },
  handler: async (ctx, { uploadId }) => {
    const upload = await ctx.runMutation(internal.uploads._getUploadForAction, {
      uploadId,
    });
    if (!upload) return;

    try {
      // Allow the UI to show the "processing" state for a moment.
      await new Promise((r) => setTimeout(r, 2000));

      let usedMockData = true;
      let orgMapData = JSON.stringify(MOCK_ORG_MAP);
      let roleFitData = JSON.stringify(MOCK_ROLE_FIT);
      let riskSummary = JSON.stringify(MOCK_RISK_SUMMARY);
      let reportMarkdown = MOCK_REPORT_MARKDOWN;

      // ── Attempt real PDF parsing ───────────────────────────────────────── //
      try {
        const blob = await ctx.storage.get(upload.storageId);
        if (blob) {
          const arrayBuffer = await blob.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const pdfData = await pdfParse(buffer);
          const rawText: string = pdfData?.text ?? "";

          if (rawText.length >= 100) {
            const hucama = extractHucamaScores(rawText);

            if (hucama.reportType !== "unknown") {
              const built = buildAnalysisFromHucama(hucama);
              orgMapData = JSON.stringify(built.orgMap);
              roleFitData = JSON.stringify(built.roleFit);
              riskSummary = JSON.stringify(built.riskSummary);
              reportMarkdown = built.reportMarkdown;
              usedMockData = false;
            }
          }
        }
      } catch (parseErr) {
        // Parsing failed — silently fall back to demo data.
        console.error("[OrgLens] PDF parsing error, falling back to demo data:", parseErr);
      }

      await ctx.runMutation(internal.uploads._writeAnalysisResult, {
        uploadId,
        userId: upload.userId,
        orgMapData,
        roleFitData,
        riskSummary,
        reportMarkdown,
        usedMockData,
      });
    } catch (_err) {
      await ctx.runMutation(internal.uploads._markUploadError, { uploadId });
    }
  },
});

/* ────────────────────────────────────────────────────────────────────────── */
/*  Build analysis data from extracted HUCAMA scores                          */
/* ────────────────────────────────────────────────────────────────────────── */

interface HeatmapEntry {
  label: string;
  score: number;
  tone: "green" | "amber" | "red";
}

function scoreTone(score: number): "green" | "amber" | "red" {
  if (score >= 7) return "green";
  if (score >= 5) return "amber";
  return "red";
}

/** Round to 1 decimal place. */
function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Build a heatmap array from a HucamaResult.
 */
function buildHeatmap(hucama: HucamaResult): HeatmapEntry[] {
  const entries: HeatmapEntry[] = [];

  if (hucama.reportType === "CF48-360" && hucama.great8) {
    for (const factor of Object.keys(hucama.great8) as Great8Factor[]) {
      const scores = hucama.great8[factor];
      if (!scores) continue;
      const score = getRepresentativeScore(scores);
      if (score === undefined) continue;
      entries.push({ label: factor, score: round1(score), tone: scoreTone(score) });
    }
  } else if (hucama.reportType === "PF48" && hucama.pf48) {
    for (const factor of Object.keys(hucama.pf48) as PF48Factor[]) {
      const stenScore = hucama.pf48[factor];
      if (stenScore === undefined) continue;
      // Sten 1–10 → Great 8 scale 1–9 approximation
      const score = round1((stenScore / 10) * 9);
      const label = PF48_TO_GREAT8_LABEL[factor];
      entries.push({ label, score, tone: scoreTone(score) });
    }
  }

  // Sort highest to lowest
  return entries.sort((a, b) => b.score - a.score);
}

/**
 * Generate risk summary from heatmap scores.
 */
function buildRisksFromHeatmap(heatmap: HeatmapEntry[]): typeof MOCK_RISK_SUMMARY {
  const lowFactors = heatmap.filter((h) => h.score < 6).slice(0, 3);
  const veryLowFactors = heatmap.filter((h) => h.score < 5);

  const topRisks: typeof MOCK_RISK_SUMMARY.topRisks = [];
  const recommendations: typeof MOCK_RISK_SUMMARY.recommendations = [];

  // Generic structural risk always present
  topRisks.push({
    title: "Founder Dependency",
    level: "high",
    body: "With gaps in team competency coverage, the founder may be compensating for capability shortfalls. Clarify which roles need strengthening before the next hiring cycle.",
  });

  // Competency-specific risks
  for (const factor of lowFactors) {
    const level: "high" | "medium" = factor.score < 5 ? "high" : "medium";
    topRisks.push({
      title: `Weak Coverage: ${factor.label}`,
      level,
      body: `${factor.label} scores below threshold (${factor.score.toFixed(1)}/9). This creates a capability gap that can limit execution in roles requiring this competency.`,
    });
  }

  if (topRisks.length < 3) {
    topRisks.push({
      title: "Leadership Bench Depth",
      level: "medium",
      body: "Ensure succession coverage for senior roles. Without identified successors for key positions, operational continuity is at risk during transitions.",
    });
  }

  // Recommendations
  let priority = 1;

  if (lowFactors.length > 0) {
    recommendations.push({
      priority: priority++,
      title: `Address capability gap in ${lowFactors[0].label}`,
      body: `Score of ${lowFactors[0].score.toFixed(1)} is below threshold. Consider targeted development, mentoring, or a targeted hire to strengthen this competency in the team.`,
    });
  }

  if (veryLowFactors.length > 1) {
    recommendations.push({
      priority: priority++,
      title: "Run a structured capability review with senior leaders",
      body: "Multiple competency areas score below 5. Before the next hiring wave, run a 2-hour leadership team session to map which gaps are skill, motivation, or structural in origin.",
    });
  }

  recommendations.push({
    priority: priority++,
    title: "Identify succession coverage for top-scoring roles",
    body: "Your highest-scoring team members carry disproportionate value. Map which roles have no identified backup, and take action before scaling headcount.",
  });

  return { topRisks, recommendations };
}

/**
 * Generate a brief markdown report from heatmap and risks.
 */
function generateMarkdownReport(
  heatmap: HeatmapEntry[],
  risks: typeof MOCK_RISK_SUMMARY
): string {
  const strengths = heatmap.filter((h) => h.tone === "green").map((h) => h.label);
  const gaps = heatmap.filter((h) => h.tone !== "green").map((h) => h.label);

  const strengthText =
    strengths.length > 0
      ? strengths.slice(0, 3).join(", ")
      : "general team capability";

  const gapText =
    gaps.length > 0
      ? gaps.slice(0, 3).join(", ")
      : "areas for development";

  return `## Team Strengths

Analysis of your uploaded HUCAMA reports shows the team performs strongest on ${strengthText}. These scores indicate solid capability coverage that can support the next phase of growth.

## Key Risks

The most important gaps are in ${gapText}. ${
    risks.topRisks[0]
      ? risks.topRisks[0].body
      : "Structural alignment and leadership coverage are the primary areas to address."
  }

## Recommended Next Steps

${risks.recommendations
  .map((r) => `**${r.priority}. ${r.title}** — ${r.body}`)
  .join("\n\n")}
`;
}

interface BuiltAnalysis {
  orgMap: typeof MOCK_ORG_MAP;
  roleFit: typeof MOCK_ROLE_FIT;
  riskSummary: typeof MOCK_RISK_SUMMARY;
  reportMarkdown: string;
}

/**
 * Assemble a full analysis dataset from extracted HUCAMA scores.
 * Uses the mock org chart structure for names/roles (since HUCAMA reports
 * contain psychometric scores, not org structure), but replaces the
 * competency heatmap with real values.
 */
function buildAnalysisFromHucama(hucama: HucamaResult): BuiltAnalysis {
  const heatmap = buildHeatmap(hucama);

  const orgMap = {
    ...MOCK_ORG_MAP,
    note:
      hucama.reportType === "CF48-360"
        ? "Competency heatmap reflects actual CF48-360 scores from your uploaded report. Org chart names are placeholder — update via your intake form."
        : "Competency heatmap reflects your PF48 Sten scores mapped to Great 8 equivalents. Org chart names are placeholder.",
    competencyHeatmap:
      heatmap.length >= 3 ? heatmap : MOCK_ORG_MAP.competencyHeatmap,
  };

  const riskSummary = buildRisksFromHeatmap(heatmap.length >= 3 ? heatmap : MOCK_ORG_MAP.competencyHeatmap);
  const reportMarkdown = generateMarkdownReport(orgMap.competencyHeatmap, riskSummary);

  return { orgMap, roleFit: MOCK_ROLE_FIT, riskSummary, reportMarkdown };
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  MOCK / DEMO DATA (NovaCloud Health)                                       */
/*  Used as fallback when PDF parsing fails or returns no HUCAMA data.        */
/* ────────────────────────────────────────────────────────────────────────── */

const MOCK_ORG_MAP = {
  companyName: "Your Team Analysis",
  teamSize: 28,
  note: "This is a simulated analysis. Real PDF parsing will be added in the next release.",
  ceo: { name: "Alex Morgan", role: "Founder & CEO", tone: "green" as const },
  groups: [
    {
      parent: { name: "Jordan Lee", role: "CTO · Engineering", tone: "green" as const },
      children: [
        { name: "Morgan Chen", role: "Engineering Lead", tone: "green" as const },
        { name: "Taylor Brooks", role: "Head of Product", tone: "amber" as const },
        { name: "Sophia Grant", role: "UX Designer", tone: "amber" as const },
        { name: "Devon Lin", role: "Senior Engineer", tone: "green" as const },
        { name: "Priya Shah", role: "Engineer", tone: "amber" as const },
        { name: "Owen Park", role: "Engineer", tone: "amber" as const },
      ],
    },
    {
      parent: { name: "Riley Johnson", role: "Customer Success Lead", tone: "green" as const },
      children: [
        { name: "Zoe Chambers", role: "Onboarding Specialist", tone: "amber" as const },
        { name: "Caden Brooks", role: "CS Manager", tone: "amber" as const },
        { name: "Maya Reeves", role: "CS Specialist", tone: "amber" as const },
        { name: "Noah Davis", role: "Support Lead", tone: "amber" as const },
      ],
    },
    {
      parent: { name: "Casey Miller", role: "Head of Operations", tone: "green" as const },
      children: [
        { name: "Avery Wilson", role: "Clinical Ops Lead", tone: "amber" as const },
        { name: "Isabella Park", role: "Executive Assistant", tone: "amber" as const },
        { name: "Elena Torres", role: "Compliance Specialist", tone: "amber" as const },
        { name: "Jonas Reid", role: "Ops Analyst", tone: "amber" as const },
      ],
    },
    {
      parent: { name: "Marcus Wright", role: "VP Sales", tone: "amber" as const },
      children: [
        { name: "Lucas Kim", role: "Account Executive", tone: "amber" as const },
        { name: "Anika Rao", role: "Account Executive", tone: "amber" as const },
        { name: "Jenna Cole", role: "SDR", tone: "amber" as const },
        { name: "Tomas Vega", role: "SDR", tone: "amber" as const },
      ],
    },
  ],
  competencyHeatmap: [
    { label: "Leading", score: 8.2, tone: "green" as const },
    { label: "Driving Success", score: 8.0, tone: "green" as const },
    { label: "Coping with Pressure", score: 7.8, tone: "green" as const },
    { label: "Structuring Work", score: 7.1, tone: "amber" as const },
    { label: "Interacting with People", score: 6.4, tone: "amber" as const },
    { label: "Evaluating Information", score: 6.1, tone: "amber" as const },
    { label: "Adapting", score: 5.8, tone: "amber" as const },
    { label: "Acting with Consideration", score: 4.8, tone: "red" as const },
  ],
};

const MOCK_ROLE_FIT = {
  rows: [
    { name: "Alex Morgan", role: "CEO", fit: 91, topSignal: "Leading · Driving Success" },
    { name: "Jordan Lee", role: "CTO", fit: 84, topSignal: "Structuring · Evaluating" },
    { name: "Taylor Brooks", role: "Head of Product", fit: 79, topSignal: "Adapting · Influencing" },
    { name: "Casey Miller", role: "Head of Operations", fit: 76, topSignal: "Structuring · Driving Success" },
    { name: "Riley Johnson", role: "Customer Success Lead", fit: 88, topSignal: "Interacting · Acting with Consideration" },
    { name: "Marcus Wright", role: "VP Sales", fit: 71, topSignal: "Influencing · Driving Success" },
    { name: "Morgan Chen", role: "Engineering Lead", fit: 85, topSignal: "Structuring · Evaluating" },
    { name: "Sophia Grant", role: "UX Designer", fit: 73, topSignal: "Adapting · Interacting" },
    { name: "Devon Lin", role: "Senior Engineer", fit: 82, topSignal: "Evaluating · Structuring" },
    { name: "Priya Shah", role: "Engineer", fit: 74, topSignal: "Adapting · Structuring" },
    { name: "Owen Park", role: "Engineer", fit: 70, topSignal: "Adapting · Evaluating" },
    { name: "Zoe Chambers", role: "Onboarding Specialist", fit: 81, topSignal: "Interacting · Acting with Consideration" },
    { name: "Caden Brooks", role: "CS Manager", fit: 77, topSignal: "Interacting · Driving Success" },
    { name: "Maya Reeves", role: "CS Specialist", fit: 79, topSignal: "Interacting · Adapting" },
    { name: "Noah Davis", role: "Support Lead", fit: 72, topSignal: "Interacting · Coping" },
    { name: "Avery Wilson", role: "Clinical Ops Lead", fit: 80, topSignal: "Structuring · Acting with Consideration" },
    { name: "Isabella Park", role: "Executive Assistant", fit: 86, topSignal: "Structuring · Interacting" },
    { name: "Elena Torres", role: "Compliance Specialist", fit: 78, topSignal: "Structuring · Evaluating" },
    { name: "Jonas Reid", role: "Ops Analyst", fit: 75, topSignal: "Evaluating · Structuring" },
    { name: "Lucas Kim", role: "Account Executive", fit: 73, topSignal: "Influencing · Interacting" },
    { name: "Anika Rao", role: "Account Executive", fit: 76, topSignal: "Influencing · Driving Success" },
    { name: "Jenna Cole", role: "SDR", fit: 68, topSignal: "Influencing · Coping" },
    { name: "Tomas Vega", role: "SDR", fit: 70, topSignal: "Influencing · Adapting" },
    { name: "Quinn Hayes", role: "Marketing Lead", fit: 81, topSignal: "Influencing · Adapting" },
    { name: "Sasha Patel", role: "Content Manager", fit: 74, topSignal: "Structuring · Influencing" },
    { name: "Diego Alvarez", role: "Data Analyst", fit: 83, topSignal: "Evaluating · Structuring" },
    { name: "Lena Moss", role: "People Operations", fit: 80, topSignal: "Interacting · Acting with Consideration" },
    { name: "Reuben Cole", role: "Finance Lead", fit: 87, topSignal: "Evaluating · Structuring" },
  ],
};

const MOCK_RISK_SUMMARY = {
  topRisks: [
    {
      title: "Founder Dependency",
      level: "high" as const,
      body: "CEO involved in 80%+ of key decisions. High founder dependency limits scaling capacity beyond 30 people.",
    },
    {
      title: "Ownership Gaps",
      level: "medium" as const,
      body: "Product + Engineering ownership overlap on roadmap decisions slows execution.",
    },
    {
      title: "Leadership Coverage",
      level: "medium" as const,
      body: "Only 2 of 6 leaders score above 7.5 on Interacting with People. Thin coverage on Evaluating Information below VP level.",
    },
    {
      title: "Key Person Risk",
      level: "high" as const,
      body: "CTO is single point of failure for technical direction — no identified second technical leader.",
    },
    {
      title: "Thin Bench",
      level: "medium" as const,
      body: "3 of 6 leadership roles have no identified successor.",
    },
  ],
  recommendations: [
    {
      priority: 1,
      title: "Clarify ownership boundary between CTO and Head of Product",
      body: "Define explicit decision rights on roadmap and architecture in the next 30 days. Highest-leverage move available right now.",
    },
    {
      priority: 2,
      title: "Identify a second technical leader",
      body: "Reduce CTO key-person dependency. Either promote internally or scope a senior hire before the next engineering hire wave.",
    },
    {
      priority: 3,
      title: "Strengthen analytical capability in the senior team",
      body: "Three senior roles score below threshold on Evaluating Information. Address before scaling sales or operations further.",
    },
  ],
};

const MOCK_REPORT_MARKDOWN = `## Team Strengths

Your team has a strong founder-led core. Leadership scores highly on Leading, Driving Success, and Coping with Pressure. The engineering and customer success functions have clear, competency-aligned leads. Role-fit is strongest in the executive tier — CEO at 91% and CS Lead at 88% — giving you a credible base to build from.

## Key Risks

The most important risk is structural: ownership boundaries between CTO and Head of Product are not clearly defined, which shows up as overlap on roadmap decisions and slows execution. Founder dependency is high — the CEO is involved in 80%+ of key decisions, which limits scaling capacity beyond a 30-person team. The senior team also has thin coverage on Interacting with People and Evaluating Information.

## Recommended Next Steps

Before the next hiring cycle, run a focused role redesign to define the ownership boundary between CTO and Head of Product, and identify a second technical leader to reduce key-person dependency. The senior team would benefit from one new hire (or internal promotion) strong on Evaluating Information. Clarifying reporting lines for IC roles currently reporting to multiple stakeholders is the lowest-cost, highest-leverage move in the next 30 days.
`;
