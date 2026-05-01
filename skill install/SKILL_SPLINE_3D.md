---
name: spline-3d-hospital
version: 1.0.0
description: >
  Spline + Three.js 3D integration skill for Divyam Hospital website.
  Use when building any 3D scene, model, animation, or immersive element.
  Covers Spline React embeds, Three.js/R3F canvas scenes, GLTF models,
  particle systems, and performance optimization for hospital-themed 3D content.
trigger_keywords:
  - spline
  - 3d scene
  - three.js
  - r3f
  - react three fiber
  - 3d model
  - gltf
  - particles
  - immersive
  - animated 3d
---

# SPLINE 3D SKILL — DIVYAM HOSPITAL

## PHILOSOPHY
3D elements must ENHANCE, not block. Every 3D scene:
1. Has an emoji/CSS fallback if Spline fails to load
2. Is lazy-loaded (never blocks FCP)
3. Is paused when out of viewport (IntersectionObserver)
4. Degrades gracefully on low-end devices

---

## DEPENDENCY INSTALL

```bash
# Spline React
pnpm add @splinetool/react-spline @splinetool/runtime

# React Three Fiber stack
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing

# Types
pnpm add -D @types/three

# GSAP for timeline animations
pnpm add gsap
```

---

## SCENE CATALOG

### Scene 1: Hero Background (hero-bg)
```tsx
// Full-screen hero behind text
// Use: Floating 3D hospital building + cross symbols + particles
// Spline: replace URL with actual published scene
// Fallback: CSS gradient + CSS particles

import Spline from '@splinetool/react-spline';

export function HeroSpline() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Spline
        scene="https://prod.spline.design/HERO-SCENE-ID/scene.splinecode"
        className="w-full h-full object-cover opacity-60"
        onLoad={(spline) => {
          // reduce scene brightness on mobile
          if (window.innerWidth < 768) spline.setVariable?.('opacity', 0.4);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--dark-bg)]" />
    </div>
  );
}
```

### Scene 2: Rotating Heart (Cardiology)
```tsx
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export function HeartScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#FF6B6B" intensity={2} />
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color="#FF6B6B"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}
```

### Scene 3: DNA Helix (About Section)
```tsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const points = Array.from({ length: 40 }, (_, i) => {
    const t = (i / 40) * Math.PI * 4;
    return [
      [Math.cos(t) * 0.8, (i / 40) * 4 - 2, Math.sin(t) * 0.8],
      [Math.cos(t + Math.PI) * 0.8, (i / 40) * 4 - 2, Math.sin(t + Math.PI) * 0.8],
    ];
  });

  return (
    <group ref={groupRef}>
      {points.map(([a, b], i) => (
        <group key={i}>
          {/* Strand A */}
          <mesh position={a as [number,number,number]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#FF6B6B" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Strand B */}
          <mesh position={b as [number,number,number]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#4ECDC4" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function DNAScene() {
  return (
    <Canvas camera={{ position: [3, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#FF6B6B" intensity={1.5} />
      <pointLight position={[-5, -5, -5]} color="#4ECDC4" intensity={1.5} />
      <DNAHelix />
    </Canvas>
  );
}
```

### Scene 4: Particle Field Background
```tsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4ECDC4" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1]}>
        <Particles count={150} />
      </Canvas>
    </div>
  );
}
```

### Scene 5: Floating Medical Icons (Service Cards)
```tsx
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';

// 3D floating emoji-like icons for each specialty
const SERVICE_ICONS: Record<string, { color: string; symbol: string }> = {
  pediatrics: { color: '#FFD700', symbol: '✚' },
  gynecology:  { color: '#FF6B6B', symbol: '♀' },
  dentistry:   { color: '#FFFFFF', symbol: '⬡' },
  cardiology:  { color: '#FF4444', symbol: '♥' },
  diagnostics: { color: '#4ECDC4', symbol: '◎' },
  emergency:   { color: '#FF6B6B', symbol: '✚' },
};

export function ServiceIcon3D({ serviceKey }: { serviceKey: string }) {
  const icon = SERVICE_ICONS[serviceKey] || { color: '#FF6B6B', symbol: '✚' };
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 1.5]}
      style={{ width: '80px', height: '80px' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} color={icon.color} intensity={2} />
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color={icon.color} metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </Canvas>
  );
}
```

---

## PERFORMANCE RULES

### Pause when off-screen
```tsx
import { useInView } from 'react-intersection-observer';

export function LazySpline({ url }: { url: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });
  
  return (
    <div ref={ref} className="w-full h-96">
      {inView && (
        <Spline scene={url} className="w-full h-full" />
      )}
    </div>
  );
}
```

### Mobile detection — reduce quality
```tsx
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isLowEnd = navigator.hardwareConcurrency <= 2 || !window.WebGLRenderingContext;

// If low-end: show static CSS fallback instead of 3D
if (isLowEnd) return <StaticFallback />;
```

### DPR capping
```tsx
// Always cap DPR to avoid overdraw on high-DPI screens
<Canvas dpr={[1, Math.min(2, window.devicePixelRatio)]}>
```

---

## SPLINE WORKFLOW

### Creating New Scenes
1. Go to spline.design
2. Create scene matching hospital brand colors (#FF6B6B, #4ECDC4, #FFD700)
3. Export → React (copy URL)
4. Add URL to SITE_CONFIG.splineScenes[key]
5. Replace `null` in site-config.ts

### Placeholder Until Spline Scenes Are Created
```tsx
// Use CSS 3D transforms for immediate visual
export function CSS3DCard({ icon, color }: { icon: string; color: string }) {
  return (
    <div className="w-20 h-20 flex items-center justify-center rounded-2xl text-4xl
      transform-gpu transition-transform duration-300 hover:rotate-y-12"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color}33, transparent)`,
        border: `1px solid ${color}44`,
        boxShadow: `0 8px 32px ${color}22`,
      }}>
      {icon}
    </div>
  );
}
```

---

## 3D MODELS (GLTF/GLB)

### Hospital Building Model
```tsx
import { useGLTF } from '@react-three/drei';

function HospitalModel() {
  const { scene } = useGLTF('/models/hospital-building.glb');
  return <primitive object={scene} scale={0.5} />;
}

// Preload
useGLTF.preload('/models/hospital-building.glb');
```

### Recommended Free Models
- Hospital building: Sketchfab (CC license)
- Medical equipment: Poly.pizza
- Anatomical: Sketchfab Medical category
- Ambulance: Free3D

---

## ANIMATION INTEGRATION WITH GSAP

```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reveal section on scroll
useEffect(() => {
  gsap.fromTo('.service-card', 
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#services', start: 'top 80%' }
    }
  );
}, []);
```
