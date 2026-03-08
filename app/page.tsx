import dynamic from 'next/dynamic';
import HeroSketch from '@/components/HeroSketch';

// test

// Dynamically import below-the-fold components to reduce initial JS payload
const ExploreSection = dynamic(() => import('@/components/ExploreSection'), { ssr: true });
const AmbassadorsSection = dynamic(() => import('@/components/AmbassadorsSection'), { ssr: true });
const StorySection = dynamic(() => import('@/components/StorySection'), { ssr: true });
const SelectedEngagementsHorizontal = dynamic(() => import('@/components/SelectedEngagementsHorizontal'), { ssr: true });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: true });
const BlogSection = dynamic(() => import('@/components/BlogSection'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Background Mesh/Glow Effects - Fixed Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-900 to-transparent opacity-60" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-950/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-slate-900/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        </div>
      </div>

      {/* Main Scrollable Content Layer */}
      <div className="relative z-10">
        <HeroSketch />

        {/* Main Content Frame */}
        <div className="mt-12 mx-2 md:mx-4 lg:mx-8 mb-8 relative">
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 rounded-[40px] bg-slate-950 pointer-events-none z-0 overflow-hidden">
            {/* Technical Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />
            {/* Top Gradient - Dark Premium Fade */}
            <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />
            {/* Subtle Deep Glow */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(circle_800px_at_50%_-200px,#1e1b4b,transform-gpu)] opacity-20 blur-[120px]" />
            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-[radial-gradient(circle_800px_at_50%_100%,#1e1b4b,transform-gpu)] opacity-40 blur-[100px]" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 py-16 px-4 md:px-12 flex flex-col gap-16 md:gap-24 overflow-hidden rounded-[20px] md:rounded-[40px]">

            {/* 1. Explore Section (Services) */}
            <div id="explore"><ExploreSection /></div>

            {/* 2. Ambassadors Section */}
            <AmbassadorsSection />

            {/* 3. Story & Why Choose Us */}
            <div id="story"><StorySection /></div>

            {/* 4. Selected Engagements */}
            <div id="engagements"><SelectedEngagementsHorizontal /></div>

            {/* 5. CTA & Blog */}
            <div id="contact"><CTASection /></div>
            <div id="blog"><BlogSection /></div>

            <Footer />
          </div>
        </div>
      </div>

    </main >
  );
}
