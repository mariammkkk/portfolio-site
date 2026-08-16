'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SiteNav, type NavItem } from '@/components/site-nav'
import { CameraRig, type Section } from '@/components/camera-rig'
import { ProjectsSection } from '@/components/projects-section'
import { ExperienceSection } from '@/components/experience-section'
import { SkillsSection, LeadershipSection, ContactSection } from '@/components/detail-sections'
import { about } from '@/lib/portfolio-data'

const NAV: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]

export default function Page() {
  const [flash, setFlash] = useState(false)
  const [active, setActive] = useState('top')
  const flashTimer = useRef<number | undefined>(undefined)

  const navigate = useCallback((id: string) => {
    setFlash(true)
    window.clearTimeout(flashTimer.current)
    flashTimer.current = window.setTimeout(() => setFlash(false), 450)
    const target = id === 'top' ? document.body : document.getElementById(id)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-svh">
      {/* subtle technical grid backdrop */}
      <div className="hud-grid pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden />

      {/* shutter flash on navigation */}
      {flash && (
        <div className="shutter-flash pointer-events-none fixed inset-0 z-[70] bg-foreground" aria-hidden />
      )}

      <SiteNav items={NAV} active={active} onNavigate={navigate} />

      <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---- HERO ---- */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                {about.role}
              </p>
              <h1 className="text-balance font-sans text-6xl font-semibold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl">
                Mariam <span className="text-primary">Khan</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty font-sans text-xl leading-snug text-foreground/90 sm:text-2xl">
                {about.headline}
              </p>
              <p className="mt-4 max-w-xl text-pretty font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {about.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('work')}
                  className="border border-primary bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                >
                  View Work
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* interactive camera: navigation centerpiece */}
            <div className="flex flex-col items-center gap-5">
              <CameraRig onSelect={(s: Section) => navigate(s)} />
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-primary">{'// '}</span>
                Point &amp; shoot: click a camera part to jump to a section
              </p>
            </div>
          </div>

          {/* credibility stat block */}
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {about.stats.map((s) => (
              <li key={s.label} className="bg-background px-4 py-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 font-sans text-lg font-semibold uppercase tracking-tight text-foreground">
                  {s.value}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- WORK (primary) ---- */}
        <Section id="work" index="01" title="Selected Work" meta="Case Studies · 1/250s">
          <ProjectsSection />
        </Section>

        {/* ---- EXPERIENCE ---- */}
        <Section id="experience" index="02" title="Experience" meta="Timeline · f/1.8">
          <ExperienceSection />
        </Section>

        {/* ---- SKILLS ---- */}
        <Section id="skills" index="03" title="Skills" meta="Capabilities · ISO 400">
          <SkillsSection />
        </Section>

        {/* ---- LEADERSHIP ---- */}
        <Section id="leadership" index="04" title="Leadership" meta="Volunteering · Burst">
          <LeadershipSection />
        </Section>

        {/* ---- CONTACT ---- */}
        <Section id="contact" index="05" title="Contact" meta="Get in Touch · 35mm" last>
          <ContactSection />
        </Section>
      </main>

      <footer className="relative z-10 border-t border-border px-5 py-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-8">
        © 2026 Mariam Khan · Built &amp; shot by hand
      </footer>
    </div>
  )
}

function Section({
  id,
  index,
  title,
  meta,
  last,
  children,
}: {
  id: string
  index: string
  title: string
  meta: string
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-28 py-14 sm:py-20 ${last ? '' : 'border-b border-border'}`}>
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4 sm:mb-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs tabular-nums text-primary">{index}</span>
          <h2 className="font-sans text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:flex sm:items-center sm:gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-destructive" aria-hidden />
          REC · {meta}
        </span>
      </div>
      {children}
    </section>
  )
}
