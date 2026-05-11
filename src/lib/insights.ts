export type InsightCategory =
  | "AI in HR Tech"
  | "Org Design for Founders"
  | "Role Fit & Competency Signals"
  | "People Analytics & Team Risk";

export interface InsightPost {
  slug: string;
  title: string;
  category: InsightCategory;
  summary: string;
  /** Array of paragraphs that make up the article body. */
  body: string[];
}

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  "AI in HR Tech",
  "Org Design for Founders",
  "Role Fit & Competency Signals",
  "People Analytics & Team Risk",
];

/**
 * Tailwind class fragments for category badges. Distinct color per category
 * keeps cards scannable and matches the indigo / violet / emerald / amber
 * palette used elsewhere in the dark theme.
 */
export const CATEGORY_STYLES: Record<
  InsightCategory,
  { badge: string; ring: string; dot: string }
> = {
  "AI in HR Tech": {
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-400/30",
    ring: "ring-indigo-400/30",
    dot: "bg-indigo-400",
  },
  "Org Design for Founders": {
    badge: "bg-violet-500/10 text-violet-300 border-violet-400/30",
    ring: "ring-violet-400/30",
    dot: "bg-violet-400",
  },
  "Role Fit & Competency Signals": {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
    ring: "ring-emerald-400/30",
    dot: "bg-emerald-400",
  },
  "People Analytics & Team Risk": {
    badge: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    ring: "ring-amber-400/30",
    dot: "bg-amber-400",
  },
};

