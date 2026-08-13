"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks how far the given section has scrolled past (0 = fully in view at
 * the top, 1 = scrolled fully past). Written to a ref rather than state so
 * scrolling never triggers a React re-render, and also applied directly as
 * opacity/scale on `fadeRef`'s element so everything inside it -- the R3F
 * canvas and the HUD overlay alike -- fades out together as one piece.
 */
export function useScrollProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  fadeRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const progressRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current?.closest("section") ?? sectionRef.current;
    const fadeEl = fadeRef.current;
    if (!section || !fadeEl) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      progressRef.current = progress;
      fadeEl.style.opacity = String(1 - progress);
      fadeEl.style.transform = `scale(${1 - progress * 0.08})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRef, fadeRef, enabled]);

  return progressRef;
}
