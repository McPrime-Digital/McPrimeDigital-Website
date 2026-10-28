import type { Metadata } from "next";
import AutomationsClient from "./AutomationsClient";

export const metadata: Metadata = {
    title: "Enterprise AI Automation Systems",
    description: "Agentic workflow automation, deep system integrations and governed execution with complete audit trails, engineered for mid-market and enterprise operations.",
    alternates: { canonical: "/automations" },
    openGraph: {
        title: "Enterprise AI Automation Systems",
        description: "Agentic workflow automation, deep system integrations and governed execution with complete audit trails, engineered for mid-market and enterprise operations.",
        url: "/automations",
    },
    twitter: {
        title: "Enterprise AI Automation Systems",
        description: "Agentic workflow automation, deep system integrations and governed execution with complete audit trails, engineered for mid-market and enterprise operations.",
    },
};

export default function AutomationsPage() {
    return <AutomationsClient />;
}
