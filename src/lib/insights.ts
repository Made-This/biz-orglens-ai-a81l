// ============================================================
// OrgLens Insights — Blog Content
// ============================================================
// To add a new post weekly:
// 1. Add a new BlogPost object to the `blogPosts` array below.
// 2. Set status: "published" when ready to go live (use "draft" to hide it).
// 3. Set publishDate to the publish date in "YYYY-MM-DD" format.
// 4. Make sure the slug is URL-safe (lowercase, hyphens, no spaces).
// 5. Commit and push — the page will auto-update.
// ============================================================

export type InsightCategory =
  | "AI in HR Tech"
  | "Org Design for Growing Teams"
  | "Role Fit & Competency Signals"
  | "People Analytics & Team Risk"
  | "Responsible AI in People Decisions"
  | "Founder and SME Leadership";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  /** Full article body. Paragraphs separated by a blank line (\n\n). */
  content: string;
  author: string;
  /** Publish date in "YYYY-MM-DD" format. */
  publishDate: string;
  category: InsightCategory;
  tags: string[];
  /** Optional image path. If omitted, the page uses a colored category placeholder. */
  featuredImage?: string;
  status: "published" | "draft";
  seoTitle?: string;
  seoDescription?: string;
};

// Legacy alias — existing imports may use InsightPost.
export type InsightPost = BlogPost;

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  "AI in HR Tech",
  "Org Design for Growing Teams",
  "Role Fit & Competency Signals",
  "People Analytics & Team Risk",
  "Responsible AI in People Decisions",
  "Founder and SME Leadership",
];

/**
 * Tailwind class fragments for category badges. Distinct color per category
 * keeps cards scannable and matches the indigo / violet / emerald / amber /
 * sky palette used elsewhere in the dark theme.
 */
export const CATEGORY_STYLES: Record<
  InsightCategory,
  { badge: string; ring: string; dot: string; placeholder: string }
