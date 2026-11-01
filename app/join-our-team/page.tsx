import type { Metadata } from "next";
import JoinOurTeamClient from "./JoinOurTeamClient";

export const metadata: Metadata = {
    title: "Join Our Team",
    description: "Careers at McPrime Digital: roles in our Filmmaking Department and our Automations Department.",
    alternates: { canonical: "/join-our-team" },
    openGraph: {
        title: "Join Our Team",
        description: "Careers at McPrime Digital: roles in our Filmmaking Department and our Automations Department.",
        url: "/join-our-team",
    },
    twitter: {
        title: "Join Our Team",
        description: "Careers at McPrime Digital: roles in our Filmmaking Department and our Automations Department.",
    },
};

export default function JoinOurTeamPage() {
    return <JoinOurTeamClient />;
}
