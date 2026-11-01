import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About McPrime Digital",
    description: "How McPrime Digital works: two dedicated departments, one for AI-native and hybrid filmmaking and one for AI automation systems, held to one standard.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About McPrime Digital",
        description: "How McPrime Digital works: two dedicated departments, one for AI-native and hybrid filmmaking and one for AI automation systems, held to one standard.",
        url: "/about",
    },
    twitter: {
        title: "About McPrime Digital",
        description: "How McPrime Digital works: two dedicated departments, one for AI-native and hybrid filmmaking and one for AI automation systems, held to one standard.",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
