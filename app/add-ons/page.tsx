import type { Metadata } from "next";
import AddOnsClient from "./AddOnsClient";

export const metadata: Metadata = {
    title: "Growth Add-Ons for Existing Partners",
    description: "AI brand ambassadors, UGC-style creative and live ad operations: strategic extensions reserved for McPrime Digital production partners.",
    alternates: { canonical: "/add-ons" },
    openGraph: {
        title: "Growth Add-Ons for Existing Partners",
        description: "AI brand ambassadors, UGC-style creative and live ad operations: strategic extensions reserved for McPrime Digital production partners.",
        url: "/add-ons",
    },
    twitter: {
        title: "Growth Add-Ons for Existing Partners",
        description: "AI brand ambassadors, UGC-style creative and live ad operations: strategic extensions reserved for McPrime Digital production partners.",
    },
};

export default function AddOnsPage() {
    return <AddOnsClient />;
}
