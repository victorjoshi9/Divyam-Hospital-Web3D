import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// ── Reusable building block ────────────────────────────────────────────────
const Block = ({ pos, size, color, emissive = '#000' }: { pos: [number,number,number]; size: [number,number,number]; color: string; emissive?: string }) => (
  <mesh position={pos} castShadow receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.3} roughness={0.4} metalness={0.2} />
  </mesh>
);

// ── 5-floor Hospital Building ──────────────────────────────────────────────
export const HospitalBuilding = ({ animate = false }: { animate?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current || !animate) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
  });

  const windows = useMemo(() => {
    const w: { x: number; y: number; z: number }[] = [];
    for (let floor = 0; floor < 5; floor++) {
      for (let col = -1; col <= 1; col++) {
        w.push({ x: col * 0.7, y: floor * 0.8 - 1.2, z: 0.76 });
      }
    }
    return w;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main building body */}
      <Block pos={[0, 0.5, 0]} size={[3, 5, 1.5]} color="#1a2a1a" emissive="#10b981" />
      {/* Roof */}
      <Block pos={[0, 3.2, 0]} size={[3.2, 0.3, 1.7]} color="#0d1a0d" emissive="#10b981" />
      {/* Ground floor entrance */}
      <Block pos={[0, -1.8, 0.76]} size={[1, 0.8, 0.05]} color="#10b981" emissive="#10b981" />
      {/* Entrance arch */}
      <mesh position={[0, -1.4, 0.78]}>
        <torusGeometry args={[0.5, 0.06, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.8} />
      </mesh>
      {/* Windows */}
      {windows.map((w, i) => (
        <mesh key={i} position={[w.x, w.y, w.z]}>
          <planeGeometry args={[0.35, 0.4]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Hospital cross sign */}
      <mesh position={[0, 2.5, 0.78]}>
        <planeGeometry args={[0.6, 0.6]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
      </mesh>
      {/* Floor lines */}
      {[0, 0.8, 1.6, 2.4, 3.2].map((y, i) => (
        <Block key={i} pos={[0, y - 1.2, 0.76]} size={[3.05, 0.04, 0.04]} color="#34d399" emissive="#34d399" />
      ))}
      {/* Ground */}
      <mesh position={[0, -2.3, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 4]} />
        <meshStandardMaterial color="#0a0f0a" roughness={1} />
      </mesh>
      {/* Road markings */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x, -2.24, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, 0.6]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// ── Stick-figure Patient ───────────────────────────────────────────────────
export const PatientFigure = ({ position = [0,0,0] as [number,number,number], wobble = false, sitting = false }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    if (wobble) {
      ref.current.rotation.z = Math.sin(t * 3) * 0.15;
      ref.current.position.y = position[1] + Math.sin(t * 2) * 0.05;
    } else if (!sitting) {
      ref.current.position.x = position[0] + Math.sin(t * 0.8) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={sitting ? 0.7 : 1}>
      {/* Head */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#f5c5a3" roughness={0.8} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.7} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.22, 0.45, 0]} rotation={[0, 0, wobble ? 0.8 : 0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
        <meshStandardMaterial color="#f5c5a3" />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.22, 0.45, 0]} rotation={[0, 0, wobble ? -0.8 : -0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
        <meshStandardMaterial color="#f5c5a3" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, sitting ? 0 : -0.15, 0]} rotation={[sitting ? 1.2 : 0, 0, 0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
        <meshStandardMaterial color="#1e3a5f" />
      </mesh>
      <mesh position={[0.1, sitting ? 0 : -0.15, 0]} rotation={[sitting ? 1.2 : 0, 0, -0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
        <meshStandardMaterial color="#1e3a5f" />
      </mesh>
    </group>
  );
};

// ── Doctor Figure ──────────────────────────────────────────────────────────
export const DoctorFigure = ({ position = [0,0,0] as [number,number,number] }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
  });
  return (
    <group ref={ref} position={position}>
      {/* Head */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#d4956a" roughness={0.8} />
      </mesh>
      {/* White coat body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.6, 8]} />
        <meshStandardMaterial color="#e8f5e9" roughness={0.6} />
      </mesh>
      {/* Stethoscope */}
      <mesh position={[0, 0.55, 0.14]}>
        <torusGeometry args={[0.08, 0.015, 6, 12]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} metalness={0.8} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.22, 0.45, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
        <meshStandardMaterial color="#e8f5e9" />
      </mesh>
      <mesh position={[0.22, 0.45, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
        <meshStandardMaterial color="#e8f5e9" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, -0.15, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.1, -0.15, 0]} rotation={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
};

// ── Sun (for road/heat scene) ──────────────────────────────────────────────
export const HeatSun = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.005;
    const t = state.clock.getElapsedTime();
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.2;
  });
  return (
    <group position={[3, 3, -2]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#ff8c00" emissive="#ff6600" emissiveIntensity={1} />
      </mesh>
      {/* Heat rays */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <mesh key={i} position={[Math.cos(deg * Math.PI/180) * 0.9, Math.sin(deg * Math.PI/180) * 0.9, 0]}>
          <boxGeometry args={[0.04, 0.3, 0.04]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

// ── Floating medical particles ─────────────────────────────────────────────
export const MedicalParticles = ({ color = '#10b981', count = 40 }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.06} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

// ── News Reporter Scene ────────────────────────────────────────────────────
export const NewsReporterScene = () => {
  const micRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!micRef.current) return;
    micRef.current.position.y = -0.1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.05;
  });
  return (
    <group>
      {/* Reporter */}
      <PatientFigure position={[-1.2, -1.2, 0]} />
      {/* Microphone */}
      <group position={[-0.9, -0.3, 0.2]}>
        <mesh ref={micRef}>
          <cylinderGeometry args={[0.06, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#555" metalness={0.8} />
        </mesh>
      </group>
      {/* Happy patient */}
      <PatientFigure position={[1.2, -1.2, 0]} />
      {/* TV camera */}
      <group position={[-2.5, -0.5, 0.5]}>
        <mesh>
          <boxGeometry args={[0.4, 0.3, 0.5]} />
          <meshStandardMaterial color="#222" metalness={0.7} />
        </mesh>
        <mesh position={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
        {/* Red recording light */}
        <mesh position={[0.1, 0.2, 0.26]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
};
