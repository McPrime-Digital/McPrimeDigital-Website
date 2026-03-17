"use client";

import React, { useState, useRef } from "react";
import { Upload, Video, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoUploaderProps {
    onUploadComplete?: (url: string) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadComplete }) => {
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState<string>("home-hero");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = [
        { id: "home-hero", label: "Home Base Hero" },
        { id: "filmmaking", label: "Filmmaking Approach" },
        { id: "drone-fpv", label: "Drone / FPV" },
        { id: "automation", label: "Workflow Automations" },
        { id: "add-ons", label: "Add-Ons & Extras" },
        { id: "uncategorized", label: "Misc / Other" }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith("video/")) {
                setError("Please select a valid video file.");
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const uploadToS3 = async () => {
        if (!file) return;

        setUploading(true);
        setProgress(0);
        setError(null);

        try {
            // 1. Get pre-signed URL from our API
            const response = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    category: category,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to get upload URL");
            }

            const { uploadUrl, fileKey, publicUrl } = await response.json();

            // 2. Upload directly to S3
            const uploadPromise = new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("PUT", uploadUrl);
                xhr.setRequestHeader("Content-Type", file.type);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        setProgress(percentComplete);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(fileKey);
                    } else {
                        reject(new Error("Upload failed"));
                    }
                };

                xhr.onerror = () => reject(new Error("Network error"));
                xhr.send(file);
            });

            await uploadPromise;

            // 3. Success!
            setUploadedUrl(publicUrl);
            setUploading(false);
            setProgress(100);

            if (onUploadComplete) {
                onUploadComplete(publicUrl);
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred during upload. Please try again.");
            setUploading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setUploadedUrl(null);
        setProgress(0);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-400" />
                Upload Video Sample
            </h3>

            {!file && !uploadedUrl ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 group"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="video/*"
                        className="hidden"
                    />
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors"
                    >
                        <Upload className="w-8 h-8 text-white/50 group-hover:text-blue-400" />
                    </motion.div>
                    <p className="text-white/70 font-medium">Click to select or drag and drop</p>
                    <p className="text-white/40 text-sm mt-2">MP4, MOV, WebM (Max 500MB suggested)</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Category Selector */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 relative z-10">
                        <label className="text-white/70 text-sm font-bold block">
                            Website Placement (Category)
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={uploading}
                            className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none disabled:opacity-50"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="bg-[#050505] text-white">
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-white/40 text-xs">This ensures the video automatically displays in the correct section on the live site.</p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Video className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{file?.name || "Video File"}</p>
                            <p className="text-white/40 text-sm">{(file?.size ? (file.size / (1024 * 1024)).toFixed(2) : 0)} MB</p>
                        </div>
                        {!uploading && !uploadedUrl && (
                            <button
                                onClick={clearFile}
                                className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-red-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <AnimatePresence>
                        {uploading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-2"
                            >
                                <div className="flex justify-between text-sm text-white/60">
                                    <span>Uploading to S3...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {uploadedUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3"
                            >
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <div className="flex-1">
                                    <p className="text-green-400 font-bold">Upload Successful!</p>
                                    <p className="text-green-400/70 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                        Ready to use in your gallery.
                                    </p>
                                </div>
                                <button
                                    onClick={clearFile}
                                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                                >
                                    New Upload
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3"
                            >
                                <AlertCircle className="w-6 h-6 text-red-400" />
                                <p className="text-red-400 text-sm font-medium">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!uploading && !uploadedUrl && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={uploadToS3}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                        >
                            Start Upload
                        </motion.button>
                    )}

                    {uploading && (
                        <button
                            disabled
                            className="w-full bg-white/10 text-white/30 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Uploading...
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
