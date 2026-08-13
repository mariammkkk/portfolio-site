"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { profile } from "@/data/content";
import { Hero3D } from "@/components/hero-3d/hero-3d";
import { CameraHud } from "@/components/hero-3d/camera-hud";
import { useScrollProgress } from "@/components/hero-3d/use-scroll-progress";
import { HoverBrackets } from "@/components/hud/corner-brackets";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // One scroll progress, applied to the shared stage (fades the canvas and
  // the HUD together) and read by the R3F scene (racks the blades closed).
  const scrollCloseRef = useScrollProgress(sectionRef, stageRef, true);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      {/* The aperture is the stage the name sits on -- centered on the
          section, not off to one side. Hero3D and CameraHud share this
          exact box (and this same fade-on-scroll stage) so the HUD frame
          always matches the lens beneath it, on load and on the way out. */}
      <div
        ref={stageRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[78vmin] w-[78vmin] max-h-175 max-w-175 -translate-x-1/2 -translate-y-1/2 md:pointer-events-auto"
      >
        <Hero3D className="absolute inset-0" scrollCloseRef={scrollCloseRef} />
        <CameraHud className="absolute inset-0" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {profile.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-serif text-[15vw] leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {profile.positioning}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group relative text-ink/80 underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            <HoverBrackets />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-ink/80 underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            <HoverBrackets />
            {profile.linkedinLabel}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-ink/80 underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            <HoverBrackets />
            {profile.githubLabel}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-border"
        />
      </motion.div>
    </section>
  );
}
