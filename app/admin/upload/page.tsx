"use client";

import React, { useState, useEffect, useMemo } from "react";
import { VideoUploader } from "@/components/VideoUploader";
import { ArrowLeft, ShieldCheck, Zap, Info, LogOut, Loader2, PlayCircle, Clock, Trash2, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface VideoItem {
    key: string;
    url: string;
    lastModified: string;
    size: number;
    category: string;
}

export default function UploadPage() {
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingVideos, setLoadingVideos] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [deletingKey, setDeletingKey] = useState<string | null>(null);
    const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);

    const fetchVideos = async () => {
        try {
            setLoadingVideos(true);
            const res = await fetch("/api/videos");
            if (res.ok) {
                const data = await res.json();
                setVideos(data.videos);
                setCategories(data.categories || []);
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

    const filteredVideos = useMemo(() => {
        if (activeCategory === "all") return videos;
        return videos.filter(v => v.category === activeCategory);
    }, [videos, activeCategory]);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.push("/admin/login");
                router.refresh();
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

    const handleDelete = async (key: string) => {
        setDeletingKey(key);
        setConfirmDeleteKey(null);
        try {
            const res = await fetch(`/api/videos/${encodeURIComponent(key)}`, {
                method: "DELETE",
            });
            if (res.ok) {
                // Remove from local state immediately for snappy UI
                setVideos(prev => prev.filter(v => v.key !== key));
            } else {
                console.error("Delete failed:", await res.text());
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setDeletingKey(null);
        }
    };

    const formatCategoryLabel = (cat: string) => {
        return cat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
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
                    <div className="flex items-center gap-3 mb-2">
                        <PlayCircle className="w-6 h-6 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Uploaded Videos</h2>
                    </div>

                    {/* Category Tabs */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory("all")}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                    activeCategory === "all"
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 border border-white/10"
                                }`}
                            >
                                All ({videos.length})
                            </button>
                            {categories.map(cat => {
                                const count = videos.filter(v => v.category === cat).length;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                            activeCategory === cat
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 border border-white/10"
                                        }`}
                                    >
                                        {formatCategoryLabel(cat)} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {loadingVideos ? (
                        <div className="flex items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : filteredVideos.length === 0 ? (
                        <div className="text-center p-12 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-white/50 text-lg">
                                {activeCategory === "all" ? "No videos uploaded yet." : `No videos in "${formatCategoryLabel(activeCategory)}".`}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map((video) => (
                                <motion.div
                                    key={video.key}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group relative ${
                                        deletingKey === video.key ? "opacity-50 pointer-events-none" : ""
                                    }`}
                                >
                                    {/* Delete Button — visible on hover */}
                                    <button
                                        onClick={() => setConfirmDeleteKey(video.key)}
                                        className="absolute top-3 right-3 z-10 p-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/30 hover:border-red-500/40 transition-all"
                                        title="Delete video"
                                    >
                                        {deletingKey === video.key ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                                        ) : (
                                            <Trash2 className="w-4 h-4 text-white/70 hover:text-red-400" />
                                        )}
                                    </button>

                                    <div className="bg-black/50 relative flex items-center justify-center overflow-hidden">
                                        <video
                                            src={video.url}
                                            className="w-full h-auto max-h-[75vh] object-contain"
                                            controls
                                            preload="metadata"
                                        />
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <p className="text-sm font-medium text-white truncate" title={video.key.replace("videos/", "")}>
                                            {video.key.split("/").pop()}
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
                                        {/* Category Badge */}
                                        <div className="pt-1">
                                            <span className="inline-block px-2.5 py-1 bg-purple-500/15 border border-purple-500/20 rounded-lg text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                                                {formatCategoryLabel(video.category)}
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

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {confirmDeleteKey && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                        onClick={() => setConfirmDeleteKey(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Delete Video?</h3>
                                    <p className="text-sm text-white/40">This action cannot be undone.</p>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <p className="text-sm text-white/60 break-all font-mono">
                                    {confirmDeleteKey.split("/").pop()}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDeleteKey(null)}
                                    className="flex-1 py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(confirmDeleteKey)}
                                    className="flex-1 py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
