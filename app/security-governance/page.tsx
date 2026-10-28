import type { Metadata } from "next";
import SecurityGovernanceClient from "./SecurityGovernanceClient";

export const metadata: Metadata = {
    title: "Security & Governance",
    description: "The security, data-handling and governance principles behind McPrime Digital AI automation systems.",
    alternates: { canonical: "/security-governance" },
    openGraph: {
        title: "Security & Governance",
        description: "The security, data-handling and governance principles behind McPrime Digital AI automation systems.",
        url: "/security-governance",
    },
    twitter: {
        title: "Security & Governance",
        description: "The security, data-handling and governance principles behind McPrime Digital AI automation systems.",
    },
};

export default function SecurityGovernancePage() {
    return <SecurityGovernanceClient />;
}
