"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";

export type ApertureBladesHandle = {
  /** 0 = fully closed (blades overlap, covering the center), 1 = fully open. */
  setOpenness: (value: number) => void;
};

const BLADE_COUNT = 8;
const PIVOT_RADIUS = 1.35;
const BLADE_LENGTH = 1.85;
const BLADE_WIDTH_BASE = 0.82; // width at the pivot (rim) edge
const BLADE_WIDTH_TIP = 0.13; // width at the inner (center-facing) edge
// How far (radians) each blade swings away from "pointing at center" once
// fully open. All blades twist the same rotational direction, which is what
// gives a real iris its characteristic pinwheel sweep.
const OPEN_TWIST = THREE.MathUtils.degToRad(64);

function createBladeGeometry() {
  // Pivot stays at the shape's local origin (0,0) so rotating the parent
  // group swings the blade around its mounting point, not its own center.
  // True trapezoid: wide flat edge at the pivot (rim), narrower flat edge
  // at the inner tip -- not a sharp triangle point. Wide-at-tip instead of
  // wide-at-pivot would swing a wide edge out past the outer ring as the
  // blades twist open, reading as a jagged star instead of a contained lens.
  const shape = new THREE.Shape();
  shape.moveTo(0, BLADE_WIDTH_BASE / 2);
  shape.lineTo(BLADE_LENGTH, BLADE_WIDTH_TIP / 2);
  shape.lineTo(BLADE_LENGTH, -BLADE_WIDTH_TIP / 2);
  shape.lineTo(0, -BLADE_WIDTH_BASE / 2);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.06,
    bevelEnabled: false,
    curveSegments: 1,
  });
  geometry.translate(0, 0, -0.03);
  return geometry;
}

export const ApertureBlades = forwardRef<
  ApertureBladesHandle,
  { color?: string; metalness?: number; roughness?: number }
>(function ApertureBlades(
  // Matte dark charcoal, not shiny/chrome and not gold -- the amber accent
  // lives in the HUD overlay and the thin rim ring instead. Moderate
  // metalness + roughness lets angled blade edges catch a subtle specular
  // highlight from the key light without the whole blade looking polished.
  { color = "#211d16", metalness = 0.55, roughness = 0.55 },
  ref,
) {
  const groupRefs = useRef<Array<THREE.Group | null>>([]);

  const blades = useMemo(() => {
    const geometry = createBladeGeometry();
    return Array.from({ length: BLADE_COUNT }, (_, i) => {
      const angle = (i / BLADE_COUNT) * Math.PI * 2;
      return {
        key: i,
        geometry,
        pivotX: PIVOT_RADIUS * Math.cos(angle),
        pivotY: PIVOT_RADIUS * Math.sin(angle),
        // Base rotation aims the blade's local +X axis at the scene origin.
        baseRotation: angle + Math.PI,
      };
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      setOpenness(value: number) {
        const clamped = Math.min(1, Math.max(0, value));
        blades.forEach((blade, i) => {
          const group = groupRefs.current[i];
          if (!group) return;
          group.rotation.z = blade.baseRotation + clamped * OPEN_TWIST;
        });
      },
    }),
    [blades],
  );

  return (
    <group>
      {blades.map((blade, i) => (
        <group
          key={blade.key}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
          position={[blade.pivotX, blade.pivotY, 0]}
          rotation={[0, 0, blade.baseRotation]}
        >
          <mesh geometry={blade.geometry}>
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
});
