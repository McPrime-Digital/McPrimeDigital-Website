'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Environment } from './Environment';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

// Loaded client-side only (see AutomationsClient). The scene draws only while the hero is on
// screen; it used to redraw every frame after the visitor had scrolled away. Phones render at
// up to 1.5x resolution with fewer particles, and Reduce Motion gets a single still frame.
export default function Hero3D() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);
    const [compact] = useState(() => window.matchMedia('(max-width: 767px)').matches);
    const reduced = usePrefersReducedMotion();

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapRef} className="absolute inset-0 z-0 w-full h-full">
            <Canvas dpr={compact ? [1, 1.5] : [1, 2]} frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#aaddff"
                />
                <pointLight position={[-5, 0, 2]} intensity={2} color="#0044ff" distance={10} />

                {/* Scene Components */}
                <Suspense fallback={null}>
                    <Environment compact={compact} />
                </Suspense>

                {/* Optional: Limit controls so user doesn't get lost, but allow subtle movement */}
                {/* <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} /> */}
            </Canvas>
        </div>
    );
}
