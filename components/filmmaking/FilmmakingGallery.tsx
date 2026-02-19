'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const galleryImages = [
    { src: '/filmmaking/cyberpunk-girl.png', category: 'Art Direction', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: '/filmmaking/apple-geometry.png', category: 'Design', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: '/filmmaking/butterfly-wings.png', category: 'Illustration', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: '/filmmaking/flamingo-suit.png', category: 'Creative', span: 'col-span-1 md:col-span-2 row-span-2' }, // Big flamingo
    { src: '/filmmaking/space-helmet.png', category: 'Art Direction', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: '/filmmaking/balloon-clover.png', category: 'Illustration', span: 'col-span-1 md:col-span-1 row-span-1' },
];

const categories = ["Art Direction", "Illustration", "Design", "Creative"];

export default function FilmmakingGallery() {
    const [activeCategory, setActiveCategory] = useState("Art Direction");

    return (
        <section className="bg-black py-24 px-4 relative">
            {/* Header */}
            <div className="text-center mb-16">
                <span className="text-[#00d2b4] uppercase tracking-wider text-sm font-semibold mb-4 block">Huge Gallery</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    AI-Powered Design
                </h2>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-lg font-medium transition-colors ${activeCategory === cat ? 'text-[#00d2b4]' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto h-[800px] md:h-auto">
                {galleryImages.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative group rounded-xl overflow-hidden bg-gray-900 ${img.span}`}
                    >
                        <img
                            src={img.src}
                            alt="Gallery Item"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-semibold tracking-wide drop-shadow-md">View Project</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
