import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllArticles } from "@/lib/data";

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/filmmaking", priority: 0.9, changeFrequency: "monthly" },
    { path: "/automations", priority: 0.9, changeFrequency: "monthly" },
    { path: "/add-ons", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/selected-engagements", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    { path: "/join-our-team", priority: 0.5, changeFrequency: "monthly" },
    { path: "/join-our-team/apply", priority: 0.3, changeFrequency: "yearly" },
    { path: "/security-governance", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const pages = staticRoutes.map(r => ({
        url: `${SITE_URL}${r.path}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
    }));
    const articles = getAllArticles().map(a => ({
        url: `${SITE_URL}/insights/${a.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));
    return [...pages, ...articles];
}
