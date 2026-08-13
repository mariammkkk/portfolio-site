// Shared autofocus-style corner brackets -- the one visual element reused
// across the camera HUD, the custom cursor, and hover states on links and
// buttons, so the "viewfinder" motif reads as one system instead of a
// hero-only flourish. `className` is applied to each of the four corner
// spans, so callers control appearance (color, opacity/scale transitions)
// while this component only owns the positioning math.
export function CornerBrackets({
  size = 10,
  thickness = 1,
  className = "border-accent",
}: {
  size?: number;
  thickness?: number;
  className?: string;
}) {
  const base = "pointer-events-none absolute";
  const style = { width: size, height: size, borderWidth: thickness };

  return (
    <>
      <span
        aria-hidden
        style={style}
        className={`${base} left-0 top-0 border-l border-t ${className}`}
      />
      <span
        aria-hidden
        style={style}
        className={`${base} right-0 top-0 border-r border-t ${className}`}
      />
      <span
        aria-hidden
        style={style}
        className={`${base} bottom-0 left-0 border-b border-l ${className}`}
      />
      <span
        aria-hidden
        style={style}
        className={`${base} bottom-0 right-0 border-b border-r ${className}`}
      />
    </>
  );
}

/**
 * Preset for the "focus lock" hover state on links/buttons: brackets sit
 * just outside the element (needs a `relative group` ancestor, e.g. the
 * link itself) and snap in on hover/focus, like a camera acquiring focus.
 */
export function HoverBrackets({ size = 8 }: { size?: number }) {
  return (
    <CornerBrackets
      size={size}
      className="-m-1.5 scale-90 border-accent opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
    />
  );
}
