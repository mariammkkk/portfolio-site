"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="03" title="Projects" />

        <RevealGroup className="grid grid-cols-1 items-start gap-5 md:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <RevealItem key={project.title}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const { caseStudy } = project;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="group flex flex-col border border-border p-6 transition-colors hover:border-accent/60"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          {project.subtitle}
          {project.date ? ` · ${project.date}` : ""}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} source on GitHub`}
          className="shrink-0"
        >
          <ArrowIcon />
        </a>
      </div>

      <h3 className="font-serif text-xl leading-snug text-ink md:text-[1.35rem]">
        {project.title}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 flex items-center gap-1.5 self-start font-mono text-xs uppercase tracking-wider text-accent/90 transition-colors hover:text-accent"
      >
        {open ? "Close case study" : "Case study"}
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <path
            d="M1.5 3.5L5 7L8.5 3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="case-study"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-border pt-5">
              <CaseSection label="Problem" text={caseStudy.problem} />
              <CaseSection label="Approach" text={caseStudy.approach} />

              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Result
                </p>
                <div className="mb-2.5 flex flex-wrap gap-x-6 gap-y-2">
                  {caseStudy.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-2xl leading-none text-accent">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-ink/75">
                  {caseStudy.result}
                </p>
              </div>

              {caseStudy.learned && (
                <div>
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    What I&apos;d Do Differently
                  </p>
                  <p className="text-sm italic leading-relaxed text-ink/75">
                    {caseStudy.learned}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CaseSection({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-ink/75">{text}</p>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-0.5 shrink-0 text-muted transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-accent"
    >
      <path
        d="M3 11L11 3M11 3H4.5M11 3V9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
