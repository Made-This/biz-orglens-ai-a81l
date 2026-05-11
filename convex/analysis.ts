"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

/**
 * runMockAnalysis
 *
 * Internal action scheduled by uploads.triggerAnalysis. Today this just
 * simulates "processing" and writes a NovaCloud-shaped demo dataset into the
 * analyses table. When real PDF parsing is ready, swap the body of this
 * action — the contract with the UI stays the same.
 */
export const runMockAnalysis = internalAction({
  args: { uploadId: v.id("analysisUploads") },
  handler: async (ctx, { uploadId }) => {
    const upload = await ctx.runMutation(internal.uploads._getUploadForAction, {
      uploadId,
    });
    if (!upload) {
      return;
    }

    try {
      // Simulate processing latency so the UI gets to render the processing
      // state for a few seconds.
      await new Promise((r) => setTimeout(r, 3500));

      const orgMapData = JSON.stringify(MOCK_ORG_MAP);
      const roleFitData = JSON.stringify(MOCK_ROLE_FIT);
      const riskSummary = JSON.stringify(MOCK_RISK_SUMMARY);
      const reportMarkdown = MOCK_REPORT_MARKDOWN;

      await ctx.runMutation(internal.uploads._writeAnalysisResult, {
        uploadId,
        userId: upload.userId,
        orgMapData,
        roleFitData,
        riskSummary,
        reportMarkdown,
      });
    } catch (_err) {
      await ctx.runMutation(internal.uploads._markUploadError, { uploadId });
    }
  },
});

/* ────────────────────────────────────────────────────────────────────────── */
/*  MOCK / DEMO DATA                                                          */
/*  Mirrors the NovaCloud Health demo data from /app/demo. Will be replaced   */
/*  by real HUCAMA PDF parsing in a later release.                            */
/* ────────────────────────────────────────────────────────────────────────── */

const MOCK_ORG_MAP = {
  companyName: "Your Team Analysis",
  teamSize: 28,
  note: "This is a simulated analysis. Real PDF parsing will be added in the next release.",
  ceo: { name: "Alex Morgan", role: "Founder & CEO", tone: "green" },
  groups: [
    {
      parent: { name: "Jordan Lee", role: "CTO · Engineering", tone: "green" },
      children: [
        { name: "Morgan Chen", role: "Engineering Lead", tone: "green" },
        { name: "Taylor Brooks", role: "Head of Product", tone: "amber" },
        { name: "Sophia Grant", role: "UX Designer", tone: "amber" },
        { name: "Devon Lin", role: "Senior Engineer", tone: "green" },
        { name: "Priya Shah", role: "Engineer", tone: "amber" },
        { name: "Owen Park", role: "Engineer", tone: "amber" },
      ],
    },
    {
      parent: {
        name: "Riley Johnson",
        role: "Customer Success Lead",
        tone: "green",
      },
      children: [
        { name: "Zoe Chambers", role: "Onboarding Specialist", tone: "amber" },
        { name: "Caden Brooks", role: "CS Manager", tone: "amber" },
        { name: "Maya Reeves", role: "CS Specialist", tone: "amber" },
        { name: "Noah Davis", role: "Support Lead", tone: "amber" },
      ],
    },
    {
      parent: {
        name: "Casey Miller",
        role: "Head of Operations",
        tone: "green",
      },
      children: [
        { name: "Avery Wilson", role: "Clinical Ops Lead", tone: "amber" },
        { name: "Isabella Park", role: "Executive Assistant", tone: "amber" },
        { name: "Elena Torres", role: "Compliance Specialist", tone: "amber" },
        { name: "Jonas Reid", role: "Ops Analyst", tone: "amber" },
      ],
    },
    {
      parent: { name: "Marcus Wright", role: "VP Sales", tone: "amber" },
      children: [
        { name: "Lucas Kim", role: "Account Executive", tone: "amber" },
        { name: "Anika Rao", role: "Account Executive", tone: "amber" },
        { name: "Jenna Cole", role: "SDR", tone: "amber" },
        { name: "Tomas Vega", role: "SDR", tone: "amber" },
      ],
    },
  ],
  competencyHeatmap: [
    { label: "Leading", score: 8.2, tone: "green" },
    { label: "Driving Success", score: 8.0, tone: "green" },
    { label: "Coping with Pressure", score: 7.8, tone: "green" },
    { label: "Structuring Work", score: 7.1, tone: "amber" },
    { label: "Interacting with People", score: 6.4, tone: "amber" },
    { label: "Evaluating Information", score: 6.1, tone: "amber" },
    { label: "Adapting", score: 5.8, tone: "amber" },
    { label: "Acting with Consideration", score: 4.8, tone: "red" },
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
      level: "high",
      body: "CEO involved in 80%+ of key decisions. High founder dependency limits scaling capacity beyond 30 people.",
    },
    {
      title: "Ownership Gaps",
      level: "medium",
      body: "Product + Engineering ownership overlap on roadmap decisions slows execution.",
    },
    {
      title: "Leadership Coverage",
      level: "medium",
      body: "Only 2 of 6 leaders score above 7.5 on Interacting with People. Thin coverage on Evaluating Information below VP level.",
    },
    {
      title: "Key Person Risk",
      level: "high",
      body: "CTO is single point of failure for technical direction — no identified second technical leader.",
    },
    {
      title: "Thin Bench",
      level: "medium",
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
