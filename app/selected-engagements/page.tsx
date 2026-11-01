import type { Metadata } from "next";
import SelectedEngagementsClient from "./SelectedEngagementsClient";

export const metadata: Metadata = {
    title: "Selected Engagements",
    description: "Representative engagements from McPrime Digital's two departments, Filmmaking and Automations, across pharma, hospitality, finance and consumer brands.",
    alternates: { canonical: "/selected-engagements" },
    openGraph: {
        title: "Selected Engagements",
        description: "Representative engagements from McPrime Digital's two departments, Filmmaking and Automations, across pharma, hospitality, finance and consumer brands.",
        url: "/selected-engagements",
    },
    twitter: {
        title: "Selected Engagements",
        description: "Representative engagements from McPrime Digital's two departments, Filmmaking and Automations, across pharma, hospitality, finance and consumer brands.",
    },
};

export default function SelectedEngagementsPage() {
    return <SelectedEngagementsClient />;
}
