"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import {
  ApertureFallback,
  ApertureLoadingPlaceholder,
} from "./aperture-fallback";

const ApertureCanvas = dynamic(
  () => import("./aperture-canvas").then((m) => m.ApertureCanvas),
  { ssr: false, loading: () => <ApertureLoadingPlaceholder className="h-full w-full" /> },
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

type Capabilities = { ready: boolean; webgl: boolean; quality: "high" | "low" };

const SERVER_CAPABILITIES: Capabilities = {
  ready: false,
  webgl: false,
  quality: "high",
};

// Device capabilities (WebGL support, viewport size, core count) can only be
// read in the browser, but this component still renders on the server for
// the initial HTML. useSyncExternalStore is the hydration-safe way to say
// "use this fixed value for SSR and the first client render, then swap to
// the real computed value right after" without a setState-in-effect.
let cachedCapabilities: Capabilities | null = null;

function readCapabilities(): Capabilities {
  if (cachedCapabilities) return cachedCapabilities;
  const smallViewport = window.innerWidth < 768;
  const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
  cachedCapabilities = {
    ready: true,
    webgl: supportsWebGL(),
    quality: smallViewport || lowCore ? "low" : "high",
  };
  return cachedCapabilities;
}

function subscribeNoop() {
  return () => {};
}

/**
 * The 3D camera aperture that anchors the hero. Deliberately kept out of
 * the initial page-load bundle (next/dynamic + ssr:false) since it only
 * matters once the browser is idle and WebGL is confirmed available.
 *
 * Three layers of graceful degradation, checked client-side only:
 *  1. prefers-reduced-motion or no WebGL -> static SVG aperture, no JS scene.
 *  2. Otherwise, mount the R3F canvas only while the hero is actually in
 *     the viewport (IntersectionObserver) so WebGL stops rendering the
 *     instant a visitor scrolls past it.
 *  3. Small viewports / low core-count devices get a lighter scene (fewer
 *     ring segments, capped device pixel ratio).
 *
 * `scrollCloseRef` is supplied by the parent (see hero.tsx) rather than
 * computed internally, so the same scroll progress can also fade the HUD
 * overlay -- the lens and its viewfinder fade out together, not separately.
 */
export function Hero3D({
  className,
  scrollCloseRef,
}: {
  className?: string;
  scrollCloseRef: React.RefObject<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const capabilities = useSyncExternalStore(
    subscribeNoop,
    readCapabilities,
    () => SERVER_CAPABILITIES,
  );
  const mode: "pending" | "3d" | "static" = !capabilities.ready
    ? "pending"
    : shouldReduceMotion || !capabilities.webgl
      ? "static"
      : "3d";
  const quality = capabilities.quality;

  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (mode !== "3d") return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`select-none ${className ?? ""}`}
    >
      {mode === "pending" && (
        <ApertureLoadingPlaceholder className="h-full w-full" />
      )}

      {mode === "static" && (
        <ApertureFallback className="h-full w-full opacity-90" />
      )}

      {mode === "3d" &&
        (inView ? (
          <Suspense
            fallback={<ApertureLoadingPlaceholder className="h-full w-full" />}
          >
            <ApertureCanvas scrollCloseRef={scrollCloseRef} quality={quality} />
          </Suspense>
        ) : (
          <ApertureLoadingPlaceholder className="h-full w-full" />
        ))}
    </div>
  );
}
