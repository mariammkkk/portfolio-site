"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, profile } from "@/data/content";
import { useActiveSection } from "@/lib/use-active-section";
import { HoverBrackets } from "@/components/hud/corner-brackets";

const sectionIds = nav.map((item) => item.href.replace("#", ""));
const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const [compressed, setCompressed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCompressed(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding,backdrop-filter] duration-300 ${
        compressed
          ? "border-b border-border/80 bg-paper/75 py-2.5 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-ink transition-colors hover:text-accent"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
              >
                <span className={isActive ? "text-ink" : undefined}>
                  {item.label}
                </span>
                {/* Aperture-style indicator: opens from a center point
                    rather than sliding between links like a plain
                    underline, echoing the hero's iris. Per-link
                    AnimatePresence (not a shared layoutId) so the old one
                    visibly closes while the new one opens. */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="nav-indicator"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ transformOrigin: "center" }}
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    />
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-none border border-ink/20 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-all hover:border-accent hover:text-accent"
          >
            <HoverBrackets />
            Resume
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative flex h-7 w-7 flex-col items-center justify-center gap-1.25 md:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-px w-4 bg-ink"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-px w-4 bg-ink"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/80 bg-paper/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {nav.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-2.5 font-mono text-sm uppercase tracking-wider transition-colors ${
                      isActive ? "text-accent" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
