'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// HERO HINGE — large, centered, clearly visible pantry/cup hinge
// ─────────────────────────────────────────────────────────────────────────────
function HeroHinge() {
  const group    = useRef();
  const door     = useRef();   // the "door side" arm that swings
  const cupGroup = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Slow overall rotation so all sides are visible
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;

    // Door arm opens and closes — 0 = closed, ~1.1 rad = fully open
    const openAngle = (Math.sin(t * 1.1) * 0.5 + 0.5) * 1.1;
    door.current.rotation.y = openAngle;
  });

  const chrome = (
    <meshStandardMaterial color="#e0e0e0" metalness={0.98} roughness={0.04} envMapIntensity={1.5} />
  );
  const darkMetal = (
    <meshStandardMaterial color="#6a6a6a" metalness={0.95} roughness={0.08} />
  );
  const gold = (
    <meshStandardMaterial color="#f0c040" metalness={0.95} roughness={0.05} />
  );

  return (
    <group ref={group} position={[0, 0, 0]} scale={1.8}>

      {/* ── CABINET FRAME PLATE (static side) ── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.09, 0.55]} />
        {chrome}
      </mesh>

      {/* Mounting slots on frame plate */}
      {[[-0.55, 0.05, 0.18], [-0.55, 0.05, -0.18], [0.55, 0.05, 0.18], [0.55, 0.05, -0.18]].map((p, i) => (
        <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 12]} />
          {darkMetal}
        </mesh>
      ))}

      {/* Adjustment euro screw */}
      <mesh position={[0.4, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.14, 12]} />
        {gold}
      </mesh>

      {/* ── PIVOT BOSS (center axle) ── */}
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.6, 20]} />
        {darkMetal}
      </mesh>

      {/* ── DOOR ARM (animated — swings open/close) ── */}
      <group ref={door} position={[0, 0.09, 0]}>

        {/* Main arm bar */}
        <mesh position={[-0.55, 0, 0]}>
          <boxGeometry args={[1.0, 0.09, 0.13]} />
          {chrome}
        </mesh>

        {/* Secondary parallel link */}
        <mesh position={[-0.5, 0, 0.18]}>
          <boxGeometry args={[0.85, 0.07, 0.09]} />
          {chrome}
        </mesh>

        {/* Cup carrier plate */}
        <mesh position={[-1.1, -0.05, 0]}>
          <boxGeometry args={[0.45, 0.08, 0.52]} />
          {chrome}
        </mesh>

        {/* Cup rim */}
        <group ref={cupGroup} position={[-1.1, 0.07, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.07, 36]} />
            {chrome}
          </mesh>
          {/* Cup well (dark interior) */}
          <mesh position={[0, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.19, 0.19, 0.16, 36]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Spring coil inside cup */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.018, 8, 28]} />
            <meshStandardMaterial color="#bbb" metalness={0.95} roughness={0.05} />
          </mesh>
        </group>

        {/* Pivot pins on arm ends */}
        {[[-0.08, 0, 0.32], [-0.08, 0, -0.32], [-1.0, 0, 0.27], [-1.0, 0, -0.27]].map((p, i) => (
          <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.12, 10]} />
            {darkMetal}
          </mesh>
        ))}

      </group>

    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND EDGEBAND ROLLS — smaller, scattered
// ─────────────────────────────────────────────────────────────────────────────
function EdgebandRoll({ position, color = '#c4a265', scale = 1, speed = 1 }) {
  const group  = useRef();
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset.current;
    group.current.rotation.z += 0.02 * speed;
    group.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3;
    group.current.position.x = position[0] + Math.sin(t * 0.22) * 0.35;
    group.current.rotation.y += 0.005 * speed;
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      {/* Left flange */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.06, 36]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Right flange */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.06, 36]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Core */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 20]} />
        <meshStandardMaterial color="#999" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Roll body */}
      <mesh>
        <cylinderGeometry args={[0.48, 0.48, 0.38, 36]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.5} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND SMALL HINGES — floating around edges
// ─────────────────────────────────────────────────────────────────────────────
function SmallHinge({ position, scale = 0.5, speed = 1 }) {
  const group  = useRef();
  const arm    = useRef();
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset.current;
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.25;
    group.current.rotation.y += 0.008 * speed;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    arm.current.rotation.y = (Math.sin(t * 0.9) * 0.5 + 0.5) * 1.1;
  });

  const chrome = <meshStandardMaterial color="#d8d8d8" metalness={0.98} roughness={0.04} />;

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh><boxGeometry args={[1.6, 0.09, 0.55]} />{chrome}</mesh>
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.6, 16]} />
        <meshStandardMaterial color="#666" metalness={0.95} roughness={0.08} />
      </mesh>
      <group ref={arm} position={[0, 0.09, 0]}>
        <mesh position={[-0.55, 0, 0]}><boxGeometry args={[1.0, 0.09, 0.13]} />{chrome}</mesh>
        <mesh position={[-1.1, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.07, 32]} />{chrome}
        </mesh>
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
function Particles({ count = 800 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.015;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#c4a265" size={0.04} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA RIG
// ─────────────────────────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 1.0 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE
// ─────────────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Lighting — bright on center hero hinge */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 4, 4]}   intensity={6}   color="#ffffff" />
      <pointLight position={[-4, 2, 3]}  intensity={3}   color="#0ea5e9" />
      <pointLight position={[4, -2, 3]}  intensity={3}   color="#c4a265" />
      <pointLight position={[0, -6, 2]}  intensity={2}   color="#1e40af" />
      <spotLight
        position={[0, 6, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={10}
        color="#ffffff"
        target-position={[0, 0, 0]}
      />

      <CameraRig />
      <Particles count={1500} />

      {/* ── HERO HINGE — large, center stage ── */}
      <HeroHinge />

      {/* ── EDGEBAND ROLLS — background ── */}
      <EdgebandRoll position={[-5.5, 2.5, -5]} color="#c4a265" scale={0.75} speed={1.1} />
      <EdgebandRoll position={[5.5,  2.0, -5]} color="#7c4a1e" scale={0.8}  speed={0.8} />
      <EdgebandRoll position={[-5.0,-2.5, -4]} color="#e8e8e0" scale={0.7}  speed={1.3} />
      <EdgebandRoll position={[5.0, -2.0, -4]} color="#e2c48a" scale={0.75} speed={0.9} />
      <EdgebandRoll position={[-1.0, 4.5, -6]} color="#0ea5e9" scale={0.65} speed={1.0} />
      <EdgebandRoll position={[1.5, -4.5, -5]} color="#9b3c2a" scale={0.7}  speed={1.2} />

      {/* ── SMALL BACKGROUND HINGES ── */}
      <SmallHinge position={[-6, 1.0, -5]}  scale={0.45} speed={0.9} />
      <SmallHinge position={[6,  -1.0, -5]} scale={0.45} speed={1.1} />
      <SmallHinge position={[-4, -3.5, -6]} scale={0.4}  speed={1.3} />
      <SmallHinge position={[4,   3.5, -6]} scale={0.4}  speed={0.8} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 10 : 6], fov: isMobile ? 65 : 55 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={isMobile ? 1 : [1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
