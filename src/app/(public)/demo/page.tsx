import type { Metadata } from "next";
import DemoPortal from "./DemoPortal";

export const metadata: Metadata = {
  title: "OrgLens AI Demo Report | SaaS Org Chart and Team Risk Example",
  description:
    "Explore a public OrgLens AI demo report for AtlasFlow Technologies, a fictional B2B SaaS company. View org chart risk markers, founder bottleneck analysis, sales execution risk, leadership coverage, role-fit signals, and recommended next actions.",
};

export default function DemoPage() {
  return <DemoPortal />;
}
