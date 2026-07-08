import type { Metadata } from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy — TrealWay",
  description: "Privacy Policy for TrealWay website and contact forms.",
};

export default function PrivacyPolicyPage() {
  redirect("/en/privacy-policy");
}
