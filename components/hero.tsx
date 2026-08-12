"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { profile } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

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
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center px-6 pt-24"
    >
      <motion.div
        className="mx-auto w-full max-w-5xl"
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
          className="font-serif text-[13vw] leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
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
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider"
        >
          <a
            href={`mailto:${profile.email}`}
            className="text-ink/80 underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/80 underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {profile.linkedinLabel}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/80 underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
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
