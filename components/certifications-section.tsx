import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { certifications, certificationGoals, type Certification } from '@/lib/certifications'

export function CertificationsSection() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c) => (
          <CertCard key={c.name} cert={c} />
        ))}
      </div>

      {certificationGoals.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            On the Radar
          </span>
          {certificationGoals.map((g) => (
            <span
              key={g.name}
              className="rounded-full border border-dashed border-muted-foreground/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              {g.name} <span className="text-muted-foreground/60">· {g.issuer}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function CertCard({ cert: c }: { cert: Certification }) {
  const date = c.status === 'completed' ? c.dateCompleted : c.expectedDate

  return (
    <article className="flex flex-col border border-border bg-card/40 p-5">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-sans text-lg font-semibold uppercase leading-tight tracking-tight text-foreground">
          {c.name}
        </h3>
        <StatusBadge status={c.status} />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {c.issuer}
      </p>
      {date && (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          {date}
        </p>
      )}
      {c.credentialUrl && (
        <a
          href={c.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
        >
          View Credential
          <ArrowUpRight className="size-4" />
        </a>
      )}
    </article>
  )
}

function StatusBadge({ status }: { status: Certification['status'] }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-primary">
        <CheckCircle2 className="size-3" />
        Completed
      </span>
    )
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
      <span className="size-1.5 animate-pulse rounded-full bg-destructive" aria-hidden />
      In Progress
    </span>
  )
}
