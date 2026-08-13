"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ApertureBlades, type ApertureBladesHandle } from "./aperture-blades";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// How long the "shutter" takes to open on mount, in seconds.
const LOAD_DURATION = 1.15;

export function ApertureScene({
  scrollCloseRef,
  quality,
}: {
  /** Imperative ref (not state) so scroll doesn't trigger React re-renders. */
  scrollCloseRef: React.RefObject<number>;
  quality: "high" | "low";
}) {
  const bladesRef = useRef<ApertureBladesHandle>(null);
  const rigRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const smoothedPointer = useRef({ x: 0, y: 0 });

  const ringSegments = quality === "high" ? 72 : 28;

  useFrame((state, delta) => {
    // Load-in: blades sweep from closed to open, eased out (mechanical
    // deceleration, no overshoot/bounce).
    elapsed.current = Math.min(LOAD_DURATION, elapsed.current + delta);
    const loadProgress = easeOutCubic(elapsed.current / LOAD_DURATION);

    // Scrolling from the hero into About racks the blades most of the way
    // back closed (like racking focus) before the whole canvas fades out.
    const scrollClose = scrollCloseRef.current ?? 0;
    const openness = THREE.MathUtils.clamp(
      loadProgress - scrollClose * 0.7,
      0,
      1,
    );
    bladesRef.current?.setOpenness(openness);

    // Subtle parallax: the whole rig tilts toward the pointer, damped so it
    // settles smoothly rather than snapping.
    const damp = 1 - Math.exp(-4 * delta);
    smoothedPointer.current.x +=
      (state.pointer.x - smoothedPointer.current.x) * damp;
    smoothedPointer.current.y +=
      (state.pointer.y - smoothedPointer.current.y) * damp;

    if (rigRef.current) {
      rigRef.current.rotation.y = smoothedPointer.current.x * 0.16;
      rigRef.current.rotation.x = -smoothedPointer.current.y * 0.16;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      {/* Tight, bright key light -- this is what draws a thin specular
          streak along each blade's angled edge without lighting the whole
          matte body evenly. */}
      <directionalLight position={[2.5, 3.2, 4]} intensity={1.6} color="#f3efe6" />
      <pointLight position={[-2.2, -1.6, 2.2]} intensity={0.25} color="#e2a23d" />

      <group ref={rigRef}>
        <ApertureBlades ref={bladesRef} />

        {/* Thin amber trim ring -- the barrel accent, not the blades. */}
        <mesh>
          <ringGeometry args={[1.55, 1.62, ringSegments]} />
          <meshStandardMaterial
            color="#e2a23d"
            metalness={0.5}
            roughness={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <ringGeometry args={[1.62, 1.86, ringSegments]} />
          <meshStandardMaterial
            color="#1a1712"
            metalness={0.3}
            roughness={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}
