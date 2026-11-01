import type { Metadata } from "next";
import AddOnsClient from "./AddOnsClient";

export const metadata: Metadata = {
    title: "Growth Add-Ons for Existing Partners",
    description: "AI brand ambassadors, UGC-style creative and paid advertising: extensions of our Filmmaking Department, reserved for its active clients.",
    alternates: { canonical: "/add-ons" },
    openGraph: {
        title: "Growth Add-Ons for Existing Partners",
        description: "AI brand ambassadors, UGC-style creative and paid advertising: extensions of our Filmmaking Department, reserved for its active clients.",
        url: "/add-ons",
    },
    twitter: {
        title: "Growth Add-Ons for Existing Partners",
        description: "AI brand ambassadors, UGC-style creative and paid advertising: extensions of our Filmmaking Department, reserved for its active clients.",
    },
};

export default function AddOnsPage() {
    return <AddOnsClient />;
}
