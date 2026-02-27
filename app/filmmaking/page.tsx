import FilmmakingHero from '@/components/filmmaking/FilmmakingHero';
import FilmmakingWorkflow from '@/components/filmmaking/FilmmakingWorkflow';
// import FilmmakingCapabilities from '@/components/filmmaking/FilmmakingCapabilities'; 
import CinematicCapabilityVault from '@/components/filmmaking/CinematicCapabilityVault';
import FilmmakingPortfolio from '@/components/filmmaking/FilmmakingPortfolio';
import FilmmakingTarget from '@/components/filmmaking/FilmmakingTarget';
import SelectedEngagementsHorizontal from '@/components/SelectedEngagementsHorizontal';
import Footer from '@/components/Footer';

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
