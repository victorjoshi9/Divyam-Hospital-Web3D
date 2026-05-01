import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Pediatrics: bouncing baby sphere + DNA ─────────────────────────────────
const PediatricsScene = () => {
  const dnaRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (dnaRef.current) dnaRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
  });
  const dnaPoints = useMemo(() => {
    const pts: { pos: [number,number,number]; color: string }[] = [];
    for (let i = 0; i < 20; i++) {
      const t = (i / 20) * Math.PI * 4;
      pts.push({ pos: [Math.cos(t) * 0.6, i * 0.15 - 1.5, Math.sin(t) * 0.6], color: i % 2 === 0 ? '#10b981' : '#34d399' });
      pts.push({ pos: [Math.cos(t + Math.PI) * 0.6, i * 0.15 - 1.5, Math.sin(t + Math.PI) * 0.6], color: '#3b82f6' });
    }
    return pts;
  }, []);

  return (
    <group ref={dnaRef}>
      {dnaPoints.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.6} />
        </mesh>
      ))}
      <Float speed={3} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <MeshDistortMaterial color="#10b981" distort={0.3} speed={3} emissive="#10b981" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

// ── Gynecology: heart + protective ring ───────────────────────────────────
const GynecologyScene = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <group>
      <Float speed={2} floatIntensity={1.5}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial color="#ec4899" distort={0.25} speed={2} emissive="#ec4899" emissiveIntensity={0.5} roughness={0} metalness={0.3} />
        </Sphere>
      </Float>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.9, 0.06, 8, 40]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.7} metalness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.04, 8, 40]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// ── Dentistry: rotating tooth ──────────────────────────────────────────────
const DentistryScene = () => {
  const toothRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (toothRef.current) {
      toothRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
      toothRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
    }
  });
  return (
    <group ref={toothRef}>
      {/* Tooth crown */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.5]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.1} emissive="#ffffff" emissiveIntensity={0.1} />
      </mesh>
      {/* Tooth cusps */}
      {[[-0.2, 0.7, 0.1], [0.2, 0.7, 0.1], [-0.2, 0.7, -0.1], [0.2, 0.7, -0.1]].map((p, i) => (
        <mesh key={i} position={p as [number,number,number]}>
          <coneGeometry args={[0.1, 0.2, 6]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.1} />
        </mesh>
      ))}
      {/* Roots */}
      {[[-0.2, -0.3, 0], [0.2, -0.3, 0]].map((p, i) => (
        <mesh key={i} position={p as [number,number,number]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.1, 0.5, 6]} />
          <meshStandardMaterial color="#ffd4b8" roughness={0.6} />
        </mesh>
      ))}
      {/* Shine ring */}
      <mesh>
        <torusGeometry args={[0.7, 0.03, 6, 30]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// ── Cardiology: beating heart ──────────────────────────────────────────────
const CardiologyScene = () => {
  const heartRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const beat = Math.abs(Math.sin(t * 2.5));
    if (heartRef.current) {
      const s = 1 + beat * 0.15;
      heartRef.current.scale.set(s, s, s);
    }
    if (pulseRef.current) {
      const ps = 1 + beat * 0.4;
      pulseRef.current.scale.set(ps, ps, ps);
      (pulseRef.current.material as THREE.MeshStandardMaterial).opacity = (1 - beat) * 0.3;
    }
  });
  return (
    <group>
      <mesh ref={heartRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <MeshDistortMaterial color="#ef4444" distort={0.2} speed={4} emissive="#ef4444" emissiveIntensity={0.6} roughness={0} metalness={0.2} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.15} />
      </mesh>
      {/* ECG line */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[2.5, 0.02, 0.02]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

// ── Diagnostics: microscope + scan rings ──────────────────────────────────
const DiagnosticsScene = () => {
  const scanRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (scanRef.current) scanRef.current.rotation.y = state.clock.getElapsedTime() * 1.2;
  });
  return (
    <group>
      <Float speed={1.5} floatIntensity={0.8}>
        <Sphere args={[0.4, 32, 32]}>
          <MeshDistortMaterial color="#3b82f6" distort={0.15} speed={2} emissive="#3b82f6" emissiveIntensity={0.5} roughness={0} metalness={0.5} />
        </Sphere>
      </Float>
      <group ref={scanRef}>
        {[0.7, 1.0, 1.3].map((r, i) => (
          <mesh key={i}>
            <torusGeometry args={[r, 0.025, 6, 40]} />
            <meshStandardMaterial color={i === 0 ? '#10b981' : i === 1 ? '#3b82f6' : '#fbbf24'}
              emissive={i === 0 ? '#10b981' : i === 1 ? '#3b82f6' : '#fbbf24'}
              emissiveIntensity={0.7} transparent opacity={0.8 - i * 0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ── Emergency: ambulance cross + pulse ────────────────────────────────────
const EmergencyScene = () => {
  const crossRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crossRef.current) {
      crossRef.current.rotation.y = t * 0.4;
      const s = 1 + Math.abs(Math.sin(t * 3)) * 0.1;
      crossRef.current.scale.set(s, s, s);
    }
  });
  return (
    <group ref={crossRef}>
      {/* Cross horizontal */}
      <mesh>
        <boxGeometry args={[1.2, 0.3, 0.15]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} roughness={0.2} />
      </mesh>
      {/* Cross vertical */}
      <mesh>
        <boxGeometry args={[0.3, 1.2, 0.15]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} roughness={0.2} />
      </mesh>
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[0.9, 0.04, 8, 40]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
      </mesh>
      {/* Pulse rings */}
      {[1.2, 1.6].map((r, i) => (
        <mesh key={i}>
          <torusGeometry args={[r, 0.02, 6, 30]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.4} transparent opacity={0.3 - i * 0.1} />
        </mesh>
      ))}
    </group>
  );
};

// ── Scene map ──────────────────────────────────────────────────────────────
const SCENES: Record<string, React.FC> = {
  pediatrics: PediatricsScene,
  gynecology: GynecologyScene,
  dentistry: DentistryScene,
  cardiology: CardiologyScene,
  diagnostics: DiagnosticsScene,
  emergency: EmergencyScene,
};

const COLORS: Record<string, string> = {
  pediatrics: '#10b981',
  gynecology: '#ec4899',
  dentistry: '#f0f0f0',
  cardiology: '#ef4444',
  diagnostics: '#3b82f6',
  emergency: '#ef4444',
};

interface SpecialtySceneProps {
  specialty: string;
  size?: number;
}

export default function SpecialtyScene3D({ specialty, size = 160 }: SpecialtySceneProps) {
  const Scene = SCENES[specialty] || SCENES.emergency;
  const color = COLORS[specialty] || '#10b981';

  return (
    <div style={{ width: size, height: size }} className="rounded-[24px] overflow-hidden">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <color attach="background" args={['#e8edf2']} />
        <ambientLight intensity={0.6} color="#ffffff" />
        <pointLight position={[3, 3, 3]} intensity={2} color={color} />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#3b82f6" />
        <Scene />
      </Canvas>
    </div>
  );
}
