'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const carouselImages = [
    { src: '/filmmaking/face-leaves.png', alt: 'Artistic Face' },
    { src: '/filmmaking/balloon-clover.png', alt: 'Clover Balloon' },
    { src: '/filmmaking/cat-glasses.png', alt: 'Cat Reading' },
    { src: '/filmmaking/child-pixar.png', alt: 'Pixar Child' },
    { src: '/filmmaking/apple-geometry.png', alt: 'Geometric Apple' },
    { src: '/filmmaking/cyberpunk-girl.png', alt: 'Cyberpunk Girl' },
    { src: '/filmmaking/flamingo-suit.png', alt: 'Flamingo Suit' },
];

export default function FilmmakingCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className="bg-black py-20 overflow-hidden relative">
            {/* Carousel Container */}
            <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing pl-4 md:pl-20">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-8"
                >
                    {carouselImages.map((img, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[300px] md:min-w-[400px] h-[400px] md:h-[500px] relative rounded-lg overflow-hidden shrink-0 group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                                draggable="false"
                            />
                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Pagination / Dots indicator */}
            <div className="flex justify-center gap-2 mt-12">
                {[...Array(4)].map((_, i) => ( // Dummy dots matching reference
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    />
                ))}
            </div>

            {/* Floating Action Button (Green arrow from ref) */}
            <div className="absolute bottom-10 right-10">
                <button className="w-16 h-16 bg-[#00d2b4] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ArrowUp className="text-black w-8 h-8" strokeWidth={3} />
                </button>
            </div>
        </section>
    );
}
