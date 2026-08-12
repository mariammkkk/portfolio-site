import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import { leadership } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

// Checked at render time (server component) so a missing photo — e.g. before
// it's been dropped into /public — is simply omitted instead of showing a
// broken-image glyph.
function photoExists(photoPath: string) {
  return existsSync(path.join(process.cwd(), "public", photoPath));
}

export function Leadership() {
  return (
    <section id="leadership" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="04" title="Leadership & Volunteering" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
          {leadership.map((group) => (
            <div key={group.label}>
              <p className="mb-5 font-mono text-xs uppercase tracking-wider text-muted">
                {group.label}
              </p>
              <RevealGroup className="space-y-5">
                {group.entries.map((entry) => (
                  <RevealItem
                    key={`${entry.org}-${entry.role}`}
                    className="group flex gap-4 border-b border-border pb-5 last:border-b-0"
                  >
                    {entry.photo && photoExists(entry.photo) && (
                      <Image
                        src={entry.photo}
                        alt={entry.org}
                        width={64}
                        height={64}
                        className="h-14 w-14 shrink-0 border border-border object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0 sm:h-16 sm:w-16"
                      />
                    )}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <h3 className="font-serif text-base text-ink md:text-lg">
                          {entry.role}
                          <span className="text-muted"> · {entry.org}</span>
                        </h3>
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                        {entry.start} – {entry.end}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/75">
                        {entry.description}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
