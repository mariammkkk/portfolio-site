"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const label: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
  };

  // The heading racks into focus -- starts soft and slightly lower, settles
  // sharp -- echoing the aperture racking focus in the hero rather than a
  // generic fade. Blur is skipped under reduced motion (opacity/position
  // only); filter transitions aren't covered by the global reduced-motion
  // duration override since they're not technically "animation/transition
  // duration" in every browser's accounting, so it's made explicit here too.
  const heading: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE },
    },
  };

  // The rule draws in left-to-right like a scan line finishing the reveal.
  const rule: Variants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: EASE, delay: 0.1 },
    },
  };

  return (
    <motion.div
      className="mb-10 flex items-baseline gap-4 md:mb-14"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      <motion.span variants={label} className="font-mono text-xs text-accent">
        {index}
      </motion.span>
      <motion.h2
        variants={heading}
        className="font-serif text-3xl tracking-tight text-ink md:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.span
        variants={rule}
        style={{ transformOrigin: "left" }}
        className="h-px flex-1 bg-border"
      />
    </motion.div>
  );
}
