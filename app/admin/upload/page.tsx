"use client";

import React, { useState, useEffect } from "react";
import { VideoUploader } from "@/components/VideoUploader";
import { ArrowLeft, ShieldCheck, Zap, Info, LogOut, Loader2, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);
    const [videos, setVideos] = useState<any[]>([]);
    const [loadingVideos, setLoadingVideos] = useState(true);

    const fetchVideos = async () => {
        try {
            setLoadingVideos(true);
            const res = await fetch("/api/videos");
            if (res.ok) {
                const data = await res.json();
                setVideos(data.videos);
            }
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setLoadingVideos(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.push("/admin/login");
                router.refresh(); // Refresh to clear any auth state
            }
        } catch (err) {
            console.error("Logout failed:", err);
            setLoggingOut(false);
        }
    };

    const handleUploadComplete = (url: string) => {
        console.log("Uploaded successfully to:", url);
        fetchVideos();
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white py-20 px-4 selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-12">
                    <div className="space-y-2">
                        <Link
                            href="/"
                            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 inline-flex"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to site
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                            Upload <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Samples</span>
                        </h1>
                        <p className="text-white/40 text-lg font-medium">
                            Securely add high-quality video content to your portfolio.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-2xl">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-bold text-blue-400">Secure Admin Session</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="group flex items-center gap-2 bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 px-4 py-2 rounded-2xl transition-all disabled:opacity-50"
                        >
                            {loggingOut ? (
                                <Loader2 className="w-5 h-5 animate-spin text-white/50" />
                            ) : (
                                <>
                                    <LogOut className="w-5 h-5 text-white/30 group-hover:text-red-400 transition-colors" />
                                    <span className="text-sm font-bold text-white/40 group-hover:text-red-400 transition-colors">Logout</span>
                                </>
                            )}
                        </button>
                    </div>
                </header>

                {/* Action Grid */}
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Instructions */}
                    <section className="md:col-span-1 space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                            <h4 className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                                <Info className="w-5 h-5 text-blue-400" />
                                Guidelines
                            </h4>
                            <ul className="space-y-6">
                                {[
                                    { icon: Zap, text: "High bitrate recommended for 4K video." },
                                    { icon: ShieldCheck, text: "All uploads are private until published." },
                                    { icon: Info, text: "Max file size: 500MB (limitations apply)." }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3 items-start group">
                                        <item.icon className="w-5 h-5 text-white/20 group-hover:text-blue-400 transition-colors shrink-0" />
                                        <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                            {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-1 px-6">
                            <p className="text-xs text-white/20 italic">
                                Note: Ensure you have populated your .env.local with AWS credentials before uploading.
                            </p>
                        </div>
                    </section>

                    {/* Uploader Section */}
                    <section className="md:col-span-2 space-y-8">
                        <VideoUploader onUploadComplete={handleUploadComplete} />
                    </section>
                </div>

                {/* Uploaded Videos Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <PlayCircle className="w-6 h-6 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Uploaded Videos</h2>
                    </div>

                    {loadingVideos ? (
                        <div className="flex items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="text-center p-12 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-white/50 text-lg">No videos uploaded yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <motion.div
                                    key={video.key}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="aspect-video bg-black/50 relative">
                                        <video
                                            src={video.url}
                                            className="w-full h-full object-cover"
                                            controls
                                            preload="metadata"
                                        />
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <p className="text-sm font-medium text-white truncate" title={video.key.replace("samples/", "")}>
                                            {video.key.replace("samples/", "")}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-white/40">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(video.lastModified).toLocaleDateString()}
                                            </span>
                                            <span>
                                                {(video.size / (1024 * 1024)).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer info/stats */}
                <footer className="pt-20 text-center opacity-20 hover:opacity-100 transition-opacity duration-500">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-white">
                        Powered by McPrime Digital & AWS Infrastructure
                    </p>
                </footer>
            </div>
        </main>
    );
}
