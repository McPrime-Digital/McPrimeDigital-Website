'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

export function Environment() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group>
            {/* Background Color & Fog */}
            {/* <color attach="background" args={['#02040a']} /> */}
            <fog attach="fog" args={['#02040a', 5, 20]} />

            {/* Ambient particles */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#00ffff" />
            <Sparkles count={50} scale={10} size={6} speed={0.2} opacity={0.3} color="#0088ff" />

            {/* Abstract Flowing Wireframe Structure */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef} position={[0, 0, -5]} scale={[2, 2, 2]}>
                    <torusKnotGeometry args={[3, 1, 200, 32]} />
                    <meshBasicMaterial
                        color="#0044aa"
                        wireframe
                        transparent
                        opacity={0.15}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </Float>

            {/* Secondary glow element */}
            <mesh position={[0, 0, -8]}>
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial color="#001133" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}
