"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

interface Scene3DProps {
  progressRef: MutableRefObject<number>;
}

function FloatingObject({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);

  // Mouse position
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  // Smoothed mouse position
  const smoothMouse = useRef({
    x: 0,
    y: 0,
  });

  // Listen directly to the browser mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  useFrame((_, delta) => {
    if (
      !group.current ||
      !core.current ||
      !shell.current
    ) {
      return;
    }

    const dt = Math.min(delta, 0.05);

    // ------------------------------------------------
    // SMOOTH MOUSE
    // ------------------------------------------------

    smoothMouse.current.x = THREE.MathUtils.damp(
      smoothMouse.current.x,
      mouse.current.x,
      4,
      dt
    );

    smoothMouse.current.y = THREE.MathUtils.damp(
      smoothMouse.current.y,
      mouse.current.y,
      4,
      dt
    );

    const mouseX = smoothMouse.current.x;
    const mouseY = smoothMouse.current.y;

    // ------------------------------------------------
    // SCROLL PROGRESS
    // ------------------------------------------------

    const progress = THREE.MathUtils.clamp(
      progressRef.current,
      0,
      1
    );

    // ------------------------------------------------
    // OBJECT MOVEMENT
    // ------------------------------------------------

    // Strong mouse movement
    const mouseMoveX = mouseX * 2.0;
    const mouseMoveY = mouseY * 1.3;

    // Scroll movement
    const scrollMoveX = progress * 0.75;
    const scrollMoveY = -progress * 1.9;

    const targetX =
      mouseMoveX + scrollMoveX;

    const targetY =
      mouseMoveY + scrollMoveY;

    group.current.position.x =
      THREE.MathUtils.damp(
        group.current.position.x,
        targetX,
        5,
        dt
      );

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        targetY,
        5,
        dt
      );

    // ------------------------------------------------
    // CORE ROTATION
    // ------------------------------------------------

    core.current.rotation.x =
      THREE.MathUtils.damp(
        core.current.rotation.x,
        mouseY * 0.7 + progress * 1.1,
        3,
        dt
      );

    core.current.rotation.y =
      THREE.MathUtils.damp(
        core.current.rotation.y,
        mouseX * 0.9 + progress * 1.4,
        3,
        dt
      );

    // ------------------------------------------------
    // SHELL ROTATION
    // ------------------------------------------------

    shell.current.rotation.x += dt * 0.15;
    shell.current.rotation.y += dt * 0.22;

    // ------------------------------------------------
    // RINGS
    // ------------------------------------------------

    if (ringOne.current) {
      ringOne.current.rotation.x +=
        dt * 0.25;

      ringOne.current.rotation.z +=
        dt * 0.18;
    }

    if (ringTwo.current) {
      ringTwo.current.rotation.y -=
        dt * 0.2;

      ringTwo.current.rotation.x +=
        dt * 0.12;
    }
  });

  return (
    <group ref={group}>

      {/* MAIN CORE */}
      <mesh ref={core}>
        <icosahedronGeometry
          args={[1.45, 2]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.75}
        />
      </mesh>

      {/* WIREFRAME SHELL */}
      <mesh
        ref={shell}
        scale={1.12}
      >
        <icosahedronGeometry
          args={[1.45, 2]}
        />

        <meshBasicMaterial
          color="#67e8f9"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* CYAN RING */}
      <mesh
        ref={ringOne}
        rotation={[
          1.1,
          0.2,
          0.2,
        ]}
      >
        <torusGeometry
          args={[
            2.0,
            0.018,
            12,
            100,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* PINK RING */}
      <mesh
        ref={ringTwo}
        rotation={[
          0.4,
          1.0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.35,
            0.012,
            12,
            100,
          ]}
        />

        <meshBasicMaterial
          color="#f472b6"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* INNER GLOW */}
      <mesh scale={0.35}>
        <sphereGeometry
          args={[1, 32, 32]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
        />
      </mesh>

    </group>
  );
}

export default function Scene3D({
  progressRef,
}: Scene3DProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 42,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >

      {/* LIGHTING */}

      <ambientLight intensity={1.5} />

      <pointLight
        position={[4, 4, 5]}
        intensity={18}
        color="#8b5cf6"
      />

      <pointLight
        position={[-4, -2, 4]}
        intensity={14}
        color="#22d3ee"
      />

      {/* MAIN OBJECT */}

      <FloatingObject
        progressRef={progressRef}
      />

      {/* BACKGROUND STARS */}

      <Sparkles
        count={250}
        scale={10}
        size={2.2}
        speed={0.35}
        opacity={0.75}
        noise={1}
      />

    </Canvas>
  );
}