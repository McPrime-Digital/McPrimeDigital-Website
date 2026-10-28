import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How McPrime Digital collects, uses and protects personal data across its website and services.",
    alternates: { canonical: "/privacy-policy" },
    openGraph: {
        title: "Privacy Policy",
        description: "How McPrime Digital collects, uses and protects personal data across its website and services.",
        url: "/privacy-policy",
    },
    twitter: {
        title: "Privacy Policy",
        description: "How McPrime Digital collects, uses and protects personal data across its website and services.",
    },
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyClient />;
}
