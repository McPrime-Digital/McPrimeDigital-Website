import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import FilmmakingHero from '@/components/filmmaking/FilmmakingHero';

// Dynamically import below-the-fold components
const FilmmakingWorkflow = dynamic(() => import('@/components/filmmaking/FilmmakingWorkflow'), { ssr: true });
const CinematicCapabilityVault = dynamic(() => import('@/components/filmmaking/CinematicCapabilityVault'), { ssr: true });
const FilmmakingPortfolio = dynamic(() => import('@/components/filmmaking/FilmmakingPortfolio'), { ssr: true });
const FilmmakingTarget = dynamic(() => import('@/components/filmmaking/FilmmakingTarget'), { ssr: true });
const SelectedEngagementsHorizontal = dynamic(() => import('@/components/SelectedEngagementsHorizontal'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

const title = 'AI-Native Film, TV, Commercial & Music Video Production';
const description = 'Broadcast-grade commercials, films and music videos produced through a governed AI-native pipeline. Built for scale, speed and full creative control.';

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/filmmaking' },
    openGraph: { title, description, url: '/filmmaking' },
    twitter: { title, description },
};

export default function FilmmakingPage() {
    return (
        <main className="min-h-screen bg-[#0B0D12] text-white overflow-x-hidden font-sans selection:bg-[#2D6BFF]/30">
            <FilmmakingHero />
            <FilmmakingWorkflow />
            <CinematicCapabilityVault />
            <FilmmakingPortfolio />
            <FilmmakingTarget />
            <SelectedEngagementsHorizontal />
            <Footer />
        </main>
    );
}
