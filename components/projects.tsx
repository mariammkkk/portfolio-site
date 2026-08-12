"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="03" title="Projects" />

        <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <RevealItem key={project.title}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col justify-between border border-border p-6 transition-colors hover:border-accent/60"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      {project.subtitle}
                      {project.date ? ` · ${project.date}` : ""}
                    </span>
                    <ArrowIcon />
                  </div>

                  <h3 className="font-serif text-xl leading-snug text-ink md:text-[1.35rem]">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink/75">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-0.5 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
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
