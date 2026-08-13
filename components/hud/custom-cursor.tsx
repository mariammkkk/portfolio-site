"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CornerBrackets } from "@/components/hud/corner-brackets";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary';

// Whether the primary pointer is fine (mouse/trackpad) can only be read in
// the browser, but this component still renders on the server for the
// initial HTML. useSyncExternalStore is the hydration-safe way to say "no"
// during SSR/first paint and pick up the real value (and any later changes,
// e.g. docking a laptop) right after, without a setState-in-effect.
function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/**
 * Site-wide replacement for the native cursor: a small reticle that tracks
 * the pointer and "snaps in" tighter over interactive elements, like a
 * camera locking focus. Only mounted for fine-pointer (mouse/trackpad)
 * devices -- touch has no cursor to replace, and the corresponding
 * `cursor: none` in globals.css is scoped the same way, so touch visitors
 * are never left without a visible pointer.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isFinePointer) return;
    const el = dotRef.current;
    if (!el) return;

    let visible = false;

    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      const hoveringInteractive = (e.target as HTMLElement)?.closest?.(
        INTERACTIVE_SELECTOR,
      );
      setIsActive(!!hoveringInteractive);
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-200 opacity-0 transition-opacity duration-200"
    >
      <div
        className={`relative transition-all duration-200 ease-out ${
          isActive ? "h-5 w-5" : "h-8 w-8"
        }`}
      >
        <CornerBrackets
          size={isActive ? 6 : 8}
          className={isActive ? "border-accent" : "border-accent/60"}
        />
        <span
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-all duration-200 ${
            isActive ? "h-1 w-1" : "h-0.5 w-0.5"
          }`}
        />
      </div>
    </div>
  );
}
