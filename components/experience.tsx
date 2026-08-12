"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { experience } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="02" title="Experience" />

        <div ref={containerRef} className="relative">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border md:left-[7px]" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-accent md:left-[7px]"
          />

          <RevealGroup className="space-y-12 md:space-y-14">
            {experience.map((entry) => (
              <RevealItem
                key={`${entry.org}-${entry.role}`}
                className="relative pl-8 md:pl-10"
              >
                <span className="absolute left-0 top-1.5 h-[11px] w-[11px] -translate-x-[calc(50%-0.5px)] rounded-full border-2 border-accent bg-paper md:h-[15px] md:w-[15px]" />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-xl text-ink md:text-2xl">
                    {entry.role}
                    <span className="text-muted"> · {entry.org}</span>
                  </h3>
                  <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted">
                    {entry.start} – {entry.end}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
                  {entry.location}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {entry.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-ink/80 md:text-base"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
