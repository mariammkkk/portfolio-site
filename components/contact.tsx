import { profile } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-24 px-6 pb-10 pt-24 md:pt-32">
      <div className="mx-auto max-w-5xl border-t border-border pt-14">
        <RevealGroup>
          <RevealItem>
            <span className="font-mono text-xs text-accent">06</span>
            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink md:text-6xl">
              Let&apos;s talk.
            </h2>
          </RevealItem>

          <RevealItem className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {profile.linkedinLabel}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {profile.githubLabel}
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/20 px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-all hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
          </RevealItem>

          <RevealItem className="mt-16 flex flex-col gap-2 pb-6 font-mono text-[11px] uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {year} {profile.name}
            </span>
            <span>Built with Next.js &amp; Framer Motion</span>
          </RevealItem>
        </RevealGroup>
      </div>
    </footer>
  );
}
