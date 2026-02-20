'use client';

import { useState, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Loader2, Upload, Check } from 'lucide-react';

import { submitApplication } from '@/app/actions/submitApplication';

export default function ApplicationPage() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [resumeName, setResumeName] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormState('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            const result = await submitApplication(formData);

            if (result.success) {
                setFormState('success');
                if (formRef.current) formRef.current.reset();
                setResumeName(null);
            } else {
                setFormState('error');
                console.error(result.message);
                alert(result.message); // Simple feedback for error
            }
        } catch (error) {
            setFormState('error');
            console.error(error);
            alert("An unexpected error occurred.");
        }
    }

    return (
        <main className="min-h-screen bg-[#121212] text-white font-sans selection:bg-indigo-500/30">
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-2xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/join-our-team" className="inline-flex items-center gap-2 mb-8 text-sm text-gray-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Careers
                        </Link>

                        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-white">
                            Submit Application
                        </h1>
                        <p className="text-gray-400 mb-12">
                            Please provide your details and portfolio. We review all submissions thoroughly.
                        </p>

                        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

                            {/* Success Overlay */}
                            <AnimatePresence>
                                {formState === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 z-20 bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-8"
                                    >
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Application Received</h3>
                                        <p className="text-gray-400 mb-8">
                                            Thank you for applying. We have sent a confirmation email to you. Our team will review your portfolio and be in touch soon.
                                        </p>
                                        <button
                                            onClick={() => setFormState('idle')}
                                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Submit Another
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">

                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* Role Selection */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Role Applying For</label>
                                    <select
                                        name="role"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select a role...</option>
                                        <option value="cinematographer">Traditional Cinematographer</option>
                                        <option value="automations_auditor">Automations Auditor</option>
                                        <option value="ai_specialist">AI Production Specialist</option>
                                        <option value="post_engineer">Post-Production Engineer</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Portfolio URL */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Portfolio URL</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        required
                                        placeholder="https://your-portfolio.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* Resume Upload (Visual Only) */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resume (PDF)</label>
                                    <div className={`w-full bg-black/40 border border-dashed ${resumeName ? 'border-green-500/50 bg-green-500/10' : 'border-white/20'} rounded-lg px-4 py-6 text-center cursor-pointer hover:bg-white/5 transition-colors group relative`}>
                                        <input
                                            type="file"
                                            name="resume"
                                            accept=".pdf"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setResumeName(file.name);
                                            }}
                                        />
                                        {resumeName ? (
                                            <>
                                                <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                                <span className="text-sm text-green-400 font-medium break-all">{resumeName}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" />
                                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Click to upload or drag & drop</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Short Message */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Short Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Tell us broadly about your approach to systems..."
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {formState === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-4">
                                    By submitting, you agree to our privacy policy. Applications are reviewed confidentially.
                                </p>

                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
