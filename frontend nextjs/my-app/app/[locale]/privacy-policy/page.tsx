import type {Metadata} from "next";
import PrivacyPolicyPage from "@/app/_pages/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — TrealWay",
  description: "Privacy Policy for TrealWay website and contact forms."
};

export default function LocalizedPrivacyPolicyPage() {
  return <PrivacyPolicyPage />;
}
