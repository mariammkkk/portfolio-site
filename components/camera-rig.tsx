'use client'

import { useState } from 'react'

export type Section = 'work' | 'experience' | 'skills' | 'contact' | 'leadership'

type CameraRigProps = {
  onSelect: (section: Section) => void
}

export function CameraRig({ onSelect }: CameraRigProps) {
  const [pressed, setPressed] = useState<Section | null>(null)

  const handle = (section: Section) => {
    setPressed(section)
    window.setTimeout(() => setPressed(null), 300)
    onSelect(section)
  }

  const popClass = (s: Section) => (pressed === s ? 'press-pop' : '')

  return (
    <div
      className="relative mx-auto w-full max-w-xl"
      style={{ aspectRatio: '440 / 300' }}
    >
      {/* ---- camera body (decorative) ---- */}
      <svg
        viewBox="0 0 440 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        {/* strap lugs */}
        <rect x="34" y="118" width="16" height="30" rx="4" className="fill-[var(--muted)]" />
        <rect x="390" y="118" width="16" height="30" rx="4" className="fill-[var(--muted)]" />

        {/* main body */}
        <rect
          x="46" y="110" width="348" height="152" rx="18"
          className="fill-[var(--card)] stroke-[var(--border)]"
          strokeWidth="2"
        />
        {/* grip */}
        <rect x="352" y="118" width="44" height="136" rx="14" className="fill-[var(--muted)]" />
        <rect x="360" y="132" width="6" height="108" rx="3" className="fill-[var(--border)]" />

        {/* top plate */}
        <rect x="104" y="76" width="232" height="42" rx="8" className="fill-[var(--muted)] stroke-[var(--border)]" strokeWidth="2" />

        {/* viewfinder prism hump */}
        <path d="M196 78 H244 L236 50 H204 Z" className="fill-[var(--card)] stroke-[var(--border)]" strokeWidth="2" />

        {/* hot shoe (flash mount) */}
        <rect x="200" y="30" width="40" height="16" rx="2" className="fill-[var(--muted)] stroke-[var(--border)]" strokeWidth="2" />
        <rect x="209" y="35" width="22" height="6" rx="1" className="fill-[var(--background)]" />

        {/* brand plate + readout */}
        <rect x="316" y="126" width="70" height="16" rx="3" className="fill-[var(--background)]" />
        <text x="324" y="138" className="fill-[var(--primary)] font-mono" fontSize="9" letterSpacing="1.5">
          MK-100
        </text>

        {/* screws */}
        <circle cx="60" cy="124" r="2.5" className="fill-[var(--border)]" />
        <circle cx="60" cy="248" r="2.5" className="fill-[var(--border)]" />

        {/* film-advance texture lines under top plate */}
        <g className="stroke-[var(--border)]" strokeWidth="1">
          <line x1="120" y1="230" x2="120" y2="246" />
          <line x1="128" y1="230" x2="128" y2="246" />
          <line x1="136" y1="230" x2="136" y2="246" />
        </g>
      </svg>

      {/* ---- LENS → Work ---- */}
      <Hotspot
        label="Lens"
        section="Work"
        onClick={() => handle('work')}
        className={popClass('work')}
        style={{ left: '50%', top: '63.5%', width: '35%', aspectRatio: '1 / 1' }}
        round
      >
        <span className="absolute inset-0 rounded-full border border-border bg-[radial-gradient(circle_at_50%_35%,var(--muted),var(--background))]" />
        <span className="absolute inset-[8%] rounded-full border-2 border-border/80" />
        <span className="spin-slow absolute inset-[14%] rounded-full border border-dashed border-muted-foreground/40" />
        <span className="absolute inset-[26%] rounded-full border border-border bg-[radial-gradient(circle_at_38%_30%,color-mix(in_oklch,var(--primary)_35%,var(--background)),var(--background)_70%)]" />
        <span className="absolute inset-[42%] rounded-full bg-background shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]" />
        <span className="absolute left-[38%] top-[34%] size-[8%] rounded-full bg-primary/70 blur-[1px]" />
      </Hotspot>

      {/* ---- SHUTTER → Experience ---- */}
      <Hotspot
        label="Shutter"
        section="Experience"
        onClick={() => handle('experience')}
        className={popClass('experience')}
        style={{ left: '79%', top: '32%', width: '11%', aspectRatio: '1 / 1' }}
        round
      >
        <span className="absolute inset-0 rounded-full border border-border bg-muted" />
        <span className="absolute inset-[18%] rounded-full border border-border bg-[radial-gradient(circle_at_50%_35%,var(--destructive),color-mix(in_oklch,var(--destructive)_50%,black))] shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
      </Hotspot>

      {/* ---- MODE DIAL → Skills ---- */}
      <Hotspot
        label="Mode Dial"
        section="Skills"
        onClick={() => handle('skills')}
        className={popClass('skills')}
        style={{ left: '22.5%', top: '33%', width: '15%', aspectRatio: '1 / 1' }}
        round
      >
        <span className="absolute inset-0 rounded-full border-2 border-border bg-muted" />
        <span
          className="absolute inset-[6%] rounded-full"
          style={{
            background:
              'repeating-conic-gradient(var(--border) 0deg 4deg, transparent 4deg 15deg)',
          }}
        />
        <span className="absolute inset-[20%] rounded-full border border-border bg-card" />
        <span className="absolute left-1/2 top-[22%] h-[16%] w-[6%] -translate-x-1/2 rounded-full bg-primary" />
      </Hotspot>

      {/* ---- HOT SHOE → Leadership ---- */}
      <Hotspot
        label="Hot Shoe"
        section="Leadership"
        onClick={() => handle('leadership')}
        className={popClass('leadership')}
        style={{ left: '50%', top: '12.5%', width: '13%', height: '7%' }}
        tooltipAbove
      >
        <span className="absolute inset-0 rounded-sm border border-border bg-muted" />
        <span className="absolute inset-x-[22%] inset-y-[34%] rounded-sm bg-background/80" />
      </Hotspot>

      {/* ---- VIEWFINDER → Contact ---- */}
      <Hotspot
        label="Viewfinder"
        section="Contact"
        onClick={() => handle('contact')}
        className={popClass('contact')}
        style={{ left: '50%', top: '22.5%', width: '13%', height: '13%' }}
      >
        <span className="absolute inset-0 rounded-t-md border border-border bg-[linear-gradient(160deg,color-mix(in_oklch,var(--primary)_25%,var(--background)),var(--background))]" />
        <span className="absolute inset-[22%] rounded-sm border border-border/70 bg-background/60" />
      </Hotspot>
    </div>
  )
}

type HotspotProps = {
  label: string
  section: string
  onClick: () => void
  className?: string
  style?: React.CSSProperties
  round?: boolean
  tooltipAbove?: boolean
  children: React.ReactNode
}

function Hotspot({ label, section, onClick, className, style, round, tooltipAbove, children }: HotspotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: open ${section}`}
      style={style}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-[1.06] focus-visible:outline-none ${className ?? ''}`}
    >
      <span
        className={`pointer-events-none absolute inset-0 ${round ? 'rounded-full' : 'rounded-md'} ring-2 ring-transparent ring-offset-2 ring-offset-background transition-all group-hover:ring-primary group-focus-visible:ring-primary`}
      />
      {children}
      {/* tooltip label */}
      <span
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap border border-border bg-card px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
          tooltipAbove ? 'bottom-full mb-2' : 'top-full mt-2'
        }`}
      >
        <span className="text-muted-foreground">{label} · </span>
        <span className="text-primary">{section}</span>
      </span>
    </button>
  )
}
