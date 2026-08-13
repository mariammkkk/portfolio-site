// Thin tick-mark ruler between sections -- the same "timeline" language the
// filmstrip's playhead track will use, so the whole page reads as one
// continuous strip from hero to contact rather than stacked, unrelated
// blocks. Pure CSS (layered repeating gradients: sparser accent-colored
// major ticks over denser minor ticks), no JS or SVG needed.
export function SectionDivider() {
  return (
    <div aria-hidden className="px-6">
      <div
        className="mx-auto h-2.5 max-w-5xl opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--accent) 0, var(--accent) 1px, transparent 1px, transparent 96px), repeating-linear-gradient(to right, var(--border) 0, var(--border) 1px, transparent 1px, transparent 24px)",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}
