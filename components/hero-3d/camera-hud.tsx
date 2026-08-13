"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CornerBrackets } from "@/components/hud/corner-brackets";

// Decoy values the readouts hunt through before settling, like a camera
// racing through its metering on wake. Last entry in each list is final.
const F_STOP_SEQUENCE = ["f/1.4", "f/5.6", "f/2.0", "f/2.8"];
const ISO_SEQUENCE = ["ISO 1600", "ISO 100", "ISO 800", "ISO 400"];
const SHUTTER_SEQUENCE = ["1/2000", "1/60", "1/250", "1/125"];
const FOCAL_LENGTH = "35MM";
const HUNT_STEP_MS = 90;

/**
 * Camera viewfinder HUD: f-stop / ISO / shutter readouts, autofocus-style
 * corner brackets, and a focus crosshair that tracks the cursor. Plain
 * HTML/CSS positioned over the R3F canvas rather than 3D text -- cheaper to
 * render and stays crisp at any pixel ratio.
 */
export function CameraHud({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);

  // Always starts on the final reading. This has to match server and
  // client's first render exactly regardless of the visitor's reduced-motion
  // setting -- prefers-reduced-motion is already active on the very first
  // client paint for real reduced-motion users, so branching the *initial*
  // state on it (rather than correcting later, client-only) caused a
  // hydration mismatch (React #418) for exactly the audience this was
  // supposed to protect.
  const [readouts, setReadouts] = useState({
    fStop: F_STOP_SEQUENCE.at(-1)!,
    iso: ISO_SEQUENCE.at(-1)!,
    shutter: SHUTTER_SEQUENCE.at(-1)!,
  });

  // "Waking up" hunt animation: cycle through decoy values briefly, then
  // lock to the final one. Skipped entirely under reduced motion. The first
  // decoy is set from inside the interval callback (not synchronously in
  // the effect body) so this stays a "react to an external timer" effect
  // rather than a render-time state sync.
  useEffect(() => {
    if (shouldReduceMotion) return;
    let step = -1;
    const totalSteps = F_STOP_SEQUENCE.length;
    const interval = setInterval(() => {
      step += 1;
      if (step >= totalSteps) {
        clearInterval(interval);
        return;
      }
      setReadouts({
        fStop: F_STOP_SEQUENCE[step],
        iso: ISO_SEQUENCE[step],
        shutter: SHUTTER_SEQUENCE[step],
      });
    }, HUNT_STEP_MS);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Focus-bracket cursor tracking: kept off React state (direct style
  // mutation) since mousemove fires far too often to re-render on. The CSS
  // transition on the crosshair itself provides the damping.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const container = containerRef.current;
    const crosshair = crosshairRef.current;
    if (!container || !crosshair) return;

    const RANGE = 34; // max px the crosshair drifts from center

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, nx)) * RANGE;
      const clampedY = Math.max(-1, Math.min(1, ny)) * RANGE;
      crosshair.style.transform = `translate(-50%, -50%) translate(${clampedX}px, ${clampedY}px)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none select-none font-mono text-accent/80 ${className ?? ""}`}
    >
      <CornerBrackets size={16} className="border-accent/70" />

      <span className="absolute left-2 top-2 text-[10px] uppercase tracking-wider sm:left-3 sm:top-3 sm:text-xs">
        {readouts.fStop}
      </span>
      <span className="absolute right-2 top-2 text-[10px] uppercase tracking-wider sm:right-3 sm:top-3 sm:text-xs">
        {readouts.iso}
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider sm:bottom-3 sm:left-3 sm:text-xs">
        {readouts.shutter}
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] uppercase tracking-wider sm:bottom-3 sm:right-3 sm:text-xs">
        {FOCAL_LENGTH}
      </span>

      {/* Always rendered (never conditioned on shouldReduceMotion -- same
          hydration hazard as the readouts above). Reduced-motion visitors
          just get a static centered crosshair instead of a tracking one,
          since the pointermove effect below never attaches for them. */}
      <div
        ref={crosshairRef}
        className="absolute left-1/2 top-1/2 h-6 w-6 transition-transform duration-300 ease-out"
      >
        <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-accent/70" />
        <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-accent/70" />
        <span className="absolute top-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-accent/70" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-accent/70" />
      </div>
    </div>
  );
}
