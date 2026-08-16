import { ArrowUpRight, Mail, Link2, Code, FileDown } from 'lucide-react'
import { skillGroups, leadership, contact } from '@/lib/portfolio-data'

export function SkillsSection() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {skillGroups.map((group, i) => (
        <div key={group.label}>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[11px] tabular-nums text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-sans text-lg font-semibold uppercase tracking-wide text-foreground">
              {group.label}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-mono text-xs leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 h-px w-3 shrink-0 bg-primary/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function LeadershipSection() {
  return (
    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {leadership.map((item) => (
        <div key={`${item.org}-${item.role}`} className="border-t border-border pt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="font-sans text-base font-semibold uppercase leading-tight tracking-tight text-foreground">
              {item.role}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {item.period}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {item.org}
          </p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
            {item.blurb}
          </p>
          {item.image && (
            <div className="group relative mt-4 overflow-hidden border border-border">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.imageAlt ?? `${item.org} team`}
                className="aspect-[16/10] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
              <span
                className="pointer-events-none absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-primary"
                aria-hidden
              >
                REC ●
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function ContactSection() {
  const links = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Link2, label: 'LinkedIn', value: '/in/mariamkhan8', href: contact.linkedin },
    { icon: Code, label: 'GitHub', value: '/mariamkhan8', href: contact.github },
  ]
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <p className="max-w-md text-pretty font-mono text-sm leading-relaxed text-muted-foreground">
          Open to associate / junior PM and AI-data roles, and always up for talking shop about
          product, data, or a photo shoot.
        </p>
        <a
          href={contact.resume}
          download
          className="mt-6 inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
        >
          <FileDown className="size-4" />
          Download Résumé
        </a>
      </div>
      <ul className="divide-y divide-border border-y border-border">
        {links.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-4 py-4 font-mono transition-colors hover:text-primary"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              <span className="w-20 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </span>
              <span className="flex-1 truncate text-sm text-foreground group-hover:text-primary">
                {value}
              </span>
              <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