export const INSIGHT_POSTS: InsightPost[] = [
  {
    slug: "how-ai-is-changing-hr-tech-2026",
    title: "How AI Is Changing HR Tech in 2026",
    category: "AI in HR Tech",
    summary:
      "AI is moving HR from administrative workflows toward decision intelligence, helping leaders understand skills, roles, team capacity, and organizational risk more clearly.",
    body: [
      "For most of the last twenty years, HR tech has been an administrative layer. Payroll, compliance, benefits enrollment, an HRIS that knows who reports to whom. Useful, but rarely strategic. The systems were built to record what already happened, not to help leaders see what is about to happen.",
      "That is finally changing. AI is shifting HR tech from administration toward decision intelligence. Instead of just storing employee data, modern tools can interpret it — predicting role fit, surfacing competency gaps, flagging organizational risk before it shows up as turnover or missed quarters. The data was always there; the analysis was the bottleneck.",
      "The biggest shift is who gets access. Historically, this kind of organizational intelligence lived inside large enterprises with internal people analytics teams, or inside consulting engagements that cost six figures and took months. Early-stage founders had neither option. They made critical people decisions — who to hire next, who to promote, where the team was structurally fragile — on instinct and a handful of references.",
      "AI changes that economics. A founder can now get a structured read on their team in minutes: where competency coverage is thin, which roles are misaligned with the company's stage, where leadership dependency is concentrating risk. The output is not a verdict; it is a clearer signal than the founder had ten minutes earlier.",
      "The pattern repeats across the stack. Sourcing tools score candidates against role-specific behavioral indicators instead of keywords. Onboarding tools surface the competencies a new hire will need to develop in the first ninety days. Org-mapping tools highlight where reporting lines have outgrown the team's actual operating rhythm. None of these replace judgment. All of them give the leader more to judge with.",
      "The shift in 2026 is not about automating HR. It is about giving founders and operators clearer signals before making the people decisions that matter most. The companies that adopt this lens early will compound the advantage — fewer mis-hires, less rework on org structure, faster confidence when the next critical role opens up.",
    ],
  },
  {
    slug: "why-saas-founders-need-org-intelligence-before-scaling",
    title: "Why SaaS Founders Need Organizational Intelligence Before Scaling",
    category: "Org Design for Founders",
    summary:
      "Many startup team problems appear before headcount growth. Founders need visibility into structure, role clarity, competency gaps, and leadership coverage before hiring more people.",
    body: [
      "Most founders treat hiring as the answer to operational drag. Velocity is slipping, deals are stalling, the roadmap is slipping — so they open three new roles and start a recruiter sprint. It feels like progress. Often, it is not.",
      "The uncomfortable truth: hiring more people into a broken structure scales the problem, not the output. If decision rights are unclear, two more people make them more unclear. If a critical function has no senior coverage, a junior hire under it just adds coordination overhead. If everything routes through the founder, an extra IC hire makes the founder a tighter bottleneck, not a looser one.",
      "Organizational intelligence is the practice of seeing those structural conditions before you act on them. Where does the team actually have strength? Where is competency coverage thin? Which roles are designed around a person who has since outgrown them? Which functions are quietly dependent on one individual whose departure would stall execution for a quarter?",
      "These are not exotic questions. But they are rarely answered explicitly. Founders carry the answers in their head, and the gaps in their head become the gaps in the company. Writing the answers down — or having a tool surface them — converts implicit risk into something the team can actually act on.",
      "There are three traps we see repeatedly at the pre-scale stage. The first is founder dependency: the founder is still the highest-skill operator in three different functions, and any growth plan that ignores that fact fails on contact with reality. The second is unclear ownership: two strong people each believe they own the same outcome, and the friction shows up as missed handoffs rather than a visible conflict. The third is missing leadership coverage: a function is producing output today but has no one capable of running it at twice the scale.",
      "Adding headcount before diagnosing these traps usually makes them worse. The right sequence is the opposite. Map structure first. Identify where current strengths are real and where they are one person deep. Then hire into the gaps, not around them. The discipline is unglamorous, but it is the difference between a team that scales and a team that just grows.",
    ],
  },
  {
    slug: "role-fit-vs-resume-fit",
    title: "Role Fit vs. Resume Fit: What Founders Often Miss",
    category: "Role Fit & Competency Signals",
    summary:
      "A strong resume does not always mean strong fit for the role, team, or company stage. Role-fit analysis helps founders understand whether someone's strengths match what the business actually needs.",
    body: [
      "Every founder has made this mistake, or watched a peer make it. A candidate walks in with a resume that looks engineered for the role — the right titles, the right logos, the right tenure. They get hired quickly because the signal is obvious. Six months later, they are not working out, and no one can quite explain why.",
      "The gap is usually between resume fit and role fit. Resume fit is what someone has done: past experience, credentials, job titles, recognizable brands on the work history. It is easy to evaluate because it is documented. Role fit is something different. It is whether the person's behavioral strengths and competency signals match what the role actually demands at this stage of this company.",
      "Stage matters more than founders typically account for. A head of marketing who was excellent at a Series B SaaS company may be a poor fit for a seed-stage environment, not because they lost any skill, but because the role they are now stepping into requires a different competency profile. Seed-stage leaders often need to operate hands-on, design systems from scratch, and tolerate ambiguity for months at a time. Series B leaders need to delegate, manage existing systems, and operate inside a much narrower scope of ambiguity. The skill labels look the same; the work is not.",
      "Role-fit indicators are the things that resumes do not show. How does the person process decisions when there is incomplete information? How do they handle ambiguity for weeks at a time, not days? How do they lead under pressure when the team is watching them for cues? Do they default to building systems or to running plays? These behavioral patterns are far more predictive of role outcomes than the logos on the resume.",
      "Founders often miss this because the resume signal is loud and the behavioral signal is quiet. The behavioral signal also takes longer to read — it shows up in how someone handles a tough scenario question, how they describe a past failure, how their references talk about them under pressure, not in the bullet points of their work history.",
      "The practical move is to evaluate role fit explicitly, not as a tiebreaker after resume screening. Decide what the role actually requires at this stage of the company, score candidates against those competency signals, and treat the resume as context — not as the answer.",
    ],
  },
  {
    slug: "hidden-cost-of-poor-team-structure",
    title: "The Hidden Cost of Poor Team Structure in Early-Stage Startups",
    category: "People Analytics & Team Risk",
    summary:
      "Unclear ownership, overlapping roles, weak reporting lines, and founder dependency can slow execution long before they show up in financial metrics.",
    body: [
      "The most expensive problems in an early-stage company are usually invisible until they are not. Team structure problems are the clearest example. They rarely show up on the P&L. They show up in missed deadlines, slower decisions, churn, and pivots that arrive a quarter too late.",
      "The pattern is consistent across the startups we see. The symptoms feel like execution problems — the team is not moving fast enough, projects are dragging, the founder is increasingly in the loop on decisions that should not require them. The instinct is to diagnose this as a productivity issue or a discipline issue. Usually, it is a structural one.",
      "A few specific symptoms recur. Decisions slow down because every meaningful call routes through the founder, often because no one else has been given clear authority to make it. Two people each think they own the same outcome, and the duplicate ownership produces friction that no one names. A critical function — finance, engineering, customer success — has no senior coverage, so a leaver or an absence would create a multi-week stall.",
      "None of these show up as a line item. There is no expense category called 'duplicate ownership'. There is no metric on the dashboard called 'founder bottleneck index'. The costs are real, but they accumulate quietly: a deal that closes a week late, a hire who quits in month four because the role boundaries were never clear, a feature that ships in Q3 instead of Q2 because the decision to build it took six weeks instead of one.",
      "By the time these costs are visible in the financials, the structural problem has usually compounded. The team has hired around it, built workflows around it, and developed a culture that quietly accommodates it. Unwinding becomes far more expensive than diagnosing.",
      "This is where people analytics and org mapping earn their place. They are not exotic tools — at the simplest level, they are a way to write down what is actually true about your team. Where does ownership sit, explicitly? Where is leadership coverage thin? Where is the team functionally dependent on a single individual? Surfacing these structural risks before they compound is one of the highest-leverage things a founder can do, and it costs almost nothing to start.",
    ],
  },
  {
    slug: "ai-agents-in-hr-what-founders-should-watch",
    title: "AI Agents in HR: What Founders Should Watch",
    category: "AI in HR Tech",
    summary:
      "Agentic AI is entering HR workflows, but founders still need human judgment, governance, and context when using AI for people-related decisions.",
    body: [
      "Agentic AI — software that takes actions on its own, not just answers questions — is moving into HR fast. Sourcing agents that scan and reach out to candidates. Screening agents that score applications against a role. Compensation agents that benchmark offers in real time. Onboarding agents that schedule, send documents, and answer first-week questions. The pitch is appealing: faster, more consistent, less biased than the manual version.",
      "The promise is real, but founders should be deliberate about how they adopt it. People decisions are not the same as software decisions. A miscategorized invoice is annoying. A misjudged hire, a wrongly-scored internal candidate, a flawed comp recommendation — these affect someone's livelihood and your team's trust in the process. The blast radius is different, and it deserves a different operating posture.",
      "There are three properties worth insisting on before letting an AI agent influence a people decision. The first is transparency: can the agent explain its recommendation in language a human can evaluate, or does it only output a score? If it cannot explain the reasoning, you cannot challenge it, and you should not rely on it. The second is auditability: can you go back, after the fact, and review how a specific decision was made? If the answer is no, you have no way to learn from mistakes or defend the process if it is challenged. The third is governance: who is accountable when the AI is wrong? That accountability cannot live with the vendor. It has to sit with a named human inside the company.",
      "The strongest use of AI agents in HR right now is as decision support, not decision maker. Use them to surface candidates you might have missed, to highlight competency signals you would have skimmed past, to flag offers that are out of band against the market. Then bring a human into the loop to make the call. The combination is faster than the old manual process and safer than full automation.",
      "The founders who get this right will not be the ones who automate the most aggressively. They will be the ones who use agentic AI to see more clearly, while keeping judgment, governance, and accountability where they belong — with people.",
    ],
  },
  {
    slug: "why-orglens-starts-with-demo",
    title: "Why OrgLens Starts With a Demo Before Asking You to Pay",
    category: "Org Design for Founders",
    summary:
      "OrgLens lets founders view a demo report first so they can understand the type of organizational intelligence the product provides before ordering a custom analysis.",
    body: [
      "Most B2B tools ask you to pay before you understand what you are getting. You watch a demo video edited for the highlight reel, read a few testimonials, then hand over a credit card and hope the actual product matches the marketing. We do not think that is the right starting point for a tool that helps founders make important people decisions.",
      "OrgLens is different on purpose. Before we ask for anything, we want you to see what an organizational intelligence report actually looks like. Not a screenshot. Not a sizzle reel. The real structure, the real sections, the real way the analysis presents itself when you sit down to read it.",
      "The demo report shows the same components you would receive for your own team: a competency coverage heatmap so you can see where the team has strength and where it is thin, role-fit ranking that compares the people you have against the roles you actually need, a scenario comparison that models structural changes before you make them, and organizational risk flags that surface dependencies and gaps you would otherwise carry in your head.",
      "If reading through that report gives you something useful — a way to think about your own team, a question you had not asked yet, a structural pattern you recognize — then paying $49 for your own organization's analysis becomes an easy decision. You already know what you are getting.",
      "If it is not what you need, we would rather you know that upfront, before money changes hands. A founder who feels misled by their first interaction with a product is not a founder who recommends it. Transparency is the cheaper long-term position for both sides.",
      "We believe this is the right default for a category that touches people's livelihoods. Show the work first. Earn the purchase second. The demo is the front door on purpose.",
    ],
  },
];

export function getInsightBySlug(slug: string): InsightPost | undefined {
  return INSIGHT_POSTS.find((post) => post.slug === slug);
}
