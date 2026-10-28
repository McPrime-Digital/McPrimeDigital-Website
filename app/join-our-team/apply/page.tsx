import type { Metadata } from "next";
import ApplyClient from "./ApplyClient";

export const metadata: Metadata = {
    title: "Apply to McPrime Digital",
    description: "Submit your application, portfolio and resume to join the McPrime Digital team.",
    alternates: { canonical: "/join-our-team/apply" },
    openGraph: {
        title: "Apply to McPrime Digital",
        description: "Submit your application, portfolio and resume to join the McPrime Digital team.",
        url: "/join-our-team/apply",
    },
    twitter: {
        title: "Apply to McPrime Digital",
        description: "Submit your application, portfolio and resume to join the McPrime Digital team.",
    },
};

export default function ApplyPage() {
    return <ApplyClient />;
}
