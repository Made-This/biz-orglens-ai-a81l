import { AdvisoryRequestClient } from "./AdvisoryRequestClient";

export const metadata = {
  title: "Founder Advisory Review — OrgLens AI",
  description:
    "Request a Founder Advisory Review — full OrgLens report plus a live founder review session and a structured action plan.",
};

export default function AdvisoryPage() {
  return <AdvisoryRequestClient />;
}
