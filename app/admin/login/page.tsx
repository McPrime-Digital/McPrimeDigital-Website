import type { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "McPrime Digital administration.",
    alternates: { canonical: "/admin/login" },
    robots: { index: false, follow: false },
    openGraph: {
        title: "Admin Login",
        description: "McPrime Digital administration.",
        url: "/admin/login",
    },
    twitter: {
        title: "Admin Login",
        description: "McPrime Digital administration.",
    },
};

export default function AdminLoginPage() {
    return <AdminLoginClient />;
}
