import type { Metadata } from "next";
import { GetAnalysisClient } from "./GetAnalysisClient";

export const metadata: Metadata = {
  title: "Get My Analysis — OrgLens AI",
  description:
    "Tell us about your team and we'll recommend the right OrgLens report for your stage — Founder Snapshot, Full OrgLens Report, or Founder Advisory Review.",
};

export default function GetAnalysisPage() {
  return <GetAnalysisClient />;
}
