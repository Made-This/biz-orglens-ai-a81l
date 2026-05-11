import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact OrgLens AI",
  description:
    "Reach the OrgLens AI team. We typically respond within 1–2 business days. Contact us for general questions, data deletion requests, refunds, or partnerships.",
};

export default function ContactPage() {
  return <ContactClient />;
}
