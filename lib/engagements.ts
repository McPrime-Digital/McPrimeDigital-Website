import { FlaskConical, UtensilsCrossed, MonitorPlay, Building2, Gem, Handshake, Map, BriefcaseBusiness, type LucideIcon } from 'lucide-react';
import type { Department } from './departments';

export interface Engagement {
    department: Department;
    client: string;
    title: string;
    description: string;
    points: string[];
    icon: LucideIcon;
    glow: string;
    iconColor: string;
}

/** Representative engagements, each delivered by one department. */
export const engagements: Engagement[] = [
    {
        client: "Pharmaceutical Organization",
        department: "filmmaking",
        title: "AI Commercial Film Production",
        description: "Developed and delivered an AI-native commercial film explaining a pharmaceutical product, its intended use, and the problem it addresses. Scriptwriting was structured to align with approval requirements, and full production was completed in under six days.",
        points: ["Structured script development", "Compliance-aware messaging", "Accelerated production timeline", "Deployment-ready commercial asset"],
        icon: FlaskConical,
        glow: "from-blue-500/20",
        iconColor: "text-cyan-400"
    },
    {
        client: "Food & Beverage Brand",
        department: "filmmaking",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting brand positioning and product appeal within a competitive consumer market.",
        points: ["Concept development", "AI-native production", "Multi-format commercial delivery"],
        icon: UtensilsCrossed,
        glow: "from-emerald-500/20",
        iconColor: "text-emerald-400"
    },
    {
        client: "Sister Company · AI Software",
        department: "filmmaking",
        title: "Capability-Focused Commercial Film",
        description: "Produced a short-form commercial explaining product capabilities, target users, practical application, and functional benefits.",
        points: ["Structured product narrative", "Clear use-case communication", "Benefit-driven positioning", "Platform-ready output"],
        icon: MonitorPlay,
        glow: "from-purple-500/20",
        iconColor: "text-indigo-400"
    },
    {
        client: "Mobile Banking Institution",
        department: "automations",
        title: "Payroll Automation Architecture",
        description: "Designed and implemented an automation workflow supporting payroll operations within a financial environment.",
        points: ["Workflow mapping", "Process automation design", "Operational efficiency improvement", "Structured deployment"],
        icon: Building2,
        glow: "from-amber-500/20",
        iconColor: "text-amber-400"
    },
    {
        client: "Luxury Brand",
        department: "filmmaking",
        title: "Multi-Product Commercial Production",
        description: "Produced a high-end commercial showcasing five products within a unified narrative framework.",
        points: ["Coordinated visual architecture", "Controlled brand tone", "Premium visual delivery"],
        icon: Gem,
        glow: "from-rose-500/20",
        iconColor: "text-rose-400"
    },
    {
        client: "Food & Beverage Brand",
        department: "filmmaking",
        title: "AI Brand Ambassador Program",
        description: "Developed a recurring AI-powered brand ambassador system producing weekly content for snack product promotion.",
        points: ["Structured weekly content framework", "Consistent brand voice", "Scalable short-form output"],
        icon: Handshake,
        glow: "from-fuchsia-500/20",
        iconColor: "text-fuchsia-400"
    },
    {
        client: "Hotel & Resort",
        department: "filmmaking",
        title: "Commercial Film Production",
        description: "Produced a commercial film highlighting property experience, amenities, and brand positioning within the hospitality market.",
        points: ["Visual storytelling", "Structured narrative flow", "Destination-focused messaging"],
        icon: Map,
        glow: "from-cyan-500/20",
        iconColor: "text-blue-400"
    },
    {
        client: "Hospitality Organization",
        department: "automations",
        title: "Operational & Lead Generation Workflow",
        description: "Designed and implemented operational and lead generation workflows to improve internal coordination and marketing pipeline structure.",
        points: ["Lead capture optimization", "Workflow automation", "Structured operational alignment"],
        icon: BriefcaseBusiness,
        glow: "from-teal-500/20",
        iconColor: "text-teal-400"
    }
];
