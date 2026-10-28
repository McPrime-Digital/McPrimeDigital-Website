import type { Metadata } from "next";
import JoinOurTeamClient from "./JoinOurTeamClient";

export const metadata: Metadata = {
    title: "Join Our Team",
    description: "Careers at McPrime Digital: work at the intersection of cinematic production and AI automation systems.",
    alternates: { canonical: "/join-our-team" },
    openGraph: {
        title: "Join Our Team",
        description: "Careers at McPrime Digital: work at the intersection of cinematic production and AI automation systems.",
        url: "/join-our-team",
    },
    twitter: {
        title: "Join Our Team",
        description: "Careers at McPrime Digital: work at the intersection of cinematic production and AI automation systems.",
    },
};

export default function JoinOurTeamPage() {
    return <JoinOurTeamClient />;
}
