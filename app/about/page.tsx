import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About McPrime Digital",
    description: "The people and philosophy behind McPrime Digital: two decades of set discipline re-engineered as AI-native film production and automation infrastructure.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About McPrime Digital",
        description: "The people and philosophy behind McPrime Digital: two decades of set discipline re-engineered as AI-native film production and automation infrastructure.",
        url: "/about",
    },
    twitter: {
        title: "About McPrime Digital",
        description: "The people and philosophy behind McPrime Digital: two decades of set discipline re-engineered as AI-native film production and automation infrastructure.",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
