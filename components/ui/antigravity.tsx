'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AntigravityProps {
    count?: number;
    color?: string;
    magnetRadius?: number;
    waveSpeed?: number;
    waveAmplitude?: number;
}

const Particles = ({
    count = 200,
    color = '#8b5cf6', // Violet/Purple default
    magnetRadius = 2,
    waveSpeed = 0.5,
    waveAmplitude = 1
}: AntigravityProps) => {
    const mesh = useRef<THREE.Points>(null!);
    const { mouse, viewport } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 10; // width spread
            const y = (Math.random() - 0.5) * 10; // height spread
            const z = (Math.random() - 0.5) * 10; // depth spread
            const mx = 0;
            const my = 0;
            temp.push({ t, factor, speed, x, y, z, mx, my });
        }
        return temp;
    }, [count]);

    // Initial positions
    const initialPositions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            pos[i * 3] = p.x;
            pos[i * 3 + 1] = p.y;
            pos[i * 3 + 2] = p.z;
        });
        return pos;
    }, [count, particles]);

    useFrame((state) => {
        // Mouse interaction - convert normalized mouse (-1 to 1) to world units roughly
        // This is valid if camera is default perspective.
        const targetX = (state.mouse.x * viewport.width) / 2;
        const targetY = (state.mouse.y * viewport.height) / 2;

        const time = state.clock.getElapsedTime();

        // Iterate through particles and update positions
        // Note: For high performance with thousands of particles, a custom shader is better.
        // For < 1000 particles, CPU loop updating one BufferAttribute is often "okay" but 
        // strictly, updating the attribute every frame can be heavy.
        // However, recreating React Bits Antigravity often implies some physics/flow.

        // Changing the attribute array directly
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const p = particles[i];

            // Basic wave motion
            let { x, y, z } = p;

            // "Antigravity" / Float effect
            y += Math.sin(time * waveSpeed + p.t) * 0.005 * waveAmplitude;
            x += Math.cos(time * waveSpeed + p.t) * 0.005 * waveAmplitude;

            // Mouse repulsion/attraction (Magnetism)
            const dx = x - targetX;
            const dy = y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < magnetRadius) {
                const force = (magnetRadius - dist) / magnetRadius;
                const angle = Math.atan2(dy, dx);
                // Push away
                x += Math.cos(angle) * force * 0.05;
                y += Math.sin(angle) * force * 0.05;
            }

            // Apply back to buffer
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Update persistent state slightly if we want permanent displacement (optional)
            // p.x = x; p.y = y; 
            // For this simple demo, we just modify the buffer relative to initial is simpler 
            // OR we just mutate the cached `particles` positions.
            // Let's mutate `p` to keep them moving
            p.x = x;
            p.y = y;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={initialPositions.length / 3}
                    array={initialPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color={color}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

const Antigravity = (props: AntigravityProps) => {
    return (
        <div className="w-full h-full min-h-[400px] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                {/* <ambientLight intensity={0.5} /> */}
                <Particles {...props} />
            </Canvas>
        </div>
    );
};

export default Antigravity;
