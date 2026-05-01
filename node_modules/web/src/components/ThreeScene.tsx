import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const MedicalCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = time * -0.1;
      wireframeRef.current.rotation.y = time * -0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Inner Glowing Core */}
        <Sphere args={[1.5, 64, 64]} ref={meshRef}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.4}
            speed={4}
            roughness={0}
            metalness={1}
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* Outer Wireframe Shell */}
        <Sphere args={[2.2, 32, 32]} ref={wireframeRef}>
          <meshPhongMaterial
            color="#34d399"
            wireframe
            transparent
            opacity={0.15}
            shininess={100}
          />
        </Sphere>

        {/* Pulsing Aura */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.05} />
        </mesh>
      </Float>

      {/* Floating Particles/Points */}
      <points ref={particlesRef}>
        <sphereGeometry args={[6, 64, 64]} />
        <pointsMaterial 
          color="#10b981" 
          size={0.03} 
          transparent 
          opacity={0.3} 
          sizeAttenuation 
        />
      </points>
    </group>
  );
};

export default function ThreeScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={3} 
          color="#fff" 
          castShadow 
        />
        <MedicalCore />
      </Canvas>
    </div>
  );
}
