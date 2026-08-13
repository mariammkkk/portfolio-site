"use client";

import { Canvas } from "@react-three/fiber";
import { ApertureScene } from "./aperture-scene";

export function ApertureCanvas({
  scrollCloseRef,
  quality,
}: {
  scrollCloseRef: React.RefObject<number>;
  quality: "high" | "low";
}) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.5] : [1, 1]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ApertureScene scrollCloseRef={scrollCloseRef} quality={quality} />
    </Canvas>
  );
}
