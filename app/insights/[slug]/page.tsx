import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { getAllArticles, getArticleBySlug } from '@/lib/data';
import Footer from '@/components/Footer';
import ArticleShare from '@/components/ArticleShare';

interface Props {
    params: Promise<{ slug: string }>;
}

// 1. GENERATE METADATA FOR LINKEDIN/OG
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Article Not Found | McPrime Intelligence',
        };
    }

    // Absolute URL for OG Image
    // In production, this should be the actual domain. 
    // For now, we'll assume a placeholder or env variable usage in real app.
    // We'll use a relative path but prepended with a domain if available or just relative for now
    // NOTE: LinkedIn requires absolute URLs for og:image.
    // We'll assume the site is deployed at https://mcprime-digital.com for the example, 
    // or use a placeholder if env is missing.
    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://mcprimedigital.com';
    const imageUrl = `${domain}${article.image}`;
    const articleUrl = `${domain}/insights/${slug}`;

    return {
        title: `${article.title} | McPrime Intelligence`,
        description: article.summary,
        openGraph: {
            title: article.title,
            description: article.summary,
            url: articleUrl,
            siteName: 'McPrime Digital',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.summary,
            images: [imageUrl],
        },
    };
}

// 2. STATIC PARAMS FOR BUILD
export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        slug: article.id,
    }));
}

// 3. PAGE COMPONENT
export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Domain for sharing
    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://mcprimedigital.com';
    const articleUrl = `${domain}/insights/${article.id}`;
    const imageUrl = `${domain}${article.image}`;

    return (
        <main className="min-h-screen bg-[#050505] text-white">

            {/* HERO SECTION */}
            <div className="relative pt-32 pb-20 px-4 md:px-8 border-b border-white/10 overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto max-w-4xl relative z-10">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Insights
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-gray-400 mb-6 font-mono">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            {article.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-indigo-500" />
                            {article.category}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-indigo-500" />
                            {article.author}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        {article.title}
                    </h1>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">

                    {/* Featured Image */}
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-gray-900 mb-16 shadow-2xl">
                        <div className="absolute inset-0 bg-indigo-900/10 z-10" />
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                            <div className="w-16 h-1 bg-indigo-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar / Share */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32">
                                <ArticleShare
                                    title={article.title}
                                    summary={article.summary}
                                    url={articleUrl}
                                    imageUrl={imageUrl}
                                />
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="lg:col-span-9 article-body">
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                                {article.content}
                            </div>
                        </div>

                        {/* Mobile Share (Bottom) */}
                        <div className="lg:hidden col-span-1 border-t border-white/10 pt-8 mt-8 flex flex-col items-center">
                            <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 text-center">Share this article</h4>
                            <ArticleShare
                                title={article.title}
                                summary={article.summary}
                                url={articleUrl}
                                imageUrl={imageUrl}
                                row={true}
                            />
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
