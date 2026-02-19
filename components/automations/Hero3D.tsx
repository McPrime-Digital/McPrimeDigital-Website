'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment as DreiEnv, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Environment } from './Environment';

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 w-full h-full">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#aaddff"
                    castShadow
                />
                <pointLight position={[-5, 0, 2]} intensity={2} color="#0044ff" distance={10} />

                {/* Scene Components */}
                <Suspense fallback={null}>
                    <Environment />
                </Suspense>

                {/* Optional: Limit controls so user doesn't get lost, but allow subtle movement */}
                {/* <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} /> */}
            </Canvas>
        </div>
    );
}
