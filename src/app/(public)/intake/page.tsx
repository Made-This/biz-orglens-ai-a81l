import { IntakeClient } from "./IntakeClient";

export const metadata = {
  title: "Submit Your Team Context — OrgLens AI",
  description:
    "Submit your team context so the OrgLens team can begin your analysis.",
};

export default function IntakePage() {
  return <IntakeClient />;
}
