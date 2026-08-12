import { about } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="01" title="About" />
        <RevealGroup>
          <RevealItem>
            <p className="max-w-3xl text-xl leading-relaxed text-ink/90 md:text-2xl md:leading-relaxed">
              {about.paragraph}
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
