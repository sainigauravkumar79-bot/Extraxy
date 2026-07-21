import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// A rotating geometric scene
function Scene() {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
    group.current.rotation.y += 0.005;
  });

  const color1 = '#6C63FF';
  const color2 = '#FF6584';
  const color3 = '#00F5FF';

  return (
    <group ref={group}>
      {/* Central torus knot */}
      <Torus
        args={[1.2, 0.3, 16, 100]}
        position={[0, 0, 0]}
        rotation={[0.5, 0.5, 0]}
      >
        <meshStandardMaterial
          color={color1}
          emissive={color1}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </Torus>

      {/* Orbiting small spheres */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.4;
        return (
          <Sphere
            key={i}
            args={[0.15, 16, 16]}
            position={[Math.cos(angle) * radius, Math.sin(angle * 1.3) * 1.2, Math.sin(angle) * radius]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? color2 : color3}
              emissive={i % 2 === 0 ? color2 : color3}
              emissiveIntensity={0.8}
            />
          </Sphere>
        );
      })}

      {/* Floating boxes */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i + 10}
          args={[0.1, 0.1, 0.1]}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 6
          ]}
        >
          <meshStandardMaterial
            color={color3}
            emissive={color3}
            emissiveIntensity={0.2}
          />
        </Box>
      ))}

      {/* Stars background */}
      <Stars radius={10} depth={50} count={1000} factor={4} saturation={0} />
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6C63FF" />
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
