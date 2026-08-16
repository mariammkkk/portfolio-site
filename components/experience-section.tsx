import { experience } from '@/lib/portfolio-data'

export function ExperienceSection() {
  return (
    <ol className="relative border-l border-border pl-6 sm:pl-8">
      {experience.map((role) => (
        <li key={`${role.company}-${role.title}`} className="relative pb-8 last:pb-0">
          <span
            className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-primary bg-background sm:-left-[9px]"
            aria-hidden
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-sans text-lg font-semibold uppercase leading-tight tracking-tight text-foreground sm:text-xl">
              {role.title}
              <span className="text-primary"> · {role.company}</span>
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {role.period}
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            {role.location}
          </p>
          <p className="mt-2 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground">
            {role.metric}
          </p>
        </li>
      ))}
    </ol>
  )
}
