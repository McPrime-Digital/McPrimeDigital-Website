'use client';

import React, { useState } from 'react';
import { Share2, Linkedin, Copy, Check } from 'lucide-react';

interface ArticleShareProps {
    title: string;
    summary: string;
    url: string; // Absolute URL to the article
    imageUrl: string; // Absolute URL to the featured image
    contentRef?: React.RefObject<HTMLDivElement>; // Ref to the article content for copying
}

export default function ArticleShare({ title, summary, url, imageUrl, contentRef }: ArticleShareProps) {
    const [copied, setCopied] = useState(false);

    // 1. NATIVE WEB SHARE
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: summary,
                    url: url
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to LinkedIn if native share not supported
            handleLinkedInShare();
        }
    };

    // 2. LINKEDIN SHARE (Direct to Post Box)
    const handleLinkedInShare = () => {
        // Try to get full article body for pre-filling
        let articleBody = "";

        if (contentRef && contentRef.current) {
            articleBody = contentRef.current.innerText;
        } else {
            // Fallback to find by class if ref not passed
            const proseElement = document.querySelector('.article-body');
            if (proseElement) articleBody = (proseElement as HTMLElement).innerText;
        }

        // Construct a pre-filled post body with specific attribution
        // Note: URL length limits in browsers (approx 2000 chars) might truncate very long articles.
        // We must truncate the body to ensure the URL doesn't break.
        const attribution = `\n\nThis article is part of the McPrime Intelligence series. "Read full insight via McPrime Digital: ${url}"`;

        // Reduced to 600 chars and sanitized to prevent 'URI Malformed' errors on LinkedIn side
        // The issue is likely encoding expansion (e.g. emojis/special chars taking 12+ chars)
        const maxBodyLength = 600;

        // Sanitize: Replace all whitespace (newlines, tabs) with single space to save encoding space
        let cleanBody = articleBody.replace(/\s+/g, ' ').trim();

        let truncatedBody = cleanBody;
        if (cleanBody.length > maxBodyLength) {
            truncatedBody = cleanBody.substring(0, maxBodyLength);
            // Ensure we don't cut a surrogate pair in half
            if (/[\uD800-\uDBFF]$/.test(truncatedBody)) {
                truncatedBody = truncatedBody.slice(0, -1);
            }
            truncatedBody += "...";
        }

        const postText = `${title}\n\n${truncatedBody}${attribution}`;

        // Use the feed share URL with text parameter to pre-fill the post box
        const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postText)}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=600');
    };

    // 3. COPY FULL ARTICLE
    const handleCopyArticle = async () => {
        try {
            // Get text content from the ref if native selection isn't available
            // But usually we want just the text body.
            // Let's assume contentRef points to the prose container.

            let articleBody = "";
            if (contentRef && contentRef.current) {
                articleBody = contentRef.current.innerText;
            } else {
                // Fallback if ref not provided, try to find by common class (fragile but functional as backup)
                const proseElement = document.querySelector('.article-body');
                if (proseElement) articleBody = (proseElement as HTMLElement).innerText;
            }

            const formattedText = `${title}\n\nImage: ${imageUrl}\n\n${articleBody}\n\nRead more: ${url}`;

            await navigator.clipboard.writeText(formattedText);

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            alert("Full article copied to clipboard");

        } catch (err) {
            console.error('Failed to copy article:', err);
            alert("Failed to copy to clipboard");
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Share Button (Native) */}
            <button
                onClick={handleNativeShare}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group/btn text-left"
                aria-label="Share Article"
            >
                <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-white/10 transition-colors border border-white/5 group-hover/btn:border-white/20">
                    <Share2 className="w-4 h-4" />
                </div>
                <span className="group-hover/btn:underline decoration-white/30 underline-offset-4">Share</span>
            </button>

            {/* LinkedIn Button */}
            <button
                onClick={handleLinkedInShare}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group/btn text-left"
                aria-label="Share on LinkedIn"
            >
                <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-white/10 transition-colors border border-white/5 group-hover/btn:border-white/20">
                    <Linkedin className="w-4 h-4" />
                </div>
                <span className="group-hover/btn:underline decoration-white/30 underline-offset-4">LinkedIn</span>
            </button>

            {/* Copy Full Article Button */}
            <button
                onClick={handleCopyArticle}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group/btn text-left"
                aria-label="Copy Full Article"
            >
                <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-white/10 transition-colors border border-white/5 group-hover/btn:border-white/20">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
                <span className="group-hover/btn:underline decoration-white/30 underline-offset-4">
                    {copied ? "Copied!" : "Copy Full Article"}
                </span>
            </button>

            <div className="h-px w-full bg-white/10 my-4" />
            <p className="text-xs text-gray-600 leading-relaxed">
                This article is part of the McPrime Intelligence series, focusing on enterprise application of emerging technologies.
            </p>
        </div>
    );
}
