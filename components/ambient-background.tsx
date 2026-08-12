"use client";

import { motion, useReducedMotion } from "framer-motion";

// A slow-drifting, low-opacity amber glow behind the content — replaces a
// flat background color with something that reads as alive without being a
// distracting parallax effect. Frozen to a single static frame when the
// visitor prefers reduced motion.
export function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(226,162,61,0.10), transparent 60%)",
        }}
      />

      <motion.div
        className="absolute h-[55vw] w-[55vw] rounded-full"
        style={{
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(226,162,61,0.16) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 60, -30, 0], y: [0, 40, -20, 0] }
        }
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute h-[40vw] w-[40vw] rounded-full"
        style={{
          bottom: "-10%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(226,162,61,0.10) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -50, 25, 0], y: [0, -30, 35, 0] }
        }
        transition={{ duration: 58, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute h-[30vw] w-[30vw] rounded-full"
        style={{
          top: "35%",
          left: "60%",
          background:
            "radial-gradient(circle, rgba(242,238,230,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={
          shouldReduceMotion ? undefined : { x: [0, -30, 20, 0], y: [0, 25, -15, 0] }
        }
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
