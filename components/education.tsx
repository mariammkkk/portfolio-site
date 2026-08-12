import { certifications, education, skills } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="05" title="Education" />

        <RevealGroup className="grid grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <RevealItem>
              <h3 className="font-serif text-xl text-ink md:text-2xl">
                {education.school}
              </h3>
              <p className="mt-1 text-sm text-ink/80 md:text-base">
                {education.degree}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                {education.start} – {education.end} · {education.honors}
              </p>
            </RevealItem>

            <RevealItem className="mt-5 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  {course}
                </span>
              ))}
            </RevealItem>

            <RevealItem className="mt-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
                Certifications
              </p>
              {certifications.map((cert) => (
                <p key={cert.name} className="text-sm text-ink/80 md:text-base">
                  {cert.name}
                  <span className="text-muted">
                    {" "}
                    — {cert.issuer}, {cert.year}
                  </span>
                </p>
              ))}
            </RevealItem>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted">
              Skills
            </p>
            <div className="space-y-6">
              {skills.map((group) => (
                <RevealItem key={group.group}>
                  <p className="mb-2.5 text-xs text-muted">{group.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="cursor-default border border-border px-2.5 py-1 font-mono text-xs text-ink/80 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
