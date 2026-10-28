import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
    title: "Insights",
    description: "Articles, case studies and strategy notes on AI filmmaking, generative advertising and enterprise automation from McPrime Digital.",
    alternates: { canonical: "/insights" },
    openGraph: {
        title: "Insights",
        description: "Articles, case studies and strategy notes on AI filmmaking, generative advertising and enterprise automation from McPrime Digital.",
        url: "/insights",
    },
    twitter: {
        title: "Insights",
        description: "Articles, case studies and strategy notes on AI filmmaking, generative advertising and enterprise automation from McPrime Digital.",
    },
};

export default function InsightsPage() {
    return <InsightsClient />;
}