> = {
  "AI in HR Tech": {
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-400/30",
    ring: "ring-indigo-400/30",
    dot: "bg-indigo-400",
    placeholder:
      "from-indigo-500/20 via-indigo-500/5 to-transparent border-indigo-400/20",
  },
  "Org Design for Growing Teams": {
    badge: "bg-violet-500/10 text-violet-300 border-violet-400/30",
    ring: "ring-violet-400/30",
    dot: "bg-violet-400",
    placeholder:
      "from-violet-500/20 via-violet-500/5 to-transparent border-violet-400/20",
  },
  "Role Fit & Competency Signals": {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
    ring: "ring-emerald-400/30",
    dot: "bg-emerald-400",
    placeholder:
      "from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-400/20",
  },
  "People Analytics & Team Risk": {
    badge: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    ring: "ring-amber-400/30",
    dot: "bg-amber-400",
    placeholder:
      "from-amber-500/20 via-amber-500/5 to-transparent border-amber-400/20",
  },
  "Responsible AI in People Decisions": {
    badge: "bg-sky-500/10 text-sky-300 border-sky-400/30",
    ring: "ring-sky-400/30",
    dot: "bg-sky-400",
    placeholder:
      "from-sky-500/20 via-sky-500/5 to-transparent border-sky-400/20",
  },
  "Founder and SME Leadership": {
    badge: "bg-rose-500/10 text-rose-300 border-rose-400/30",
    ring: "ring-rose-400/30",
    dot: "bg-rose-400",
    placeholder:
      "from-rose-500/20 via-rose-500/5 to-transparent border-rose-400/20",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-ai-is-changing-hr-tech-2026",
    title: "How AI Is Changing HR Tech in 2026",
    category: "AI in HR Tech",
    author: "OrgLens AI",
    publishDate: "2026-05-05",
    tags: ["AI", "HR Tech", "Decision Intelligence", "2026"],
    status: "published",
    summary:
      "AI is moving HR from administrative workflows toward decision intelligence, helping leaders understand skills, roles, team capacity, and organizational risk more clearly.",
    content: [
      "For most of the last twenty years, HR tech has been an administrative layer. Payroll, compliance, benefits enrollment, an HRIS that knows who reports to whom. Useful, but rarely strategic. The systems were built to record what already happened, not to help leaders see what is about to happen.",
      "That is finally changing. AI is shifting HR tech from administration toward decision intelligence. Instead of just storing employee data, modern tools can interpret it — predicting role fit, surfacing competency gaps, flagging organizational risk before it shows up as turnover or missed quarters. The data was always there; the analysis was the bottleneck.",
      "The biggest shift is who gets access. Historically, this kind of organizational intelligence lived inside large enterprises with internal people analytics teams, or inside consulting engagements that cost six figures and took months. Early-stage founders had neither option. They made critical people decisions — who to hire next, who to promote, where the team was structurally fragile — on instinct and a handful of references.",
      "AI changes that economics. A founder can now get a structured read on their team in minutes: who is strongest in which areas, where leadership coverage is weak, which roles may create execution risk. The output is not a verdict; it is a clearer signal than the founder had ten minutes earlier.",
      "The pattern repeats across the stack. Sourcing tools score candidates against role-specific behavioral indicators instead of keywords. Onboarding tools surface the competencies a new hire will need to develop in the first ninety days. Org-mapping tools highlight where reporting lines have outgrown the team's actual operating rhythm. None of these replace judgment. All of them give the leader more to judge with.",
      "The shift in 2026 is not about automating HR. It is about giving founders and operators clearer signals before making the people decisions that matter most. The companies that adopt this lens early will compound the advantage — fewer mis-hires, less rework on org structure, faster confidence when the next critical role opens up.",
      "The shift isn't about replacing HR — it's about giving founders the visibility to make better people decisions faster.",
    ].join("\n\n"),
  },
  {
    slug: "why-saas-founders-need-org-intelligence-before-scaling",
    title: "Why SaaS Founders Need Organizational Intelligence Before Scaling",
    category: "Org Design for Growing Teams",
    author: "OrgLens AI",
    publishDate: "2026-04-28",
    tags: ["Org Design", "Scaling", "Founders", "Team Structure"],
    status: "published",
    summary:
      "Many startup team problems appear before headcount growth. Founders need visibility into structure, role clarity, competency gaps, and leadership coverage before hiring more people.",
    content: [
      "Most founders treat hiring as the answer to operational drag. Velocity is slipping, deals are stalling, the roadmap is slipping — so they open three new roles and start a recruiter sprint. It feels like progress. Often, it is not.",
      "The uncomfortable truth: hiring more people into a broken structure scales the problem, not the output. If decision rights are unclear, two more people make them more unclear. If a critical function has no senior coverage, a junior hire under it just adds coordination overhead. If everything routes through the founder, an extra IC hire makes the founder a tighter bottleneck, not a looser one.",
      "Organizational intelligence is the practice of seeing those structural conditions before you act on them. Where does the team actually have strength? Where is competency coverage thin? Which roles are designed around a person who has since outgrown them? Which functions are quietly dependent on one individual whose departure would stall execution for a quarter?",
      "These are not exotic questions. But they are rarely answered explicitly. Founders carry the answers in their head, and the gaps in their head become the gaps in the company. Writing the answers down — or having a tool surface them — converts implicit risk into something the team can actually act on.",
      "There are three traps we see repeatedly at the pre-scale stage. The first is founder dependency: the founder is still the highest-skill operator in three different functions, and any growth plan that ignores that fact fails on contact with reality. The second is unclear ownership: two strong people each believe they own the same outcome, and the friction shows up as missed handoffs rather than a visible conflict. The third is missing leadership coverage: a function is producing output today but has no one capable of running it at twice the scale.",
      "Adding headcount before diagnosing these traps usually makes them worse. The right sequence is the opposite. Map structure first. Identify where current strengths are real and where they are one person deep. Then hire into the gaps, not around them. The discipline is unglamorous, but it is the difference between a team that scales and a team that just grows.",
    ].join("\n\n"),
  },
  {
    slug: "role-fit-vs-resume-fit",
    title: "Role Fit vs. Resume Fit: What Founders Often Miss",
    category: "Role Fit & Competency Signals",
    author: "OrgLens AI",
    publishDate: "2026-04-21",
    tags: ["Role Fit", "Hiring", "Competency", "Founders"],
    status: "published",
    summary:
      "A strong resume does not always mean strong fit for the role, team, or company stage. Role-fit analysis helps founders understand whether someone's strengths match what the business actually needs.",
    content: [
      "Every founder has made this mistake, or watched a peer make it. A candidate walks in with a resume that looks engineered for the role — the right titles, the right logos, the right tenure. They get hired quickly because the signal is obvious. Six months later, they are not working out, and no one can quite explain why.",
      "The gap is usually between resume fit and role fit. Resume fit is what someone has done: past experience, credentials, job titles, recognizable brands on the work history. It is easy to evaluate because it is documented. Role fit is something different. It is whether the person's behavioral strengths and competency signals match what the role actually demands at this stage of this company.",
      "Stage matters more than founders typically account for. A great VP Sales at a 500-person company may be a poor fit for a 12-person startup where everyone has to build, not just manage. The job title is the same. The work underneath it is not. Seed-stage leaders often need to operate hands-on, design systems from scratch, and tolerate ambiguity for months at a time. Later-stage leaders need to delegate, run existing systems, and operate inside a much narrower scope of ambiguity. The skill labels look the same; the work is not.",
      "Role-fit indicators are the things that resumes do not show. How does the person process decisions when there is incomplete information? How do they handle ambiguity for weeks at a time, not days? How do they lead under pressure when the team is watching them for cues? Do they default to building systems or to running plays? These behavioral patterns are far more predictive of role outcomes than the logos on the resume.",
      "Role-fit analysis looks at competency coverage, behavioral indicators, and team composition context — not just job history. Founders often miss this because the resume signal is loud and the behavioral signal is quiet. The behavioral signal also takes longer to read — it shows up in how someone handles a tough scenario question, how they describe a past failure, how their references talk about them under pressure, not in the bullet points of their work history.",
      "The practical move is to evaluate role fit explicitly, not as a tiebreaker after resume screening. Decide what the role actually requires at this stage of the company, score candidates against those competency signals, and treat the resume as context — not as the answer.",
    ].join("\n\n"),
  },
  {
    slug: "hidden-cost-of-poor-team-structure",
    title: "The Hidden Cost of Poor Team Structure in Early-Stage Startups",
    category: "People Analytics & Team Risk",
    author: "OrgLens AI",
    publishDate: "2026-04-14",
    tags: ["Team Structure", "Organizational Risk", "Execution", "Startups"],
    status: "published",
    summary:
      "Unclear ownership, overlapping roles, weak reporting lines, and founder dependency can slow execution long before they show up in financial metrics.",
    content: [
      "The most expensive problems in an early-stage company are usually invisible until they are not. Team structure problems are the clearest example. They rarely show up on the P&L. They show up in missed deadlines, slower decisions, churn, and pivots that arrive a quarter too late.",
      "The pattern is consistent across the startups we see. The symptoms feel like execution problems — the team is not moving fast enough, projects are dragging, the founder is increasingly in the loop on decisions that should not require them. The instinct is to diagnose this as a productivity issue or a discipline issue. Usually, it is a structural one.",
      "A few specific symptoms recur. Decisions slow down because every meaningful call routes through the founder, often because no one else has been given clear authority to make it. Two people each think they own the same outcome, and the duplicate ownership produces friction that no one names. A critical function — finance, engineering, customer success — has no senior coverage, so a leaver or an absence would create a multi-week stall.",
      "None of these show up as a line item. There is no expense category called 'duplicate ownership'. There is no metric on the dashboard called 'founder bottleneck index'. The costs are real, but they accumulate quietly: a deal that closes a week late, a hire who quits in month four because the role boundaries were never clear, a feature that ships in Q3 instead of Q2 because the decision to build it took six weeks instead of one.",
      "By the time these costs are visible in the financials, the structural problem has usually compounded. The team has hired around it, built workflows around it, and developed a culture that quietly accommodates it. Unwinding becomes far more expensive than diagnosing.",
      "This is where organizational intelligence earns its place. It is not an exotic tool — at the simplest level, it is a way to write down what is actually true about your team. Where does ownership sit, explicitly? Where is leadership coverage thin? Where is the team functionally dependent on a single individual? Surfacing these structural risks before they compound is one of the highest-leverage things a founder can do, and it costs almost nothing to start.",
    ].join("\n\n"),
  },
  {
    slug: "ai-agents-in-hr-what-founders-should-watch",
    title: "AI Agents in HR: What Founders Should Watch",
    category: "AI in HR Tech",
    author: "OrgLens AI",
    publishDate: "2026-04-07",
    tags: ["AI Agents", "HR Tech", "Governance", "Founders"],
    status: "published",
    summary:
      "Agentic AI is entering HR workflows, but founders still need human judgment, governance, and context when using AI for people-related decisions.",
    content: [
      "Agentic AI — software that takes actions on its own, not just answers questions — is moving into HR fast. Sourcing agents that scan and reach out to candidates. Screening agents that score applications against a role. Onboarding agents that schedule, send documents, and answer first-week questions. Compensation agents that benchmark offers in real time. Performance agents that surface signals across the team. The pitch is appealing: faster, more consistent, less biased than the manual version.",
      "The promise is real, but founders should be deliberate about how they adopt it. People decisions are not the same as software decisions. They carry real consequences — legal, cultural, human. A miscategorized invoice is annoying. A misjudged hire, a wrongly-scored internal candidate, a flawed comp recommendation — these affect someone's livelihood and your team's trust in the process. The blast radius is different, and it deserves a different operating posture.",
      "There are three properties worth insisting on before letting an AI agent influence a people decision. The first is transparency: can the agent explain its recommendation in language a human can evaluate, or does it only output a score? If it cannot explain the reasoning, you cannot challenge it, and you should not rely on it. The second is auditability: can you go back, after the fact, and review how a specific decision was made? If the answer is no, you have no way to learn from mistakes or defend the process if it is challenged. The third is governance: who is accountable when the AI is wrong? That accountability cannot live with the vendor. It has to sit with a named human inside the company.",
      "The strongest use of AI agents in HR right now is as decision support, not decision maker. Use them to surface candidates you might have missed, to highlight competency signals you would have skimmed past, to flag offers that are out of band against the market. Then bring a human into the loop to make the call. The combination is faster than the old manual process and safer than full automation.",
      "Founders using AI in HR need clear governance, human review at key moments, and transparency about what AI is informing vs. deciding. The best use of AI in HR is decision support, not decision replacement. The founders who get this right will not be the ones who automate the most aggressively. They will be the ones who use agentic AI to see more clearly, while keeping judgment, governance, and accountability where they belong — with people.",
    ].join("\n\n"),
  },
  {
    slug: "founder-bottleneck-series-a",
    title: "How to Spot a Founder Bottleneck Before It Stalls Your Series A",
    category: "Founder and SME Leadership",
    author: "OrgLens AI",
    publishDate: "2026-05-12",
    tags: [
      "Founder Bottleneck",
      "Series A",
      "Org Design",
      "Leadership",
      "Scaling",
      "Execution Risk",
    ],
    status: "published",
    seoTitle:
      "How to Spot a Founder Bottleneck Before It Stalls Your Series A",
    seoDescription:
      "Investors don't just look at traction — they look at whether your organization can execute without you in every room. Here's how to diagnose and fix a founder bottleneck before it becomes a deal-killer.",
    summary:
      "Investors don't just look at traction — they look at whether your organization can execute without you in every room. Here's how to diagnose and fix a founder bottleneck before it becomes a deal-killer.",
    content: [
      "Picture a Series A pitch meeting. Strong product, good numbers, interesting market. Then the investor asks about the sales strategy — and the founder answers. Then the roadmap — founder again. Engineering priorities, customer expansion plan, how the hiring slate was decided — founder, founder, founder. Impressive knowledge. But the investor across the table isn't just watching what gets said. They're watching who's saying it.",
      "A company where every substantive question routes back to the CEO is a company that cannot scale beyond that CEO's bandwidth. Smart investors have seen this enough times to have a name for it. It is called a founder bottleneck, and it is one of the most consistent reasons early-stage companies stall between seed and Series A — not from market risk, not from product failure, but from organizational structure that never got redesigned for the next stage.",
      "The key thing to understand: this is not a personal failure. The founder who can answer everything built something from scratch. That's the origin story. The question is whether the organizational structure still routes everything through that one person — and whether investors, and the company, can survive what happens when that person is no longer enough.",
      "The phrase 'founder bottleneck' often gets reduced to 'the founder works too hard.' That's not it. You can work long hours and still have genuine organizational capability distributed across your leadership team. The bottleneck is not about time — it's about decision authority and decision clarity.",
      "The clearest signal is what happens when you're not there. If you return from a two-day trip to 14 queued decisions, some sitting since Tuesday, the problem isn't that your team is passive. It's that they don't have the authority or the framework to decide without you. Decisions that stall in your absence are decisions that are structurally yours, even if they shouldn't be.",
      "A second signal is the distinction between task ownership and outcome ownership. Direct reports who own tasks know what they're doing this week. Direct reports who own outcomes can tell you the strategic goal of their function — and they pursue that goal without checking in on every non-trivial call. Founder-led company scaling often gets stuck precisely here: the org chart shows delegation, but the actual decision tree is still founder-centric.",
      "There are a few more signs. Sales, product, and ops all escalate to the founder on calls that should be well inside a senior leader's scope. A VP of Sales who still needs founder approval on deal structure isn't really running sales — they're managing a process the founder owns. And perhaps the starkest test: could any of your direct reports brief an investor on their function's strategy, in depth, without you in the room? If the answer is no, the strategy is still yours.",
      "Investors making a Series A bet are not just betting on a product. They are betting on an organization that can execute a plan, deploy capital, and scale without the founder as the constant intervention layer. When organizational structure Series A due diligence surfaces a bottleneck, it raises three specific concerns.",
      "The first is execution risk. Key-person dependency is a structural vulnerability. If the company's organizational capability is concentrated in one person, any disruption to that person disrupts the company. This is a risk that can be quantified, and investors do quantify it.",
      "The second is leadership coverage gaps. If the heads of your key functions cannot operate independently, you don't yet have heads of functions — you have senior contributors with VP titles. The distinction matters when an investor is modeling whether the company can actually deploy the capital they're considering putting in.",
      "The third concern is role-fit uncertainty. Sometimes the bottleneck persists because the wrong people are in senior seats, and the founder is compensating for the gaps. That's a layered problem: a mis-hire issue on top of a structure issue. Investors who pick this up in diligence will price it into the deal — or walk. Execution risk is consistently one of the most common deal-killers in late-stage diligence. The team structure investors scrutinize is rarely about the org chart alone. It's about whether the people can execute without you.",
      "Before redesigning your org chart or launching a new hiring sprint, sit with these five questions. They're not comfortable. They're the right ones.",
      "One: if you were unavailable for two weeks, which decisions would stall? Not which decisions would be suboptimal — which ones would stop moving entirely? That list is your bottleneck map. Every item on it represents a decision that doesn't have a real owner below you.",
      "Two: can each of your direct reports articulate the strategic goal of their function in one sentence, without referencing you? Ask them. Don't coach them first. If the answer includes 'whatever you think is best' or cites something you recently said, the goal isn't genuinely theirs yet. Strategic ownership has to live below the CEO level for founder-led company scaling to actually work.",
      "Three: where in your org chart is ownership genuinely ambiguous? Not on paper — in practice. Which decisions regularly generate confusion about who should make them? Ambiguous ownership is how execution risk hides. It doesn't surface as a problem until something important needs to get done quickly.",
      "Four: which leadership roles are currently over-relying on founder involvement to function? Look at the last 30 days. Where did your intervention change an outcome? That's not automatically a problem — but the pattern of which functions it keeps showing up in tells you exactly where the leadership gaps are.",
      "Five: which hires have you made in the last 12 months that haven't reduced your decision load? This one stings. If you've added three leaders and you're still fielding the same volume of decisions, you haven't delegated — you've hired. The test of a strong leadership hire is that something important moves off your plate permanently.",
      "The fix is not a new org chart. Org charts are pictures of reporting lines, not maps of who decides what. Start by mapping the actual decision tree — for every significant decision made in the last month, trace who initiated it, who escalated it, and who resolved it. The map will almost certainly show founder dependency in places you didn't think to look.",
      "Then distinguish genuine delegation from performative delegation. Performative delegation looks like ownership on paper: someone has the title, the responsibility is in their job description. Genuine delegation means they make the call, bear the consequence, and don't escalate unless something has broken at the structural level. The gap between those two is where the restructuring work happens.",
      "Next, assess role-fit honestly. Do the people in your leadership seats have the competency signals to own their function as the company doubles — not as it is today, but as it needs to be in 18 months? Some may need a clearer mandate or broader scope. Some may need to be replaced. The role-fit indicators that matter here are not credentials or past logos — they're the behavioral patterns that predict whether someone can operate independently at scale. Making this assessment before the raise is vastly cheaper than making it after.",
      "Finally, define what founder-independent execution looks like for each function. Not in general terms — specifically. For sales, it means the VP can run pipeline, close enterprise deals, and build the team without you in any of it. For product, it means the roadmap is set and shipped without your involvement in feature-level decisions. Write it down. Hold the organization accountable to it.",
      "Make the structural changes — role clarity, ownership re-assignment, new hires where necessary — before the raise, not after. Investors who ask how your team operates deserve an honest answer. The best answer is one backed by evidence of organizational intelligence, not just a confident story.",
      "You have roughly six months to show investors an organization that can execute without you in the room for every decision. That's not a warning — it's enough time to actually fix this, if you start now. The work is understanding where the real dependencies are. Not the org chart version. The real version.",
      "Most founders spend a full strategy session doing this kind of analysis — mapping decision trees, sketching coverage gaps, drafting what delegation actually means function by function. It's valuable work. It's also slow. OrgLens does it in five minutes. Upload your team's competency profiles and it surfaces the organizational intelligence — leadership coverage gaps, role-fit indicators, execution risk, restructuring scenarios — that you'd otherwise reconstruct on a whiteboard. See what it costs at /pricing.",
    ].join("\n\n"),
  },
  {
    slug: "why-orglens-starts-with-demo",
    title: "Why OrgLens Starts With a Demo Before Asking You to Pay",
    category: "Responsible AI in People Decisions",
    author: "OrgLens AI",
    publishDate: "2026-03-31",
    tags: ["OrgLens", "Demo", "Product Design", "Founders"],
    status: "published",
    summary:
      "OrgLens lets founders view a demo report first so they can understand the type of organizational intelligence the product provides before ordering a custom analysis.",
    content: [
      "Most HR tech tools ask you to sign up, enter a credit card, and spend time onboarding before you understand what you are actually getting. You watch a demo video edited for the highlight reel, read a few testimonials, then hand over payment and hope the actual product matches the marketing. We do not think that is the right starting point for a tool that helps founders make important people decisions.",
      "OrgLens is different on purpose. The demo report is fully accessible with no payment required. Before we ask for anything, we want you to see what an organizational intelligence report actually looks like. Not a screenshot. Not a sizzle reel. The real structure, the real sections, the real way the analysis presents itself when you sit down to read it.",
      "Founders can explore the org map, role-fit rankings, scenario comparison, and risk signals before committing. The demo report shows the same components you would receive for your own team: a competency coverage heatmap so you can see where the team has strength and where it is thin, role-fit ranking that compares the people you have against the roles you actually need, scenario comparison that models structural changes before you make them, and organizational risk flags that surface dependencies and gaps you would otherwise carry in your head.",
      "We built it this way because the value of organizational intelligence isn't something we can explain in a bullet list — it needs to be seen. If reading through the demo gives you something useful — a way to think about your own team, a question you had not asked yet, a structural pattern you recognize — then paying for your own organization's analysis becomes an easy decision. You already know what you are getting.",
      "If the demo doesn't show you something useful about how to think about your team, you probably don't need the paid analysis. We would rather you know that upfront, before money changes hands. A founder who feels misled by their first interaction with a product is not a founder who recommends it. Transparency is the cheaper long-term position for both sides.",
      "We believe this is the right default for a category that touches people's livelihoods. Show the work first. Earn the purchase second. The demo is the front door on purpose.",
    ].join("\n\n"),
  },
];

// Legacy alias — existing imports may reference INSIGHT_POSTS.
export const INSIGHT_POSTS: BlogPost[] = blogPosts;

/** Get a single post by slug. Returns undefined if not found. */
export function getInsightBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Get a single post by slug. Alias of getInsightBySlug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getInsightBySlug(slug);
}

/** All published posts, newest first. */
export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}
