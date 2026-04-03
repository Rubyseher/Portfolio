'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PALETTE = ['#2997ff', '#bf5af2', '#ff375f', '#ffffff', '#64d2ff'];

function MainParticles() {
  const meshRef = useRef();
  const { mouse } = useThree();

  const { positions, colors } = useMemo(() => {
    const N = 1200;
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);

    const CLEAR_R2 = 38 * 38; // clear radius around center (name area)
    for (let i = 0; i < N; i++) {
      let px, py;
      do {
        px = (Math.random() - 0.5) * 240;
        py = (Math.random() - 0.5) * 240;
      } while (px * px + py * py < CLEAR_R2);
      positions[i * 3]     = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const c = new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += (mouse.x * 0.35 - meshRef.current.rotation.y) * 0.04;
    meshRef.current.rotation.x += (-mouse.y * 0.25 - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.z += 0.0004;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={1200} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={1200} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1.1} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

// Glowing cluster representing a company/tech
function Cluster({ x, y, z, color }) {
  const { positions, colors } = useMemo(() => {
    const N = 45;
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);
    const c = new THREE.Color(color);
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = x + (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 8;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [x, y, z, color]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={45} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={45} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={2.8} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

export default function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 90], fov: 75 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <MainParticles />
    </Canvas>
  );
}
