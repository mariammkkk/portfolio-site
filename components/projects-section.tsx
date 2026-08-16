'use client'

import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { projects, type Project } from '@/lib/portfolio-data'

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured)
  const other = projects.filter((p) => !p.featured)
  const [open, setOpen] = useState<string>(featured[0]?.title ?? '')

  return (
    <div className="space-y-4">
      {featured.map((p, i) => (
        <CaseStudy
          key={p.title}
          project={p}
          index={i + 1}
          expanded={open === p.title}
          onToggle={() => setOpen(open === p.title ? '' : p.title)}
        />
      ))}

      {other.length > 0 && (
        <div className="grid gap-4 pt-2 sm:grid-cols-2">
          {other.map((p) => (
            <article
              key={p.title}
              className="flex flex-col border border-border bg-card/40 p-5"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {p.context}
                </span>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
              <h3 className="font-sans text-xl font-semibold uppercase tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 font-mono text-xs leading-relaxed text-muted-foreground">
                {p.tagline}
              </p>
              <StackTags stack={p.stack} className="mt-4" />
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function CaseStudy({
  project: p,
  index,
  expanded,
  onToggle,
}: {
  project: Project
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <article
      className={`border transition-colors ${
        expanded ? 'border-primary/60 bg-card/60' : 'border-border bg-card/30 hover:border-muted-foreground/50'
      }`}
    >
      {/* header row: click to focus */}
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="font-mono text-xs tabular-nums text-primary">
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <h3 className="font-sans text-2xl font-semibold uppercase leading-none tracking-tight text-foreground sm:text-3xl">
              {p.title}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {p.context}
            </span>
          </div>
          <p className="mt-2 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground">
            {p.tagline}
          </p>
        </div>
        {/* mode-dial style focus toggle */}
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            expanded ? 'rotate-45 border-primary text-primary' : 'border-border text-muted-foreground'
          }`}
          aria-hidden
        >
          <Plus className="size-4" />
        </span>
      </button>

      {/* expanded detail */}
      {expanded && (
        <div className="iris-in border-t border-border px-5 pb-6 pt-5 sm:px-6">
          <dl className="grid gap-6 sm:grid-cols-2">
            <Field term="Problem" desc={p.problem} />
            <Field term="Approach" desc={p.approach} />
            <Field term="My Role" desc={p.contribution} />
            <div>
              <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Outcome
              </dt>
              {p.outcome && (
                <dd>
                  <span className="font-sans text-3xl font-semibold tracking-tight text-primary">
                    {p.outcome.metric}
                  </span>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                    {p.outcome.detail}
                  </p>
                </dd>
              )}
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <StackTags stack={p.stack} />
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
              >
                View on GitHub
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  )
}

function Field({ term, desc }: { term: string; desc?: string }) {
  return (
    <div>
      <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {term}
      </dt>
      <dd className="font-mono text-xs leading-relaxed text-muted-foreground">{desc}</dd>
    </div>
  )
}

function StackTags({ stack, className = '' }: { stack: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {stack.map((s) => (
        <li
          key={s}
          className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}
