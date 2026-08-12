import { RevealItem } from "@/components/reveal";

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <RevealItem className="mb-10 flex items-baseline gap-4 md:mb-14">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </RevealItem>
  );
}
