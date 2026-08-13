// Static, dependency-free (no three.js) stand-in for the 3D aperture.
// Used when the visitor prefers reduced motion, the browser has no WebGL,
// or the 3D chunk hasn't loaded yet. Mirrors the same blade geometry math
// as aperture-blades.tsx, but pre-computed once for a fixed "open" pose
// instead of animated per-frame.

const BLADE_COUNT = 8;
const CENTER = 100;
const PIVOT_RADIUS = 54;
const BLADE_LENGTH = 74;
const BLADE_WIDTH = 33;
const OPEN_TWIST_DEG = 64;

function bladePolygon(index: number) {
  const baseAngle = (index / BLADE_COUNT) * 360;
  const rotation = ((baseAngle + 180 + OPEN_TWIST_DEG) * Math.PI) / 180;
  const pivotAngle = (baseAngle * Math.PI) / 180;
  const pivotX = CENTER + PIVOT_RADIUS * Math.cos(pivotAngle);
  const pivotY = CENTER + PIVOT_RADIUS * Math.sin(pivotAngle);

  // Wide at the pivot (rim), tapering to a point toward the center -- see
  // the comment in aperture-blades.tsx for why this stays contained within
  // the outer ring instead of poking past it.
  const localPoints: [number, number][] = [
    [0, BLADE_WIDTH / 2],
    [BLADE_LENGTH, 0],
    [0, -BLADE_WIDTH / 2],
  ];

  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return localPoints
    .map(([x, y]) => {
      const rx = x * cos - y * sin;
      const ry = x * sin + y * cos;
      return `${pivotX + rx},${pivotY + ry}`;
    })
    .join(" ");
}

export function ApertureFallback({ className }: { className?: string }) {
  const blades = Array.from({ length: BLADE_COUNT }, (_, i) => bladePolygon(i));

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Stylized camera aperture graphic"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={78}
        fill="none"
        stroke="#292418"
        strokeWidth={3}
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={70}
        fill="none"
        stroke="#e2a23d"
        strokeWidth={1.5}
      />
      {blades.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="#e2a23d"
          fillOpacity={0.85}
          stroke="#0b0a08"
          strokeWidth={0.75}
        />
      ))}
    </svg>
  );
}

export function ApertureLoadingPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-full border border-border bg-accent-soft ${className ?? ""}`}
    />
  );
}
