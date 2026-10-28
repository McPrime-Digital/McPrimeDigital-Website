import type { Metadata } from "next";
import AdminUploadClient from "./AdminUploadClient";

export const metadata: Metadata = {
    title: "Media Library",
    description: "McPrime Digital media administration.",
    alternates: { canonical: "/admin/upload" },
    robots: { index: false, follow: false },
    openGraph: {
        title: "Media Library",
        description: "McPrime Digital media administration.",
        url: "/admin/upload",
    },
    twitter: {
        title: "Media Library",
        description: "McPrime Digital media administration.",
    },
};

export default function AdminUploadPage() {
    return <AdminUploadClient />;
}
