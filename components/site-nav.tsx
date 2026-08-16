'use client'

import { FileDown } from 'lucide-react'
import { contact } from '@/lib/portfolio-data'

export type NavItem = { id: string; label: string }

type SiteNavProps = {
  items: NavItem[]
  active: string
  onNavigate: (id: string) => void
}

export function SiteNav({ items, active, onNavigate }: SiteNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* logo mark: aperture glyph as camera packaging */}
        <button
          onClick={() => onNavigate('top')}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" className="size-5 text-primary" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" className="stroke-current" strokeWidth="1.5" />
            <path
              d="M12 3 L15 9 M21 12 L15 9 M18.7 18 L13 13.5 M5.3 18 L11 13.5 M3 12 L9.5 12 M8 3.8 L11 10"
              className="stroke-current opacity-70"
              strokeWidth="1.2"
            />
            <circle cx="12" cy="12" r="2.4" className="fill-current" />
          </svg>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
            Mariam Khan
          </span>
        </button>

        {/* section nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                active === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`mr-1.5 inline-block size-1.5 rounded-full align-middle transition-colors ${
                  active === item.id ? 'bg-destructive' : 'bg-border group-hover:bg-muted-foreground'
                }`}
                aria-hidden
              />
              {item.label}
            </button>
          ))}
        </nav>

        {/* shutter-styled résumé button */}
        <a
          href={contact.resume}
          download
          className="group flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2 pr-3.5 transition-colors hover:border-primary"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-destructive/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-active:scale-90">
            <FileDown className="size-3 text-foreground" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
            Résumé
          </span>
        </a>
      </div>

      {/* mobile section rail */}
      <nav
        className="flex gap-1 overflow-x-auto border-t border-border px-5 py-2 md:hidden"
        aria-label="Sections"
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`whitespace-nowrap px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              active === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
